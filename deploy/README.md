# Deploying to a VPS at gtstradesolutions.com

The site runs as a Node server (`next start`) on the VPS, behind nginx, which
handles HTTPS with a free Let's Encrypt certificate. The scripts in this folder
do the setup. This page lists the steps that have to be done by hand.

| File | What it is |
| --- | --- |
| [setup.sh](setup.sh) | First-time server setup: Node, nginx, certificate, service, first build. |
| [deploy.sh](deploy.sh) | Publishes the latest `main` from GitHub. Run it after every push. |
| [gts.service](gts.service) | systemd unit that keeps the site running and starts it on boot. |
| [nginx/gtstradesolutions.com.conf](nginx/gtstradesolutions.com.conf) | nginx site: HTTPS, the www and HTTP redirects, upload size. |

**The server.** Ubuntu 22.04 or 24.04 with root SSH access. 2 GB of memory is
comfortable. With 1 GB the script adds swap, because the build needs it. If the
provider has a firewall in its control panel, open ports 22, 80 and 443 there.

**The address.** The site is served at `https://gtstradesolutions.com`, and
`www.` redirects to it. To use `www.` as the main address instead, change
`NEXT_PUBLIC_SITE_URL` and swap the two names in the nginx file.

---

## 1. Point the domain at the server (GoDaddy)

The domain's DNS is at GoDaddy (nameservers `ns43/ns44.domaincontrol.com`). It
currently points at GoDaddy's own parking/forwarding servers, `15.197.148.33`
and `3.33.130.190`.

1. GoDaddy → **My Products** → `gtstradesolutions.com` → **DNS**.
2. Under **Forwarding**, delete any forwarding set on the domain. If forwarding
   is left on, it overrides the records below.
3. Under **DNS Records**:
   - Edit the **A** record named `@`. Set the value to the VPS IP address and
     the TTL to 600 seconds. Delete any other `A` or `AAAA` records for `@`.
   - Keep `www` as a **CNAME** pointing to `@`. It is already set up that way.
   - Leave all other records alone.
4. Wait until the domain resolves to the VPS. This usually takes a few minutes,
   and up to an hour:

   ```bash
   nslookup gtstradesolutions.com 8.8.8.8
   nslookup www.gtstradesolutions.com 8.8.8.8
   ```

Steps 2 and 3 can be done while DNS is still updating. Step 4 needs DNS to have
switched over, because that is when the certificate can be issued.

## 2. First run of the setup script

```bash
ssh root@YOUR_VPS_IP
git clone https://github.com/gts-trade-solutions/gts-corporate.git /root/gts-setup
bash /root/gts-setup/deploy/setup.sh you@example.com --with-mysql
```

- `you@example.com` is the address Let's Encrypt sends certificate expiry
  notices to.
- `--with-mysql` installs MySQL on the VPS and creates the database. Without
  MySQL, `/admin` is read-only and enquiries are not logged for follow-up.
  Leave the flag off to point at an existing database instead.

This run installs everything and writes the settings file,
`/var/www/gts/shared/.env.local`, then stops.

## 3. Fill in the settings

```bash
nano /var/www/gts/shared/.env.local
```

[README.md §2](../README.md) describes every variable. The script has already
filled in `NEXT_PUBLIC_SITE_URL`, `ADMIN_SESSION_SECRET` and, with
`--with-mysql`, the `MYSQL_*` values. Before going live you need:

- `RFQ_TO_EMAIL`, `RFQ_FROM_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
  `SMTP_PASSWORD`. Without these, the enquiry form returns an error in
  production rather than dropping the enquiry.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`, or `ADMIN_USERS`.
- Optional: `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`,
  `NEXT_PUBLIC_GA_ID`, `ANTHROPIC_API_KEY`, `REMINDER_SECRET`.

The script refuses to continue while any setting still holds an `example.com`
placeholder. Replace the placeholder or empty the setting.

## 4. Second run: build and go live

```bash
bash /root/gts-setup/deploy/setup.sh you@example.com --with-mysql
```

This run builds the site, starts it, checks that the domain points at this
server, obtains the certificate and switches nginx on. When it finishes,
`https://gtstradesolutions.com` is live. The certificate renews itself.

Then go through the checks in [README.md §9, *After the first deploy*](../README.md).

## Publishing updates

Push to `main`, then on the server:

```bash
sudo bash /var/www/gts/current/deploy/deploy.sh
```

Each update is built in a new folder under `/var/www/gts/releases/`. The site
switches over only once the build has succeeded and the new release responds.
If it does not respond, the script switches back to the previous release. The
last three releases are kept.

To go back to an earlier release by hand:

```bash
ls -1t /var/www/gts/releases/
sudo ln -sfn /var/www/gts/releases/<folder> /var/www/gts/current
sudo systemctl restart gts
```

## Changing a setting

- `NEXT_PUBLIC_*` values are built into the pages. After changing one, run
  `deploy.sh`.
- Any other value is read when the server starts. Run
  `sudo systemctl restart gts`.

## Enquiry follow-up reminders

The reminders need `REMINDER_SECRET` and MySQL to be set. Then run
`sudo crontab -e` and add this line, using the secret's value:

```cron
0 * * * * curl -fsS "https://gtstradesolutions.com/api/reminders?token=YOUR_SECRET" > /dev/null
```

## Day-to-day commands

```bash
systemctl status gts          # is it running
journalctl -u gts -f          # live server log
sudo systemctl restart gts    # restart after a settings change
sudo nginx -t                 # check the nginx config after editing it
sudo certbot renew --dry-run  # confirm certificate renewal works
```
