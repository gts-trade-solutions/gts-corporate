import type { CSSProperties } from "react";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { Icon, type IconName } from "./Icon";
import { Media, MediaScrim } from "./Media";
import { heroCopy } from "@/data/home";

const capabilities: { label: string; detail: string; icon: IconName }[] = [
  { label: "Global Trade", detail: "Food, cosmetics, steel, raw materials, machinery", icon: "globe" },
  { label: "Vehicle Trade", detail: "Cars, 2W, 3W, trucks, buses, EVs, special-purpose", icon: "truck" },
  { label: "Components", detail: "Axles, tyres, rims, suspension, brakes, EV systems", icon: "gear" },
  { label: "Manufacturing", detail: "Fabrication, trailers, containers, reefers, bodies", icon: "factory" },
];

/** Decorative capability ticker beneath the hero. */
const tickerTerms = [
  "Trailer axles",
  "Air suspension",
  "EV traction motors",
  "Truck tyres",
  "Steel wheel rims",
  "ABS & EBS",
  "Reefer bodies",
  "Tractor parts",
  "Container solutions",
  "Battery packs & BMS",
];

const delay = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    /*
      The banner occupies exactly one viewport: 100svh minus the sticky header.
      svh (not vh/dvh) so mobile browser chrome can never push it into a scroll,
      and min-h keeps it usable if the window is very short.
    */
    <section className="relative isolate flex h-[calc(100svh-var(--header-h))] min-h-[460px] flex-col overflow-hidden bg-navy-900 text-white">
      {/* Full-bleed imagery behind everything. */}
      <Media slot="homeHero" priority sizes="100vw" />
      <MediaScrim side="left" />
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grain" aria-hidden="true" />

      <Container className="relative flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col justify-center py-8">
          <span className="hero-in inline-flex items-center gap-2.5" style={delay(0)}>
            <span className="h-px w-7 bg-accent-500" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-500">
              {heroCopy.eyebrow}
            </span>
          </span>

          {/* H1 and lead intentionally un-animated so they paint immediately. */}
          <h1 className="mt-5 text-[clamp(2.1rem,min(5.6vw,7.4vh),4.4rem)] font-bold leading-[0.98] tracking-[-0.04em] text-white">
            {heroCopy.h1}
          </h1>

          {/* Hidden on short screens so the banner never needs scrolling. */}
          <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-navy-100 [@media(max-height:700px)]:hidden">
            {heroCopy.lead}
          </p>

          <div
            className="hero-in mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={delay(200)}
          >
            <ButtonLink href="/contact" size="lg" withArrow>
              Request a Quote
            </ButtonLink>
            <ButtonLink href="#what-we-do" variant="outlineLight" size="lg">
              Explore Services
            </ButtonLink>
          </div>
        </div>

        {/* Capability strip sits on the hero, over the scrim. */}
        <div
          /* Dropped on very short screens so the banner never needs scrolling; the
             same four capabilities lead the section immediately below. */
          className="hero-in grid shrink-0 grid-cols-2 border-t border-white/15 lg:grid-cols-4 lg:divide-x lg:divide-white/15 [@media(max-height:700px)]:hidden"
          style={delay(320)}
        >
          {capabilities.map((item) => (
            <div
              key={item.label}
              className="group relative py-5 transition-colors duration-300 lg:px-7 lg:first:pl-0 lg:last:pr-0 [@media(max-height:820px)]:py-4"
            >
              <span
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                aria-hidden="true"
              />
              <Icon
                name={item.icon}
                className="h-5 w-5 text-accent-500 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <span className="mt-3 block font-display text-[15px] font-bold text-white">
                {item.label}
              </span>
              <span className="mt-1.5 block text-[13.5px] leading-relaxed text-navy-100 max-sm:hidden [@media(max-height:820px)]:hidden">
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </Container>

      {/* Capability ticker */}
      <div
        className="hero-in relative shrink-0 border-t border-white/12 bg-navy-900 py-3"
        style={delay(420)}
      >
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex shrink-0 items-center"
                aria-hidden={copy === 1 ? "true" : undefined}
              >
                {tickerTerms.map((term) => (
                  <li
                    key={term}
                    className="flex items-center gap-6 whitespace-nowrap px-6 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-navy-200"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent-600" aria-hidden="true" />
                    {term}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
