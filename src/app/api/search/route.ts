import type Anthropic from "@anthropic-ai/sdk";
import {
  assistantConfigured,
  baseRequest,
  contextBlock,
  getAnthropic,
  retrieve,
} from "@/lib/assistant";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { kindLabel, searchSite, type SearchDoc } from "@/lib/site-index";

/**
 * Site search.
 *
 * Two layers, deliberately separate:
 *
 *  - Keyword search always runs, server-side, over the whole site index. It is
 *    synchronous and costs nothing, so the dialog can show results while the
 *    visitor is still typing.
 *  - `?ai=1` adds a one-paragraph answer written from those same results. It
 *    is a second request the client makes only once the visitor stops typing,
 *    so a search that is never finished never reaches the model.
 *
 * The AI layer reads only the retrieved entries. It cannot introduce a page
 * that keyword search did not find, which is what keeps the two consistent.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_QUERY_CHARS = 200;

type Result = SearchDoc & { kindLabel: string };

const decorate = (docs: SearchDoc[]): Result[] =>
  docs.map((doc) => ({ ...doc, kindLabel: kindLabel(doc.kind) }));

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") ?? "").trim().slice(0, MAX_QUERY_CHARS);
  const wantsAi = url.searchParams.get("ai") === "1";

  if (!query) {
    return Response.json({ ok: true, query: "", results: [], answer: null });
  }

  const results = decorate(searchSite(query, 8));

  if (!wantsAi) {
    return Response.json({ ok: true, query, results, answer: null });
  }

  // The AI layer is the expensive half, so it gets its own, tighter bucket.
  const limit = rateLimit(clientKey(request.headers), {
    max: 20,
    windowMs: 10 * 60 * 1000,
    scope: "ai-search",
  });
  if (!limit.allowed) {
    return Response.json({ ok: true, query, results, answer: null, aiSkipped: "rate-limited" });
  }

  if (!assistantConfigured()) {
    return Response.json({ ok: true, query, results, answer: null, aiSkipped: "not-configured" });
  }

  // Retrieved separately from the displayed results: the answer reads a few
  // more entries than the list shows, so it can summarise across them.
  const grounding = retrieve(query, 8);
  if (!grounding.length) {
    return Response.json({ ok: true, query, results, answer: null, aiSkipped: "no-matches" });
  }

  try {
    // 2048 leaves room for adaptive thinking, which counts toward the limit;
    // the prompt itself asks for at most three sentences.
    const response = await getAnthropic().beta.messages.create({
      ...baseRequest(2048),
      messages: [
        {
          role: "user",
          content: `Pages from the site index matching this search:

${contextBlock(grounding)}

---

Search query: "${query}"

Write a direct answer of at most three sentences telling the visitor what GTS offers for this query and which page to open. Link each page you name using its exact path from above. If the query does not match anything GTS does, say so in one sentence and point at /contact. Do not add a heading, a preamble or a sign-off.`,
        },
      ],
    });

    // A refusal here means the fallback model declined as well.
    if (response.stop_reason === "refusal") {
      return Response.json({ ok: true, query, results, answer: null, aiSkipped: "declined" });
    }
    // A cut-off answer reads worse than none; the keyword results still show.
    if (response.stop_reason === "max_tokens") {
      return Response.json({ ok: true, query, results, answer: null, aiSkipped: "truncated" });
    }

    const answer = response.content
      .filter((block): block is Anthropic.Beta.BetaTextBlock => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    return Response.json({ ok: true, query, results, answer: answer || null });
  } catch (error) {
    // Keyword results are already good on their own — a failed AI layer should
    // never cost the visitor their search.
    console.error("[gts] AI search failed", error);
    return Response.json({ ok: true, query, results, answer: null, aiSkipped: "error" });
  }
}
