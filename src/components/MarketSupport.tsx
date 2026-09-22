"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Section";
import {
  flagOf,
  marketRegions,
  marketStats,
  regionOf,
  type Market,
} from "@/data/countries";

/**
 * Country-based support.
 *
 * A visitor picks their market and is told, in one line, how GTS covers it and
 * who handles the enquiry — then goes into the enquiry form with the country
 * already filled in (/contact?market=XX). That hand-off is the point of the
 * component: the coverage question and the enquiry are the same conversation.
 *
 * Regions are tabs rather than one long list because the full schedule runs to
 * thirty-odd countries, which is more than anyone reads.
 */
export function MarketSupport() {
  const [regionId, setRegionId] = useState(marketRegions[0].id);
  const [selected, setSelected] = useState<Market | null>(null);
  const [query, setQuery] = useState("");

  const region = marketRegions.find((item) => item.id === regionId) ?? marketRegions[0];

  /* A search matches across every region, so someone who does not know which
     region their country is filed under still finds it. */
  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return null;
    return marketRegions
      .flatMap((item) => item.markets)
      .filter((market) => market.name.toLowerCase().includes(term))
      .slice(0, 8);
  }, [query]);

  const shown = matches ?? region.markets;

  return (
    <section className="border-y border-steel-200 bg-steel-50 py-11 sm:py-14 lg:py-16">
      <Container>
        <Reveal>
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Eyebrow>Where We Work</Eyebrow>
              <h2 className="mt-3 text-[clamp(1.45rem,2.6vw,2.1rem)] font-bold leading-tight tracking-[-0.02em] text-ink sm:mt-4">
                Country-based support
              </h2>
              <p className="mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-soft sm:mt-4">
                {marketStats.countries} countries across {marketStats.regions} regions, with a local
                partner on the ground in {marketStats.localPartners} of them. Pick your market to
                see how it is covered and start the enquiry with the country already filled in.
              </p>

              <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-steel-200 pt-5 sm:mt-7 sm:pt-6">
                {[
                  { label: "Regions", value: marketStats.regions },
                  { label: "Countries", value: marketStats.countries },
                  { label: "Local partners", value: marketStats.localPartners },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 font-display text-[26px] font-bold tabular-nums leading-none text-navy-800">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-8">
              <label className="block">
                <span className="sr-only">Find your country</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Find your country…"
                  className="w-full rounded-sm border border-steel-200 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-navy-700"
                />
              </label>

              {!matches ? (
                <div
                  role="tablist"
                  aria-label="Regions"
                  className="mt-4 flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {marketRegions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={item.id === regionId}
                      onClick={() => {
                        setRegionId(item.id);
                        setSelected(null);
                      }}
                      className={`shrink-0 rounded-sm px-3.5 py-2 text-[13.5px] font-semibold transition-colors duration-200 ${
                        item.id === regionId
                          ? "bg-navy-800 text-white"
                          : "text-ink-soft hover:bg-white hover:text-navy-800"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}

              {!matches ? (
                <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">{region.blurb}</p>
              ) : null}

              <ul className="mt-4 flex flex-wrap gap-2">
                {shown.map((market) => {
                  const isSelected = selected?.code === market.code;
                  return (
                    <li key={market.code}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelected(isSelected ? null : market)}
                        className={`flex items-center gap-2 rounded-sm border px-3 py-2 text-[14px] font-medium transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isSelected
                            ? "border-navy-700 bg-white text-navy-800 shadow-card"
                            : "border-steel-200 bg-white text-ink-soft hover:-translate-y-0.5 hover:border-navy-700 hover:text-navy-800"
                        }`}
                      >
                        <span aria-hidden="true">{flagOf(market.code)}</span>
                        {market.name}
                        {market.partner === "local" ? (
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-accent-600"
                            aria-label="local partner"
                          />
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {matches && !matches.length ? (
                <p className="mt-4 text-[14.5px] text-ink-soft">
                  No match in the published list — we still trade well beyond it.{" "}
                  <Link
                    href="/contact#rfq"
                    className="font-semibold text-accent-700 underline underline-offset-2"
                  >
                    Send us the requirement
                  </Link>{" "}
                  and we will tell you how that market is handled.
                </p>
              ) : null}

              {selected ? (
                <div className="mt-5 rounded-sm border-l-[3px] border-accent-600 bg-white p-5">
                  <p className="text-[15px] font-bold text-ink">
                    <span aria-hidden="true">{flagOf(selected.code)}</span> {selected.name}
                    <span className="ml-2 text-[13px] font-medium text-ink-muted">
                      {regionOf(selected.code)?.label}
                    </span>
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                    {selected.partnerNote ??
                      (selected.partner === "local"
                        ? "Covered with a local partner on the ground — enquiries are handled in-market, with the India desk behind them for sourcing and documentation."
                        : "Handled directly from the Chennai desk, covering sourcing, documentation and shipping coordination.")}
                  </p>
                  <Link
                    href={`/contact?market=${selected.code}#rfq`}
                    className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-accent-700 transition-colors hover:text-accent-600"
                  >
                    Start an enquiry for {selected.name}
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
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <p className="mt-5 flex items-center gap-2 text-[13px] text-ink-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-600" aria-hidden="true" />
                  Local partner on the ground. Select a country for the detail.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
