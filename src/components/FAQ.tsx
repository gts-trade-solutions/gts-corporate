"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import type { Faq } from "@/data/types";

/**
 * Accordion built on <details>/<summary>, so every answer is in the HTML for
 * crawlers and the whole thing still opens without JavaScript.
 *
 * When JS is available the native toggle is intercepted to animate the panel:
 * opening sets `open` immediately and grows the grid row; closing shrinks it
 * first and only then drops the attribute.
 */
function FaqItem({ faq }: { faq: Faq }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    const details = detailsRef.current;
    const panel = panelRef.current;
    if (!details || !panel) return;

    event.preventDefault();

    if (!details.open) {
      details.open = true;
      requestAnimationFrame(() => setExpanded(true));
      return;
    }

    setExpanded(false);
    const finish = (e: TransitionEvent) => {
      if (e.propertyName !== "grid-template-rows") return;
      panel.removeEventListener("transitionend", finish);
      details.open = false;
    };
    panel.addEventListener("transitionend", finish);
  };

  return (
    <details
      ref={detailsRef}
      className="group border-b border-steel-200 transition-colors duration-200 last:border-b-0"
    >
      {/* Rows are tighter and the question a size smaller on a phone: a set of
          thirteen questions is otherwise two and a half screens of headers
          before a single answer is open. */}
      <summary
        onClick={handleClick}
        className="flex cursor-pointer list-none items-start justify-between gap-4 py-3.5 text-left sm:gap-6 sm:py-5 [&::-webkit-details-marker]:hidden"
      >
        <h3
          className={`text-[15.5px] font-bold leading-snug transition-colors duration-200 sm:text-[17px] ${
            expanded ? "text-navy-800" : "text-ink group-hover:text-navy-700"
          }`}
        >
          {faq.question}
        </h3>
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-7 sm:w-7 ${
            expanded
              ? "rotate-180 border-accent-600 bg-accent-600 text-white"
              : "border-steel-300 text-ink-soft group-hover:border-navy-700 group-hover:text-navy-700"
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M3 8h10" />
            <path
              d="M8 3v10"
              className={`origin-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                expanded ? "scale-y-0" : "scale-y-100"
              }`}
            />
          </svg>
        </span>
      </summary>

      <div
        ref={panelRef}
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-4xl pb-5 text-[15px] leading-relaxed text-ink-soft sm:pb-6 sm:text-[15.5px]">{faq.answer}</p>
        </div>
      </div>
    </details>
  );
}

/**
 * `allLink` adds a pointer to the /faq hub beneath the set. On by default for
 * the service pages; the hub itself passes `false`, since it is already there.
 */
export function FAQ({
  faqs,
  id = "faqs",
  allLink = true,
}: {
  faqs: Faq[];
  id?: string;
  allLink?: boolean;
}) {
  return (
    <>
      <div id={id} className="scroll-mt-40 border-y border-steel-200">
        {faqs.map((faq) => (
          <FaqItem key={faq.question} faq={faq} />
        ))}
      </div>
      {allLink ? (
        <p className="mt-3 text-[14.5px] text-ink-soft sm:mt-5">
          <Link
            href="/faq"
            className="-my-2.5 inline-flex min-h-11 items-center font-semibold text-accent-700 transition-colors hover:text-accent-600"
          >
            See every question we are asked →
          </Link>
        </p>
      ) : null}
    </>
  );
}
