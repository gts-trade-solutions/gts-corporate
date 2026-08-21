import type { NextConfig } from "next";

/**
 * NEXT_PUBLIC_SITE_URL is inlined at build time and baked into the statically
 * prerendered pages (canonical tags, Open Graph URLs, sitemap, robots).
 * Warn loudly rather than silently shipping localhost URLs to production.
 */
if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
  console.warn(
    "\n[gts] NEXT_PUBLIC_SITE_URL is not set (or is empty). Canonical URLs,\n" +
      "      Open Graph tags, sitemap.xml and robots.txt will fall back to the\n" +
      "      Vercel deployment URL, or to http://localhost:3000 if there is none.\n" +
      "      Set it to the final domain in the build environment and rebuild.\n",
  );
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
