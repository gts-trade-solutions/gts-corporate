"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Icon } from "./Icon";

export type FinderOption = { id: string; title: string; count?: number };

/** Cards per page. Divides evenly into the 1, 2 and 3 column grid below. */
const DEFAULT_PAGE_SIZE = 24;

/**
 * Two-dimensional filter (vehicle type × OEM) plus live search and pagination
 * for the vehicle model schedule.
 *
 * Same contract as CategoryFilter: the cards are server-rendered and passed in
 * as children, so every model name and every part name stays in the HTML for
 * crawlers and for users without JavaScript. Filtering and paging only toggle
 * visibility — they never rewrite content. Each card must carry
 * `data-model`, `data-group`, `data-oem` and a pre-lowercased `data-search`.
 *
 * Paging is therefore client-only, with no `?page=` in the URL. Every card is
 * in the HTML whichever page you are on, so URL-addressable pages would be
 * byte-identical duplicates of /vehicle-models; it also keeps paging
 * consistent with the filters, which are not URL-synced either. The win is
 * scannability — the document is the same weight as before.
 */
export function ModelFinder({
  groups,
  oems,
  total,
  pageSize = DEFAULT_PAGE_SIZE,
  children,
}: {
  groups: FinderOption[];
  oems: FinderOption[];
  total: number;
  pageSize?: number;
  children: ReactNode;
}) {
  const [group, setGroup] = useState("all");
  const [oem, setOem] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [matchCount, setMatchCount] = useState(total);
  const gridRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const trimmed = query.trim().toLowerCase();
  const isFiltered = group !== "all" || oem !== "all" || trimmed.length > 0;

  /*
    Back to page one when the matched set changes underneath us. Done during
    render rather than in an effect: an effect would let the visibility pass
    below run once against the stale page first, flashing the wrong window.
  */
  const filterKey = `${group}|${oem}|${trimmed}`;
  const [lastFilterKey, setLastFilterKey] = useState(filterKey);
  if (lastFilterKey !== filterKey) {
    setLastFilterKey(filterKey);
    setPage(1);
  }

  const pageCount = Math.max(1, Math.ceil(matchCount / pageSize));
  const currentPage = Math.min(page, pageCount);

  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;

    // Cancel any hide still pending from a previous, rapidly-changed selection.
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const cards = [...root.querySelectorAll<HTMLElement>("[data-model]")];
    const matches = cards.filter((card) => {
      const matchesGroup = group === "all" || card.dataset.group === group;
      const matchesOem = oem === "all" || card.dataset.oem === oem;
      const matchesQuery = !trimmed || (card.dataset.search ?? "").includes(trimmed);
      return matchesGroup && matchesOem && matchesQuery;
    });

    // Clamped here as well as in render: a filter that shrinks the result set
    // must never leave the grid parked on a page past the end.
    const lastPage = Math.max(1, Math.ceil(matches.length / pageSize));
    const start = (Math.min(page, lastPage) - 1) * pageSize;
    const onPage = new Set(matches.slice(start, start + pageSize));
    let shown = 0;

    cards.forEach((card) => {
      const show = onPage.has(card);
      card.setAttribute("aria-hidden", show ? "false" : "true");

      if (show) {
        const order = shown++;
        card.style.display = "";
        card.style.transitionDelay = `${Math.min(order, 8) * 35}ms`;
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

    setMatchCount(matches.length);
  }, [group, oem, trimmed, page, pageSize]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const reset = () => {
    setGroup("all");
    setOem("all");
    setQuery("");
  };

  /*
    Paging keeps you where the cards are: without this you stay parked on the
    pager and the new page opens entirely above the fold. Filter changes do not
    scroll — you are already looking at the control you just used.
  */
  const goToPage = (next: number) => {
    setPage(next);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gridRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  const summary = useMemo(() => {
    if (matchCount === 0) return "No models match the current filters";
    if (pageCount === 1) {
      return matchCount === total
        ? `Showing all ${total} models`
        : `Showing ${matchCount} of ${total} models`;
    }
    const from = (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, matchCount);
    return matchCount === total
      ? `Showing ${from}–${to} of ${total} models`
      : `Showing ${from}–${to} of ${matchCount} matching models`;
  }, [matchCount, total, pageCount, currentPage, pageSize]);

  return (
    <div>
      {/* Search across model name, OEM, segment, market and every part name. */}
      <div className="relative max-w-xl">
        <label htmlFor="model-search" className="sr-only">
          Search vehicle models and spare parts
        </label>
        <Icon
          name="search"
          className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-muted"
        />
        <input
          id="model-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a model, OEM, market or part — Swift, Pulsar, Egypt, clutch kit…"
          className="w-full rounded-sm border border-steel-300 bg-white py-3.5 pl-12 pr-4 text-[15px] text-ink transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-ink-muted/70 hover:border-navy-700/40 focus:border-navy-700 focus:outline-none focus:ring-4 focus:ring-navy-700/10"
        />
      </div>

      <ChipRow
        label="Filter by vehicle type"
        allLabel="All vehicle types"
        options={groups}
        active={group}
        onChange={setGroup}
        className="mt-6"
      />
      <ChipRow
        label="Filter by OEM"
        allLabel="All OEMs"
        options={oems}
        active={oem}
        onChange={setOem}
        className="mt-3"
      />

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

      <div ref={gridRef} className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
        {children}
      </div>

      <Pager current={currentPage} count={pageCount} onChange={goToPage} />

      {/* Empty state doubles as a conversion prompt — the enquiry is the point. */}
      {matchCount === 0 ? (
        <div className="corner-ticks mt-2 rounded-sm border border-steel-200 bg-steel-50 px-6 py-12 text-center">
          <h3 className="text-xl font-bold text-ink">
            No model on this page matches {trimmed ? `“${query.trim()}”` : "that filter"}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            This schedule covers the models we are asked for most often — it is not the limit of
            what we can source. Send the make, model and the part you need and we will quote
            against it.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/contact?enquiry=component-sourcing${
                trimmed ? `&product=${encodeURIComponent(query.trim())}` : ""
              }#rfq`}
              className="group/btn inline-flex items-center gap-2 rounded-sm bg-accent-700 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-600"
            >
              Request parts for another model
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

/**
 * The page numbers to render: first, last and a window around the current one,
 * with gaps standing in for the rest. The window is extended at either end so
 * the row keeps a steady width instead of shrinking on the first and last
 * pages.
 */
function pageList(current: number, count: number): (number | "gap")[] {
  if (count <= 7) return Array.from({ length: count }, (_, index) => index + 1);

  const wanted = new Set([1, count, current - 1, current, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((page) => wanted.add(page));
  if (current >= count - 2) [count - 3, count - 2, count - 1].forEach((page) => wanted.add(page));

  const pages = [...wanted].filter((page) => page >= 1 && page <= count).sort((a, b) => a - b);
  return pages.flatMap<number | "gap">((page, index) =>
    index > 0 && page - pages[index - 1]! > 1 ? ["gap", page] : [page],
  );
}

/** Numbered pager for the model grid. Renders nothing when there is one page. */
function Pager({
  current,
  count,
  onChange,
}: {
  current: number;
  count: number;
  onChange: (page: number) => void;
}) {
  if (count <= 1) return null;

  /* Prev/Next label collapses to the chevron alone on narrow screens, where
     the number row is already using the full width. */
  const step = (delta: number, label: string, path: string) => {
    const target = current + delta;
    const arrow = (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={path} />
      </svg>
    );
    return (
      <button
        type="button"
        onClick={() => onChange(target)}
        disabled={target < 1 || target > count}
        aria-label={label}
        className="inline-flex items-center gap-1.5 rounded-sm border border-steel-300 bg-white px-3 py-2 text-[13.5px] font-semibold text-ink-soft transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:border-navy-700 hover:text-navy-700 hover:shadow-card disabled:pointer-events-none disabled:opacity-40"
      >
        {delta < 0 ? arrow : null}
        <span className="hidden sm:inline">{label}</span>
        {delta > 0 ? arrow : null}
      </button>
    );
  };

  return (
    <nav
      aria-label="Vehicle model pages"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {step(-1, "Previous", "M10 4 6 8l4 4")}

      {pageList(current, count).map((page, index) =>
        page === "gap" ? (
          <span
            key={`gap-${index}`}
            aria-hidden="true"
            className="px-1 text-[13.5px] font-semibold text-ink-muted"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            aria-label={`Page ${page} of ${count}`}
            aria-current={page === current ? "page" : undefined}
            className={`index-mark inline-flex min-w-[38px] items-center justify-center rounded-sm border px-3 py-2 text-[13.5px] font-bold tabular-nums transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              page === current
                ? "-translate-y-px border-navy-800 bg-navy-800 text-white shadow-card"
                : "border-steel-300 bg-white text-ink-soft hover:-translate-y-px hover:border-navy-700 hover:text-navy-700 hover:shadow-card"
            }`}
          >
            {page}
          </button>
        ),
      )}

      {step(1, "Next", "M6 4l4 4-4 4")}
    </nav>
  );
}

/** One horizontal row of filter chips, with arrow-key movement like a toolbar. */
function ChipRow({
  label,
  allLabel,
  options,
  active,
  onChange,
  className = "",
}: {
  label: string;
  allLabel: string;
  options: FinderOption[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const chips = [...(rowRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
    const current = chips.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1) return;
    event.preventDefault();
    const next = event.key === "ArrowRight" ? current + 1 : current - 1;
    chips[(next + chips.length) % chips.length]?.focus();
  };

  const chip = (id: string, title: string, count?: number) => {
    const isActive = active === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => onChange(id)}
        aria-pressed={isActive}
        className={`relative inline-flex items-center gap-2 rounded-sm border px-3.5 py-2 text-[13.5px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isActive
            ? "-translate-y-px border-navy-800 bg-navy-800 text-white shadow-card"
            : "border-steel-300 bg-white text-ink-soft hover:-translate-y-px hover:border-navy-700 hover:text-navy-700 hover:shadow-card"
        }`}
      >
        {title}
        {count !== undefined ? (
          <span
            className={`index-mark text-[11px] font-bold tabular-nums ${
              isActive ? "text-white/70" : "text-ink-muted"
            }`}
          >
            {count}
          </span>
        ) : null}
      </button>
    );
  };

  return (
    <div
      ref={rowRef}
      onKeyDown={onKeyDown}
      className={`flex flex-wrap items-center gap-2 ${className}`}
      role="group"
      aria-label={label}
    >
      {chip("all", allLabel)}
      {options.map((option) => chip(option.id, option.title, option.count))}
    </div>
  );
}
