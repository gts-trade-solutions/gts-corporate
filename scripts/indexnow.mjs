#!/usr/bin/env node
/**
 * Tell the IndexNow search engines (Bing, Yandex, Naver, Seznam and others)
 * that pages are new or have changed, so they recrawl them now rather than
 * whenever they next happen to visit. Google does not take part in IndexNow;
 * for Google, submit the sitemap in Search Console.
 *
 *   node scripts/indexnow.mjs                    every URL in the live sitemap
 *   node scripts/indexnow.mjs /contact /blog/x   just these pages
 *
 * Send the pages that actually changed. Resubmitting the whole site on every
 * deploy is not what the protocol is for, and engines may throttle it.
 *
 * The key is public by design: the engines fetch public/<key>.txt from the
 * site to confirm the submission came from whoever controls it. SITE_URL
 * overrides the site (default https://gtstradesolutions.com).
 */
const KEY = "a9283fe29111f5ead8f68d4b087fc55f";
const site = (process.env.SITE_URL || "https://gtstradesolutions.com").replace(/\/$/, "");
const host = new URL(site).host;

async function sitemapUrls() {
  const res = await fetch(`${site}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  return [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

const args = process.argv.slice(2);
const urls = args.length
  ? args.map((path) => (/^https?:\/\//.test(path) ? path : `${site}${path.startsWith("/") ? "" : "/"}${path}`))
  : await sitemapUrls();

const keyCheck = await fetch(`${site}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`The key file ${site}/${KEY}.txt is not live yet — deploy first.`);
  process.exit(1);
}

const meaning = {
  200: "accepted",
  202: "accepted; the key is still being validated",
  400: "bad request",
  403: "key not valid for this site",
  422: "URLs do not belong to this site",
  429: "too many requests — try again later",
};

// The protocol takes up to 10,000 URLs per request.
for (let start = 0; start < urls.length; start += 10000) {
  const urlList = urls.slice(start, start + 10000);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${site}/${KEY}.txt`, urlList }),
  });
  console.log(`IndexNow: ${urlList.length} URLs → ${res.status} ${meaning[res.status] ?? (await res.text())}`);
  if (res.status >= 400) process.exitCode = 1;
}
