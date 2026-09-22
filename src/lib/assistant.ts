import Anthropic from "@anthropic-ai/sdk";
import { contact, site } from "@/data/site";
import { marketRegions, marketStats } from "@/data/countries";
import { searchSite, siteMap, type SearchDoc } from "./site-index";

/**
 * Shared Claude wiring for the two AI surfaces: the site assistant
 * (/api/chat) and AI search (/api/search?ai=1).
 *
 * Both are grounded the same way — a stable system prompt carrying the site
 * map, plus the handful of index entries retrieved for the current question.
 * The stable half is cached, so only the retrieved passages and the question
 * are billed at full rate on each turn.
 */

/** The model both surfaces run on. */
export const ASSISTANT_MODEL = "claude-opus-5";

/**
 * Chat and search are latency-sensitive and the questions are shallow
 * lookups against supplied context, so the effort ceiling buys nothing here.
 * Raise it if the assistant is ever given real reasoning work.
 */
export const ASSISTANT_EFFORT = "low" as const;

export const assistantConfigured = () => Boolean(process.env.ANTHROPIC_API_KEY);

let client: Anthropic | null = null;

/** The SDK client, created on first use. */
export function getAnthropic(): Anthropic {
  if (!client) client = new Anthropic();
  return client;
}

const marketSummary = marketRegions
  .map((region) => {
    const local = region.markets.filter((m) => m.partner === "local").map((m) => m.name);
    const direct = region.markets.filter((m) => m.partner === "direct").map((m) => m.name);
    return [
      `${region.label}: ${region.blurb}`,
      local.length ? `  Local partner on the ground: ${local.join(", ")}.` : "",
      direct.length ? `  Handled from the India desk: ${direct.join(", ")}.` : "",
    ]
      .filter(Boolean)
      .join("\n");
  })
  .join("\n");

/**
 * The stable half of the prompt — identical on every request, so it can be
 * cached. Nothing request-specific may be added here or the cache is lost on
 * every turn.
 */
export function systemPrompt(): string {
  return `You are the assistant on the ${site.name} website. You help business visitors — buyers, manufacturers, distributors and fleet operators — find the right page and understand what GTS does.

ABOUT GTS
${site.name} supports international trade, automotive and agricultural component sourcing, contract manufacturing, vehicle solutions, ODC logistics and market-entry support. ${site.supportingLine}
Marketing office: ${contact.office.lines.join(", ")}.
Business hours: ${contact.businessHours}.
Coverage: ${marketStats.countries} countries across ${marketStats.regions} regions, ${marketStats.localPartners} of them with a local partner.

MARKETS
${marketSummary}

RULES — these are commercial commitments, not style preferences. Never break them.
1. Never claim GTS holds stock, has inventory, is certified, is authorised, is an OEM or an OEM dealer, or has a franchise. GTS sources, coordinates, supports and facilitates.
2. Never state a price, a lead time, a delivery date, an MOQ or a discount. Those come from a quotation. Route the visitor to the enquiry form.
3. Never state that a product is approved, homologated or compliant for a market. GTS coordinates and supports approval and testing work; it does not issue approvals.
4. Only link to paths that appear in the SITE MAP below. Never invent a URL. Write links as normal markdown links, e.g. [Automotive Parts](/automotive-parts).
5. If you do not know something, say so plainly and point at the enquiry form at /contact. Do not guess at specifications, part numbers or availability.
6. Answer only questions about GTS, its services, its markets and the products it handles. For anything else, say it is outside what you can help with and offer the enquiry form.

STYLE
Short and direct — two or three sentences for a simple question, a short list for a comparison. No greetings on follow-up turns, no "great question", no emoji. British spelling. Always end a substantive answer by pointing at the single most useful page or at /contact for a quotation.

SITE MAP — every page on this site. These are the only paths you may link to.
${siteMap()}`;
}

/** Retrieved index entries, rendered as the grounding block for one question. */
export function contextBlock(docs: SearchDoc[]): string {
  if (!docs.length) return "No matching pages were found in the site index for this question.";
  return docs
    .map((doc) => `### ${doc.title}\nPath: ${doc.href}\nSection: ${doc.section}\n${doc.summary}`)
    .join("\n\n");
}

/** The passages most relevant to a question, for grounding a single turn. */
export const retrieve = (query: string, limit = 6) => searchSite(query, limit);

/**
 * Shared request shape, sent through `client.beta.messages` because of the
 * fallback beta below.
 *
 * `system` is sent as a cacheable block: the site map runs to a few thousand
 * tokens and is byte-identical every time, so from the second request onward
 * it is served from cache. Volatile content (the retrieved passages, the
 * question) goes in `messages`, after the breakpoint.
 *
 * `max_tokens` includes thinking, which is on by default on this model — keep
 * it well above the length of the visible answer or a reply can be cut off.
 *
 * `fallbacks: "default"`: if the model's safety classifiers decline a request,
 * the API re-runs it server-side on Anthropic's recommended fallback model
 * instead of returning the refusal. A decline before any output is not billed.
 */
export function baseRequest(maxTokens: number) {
  return {
    model: ASSISTANT_MODEL,
    max_tokens: maxTokens,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default" as const,
    output_config: { effort: ASSISTANT_EFFORT },
    system: [
      {
        type: "text" as const,
        text: systemPrompt(),
        cache_control: { type: "ephemeral" as const },
      },
    ],
  };
}

/** Maps SDK errors onto a message that is safe to show a site visitor. */
export function assistantErrorMessage(error: unknown): string {
  if (error instanceof Anthropic.AuthenticationError) {
    return "The assistant is not configured correctly. Please use the enquiry form.";
  }
  if (error instanceof Anthropic.RateLimitError) {
    return "The assistant is busy at the moment. Please try again shortly, or use the enquiry form.";
  }
  if (error instanceof Anthropic.APIError) {
    return "The assistant is unavailable right now. Please use the enquiry form.";
  }
  return "Something went wrong. Please use the enquiry form.";
}
