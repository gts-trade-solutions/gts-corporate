"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "../Icon";
import { Media } from "../Media";
import { reportCategories, reportRegions, type ReportListing } from "@/data/logistics";

const selectClass =
  "w-full appearance-none rounded-sm border border-steel-300 bg-white bg-[length:16px] bg-[right_14px_center] bg-no-repeat py-3.5 pl-4 pr-10 text-[15px] font-medium text-ink transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-navy-700/40 focus:border-navy-700 focus:outline-none focus:ring-4 focus:ring-navy-700/10";

/* Inline caret so the select needs no icon font and no extra request. */
const caret =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")";

/**
 * The report catalogue: search, category and region filters over a card grid,
 * following the reference layout.
 *
 * Filtering happens in React here rather than by toggling server-rendered
 * cards, because the card set is small and each card is a summary — unlike the
 * parts and model finders, where every hidden line still had to be in the HTML
 * for crawlers. The full listing is still server-rendered on first paint.
 */
export function ReportFinder({ listings }: { listings: ReportListing[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("all");

  const trimmed = query.trim().toLowerCase();
  const isFiltered = trimmed.length > 0 || category !== "all" || region !== "all";

  const visible = useMemo(
    () =>
      listings.filter((report) => {
        const matchesCategory = category === "all" || report.category === category;
        const matchesRegion = region === "all" || report.regions.includes(region);
        const haystack =
          `${report.title} ${report.description} ${report.category} ${report.regions.join(" ")}`.toLowerCase();
        return matchesCategory && matchesRegion && (!trimmed || haystack.includes(trimmed));
      }),
    [listings, category, region, trimmed],
  );

  const reset = () => {
    setQuery("");
    setCategory("all");
    setRegion("all");
  };

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <label htmlFor="report-search" className="sr-only">
            Search reports
          </label>
          <Icon
            name="search"
            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-muted"
          />
          <input
            id="report-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search reports…"
            className="w-full rounded-sm border border-steel-300 bg-white py-3.5 pl-12 pr-4 text-[15px] text-ink transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-ink-muted/70 hover:border-navy-700/40 focus:border-navy-700 focus:outline-none focus:ring-4 focus:ring-navy-700/10"
          />
        </div>

        <div className="md:w-[280px]">
          <label htmlFor="report-category" className="sr-only">
            Filter by category
          </label>
          <select
            id="report-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            style={{ backgroundImage: caret }}
            className={selectClass}
          >
            <option value="all">All categories</option>
            {reportCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="md:w-[200px]">
          <label htmlFor="report-region" className="sr-only">
            Filter by region
          </label>
          <select
            id="report-region"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            style={{ backgroundImage: caret }}
            className={selectClass}
          >
            <option value="all">All regions</option>
            {reportRegions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-[13.5px] font-medium text-ink-muted">
          {visible.length} report{visible.length === 1 ? "" : "s"} found
        </p>
        {isFiltered ? (
          <button
            type="button"
            onClick={reset}
            className="rounded-sm border border-steel-300 bg-white px-4 py-2 text-[13.5px] font-semibold text-navy-700 transition-colors duration-200 hover:border-navy-700 hover:text-accent-700"
          >
            Reset filters
          </button>
        ) : null}
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {visible.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <div className="corner-ticks mt-8 rounded-sm border border-steel-200 bg-steel-50 px-6 py-12 text-center">
          <h3 className="text-xl font-bold text-ink">No report matches that filter</h3>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            Reports are produced to order against a named route and cargo envelope, so the list
            above is a set of report types rather than a stock catalogue. Tell us the route and we
            will scope one.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact?enquiry=route-survey#rfq"
              className="inline-flex items-center gap-2 rounded-sm bg-accent-700 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-600"
            >
              Request a report
            </Link>
            <button
              type="button"
              onClick={reset}
              className="rounded-sm border border-steel-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-navy-700"
            >
              Reset filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReportCard({ report }: { report: ReportListing }) {
  const href = `/contact?enquiry=route-survey&product=${encodeURIComponent(
    `${report.category} — ${report.title}`,
  )}#rfq`;

  return (
    <article className="keyline group flex h-full flex-col overflow-hidden rounded-sm border border-steel-200 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
      <div className="relative aspect-[16/9] overflow-hidden bg-navy-900">
        <Media slot={report.slot} sizes="(min-width: 1024px) 46vw, 100vw" />
        <span className="absolute left-4 top-4 rounded-sm bg-navy-900/90 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
          {report.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[18px] font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-navy-800">
          {report.title}
        </h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{report.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-steel-200 pt-4">
          {report.regions.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-600" aria-hidden="true" />
              {item}
            </span>
          ))}
          <span className="ml-auto text-[13px] font-bold uppercase tracking-[0.1em] text-navy-700">
            Scoped per route
          </span>
        </div>

        <Link
          href={href}
          className="group/btn mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-navy-800 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-accent-700"
        >
          Request this report
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
