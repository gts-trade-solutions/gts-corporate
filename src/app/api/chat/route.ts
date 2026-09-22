import type Anthropic from "@anthropic-ai/sdk";
import {
  assistantConfigured,
  assistantErrorMessage,
  baseRequest,
  contextBlock,
  getAnthropic,
  retrieve,
} from "@/lib/assistant";
import { offlineReply } from "@/lib/assistant-offline";
import { clientKey, rateLimit } from "@/lib/rate-limit";

/**
 * The site assistant.
 *
 * Streams plain text back over the response body — not SSE. The client only
 * ever appends the chunks to one message, so the framing an event stream adds
 * would be parsed straight back off again.
 *
 * Two modes, chosen per request:
 *
 *  - **AI** (`ANTHROPIC_API_KEY` set) — every turn retrieves the most relevant
 *    entries from the site index and prepends them to the question, so Claude
 *    answers from the site's own content rather than from memory.
 *  - **Offline** (no key) — `offlineReply` answers from the same index with
 *    fixed wording, so the chat still helps a visitor find the right page.
 *
 * The `X-Assistant-Mode` response header says which one answered.
 */

// The Anthropic SDK needs the Node.js runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Turns kept from the client. Older turns are dropped rather than compacted —
    a site enquiry that runs past this length belongs on the enquiry form. */
const MAX_TURNS = 12;
const MAX_MESSAGE_CHARS = 1500;

/**
 * Room for adaptive thinking plus a short answer. The prompt asks for two or
 * three sentences; the headroom is for the thinking, not a longer reply.
 */
const MAX_TOKENS = 4096;

type IncomingMessage = { role: "user" | "assistant"; content: string };

const badRequest = (message: string, status = 400) =>
  Response.json({ ok: false, error: message }, { status });

const textResponse = (body: BodyInit, mode: "ai" | "offline") =>
  new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      // Stops proxies buffering the stream into one lump.
      "X-Accel-Buffering": "no",
      "X-Assistant-Mode": mode,
    },
  });

export async function GET() {
  const configured = assistantConfigured();
  return Response.json({ ok: true, assistantConfigured: configured, mode: configured ? "ai" : "offline" });
}

export async function POST(request: Request) {
  // Chat is chattier than the enquiry form, so it gets its own bucket.
  const limit = rateLimit(clientKey(request.headers), {
    max: 30,
    windowMs: 10 * 60 * 1000,
    scope: "chat",
  });
  if (!limit.allowed) {
    return Response.json(
      { ok: false, error: "Too many messages from this connection. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: { messages?: IncomingMessage[] };
  try {
    payload = await request.json();
  } catch {
    return badRequest("Could not read the request.");
  }

  const incoming = Array.isArray(payload.messages) ? payload.messages : [];
  const history = incoming
    .filter(
      (message): message is IncomingMessage =>
        Boolean(message) &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0,
    )
    .slice(-MAX_TURNS)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, MAX_MESSAGE_CHARS),
    }));

  const question = [...history].reverse().find((message) => message.role === "user")?.content;
  if (!question) return badRequest("No question was sent.");

  if (!assistantConfigured()) {
    return textResponse(offlineReply(question), "offline");
  }

  // The API requires the conversation to open with a user turn.
  const firstUser = history.findIndex((message) => message.role === "user");
  const turns = history.slice(firstUser);

  // The last user turn carries the retrieved context. Earlier turns are sent
  // as they were, so the grounding block never accumulates in the history.
  const messages: Anthropic.Beta.BetaMessageParam[] = turns.map((message, index) =>
    index === turns.length - 1 && message.role === "user"
      ? {
          role: "user",
          content: `Relevant pages from the site index:\n\n${contextBlock(retrieve(question))}\n\n---\n\nVisitor's question: ${message.content}`,
        }
      : { role: message.role, content: message.content },
  );

  try {
    const stream = getAnthropic().beta.messages.stream({
      ...baseRequest(MAX_TOKENS),
      messages,
    });

    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        const encoder = new TextEncoder();
        let sent = false;
        try {
          // Only text is forwarded. Thinking blocks, and the `fallback` marker
          // block a server-side fallback inserts, are skipped.
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta" &&
              event.delta.text
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
              sent = true;
            }
          }

          const final = await stream.finalMessage();
          if (final.stop_reason === "refusal") {
            // The fallback chain declined too. Say so rather than ending the
            // turn with an empty or half-finished bubble.
            controller.enqueue(
              encoder.encode(
                `${sent ? "\n\n" : ""}I can't help with that one. Please use the [enquiry form](/contact).`,
              ),
            );
          } else if (final.stop_reason === "max_tokens") {
            controller.enqueue(
              encoder.encode(
                "…\n\nThat answer ran long — the [enquiry form](/contact) is the best route for the detail.",
              ),
            );
          } else if (!sent) {
            // Nothing usable came back; answer from the site index instead.
            controller.enqueue(encoder.encode(offlineReply(question)));
          }
        } catch (error) {
          console.error("[gts] assistant stream failed", error);
          // Fall back to the index answer when the failure happened before any
          // text reached the visitor, so an API outage still gets a reply.
          controller.enqueue(
            encoder.encode(sent ? `\n\n${assistantErrorMessage(error)}` : offlineReply(question)),
          );
        } finally {
          controller.close();
        }
      },
      cancel() {
        stream.abort();
      },
    });

    return textResponse(body, "ai");
  } catch (error) {
    console.error("[gts] assistant request failed", error);
    return textResponse(offlineReply(question), "offline");
  }
}
