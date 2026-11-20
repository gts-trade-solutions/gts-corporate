# Deploying gtstradesolutions.com

The site runs on the shared VPS at `72.62.228.202`, next to the other sites
hosted there, and is set up the same way they are:

- The app runs under **PM2** as `gts-corporate`, owned by the `deploy` user, on
  `127.0.0.1:3006`. `pm2-deploy.service` restarts it after a reboot.
- The code lives in `/home/deploy/gts-corporate/`:
  - `releases/` holds one folder per deploy.
  - `current` is a link to the live release.
  - `shared/.env.local` holds the settings.
- **nginx** serves `https://gtstradesolutions.com` with a Let's Encrypt
  certificate, and redirects `www.` and plain HTTP to it.

| File | What it is | Runs as |
| --- | --- | --- |
| [deploy.sh](deploy.sh) | Builds `main` from GitHub into a new release and switches PM2 to it. | `deploy`, no sudo |
| [server-setup.sh](server-setup.sh) | One-time setup: the nginx site, the certificate and a MySQL database for `/admin`. | `sudo`, once |
| [nginx/gtstradesolutions.com.conf](nginx/gtstradesolutions.com.conf) | The nginx site. | — |

DNS is at GoDaddy (`ns43/ns44.domaincontrol.com`). The `@` A record points to
`72.62.228.202`, and `www` is a CNAME to `@`.

---

## First-time setup

**1. Settings and first build** (as `deploy`):

```bash
git clone --depth 1 https://github.com/gts-trade-solutions/gts-corporate.git /tmp/gts
bash /tmp/gts/deploy/deploy.sh     # first run: writes ~/gts-corporate/shared/.env.local and stops
nano ~/gts-corporate/shared/.env.local
bash /tmp/gts/deploy/deploy.sh     # builds, starts gts-corporate in PM2, saves the process list
rm -rf /tmp/gts
```

[README.md §2](../README.md) describes every setting. The first run fills in
`NEXT_PUBLIC_SITE_URL` and `ADMIN_SESSION_SECRET`. The script refuses to build
while any setting still holds an `example.com` placeholder. Replace the
placeholder or empty the setting. Enquiries need the `SMTP_*`, `RFQ_TO_EMAIL`
and `RFQ_FROM_EMAIL` settings; without them the enquiry form shows an error in
production.

**2. nginx, certificate and database** (once, with sudo):

```bash
sudo bash /home/deploy/gts-corporate/current/deploy/server-setup.sh
```

If the server has more than one Let's Encrypt account, certbot asks which one
to use. The script then:

- Creates the MySQL database and user `gts_corporate`, provided neither name
  is taken.
- Writes their credentials into `.env.local`.
- Restarts the app, after which `/admin` can save changes.

Then go through the checks in [README.md §9, *After the first deploy*](../README.md).

## Publishing updates

Push to `main`, then on the server, as `deploy`:

```bash
bash ~/gts-corporate/current/deploy/deploy.sh
```

The site switches over only once the new build has succeeded and the new
release responds. If it does not respond, the script switches back to the
previous release. The last three releases are kept.

To go back to an earlier release by hand:

```bash
ls -1t ~/gts-corporate/releases/
ln -sfn ~/gts-corporate/releases/<folder> ~/gts-corporate/current
pm2 restart gts-corporate
```

## Changing a setting

Edit `~/gts-corporate/shared/.env.local`:

- `NEXT_PUBLIC_*` values are built into the pages. After changing one, run
  `deploy.sh`.
- Any other value is read when the app starts. Run `pm2 restart gts-corporate`.

## Enquiry follow-up reminders

The reminders need `REMINDER_SECRET` and MySQL to be set. Then run
`crontab -e` as `deploy` and add this line, using the secret's value:

```cron
0 * * * * curl -fsS "https://gtstradesolutions.com/api/reminders?token=YOUR_SECRET" > /dev/null
```

## Day-to-day commands

```bash
pm2 describe gts-corporate        # status, uptime, restarts
pm2 logs gts-corporate            # live server log
pm2 restart gts-corporate         # restart after a settings change
sudo nginx -t                     # check the nginx config after editing it
sudo certbot renew --dry-run      # confirm certificate renewal works
```
