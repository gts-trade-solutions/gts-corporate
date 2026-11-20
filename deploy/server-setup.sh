#!/usr/bin/env bash
# The one-time root steps for gtstradesolutions.com on the shared VPS:
# the nginx site, the HTTPS certificate, and a MySQL database for /admin.
# Everything else runs as the deploy user (deploy.sh). Run it once the site
# answers on 127.0.0.1:3006:
#
#   sudo bash /home/deploy/gts-corporate/current/deploy/server-setup.sh
#
# Nothing belonging to the other sites on this server is changed. nginx is
# reloaded only after `nginx -t` passes, and if the test fails the new site
# file is taken out again. The database and its user are new; if either name
# is already taken, that step stops and changes nothing.
set -euo pipefail

DOMAIN=gtstradesolutions.com
APP_NAME=gts-corporate
DB=gts_corporate
APP_USER=${SUDO_USER:-deploy}
APP_HOME=$(getent passwd "$APP_USER" | cut -d: -f6)
ENV_FILE=$APP_HOME/gts-corporate/shared/.env.local
HERE=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
AVAILABLE=/etc/nginx/sites-available/$DOMAIN
ENABLED=/etc/nginx/sites-enabled/$DOMAIN

[[ $EUID -eq 0 ]] || { echo "Run with sudo: sudo bash $0" >&2; exit 1; }
[[ -f $ENV_FILE ]] || { echo "Missing $ENV_FILE. Run deploy.sh as $APP_USER first." >&2; exit 1; }

step() { printf '\n==> %s\n' "$*"; }

# Enable a site file only if the whole nginx config still tests clean.
enable_site() {
  ln -sfn "$AVAILABLE" "$ENABLED"
  if ! nginx -t; then
    rm -f "$ENABLED"
    echo "nginx rejected the new site, so it has been taken out again. The other sites are untouched." >&2
    exit 1
  fi
  systemctl reload nginx
}

step "HTTPS certificate"
if [[ -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]]; then
  echo "Already present."
else
  mkdir -p /var/www/certbot
  # A port-80-only site, just long enough for Let's Encrypt to check the domain.
  cat > "$AVAILABLE" <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 404; }
}
NGINX
  enable_site
  certbot certonly --webroot -w /var/www/certbot \
    -d "$DOMAIN" -d "www.$DOMAIN" \
    --deploy-hook "systemctl reload nginx"
fi

step "nginx site"
install -m 644 "$HERE/nginx/$DOMAIN.conf" "$AVAILABLE"
enable_site
echo "https://$DOMAIN is served by nginx."

step "MySQL database for /admin"
if grep -q '^MYSQL_HOST=.' "$ENV_FILE"; then
  echo "MYSQL_HOST is already set in $ENV_FILE. Skipped."
  exit 0
fi

if mysql -e 'SELECT 1' >/dev/null 2>&1; then
  sql() { mysql "$@"; }
elif [[ -r /etc/mysql/debian.cnf ]] && mysql --defaults-file=/etc/mysql/debian.cnf -e 'SELECT 1' >/dev/null 2>&1; then
  sql() { mysql --defaults-file=/etc/mysql/debian.cnf "$@"; }
else
  echo "Could not sign in to MySQL as root. Skipped: the site runs without it and /admin stays read-only." >&2
  exit 0
fi

# An empty database of this name is reused, so a run interrupted after creating
# it can simply be repeated. A user of this name, or a database with tables in
# it, belongs to something else and stops the step.
taken=$(sql -N -e "SELECT (SELECT COUNT(*) FROM mysql.user WHERE user = '$DB')
                         + (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '$DB')")
if (( taken > 0 )); then
  echo "A MySQL user named '$DB', or a '$DB' database with tables in it, already exists. Skipped, nothing changed." >&2
  exit 0
fi

# Upper and lower case, a digit and a symbol, which validate_password asks for
# on this server, using only characters that need no quoting in .env.local.
pass="Gts1-$(openssl rand -hex 20)"
# Users first: if the password policy refuses, nothing has been created.
sql <<SQL
CREATE USER '$DB'@'localhost' IDENTIFIED BY '$pass';
CREATE USER '$DB'@'127.0.0.1' IDENTIFIED BY '$pass';
CREATE DATABASE IF NOT EXISTS $DB CHARACTER SET utf8mb4;
GRANT ALL PRIVILEGES ON $DB.* TO '$DB'@'localhost';
GRANT ALL PRIVILEGES ON $DB.* TO '$DB'@'127.0.0.1';
SQL

sed -i \
  -e "s|^MYSQL_HOST=.*|MYSQL_HOST=127.0.0.1|" \
  -e "s|^MYSQL_PORT=.*|MYSQL_PORT=3306|" \
  -e "s|^MYSQL_USER=.*|MYSQL_USER=$DB|" \
  -e "s|^MYSQL_PASSWORD=.*|MYSQL_PASSWORD=$pass|" \
  -e "s|^MYSQL_DATABASE=.*|MYSQL_DATABASE=$DB|" \
  "$ENV_FILE"
chown "$APP_USER:" "$ENV_FILE"
chmod 600 "$ENV_FILE"
echo "Created database '$DB' and wrote its credentials into $ENV_FILE."

# MYSQL_* are read at start-up, so a restart is enough; no rebuild.
sudo -u "$APP_USER" -H pm2 restart "$APP_NAME" >/dev/null
echo "Restarted $APP_NAME. /admin can now save changes."
