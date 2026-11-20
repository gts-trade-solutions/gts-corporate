#!/usr/bin/env bash
# First-time setup of the GTS website on an Ubuntu 22.04 or 24.04 VPS.
#
#   git clone https://github.com/gts-trade-solutions/gts-corporate.git /root/gts-setup
#   sudo bash /root/gts-setup/deploy/setup.sh you@example.com [--with-mysql]
#
# The address is where Let's Encrypt sends certificate expiry notices.
# --with-mysql installs MySQL on this server and fills in the MYSQL_* settings,
# which turns on the /admin editor and the enquiry follow-up log.
#
# Run it twice. The first run installs everything and writes
# /var/www/gts/shared/.env.local, then stops so the settings can be filled in.
# The second run builds the site, obtains the HTTPS certificate and goes live.
# Every step checks what is already there, so running it again is harmless.
set -euo pipefail

DOMAIN=gtstradesolutions.com
APP_ROOT=/var/www/gts
ENV_FILE=$APP_ROOT/shared/.env.local
HERE=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
REPO_DIR=$(dirname "$HERE")

EMAIL=""
WITH_MYSQL=0
for arg in "$@"; do
  case $arg in
    --with-mysql) WITH_MYSQL=1 ;;
    *@*) EMAIL=$arg ;;
    *) echo "Unknown argument: $arg" >&2; exit 2 ;;
  esac
done

[[ $EUID -eq 0 ]] || { echo "Run as root: sudo bash $0 you@example.com" >&2; exit 1; }
[[ -n $EMAIL ]] || { echo "Usage: sudo bash $0 you@example.com [--with-mysql]" >&2; exit 2; }

step() { printf '\n==> %s\n' "$*"; }

step "System packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -q
apt-get install -y -q nginx certbot git curl ca-certificates openssl
systemctl enable --now nginx

step "Node.js"
node_ok() {
  command -v node >/dev/null &&
    node -e 'const [a, b] = process.versions.node.split(".").map(Number); process.exit(a > 20 || (a === 20 && b >= 9) ? 0 : 1)'
}
if ! node_ok; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y -q nodejs
fi
echo "node $(node -v)"

step "Swap"
# next build needs more memory than a 1 GB server has.
mem_mb=$(awk '/MemTotal/ { print int($2 / 1024) }' /proc/meminfo)
if (( mem_mb < 2000 )) && [[ -z $(swapon --show --noheadings) && ! -e /swapfile ]]; then
  if fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile; then
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    echo "Added a 2 GB swap file."
  else
    rm -f /swapfile
    echo "Could not add swap on this server. If the build is killed, use a plan with 2 GB of memory."
  fi
else
  echo "Not needed (${mem_mb} MB memory, or swap already present)."
fi

step "App user and directories"
id gts >/dev/null 2>&1 || useradd --system --user-group --home-dir "$APP_ROOT" --shell /usr/sbin/nologin gts
mkdir -p "$APP_ROOT/releases" "$APP_ROOT/shared" /var/www/certbot
chown gts:gts "$APP_ROOT" "$APP_ROOT/releases" "$APP_ROOT/shared"

if (( WITH_MYSQL )); then
  step "MySQL"
  apt-get install -y -q mysql-server
  systemctl enable --now mysql
fi

step "Settings"
created_env=0
if [[ ! -f $ENV_FILE ]]; then
  cp "$REPO_DIR/.env.example" "$ENV_FILE"
  sed -i \
    -e "s|^NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=https://$DOMAIN|" \
    -e "s|^# ADMIN_SESSION_SECRET=.*|ADMIN_SESSION_SECRET=$(openssl rand -hex 32)|" \
    "$ENV_FILE"
  created_env=1
fi

if (( WITH_MYSQL )) && grep -q '^MYSQL_HOST=$' "$ENV_FILE"; then
  db_pass=$(openssl rand -hex 24)
  mysql <<SQL
