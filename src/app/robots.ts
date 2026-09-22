import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

/**
 * AI crawlers are allowed deliberately.
 *
 * This is a B2B site whose whole purpose is to be found by someone with a
 * sourcing requirement — increasingly by asking an assistant rather than a
 * search engine. The agents below are named explicitly rather than left to the
 * `*` rule so the intent is on the record and a future tightening is a
 * deliberate edit rather than an accident. `/llms.txt` is the summary written
 * for them.
 *
 * To stop AI training or answering on this content, change `allow` to
 * `disallow` for the relevant agent below.
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bytespider",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // The photo route is a real image URL — it is referenced by the model
        // pages and by their Product schema, so it has to stay crawlable even
        // though the rest of /api/ does not.
        allow: ["/", "/api/vehicle-photo/"],
        disallow: ["/api/", "/admin"],
      },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: ["/", "/llms.txt", "/api/vehicle-photo/"],
        disallow: ["/api/", "/admin"],
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
