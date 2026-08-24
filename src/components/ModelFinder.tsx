"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Icon } from "./Icon";

export type FinderOption = { id: string; title: string; count?: number };

/**
 * Two-dimensional filter (vehicle type × OEM) plus live search for the vehicle
 * model schedule.
 *
 * Same contract as CategoryFilter: the cards are server-rendered and passed in
 * as children, so every model name and every part name stays in the HTML for
 * crawlers and for users without JavaScript. Filtering only toggles
 * visibility — it never rewrites content. Each card must carry
 * `data-model`, `data-group`, `data-oem` and a pre-lowercased `data-search`.
 */
export function ModelFinder({
  groups,
  oems,
  total,
  children,
}: {
  groups: FinderOption[];
  oems: FinderOption[];
  total: number;
  children: ReactNode;
}) {
  const [group, setGroup] = useState("all");
  const [oem, setOem] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(total);
  const gridRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const trimmed = query.trim().toLowerCase();
  const isFiltered = group !== "all" || oem !== "all" || trimmed.length > 0;

  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;

    // Cancel any hide still pending from a previous, rapidly-changed selection.
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const cards = [...root.querySelectorAll<HTMLElement>("[data-model]")];
    let shown = 0;

    cards.forEach((card) => {
      const matchesGroup = group === "all" || card.dataset.group === group;
      const matchesOem = oem === "all" || card.dataset.oem === oem;
      const matchesQuery = !trimmed || (card.dataset.search ?? "").includes(trimmed);
      const show = matchesGroup && matchesOem && matchesQuery;
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

    setVisibleCount(shown);
  }, [group, oem, trimmed]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const reset = () => {
    setGroup("all");
    setOem("all");
    setQuery("");
  };

  const summary = useMemo(
    () =>
      visibleCount === total
        ? `Showing all ${total} models`
        : `Showing ${visibleCount} of ${total} models`,
    [visibleCount, total],
  );

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

      <div ref={gridRef} className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {children}
      </div>

      {/* Empty state doubles as a conversion prompt — the enquiry is the point. */}
      {visibleCount === 0 ? (
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
