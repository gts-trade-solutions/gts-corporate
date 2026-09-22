"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FAQ } from "./FAQ";
import { Icon } from "./Icon";
import { faqGroups } from "@/data/faq-groups";
import type { Faq } from "@/data/types";

/**
 * The /faq hub.
 *
 * Topic-first, not everything-at-once. There are 110 questions across eight
 * sets; rendering them all made the page seventeen phone screens of accordion
 * headers, which is not a thing anyone browses. So the default view is an
 * index of topics with counts, and questions appear only once a topic is
 * chosen or a search is typed.
 *
 * Search still spans every topic, so nobody has to guess which set their
 * question belongs to — that is the whole reason this page exists.
 *
 * Rendering is delegated to the same `FAQ` accordion the service pages use, so
 * an answer looks and behaves identically wherever it is read.
 */

const TOPIC_ICONS = {
  trade: "globe",
  parts: "gear",
  models: "truck",
  manufacturing: "factory",
  consulting: "clipboard",
  odc: "crane",
  "route-survey": "route",
  reports: "article",
} as const;

/** A search hit keeps the topic it came from, so results stay attributable. */
type Hit = { faq: Faq; groupId: string; groupLabel: string };

export function FaqBrowser() {
  const [topic, setTopic] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const term = query.trim().toLowerCase();

  const hits = useMemo<Hit[]>(() => {
    if (!term) return [];
    return faqGroups.flatMap((group) =>
      group.faqs
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(term) || faq.answer.toLowerCase().includes(term),
        )
        .map((faq) => ({ faq, groupId: group.id, groupLabel: group.label })),
    );
  }, [term]);

  const selected = topic ? faqGroups.find((group) => group.id === topic) : null;

  return (
    <>
      <label className="block">
        <span className="sr-only">Search the questions</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search — MOQ, documentation, homologation, route survey…"
          className="w-full rounded-sm border border-steel-200 bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-navy-700"
        />
      </label>

      {/* --- Searching: matches across every topic --- */}
      {term ? (
        <div className="mt-6">
          <p aria-live="polite" className="text-[13.5px] text-ink-muted">
            {hits.length} {hits.length === 1 ? "question" : "questions"} matching “{query.trim()}”
          </p>

          {hits.length ? (
            <ul className="mt-4 space-y-3">
              {hits.map((hit) => (
                <li key={`${hit.groupId}-${hit.faq.question}`}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-700">
                    {hit.groupLabel}
                  </p>
                  <div className="mt-1">
                    <FAQ faqs={[hit.faq]} id={`faq-hit-${hit.groupId}`} allLink={false} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-sm border border-steel-200 bg-steel-50 p-6 text-[15px] text-ink-soft">
              Nothing matched that. Try a different word, or{" "}
              <Link
                href="/contact#rfq"
                className="font-semibold text-accent-700 underline underline-offset-2"
              >
                ask us directly
              </Link>{" "}
              — a question that is not answered here is one worth adding.
            </p>
          )}
        </div>
      ) : selected ? (
        /* --- One topic --- */
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setTopic(null)}
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink-soft transition-colors hover:text-navy-800"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M13 8H3M7 4 3 8l4 4" />
              </svg>
              All topics
            </button>
            <Link
              href={selected.href}
              className="text-[14px] font-semibold text-accent-700 transition-colors hover:text-accent-600"
            >
              Go to the {selected.label} page →
            </Link>
          </div>

          <h2 className="mt-4 text-[22px] font-bold text-ink">
            {selected.label}
            <span className="ml-2 text-[15px] font-medium text-ink-muted">
              {selected.faqs.length} questions
            </span>
          </h2>

          <div className="mt-4">
            <FAQ faqs={selected.faqs} id={`faq-${selected.id}`} allLink={false} />
          </div>
        </div>
      ) : (
        /* --- The index --- */
        <div className="mt-6">
          <p className="text-[14.5px] text-ink-soft">
            Pick a topic, or search above to look across all of them at once.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {faqGroups.map((group) => (
              <li key={group.id}>
                <button
                  type="button"
                  onClick={() => setTopic(group.id)}
                  className="keyline group flex w-full items-center gap-3.5 rounded-sm border border-steel-200 bg-white p-4 text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-colors duration-300 group-hover:bg-navy-800 group-hover:text-white">
                    <Icon name={TOPIC_ICONS[group.id as keyof typeof TOPIC_ICONS]} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15.5px] font-bold text-ink transition-colors group-hover:text-navy-800">
                      {group.label}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-ink-muted">
                      {group.faqs.length} questions
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
