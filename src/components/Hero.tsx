import type { CSSProperties } from "react";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { HeroSlider } from "./HeroSlider";
import { Media, MediaScrim } from "./Media";
import { heroSlides } from "@/data/hero-slides";
import { heroCopy } from "@/data/home";

/** Decorative capability ticker beneath the banner. */
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

/** The selector strip beneath the banner doubles as the capability strip. */
const sliderLabels = heroSlides.map((slide) => ({
  label: slide.label,
  detail: slide.detail,
  icon: slide.icon,
}));

/**
 * One banner slide.
 *
 * Every slide heading is an h2. The page's h1 is rendered once, outside the
 * carousel — see the note on it below. Four rotating h1 elements would give the
 * page four competing top-level headings, and which one a crawler saw would
 * depend on which slide happened to be showing.
 */
function Slide({ slide, first }: { slide: (typeof heroSlides)[number]; first: boolean }) {
  const Heading = "h2";

  return (
    <div className="relative h-full">
      <Media slot={slide.slot} priority={first} sizes="100vw" quality={85} />
      <MediaScrim side="left" />
      {/* The grid stays behind the headline and fades out before the part of
          the photograph nothing sits on. No film grain here: it is for flat
          navy panels, and over a photograph it reads as blur. */}
      <div
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-40 [mask-image:linear-gradient(90deg,black,transparent_60%)]"
        aria-hidden="true"
      />

      <Container className="relative flex h-full flex-col justify-center py-8">
        <span className="inline-flex items-center gap-2.5">
          <span className="h-px w-7 bg-accent-500" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-500">
            {slide.label}
          </span>
        </span>

        <Heading className="mt-5 max-w-4xl text-[clamp(2.1rem,min(5.2vw,7vh),4rem)] font-bold leading-[1] tracking-[-0.04em] text-white">
          {slide.title}
        </Heading>

        {/* Hidden on short screens so the banner never needs scrolling. */}
        <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-navy-100 [@media(max-height:700px)]:hidden">
          {slide.lead}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={`/contact?enquiry=${slide.enquiry}`} size="lg" withArrow>
            Request a Quote
          </ButtonLink>
          <ButtonLink href={slide.href} variant="outlineLight" size="lg">
            {slide.cta}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}

export function Hero() {
  return (
    /*
      The banner occupies exactly one viewport: 100svh minus the sticky header.
      svh (not vh/dvh) so mobile browser chrome can never push it into a scroll,
      and min-h keeps it usable if the window is very short.

      The ticker sits outside the slider, so it does not rotate with the slides.
    */
    <section className="relative isolate flex h-[calc(100svh-var(--header-h))] min-h-[520px] flex-col overflow-hidden bg-navy-900 text-white">
      {/*
        The page's one h1, rendered outside the carousel and visually hidden.

        The banner rotates, so no slide can own the h1 without the page's
        top-level heading depending on timing. This keeps the keyword-led
        heading the SEO brief specifies constant and first in the document,
        while the visible headings are the slide titles beneath it.
      */}
      <h1 className="sr-only">{heroCopy.h1}</h1>

      <HeroSlider labels={sliderLabels}>
        {heroSlides.map((slide, index) => (
          <Slide key={slide.label} slide={slide} first={index === 0} />
        ))}
      </HeroSlider>

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
