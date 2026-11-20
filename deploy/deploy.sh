#!/usr/bin/env bash
# Builds the latest commit on main into a new release and switches the site to it.
# Runs on the VPS as the deploy user, no sudo needed:
#
#   bash ~/gts-corporate/current/deploy/deploy.sh
#
# The site runs under PM2 as "gts-corporate" on 127.0.0.1:3006, like the other
# apps on this server. The live site keeps serving the previous release until
# the new build has succeeded and the new release answers. If it does not
# answer, the script switches back. The last three releases are kept.
#
# The first run creates ~/gts-corporate and writes shared/.env.local from
# .env.example, then stops so the settings can be filled in.
set -euo pipefail

APP_NAME=gts-corporate
PORT=3006
SITE_URL=https://gtstradesolutions.com
APP_ROOT=$HOME/gts-corporate
ENV_FILE=$APP_ROOT/shared/.env.local
REPO=${GTS_REPO:-https://github.com/gts-trade-solutions/gts-corporate.git}
BRANCH=${GTS_BRANCH:-main}
KEEP=3

[[ $EUID -ne 0 ]] || { echo "Run as the deploy user, not root: PM2 runs the sites under that user." >&2; exit 1; }

node -e 'const [a, b] = process.versions.node.split(".").map(Number); process.exit(a > 20 || (a === 20 && b >= 9) ? 0 : 1)' || {
  echo "Next.js 16 needs Node 20.9 or later; this shell has $(node -v) ($(command -v node))." >&2
  exit 1
}

mkdir -p "$APP_ROOT/releases" "$APP_ROOT/shared"
cd "$APP_ROOT"

release=$APP_ROOT/releases/$(date +%Y%m%d-%H%M%S)
trap 'rm -rf "$release"' ERR

echo "==> Fetching $BRANCH"
git clone --quiet --depth 1 --branch "$BRANCH" "$REPO" "$release"
echo "    $(git -C "$release" log -1 --format='%h %s')"

if [[ ! -f $ENV_FILE ]]; then
  cp "$release/.env.example" "$ENV_FILE"
  sed -i \
    -e "s|^NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=$SITE_URL|" \
    -e "s|^# ADMIN_SESSION_SECRET=.*|ADMIN_SESSION_SECRET=$(openssl rand -hex 32)|" \
    "$ENV_FILE"
  chmod 600 "$ENV_FILE"
  rm -rf "$release"
  echo "Wrote $ENV_FILE. Fill it in (deploy/README.md, step 1), then run this again."
  exit 0
fi

placeholders=$(grep -E '^[A-Z_]+=.*example\.com' "$ENV_FILE" | cut -d= -f1 || true)
if [[ -n $placeholders ]]; then
  echo "These settings in $ENV_FILE still hold example.com placeholders:" >&2
  echo "$placeholders" | sed 's/^/  /' >&2
  echo "Replace them, or empty them if not used, and run this again." >&2
  rm -rf "$release"
  exit 1
fi

# Next reads .env.local at build time (NEXT_PUBLIC_* values are baked into the
# pages) and again at start-up, so the release needs it for both.
ln -s "$ENV_FILE" "$release/.env.local"

echo "==> Installing dependencies"
(cd "$release" && npm ci --no-audit --no-fund)

echo "==> Building"
(cd "$release" && npm run build)

trap - ERR

previous=$(readlink -f "$APP_ROOT/current" 2>/dev/null || true)

switch_to() {
  ln -sfn "$1" "$APP_ROOT/current.next"
  mv -Tf "$APP_ROOT/current.next" "$APP_ROOT/current"
  if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
    pm2 restart "$APP_NAME" >/dev/null
  else
    if [[ -n $(ss -ltnH "sport = :$PORT") ]]; then
      echo "Another program already listens on port $PORT. Pick a free port for PORT" >&2
      echo "in this script and in deploy/nginx/gtstradesolutions.com.conf." >&2
      exit 1
    fi
    pm2 start "$APP_ROOT/current/node_modules/next/dist/bin/next" \
      --name "$APP_NAME" --cwd "$APP_ROOT/current" \
      -- start --hostname 127.0.0.1 --port "$PORT" >/dev/null
  fi
}

answers() {
  for _ in $(seq 1 60); do
    curl -fs -o /dev/null "http://127.0.0.1:$PORT/" && return 0
    sleep 1
  done
  return 1
}

echo "==> Switching to the new release"
switch_to "$release"

if ! answers; then
  echo "The new release did not answer on port $PORT. Logs: pm2 logs $APP_NAME --lines 100" >&2
  if [[ -n $previous && -d $previous ]]; then
    echo "Switching back to $previous" >&2
    switch_to "$previous"
  fi
  exit 1
fi

# Remember the process list, so pm2-deploy.service brings the site back after a reboot.
pm2 save >/dev/null

echo "==> Removing old releases"
current=$(readlink -f "$APP_ROOT/current")
ls -1dt "$APP_ROOT"/releases/*/ | sed 's:/$::' | tail -n +$((KEEP + 1)) | while read -r old; do
  [[ $old == "$current" ]] || rm -rf "$old"
done

echo "==> Live: $current on 127.0.0.1:$PORT"
