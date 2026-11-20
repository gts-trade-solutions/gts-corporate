#!/usr/bin/env bash
# Builds the latest commit on main into a new release and switches the site to it.
#
#   sudo bash /var/www/gts/current/deploy/deploy.sh
#
# The live site keeps serving the previous release until the new build has
# succeeded and answered a request, so a failed build or a release that will
# not start leaves the site as it was. The last three releases are kept.
set -euo pipefail

APP_ROOT=/var/www/gts
REPO=${GTS_REPO:-https://github.com/gts-trade-solutions/gts-corporate.git}
BRANCH=${GTS_BRANCH:-main}
KEEP=3

[[ $EUID -eq 0 ]] || { echo "Run as root: sudo bash $0" >&2; exit 1; }
[[ -f $APP_ROOT/shared/.env.local ]] || {
  echo "Missing $APP_ROOT/shared/.env.local. Run deploy/setup.sh first." >&2
  exit 1
}

# Build as the unprivileged app user, from a directory it can read, with its
# own HOME so npm keeps its cache under /var/www/gts rather than /root.
as_app() { runuser -u gts -- env HOME="$APP_ROOT" "$@"; }
cd "$APP_ROOT"

release=$APP_ROOT/releases/$(date +%Y%m%d-%H%M%S)
previous=$(readlink -f "$APP_ROOT/current" 2>/dev/null || true)

echo "==> Fetching $BRANCH into $release"
as_app git clone --quiet --depth 1 --branch "$BRANCH" "$REPO" "$release"
echo "    $(as_app git -C "$release" log -1 --format='%h %s')"

# Next reads .env.local at build time (NEXT_PUBLIC_* values are baked into the
# pages) and again at start-up, so the release needs it for both.
ln -s "$APP_ROOT/shared/.env.local" "$release/.env.local"

echo "==> Installing dependencies"
(cd "$release" && as_app npm ci --no-audit --no-fund)

echo "==> Building"
(cd "$release" && as_app npm run build)

switch_to() {
  ln -sfn "$1" "$APP_ROOT/current.next"
  mv -Tf "$APP_ROOT/current.next" "$APP_ROOT/current"
  systemctl restart gts
}

answers() {
  for _ in $(seq 1 30); do
    curl -fsS -o /dev/null http://127.0.0.1:3000/ && return 0
    sleep 1
  done
  return 1
}

echo "==> Switching to the new release"
switch_to "$release"

if ! answers; then
  echo "The new release did not answer on port 3000. Logs: journalctl -u gts -n 100" >&2
  if [[ -n $previous && -d $previous ]]; then
    echo "Switching back to $previous" >&2
    switch_to "$previous"
  fi
  exit 1
fi

echo "==> Removing old releases"
current=$(readlink -f "$APP_ROOT/current")
ls -1dt "$APP_ROOT"/releases/*/ | sed 's:/$::' | tail -n +$((KEEP + 1)) | while read -r old; do
  [[ $old == "$current" ]] || rm -rf "$old"
done

echo "==> Live: $current"
