"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Icon } from "./Icon";

type Option = { id: string; title: string };

/**
 * Vehicle-type chips plus live search for the Automotive Parts page.
 *
 * The cards stay server-rendered and are passed in as children, so every
 * category and every product line is present in the HTML for crawlers and for
 * users without JavaScript. Filtering reads the `data-category` and
 * `data-search` attributes the page puts on each card and only toggles
 * visibility — it never rewrites content.
 */
export function CategoryFilter({
  options,
  children,
  allLabel = "All categories",
}: {
  options: Option[];
  children: ReactNode;
  allLabel?: string;
}) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(options.length);
  const gridRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const trimmed = query.trim().toLowerCase();
  const isFiltered = active !== "all" || trimmed.length > 0;

  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;

    // Cancel any hide still pending from a previous, rapidly-changed selection.
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const cards = [...root.querySelectorAll<HTMLElement>("[data-category]")];
    let shown = 0;

    cards.forEach((card) => {
      const matchesChip = active === "all" || card.dataset.category === active;
      const matchesQuery = !trimmed || (card.dataset.search ?? "").includes(trimmed);
      const show = matchesChip && matchesQuery;
      card.setAttribute("aria-hidden", show ? "false" : "true");

      if (show) {
        const order = shown++;
        card.style.display = "";
        card.style.transitionDelay = `${Math.min(order, 6) * 45}ms`;
        // Next frame, so the browser transitions from the hidden state.
        requestAnimationFrame(() => {
          card.style.opacity = "1";
          card.style.transform = "none";
        });
      } else {
        card.style.transitionDelay = "0ms";
        card.style.opacity = "0";
        card.style.transform = "translateY(8px) scale(0.985)";
        timers.current.push(
          window.setTimeout(() => {
            if (card.getAttribute("aria-hidden") === "true") card.style.display = "none";
          }, 200),
        );
      }
    });

    setVisibleCount(shown);
  }, [active, trimmed]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const reset = () => {
    setActive("all");
    setQuery("");
  };

  /** Left/right arrows move between chips, like a toolbar. */
  const onChipKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const chips = [...(chipsRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
    const current = chips.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1) return;
    event.preventDefault();
    const next = event.key === "ArrowRight" ? current + 1 : current - 1;
    chips[(next + chips.length) % chips.length]?.focus();
  };

  const chip = (id: string, label: string) => {
    const isActive = active === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => setActive(id)}
        aria-pressed={isActive}
        className={`relative rounded-sm border px-4 py-2 text-[14px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isActive
            ? "-translate-y-px border-navy-800 bg-navy-800 text-white shadow-card"
            : "border-steel-300 bg-white text-ink-soft hover:-translate-y-px hover:border-navy-700 hover:text-navy-700 hover:shadow-card"
        }`}
      >
        {label}
      </button>
    );
  };

  const summary = useMemo(() => {
    if (visibleCount === options.length) return `Showing all ${options.length} categories`;
    return `Showing ${visibleCount} of ${options.length} categories`;
  }, [visibleCount, options.length]);

  return (
    <div>
      {/* Search across every category name and product line on the page. */}
      <div className="relative max-w-xl">
        <label htmlFor="parts-search" className="sr-only">
          Search components
        </label>
        <Icon
          name="search"
          className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-muted"
        />
        <input
          id="parts-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search axles, air suspension, e-axle, PTO, tyres…"
          className="w-full rounded-sm border border-steel-300 bg-white py-3.5 pl-12 pr-4 text-[15px] text-ink transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-ink-muted/70 hover:border-navy-700/40 focus:border-navy-700 focus:outline-none focus:ring-4 focus:ring-navy-700/10"
        />
      </div>

      <div
        ref={chipsRef}
        onKeyDown={onChipKeyDown}
        className="mt-6 flex flex-wrap items-center gap-2.5"
        role="group"
        aria-label="Filter components by vehicle type"
      >
        {chip("all", allLabel)}
        {options.map((option) => chip(option.id, option.title))}
      </div>

      <p aria-live="polite" className="mt-5 text-[13.5px] font-medium text-ink-muted">
        {summary}
        {isFiltered ? (
          <>
            {" · "}
            <button
              type="button"
              onClick={reset}
              className="font-semibold text-navy-700 underline underline-offset-2 transition-colors hover:text-accent-700"
            >
              Clear filters
            </button>
          </>
        ) : null}
      </p>

      <div ref={gridRef} className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {children}
      </div>

      {/* Empty state doubles as a conversion prompt — the enquiry is the point. */}
      {visibleCount === 0 ? (
        <div className="corner-ticks mt-2 rounded-sm border border-steel-200 bg-steel-50 px-6 py-12 text-center">
          <h3 className="text-xl font-bold text-ink">
            Nothing on this page matches {trimmed ? `“${query.trim()}”` : "that filter"}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            The list above is a summary, not our full range. If you need a component that is not
            shown, send the part number, drawing or application and we will source against it.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/contact?enquiry=component-sourcing${
                trimmed ? `&product=${encodeURIComponent(query.trim())}` : ""
              }#rfq`}
              className="group/btn inline-flex items-center gap-2 rounded-sm bg-accent-700 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-600"
            >
              Request this component
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={reset}
              className="rounded-sm border border-steel-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-navy-700"
            >
              Clear filters
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
