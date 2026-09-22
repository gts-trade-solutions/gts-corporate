"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Site-wide search.
 *
 * Searches everything: pages, component categories, the vehicle model
 * schedule, articles, service scope, markets and every FAQ entry. The index
 * lives on the server (see lib/site-index.ts) and is reached through
 * /api/search, so none of the catalogue is shipped to the browser.
 *
 * Two request passes, so typing stays cheap:
 *  - keyword results after a 180ms pause, on every keystroke;
 *  - the AI answer after a further 600ms of no typing, requested once per
 *    query. A search the visitor abandons mid-word never reaches the model.
 *
 * Opens from the header button or ⌘K / Ctrl-K.
 */

type Result = {
  id: string;
  title: string;
  href: string;
  section: string;
  summary: string;
  kindLabel: string;
};

type SearchResponse = { results?: Result[]; answer?: string | null };

const KEYWORD_DEBOUNCE_MS = 180;
const AI_DEBOUNCE_MS = 600;
const MIN_AI_QUERY_LENGTH = 6;

/** Renders [label](/path) links inside the AI answer; plain text otherwise. */
function AnswerText({ text }: { text: string }) {
  const pattern = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    nodes.push(
      <Link
        key={match.index}
        href={match[2]}
        className="font-semibold text-accent-700 underline underline-offset-2 hover:text-accent-600"
      >
        {match[1]}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return <>{nodes}</>;
}

/**
 * The dialog itself.
 *
 * Split out so that it only exists while the dialog is open: closing unmounts
 * it, which is what resets the query and the results. An effect that cleared
 * them on close would be state synchronising with state, which is the thing
 * effects are not for.
 */
function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  /* The answer carries the query it was written for, so a reply that lands
     after the visitor has typed on is ignored rather than shown against the
     wrong question. */
  const [answer, setAnswer] = useState<{ query: string; text: string } | null>(null);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Guards against a slow response for an old query overwriting a newer one.
  const requestId = useRef(0);

  const trimmed = query.trim();

  useEffect(() => {
    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Keyword pass. Results for an emptied query are left in place rather than
  // cleared — the render below hides them, so there is nothing to reset.
  useEffect(() => {
    const term = query.trim();
    if (!term) return;

    const id = ++requestId.current;
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
        const data: SearchResponse = await response.json();
        if (id !== requestId.current) return;
        setResults(data.results ?? []);
        setActive(0);
      } catch {
        if (id === requestId.current) setResults([]);
      }
    }, KEYWORD_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query]);

  // AI pass — only once the visitor has stopped typing a real question.
  useEffect(() => {
    const term = query.trim();
    if (term.length < MIN_AI_QUERY_LENGTH) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setAnswerLoading(true);
      try {
        const response = await fetch(`/api/search?ai=1&q=${encodeURIComponent(term)}`, {
          signal: controller.signal,
        });
        const data: SearchResponse = await response.json();
        if (data.answer) setAnswer({ query: term, text: data.answer });
      } catch {
        /* Keyword results stand on their own — a failed AI pass is silent. */
      } finally {
        setAnswerLoading(false);
      }
    }, AI_DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query]);

  const go = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = results[active];
      if (target) go(target.href);
    }
  };

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const answerText = answer && answer.query === trimmed ? answer.text : null;
  const showAnswer = trimmed.length >= MIN_AI_QUERY_LENGTH && (answerText || answerLoading);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-navy-900/60 px-4 pb-8 pt-[10vh] backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search this site"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-lg border border-steel-200 bg-white shadow-raise"
      >
        <div className="flex items-center gap-3 border-b border-steel-200 px-4">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 text-ink-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search parts, vehicle models, services, markets…"
            aria-label="Search this site"
            maxLength={200}
            className="min-w-0 flex-1 bg-transparent py-4 text-[16px] text-ink outline-none placeholder:text-ink-muted"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-sm border border-steel-200 px-2 py-1 text-[11px] font-semibold text-ink-muted transition-colors hover:border-navy-700 hover:text-navy-800"
          >
            Esc
          </button>
        </div>

        <div className="max-h-[min(30rem,60vh)] overflow-y-auto">
          {!trimmed ? (
            <p className="px-4 py-8 text-center text-[14px] text-ink-muted">
              Search every page, component category, vehicle model, article and market.
            </p>
          ) : (
            <>
              {showAnswer ? (
                <div className="border-b border-steel-200 bg-steel-50 px-4 py-3.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-700">
                    AI answer
                  </p>
                  {answerText ? (
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                      <AnswerText text={answerText} />
                    </p>
                  ) : (
                    <p className="mt-2 text-[14px] text-ink-muted">Reading the site…</p>
                  )}
                </div>
              ) : null}

              {results.length ? (
                <ul ref={listRef}>
                  {results.map((result, index) => (
                    <li key={result.id}>
                      <Link
                        href={result.href}
                        onClick={onClose}
                        onMouseEnter={() => setActive(index)}
                        aria-current={index === active ? "true" : undefined}
                        className={`block border-b border-steel-100 px-4 py-3 transition-colors last:border-b-0 ${
                          index === active ? "bg-steel-50" : ""
                        }`}
                      >
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-[15px] font-semibold text-ink">{result.title}</span>
                          <span className="rounded-sm bg-navy-50 px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-navy-700">
                            {result.kindLabel}
                          </span>
                          <span className="text-[12px] text-ink-muted">{result.section}</span>
                        </span>
                        <span className="mt-1 line-clamp-2 block text-[13.5px] leading-snug text-ink-soft">
                          {result.summary}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-8 text-center text-[14px] text-ink-muted">
                  Nothing matched “{trimmed}”. Try a product, a vehicle model or a country — or{" "}
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="font-semibold text-accent-700 underline underline-offset-2"
                  >
                    send us the requirement
                  </Link>
                  .
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function SiteSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return <SearchDialog onClose={onClose} />;
}

/** ⌘K / Ctrl-K, registered once by the header. */
export function useSearchHotkey(onOpen: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpen();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onOpen]);
}