CREATE DATABASE IF NOT EXISTS gts CHARACTER SET utf8mb4;
CREATE USER IF NOT EXISTS 'gts'@'localhost' IDENTIFIED BY '$db_pass';
CREATE USER IF NOT EXISTS 'gts'@'127.0.0.1' IDENTIFIED BY '$db_pass';
ALTER USER 'gts'@'localhost' IDENTIFIED BY '$db_pass';
ALTER USER 'gts'@'127.0.0.1' IDENTIFIED BY '$db_pass';
GRANT ALL PRIVILEGES ON gts.* TO 'gts'@'localhost';
GRANT ALL PRIVILEGES ON gts.* TO 'gts'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL
  sed -i \
    -e "s|^MYSQL_HOST=.*|MYSQL_HOST=127.0.0.1|" \
    -e "s|^MYSQL_PORT=.*|MYSQL_PORT=3306|" \
    -e "s|^MYSQL_USER=.*|MYSQL_USER=gts|" \
    -e "s|^MYSQL_PASSWORD=.*|MYSQL_PASSWORD=$db_pass|" \
    -e "s|^MYSQL_DATABASE=.*|MYSQL_DATABASE=gts|" \
    "$ENV_FILE"
  echo "Created database 'gts' and wrote its credentials into $ENV_FILE."
fi

chown gts:gts "$ENV_FILE"
chmod 600 "$ENV_FILE"

if (( created_env )); then
  cat <<EOF

Wrote $ENV_FILE.
Fill in the email, SMTP and admin settings (nano $ENV_FILE), then run this
script again with the same arguments. See deploy/README.md, step 3.
EOF
  exit 0
fi

placeholders=$(grep -E '^[A-Z_]+=.*example\.com' "$ENV_FILE" | cut -d= -f1 || true)
if [[ -n $placeholders ]]; then
  echo "These settings in $ENV_FILE still hold example.com placeholders:" >&2
  echo "$placeholders" | sed 's/^/  /' >&2
  echo "Replace them, or empty them if not used, and run this again." >&2
  exit 1
fi

step "Service"
install -m 644 "$HERE/gts.service" /etc/systemd/system/gts.service
systemctl daemon-reload
systemctl enable gts

if ! systemctl is-active --quiet gts && [[ -n $(ss -ltnH 'sport = :3000') ]]; then
  echo "Another program on this server already listens on port 3000:" >&2
  ss -ltnp 'sport = :3000' >&2
  echo "Stop it, or change 3000 in deploy/gts.service, deploy/deploy.sh and" >&2
  echo "deploy/nginx/$DOMAIN.conf to a free port." >&2
  exit 1
fi

step "Build and start the site"
bash "$HERE/deploy.sh"

step "HTTPS certificate"
if [[ -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]]; then
  echo "Already present."
else
  server_ip=$(curl -fsS4 --max-time 10 https://api.ipify.org || true)
  for host in "$DOMAIN" "www.$DOMAIN"; do
    resolved=$(getent ahostsv4 "$host" | awk 'NR == 1 { print $1 }' || true)
    if [[ -n $server_ip && $resolved != "$server_ip" ]]; then
      echo "$host points to ${resolved:-nothing}, but this server is $server_ip." >&2
      echo "Point the DNS at this server first (deploy/README.md, step 1), wait for it" >&2
      echo "to update, then run this again. The site is built and running already." >&2
      exit 1
    fi
  done

  # A port-80-only site, just long enough for Let's Encrypt to check the domain.
  cat > "/etc/nginx/sites-available/$DOMAIN" <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 404; }
}
NGINX
  ln -sfn "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
  nginx -t
  systemctl reload nginx

  certbot certonly --webroot -w /var/www/certbot \
    -d "$DOMAIN" -d "www.$DOMAIN" \
    --email "$EMAIL" --agree-tos --no-eff-email --non-interactive \
    --deploy-hook "systemctl reload nginx"
fi

step "nginx"
install -m 644 "$HERE/nginx/$DOMAIN.conf" "/etc/nginx/sites-available/$DOMAIN"
ln -sfn "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
nginx -t
systemctl reload nginx

if command -v ufw >/dev/null && ufw status | grep -q 'Status: active'; then
  ufw allow 'Nginx Full' >/dev/null
  echo "Opened ports 80 and 443 in ufw."
fi

cat <<EOF

Done. https://$DOMAIN is live.

  Update later:  sudo bash $APP_ROOT/current/deploy/deploy.sh
  Logs:          journalctl -u gts -f
  Settings:      $ENV_FILE (rebuild with deploy.sh after changing NEXT_PUBLIC_*;
                 restart with 'systemctl restart gts' after changing the rest)
EOF
