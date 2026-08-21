import type { NextConfig } from "next";

/**
 * NEXT_PUBLIC_SITE_URL is inlined at build time and baked into the statically
 * prerendered pages (canonical tags, Open Graph URLs, sitemap, robots).
 * Warn loudly rather than silently shipping localhost URLs to production.
 */
if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    "\n[gts] NEXT_PUBLIC_SITE_URL is not set. Canonical URLs, Open Graph tags,\n" +
      "      sitemap.xml and robots.txt will fall back to http://localhost:3000.\n" +
      "      Set it in the build environment and rebuild before deploying.\n",
  );
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
