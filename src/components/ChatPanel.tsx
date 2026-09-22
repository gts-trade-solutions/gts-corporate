"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { site } from "@/data/site";

/**
 * The GTS assistant.
 *
 * Talks to /api/chat, which streams plain text. Mounted by FloatingActions,
 * which owns the launcher and all of the fixed positioning.
 *
 * The transcript lives in component state only — nothing is persisted and
 * nothing is sent anywhere except the API route. A visitor who wants a reply
 * is pointed at the enquiry form, which is the channel that actually reaches
 * a person.
 */

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What components do you supply for Tata trucks?",
  "Do you cover Kenya and Nigeria?",
  "Can you manufacture a trailer to our drawing?",
  "What is an ODC route survey?",
];

const GREETING =
  "Ask me about sourcing, vehicle models, manufacturing, ODC logistics or the markets we cover. For a quotation, use the enquiry form — I can point you to the right one.";

/**
 * Inline markdown: `[links](/path)` and `**bold**`.
 *
 * Built as React elements from matched substrings, so nothing in a reply can
 * inject markup. Internal paths become client-side `Link`s; any other URL is
 * rendered as its label only — the prompt permits site paths alone, and this
 * is the backstop if that is ever ignored.
 */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const key = `${keyPrefix}-${match.index}`;
    if (match[3] !== undefined) {
      nodes.push(
        <strong key={key} className="font-semibold text-ink">
          {match[3]}
        </strong>,
      );
    } else if (match[2].startsWith("/")) {
      nodes.push(
        <Link
          key={key}
          href={match[2]}
          className="font-semibold text-accent-700 underline underline-offset-2 hover:text-accent-600"
        >
          {match[1]}
        </Link>,
      );
    } else {
      nodes.push(match[1]);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/**
 * Renders a reply: paragraphs (blank-line separated), line breaks, `- ` and
 * `1.` lists, plus the inline subset above. That is the whole grammar both the
 * AI prompt and the offline answers write to.
 */
function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/).filter((part) => part.trim());

  return (
    <>
      {blocks.map((block, blockIndex) => {
        const out: ReactNode[] = [];
        let lines: string[] = [];
        let items: string[] = [];
        let ordered = false;

        const flushLines = () => {
          if (!lines.length) return;
          const key = `p${blockIndex}-${out.length}`;
          out.push(
            <p key={key}>
              {lines.flatMap((line, i) => [
                ...(i ? [<br key={`${key}-br${i}`} />] : []),
                ...inline(line, `${key}-${i}`),
              ])}
            </p>,
          );
          lines = [];
        };
        const flushItems = () => {
          if (!items.length) return;
          const key = `l${blockIndex}-${out.length}`;
          const List = ordered ? "ol" : "ul";
          out.push(
            <List key={key} className={`space-y-1 pl-4 ${ordered ? "list-decimal" : "list-disc"}`}>
              {items.map((item, i) => (
                <li key={i}>{inline(item, `${key}-${i}`)}</li>
              ))}
            </List>,
          );
          items = [];
        };

        for (const raw of block.split("\n")) {
          const item = raw.match(/^\s*([-*•]|\d+[.)])\s+(.*)$/);
          if (item) {
            flushLines();
            if (!items.length) ordered = /\d/.test(item[1]);
            items.push(item[2]);
          } else if (raw.trim()) {
            flushItems();
            lines.push(raw.trim());
          }
        }
        flushLines();
        flushItems();

        return (
          <div key={blockIndex} className={`space-y-1.5 ${blockIndex ? "mt-2.5" : ""}`}>
            {out}
          </div>
        );
      })}
    </>
  );
}

export function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Focus the input when the panel opens; abort any request when it closes.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      return;
    }
    abortRef.current?.abort();
    abortRef.current = null;
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Bring the newest reply into view from its first line — a long answer
  // should be read from the top, not landed on at its last sentence. Anything
  // else (the visitor's own message, the typing dots) scrolls to the bottom.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const last = messages[messages.length - 1];
    const bubble = el.querySelector<HTMLElement>("li:last-child");
    el.scrollTop =
      last?.role === "assistant" && last.content && bubble
        ? bubble.offsetTop - 12
        : el.scrollHeight;
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy) return;

    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const fallback = await response
          .json()
          .then((data: { error?: string }) => data.error)
          .catch(() => null);
        setMessages([
          ...next,
          {
            role: "assistant",
            content:
              fallback ??
              "The assistant is unavailable right now. Please use the [enquiry form](/contact).",
          },
        ]);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        // Replace the trailing placeholder rather than appending, so a
        // re-render mid-stream cannot duplicate the bubble.
        setMessages([...next, { role: "assistant", content: reply }]);
      }
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "Something went wrong. Please use the [enquiry form](/contact).",
        },
      ]);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(input);
  };

  return (
    <div
      id="gts-assistant"
      role="dialog"
      aria-label={`${site.shortName} assistant`}
      aria-modal="false"
      hidden={!open}
      className="fixed bottom-40 right-4 z-50 flex max-h-[min(560px,calc(100dvh-13rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-steel-200 bg-white shadow-raise md:bottom-24 md:right-6"
    >
      <header className="flex items-center justify-between gap-3 border-b border-steel-200 bg-navy-900 px-4 py-3 text-white">
        <div className="min-w-0">
          <p className="text-[14px] font-bold leading-tight">{site.shortName} Assistant</p>
          <p className="truncate text-[12px] text-navy-100">
            Sourcing, models, manufacturing and markets
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-navy-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          <span className="sr-only">Close the assistant</span>
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </header>

      {/* `relative` makes this the offsetParent the scroll-into-view maths uses. */}
      <div ref={scrollRef} className="relative flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <>
            <p className="text-[14px] leading-relaxed text-ink-soft">{GREETING}</p>
            <ul className="mt-4 space-y-2">
              {SUGGESTIONS.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    onClick={() => void send(suggestion)}
                    className="w-full rounded-sm border border-steel-200 px-3 py-2 text-left text-[13.5px] font-medium text-ink-soft transition-colors hover:border-navy-700 hover:text-navy-800"
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ul className="space-y-3.5">
            {messages.map((message, index) => (
              <li
                key={index}
                className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={`max-w-[88%] rounded-lg px-3.5 py-2.5 text-[14px] leading-relaxed ${
                    message.role === "user"
                      ? "bg-navy-800 text-white"
                      : "bg-steel-50 text-ink-soft"
                  }`}
                >
                  {message.role === "assistant" && !message.content ? (
                    <span className="flex items-center gap-1" aria-label="Thinking">
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted"
                          style={{ animationDelay: `${dot * 150}ms` }}
                        />
                      ))}
                    </span>
                  ) : (
                    <RichText text={message.content} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={onSubmit} className="border-t border-steel-200 p-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about a product or market…"
            aria-label="Ask the GTS assistant"
            maxLength={1500}
            className="min-w-0 flex-1 rounded-sm border border-steel-200 px-3 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-navy-700"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-accent-700 text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="sr-only">Send</span>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-[11.5px] leading-snug text-ink-muted">
          Answers come from this site and can be incomplete. Prices, availability and approvals are
          confirmed only by{" "}
          <Link href="/contact" className="underline underline-offset-2 hover:text-navy-700">
            enquiry
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
