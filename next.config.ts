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
  experimental: {
    serverActions: {
      // The admin's model form sends its photograph (up to 3 MB, see
      // PHOTO_MAX_BYTES) through a server action alongside the text fields.
      // The 1 MB default would reject most photographs before they arrive.
      bodySizeLimit: "4mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 is the default for everything; 85 is requested only by the
    // full-width banners (see `Media`'s `quality` prop), where the default
    // compression was visible across a 1920px-wide photograph.
    qualities: [75, 85],
  },
};

export default nextConfig;
