import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { Media, MediaScrim } from "./Media";
import { Eyebrow } from "./Section";
import type { MediaKey } from "@/data/media";

type Cta = { label: string; href: string; external?: boolean };

const delay = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as CSSProperties;

export function PageHero({
  eyebrow,
  title,
  lead,
  primaryCta,
  secondaryCta,
  trail,
  art,
  artLabel,
  media,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  trail: { name: string; path: string }[];
  /** Optional technical illustration shown beside the copy. */
  art?: ReactNode;
  artLabel?: string;
  /**
   * Optional full-bleed photograph or video behind the banner. Without one the
   * hero keeps its flat navy ground, which is what every page did before this
   * existed — so adding the prop changes nothing until a page passes it.
   */
  media?: MediaKey;
}) {
  return (
    <div
      className={`relative isolate overflow-hidden bg-navy-900 bg-blueprint text-white ${
        /* Film grain is for the flat navy ground; over a photograph it reads as blur. */
        media ? "" : "bg-grain"
      }`}
    >
      {media ? (
        <>
          {/* Negative z-index paints over the navy ground but under the copy.
              `isolate` on the parent keeps that contained to this banner. */}
          <div className="absolute inset-0 -z-10">
            <Media slot={media} priority sizes="100vw" quality={85} />
            <MediaScrim side="left" />
          </div>
          {/* The parent's blueprint grid is part of its *background*, so the
              media covers it. Put it back on top, the way the home hero does —
              behind the copy only, fading out before the open part of the photo. */}
          <div
            className="pointer-events-none absolute inset-0 bg-blueprint opacity-40 [mask-image:linear-gradient(90deg,black,transparent_60%)]"
            aria-hidden="true"
          />
        </>
      ) : null}
      <div
        className="pointer-events-none absolute -right-20 -top-28 h-[380px] w-[380px] rounded-full bg-navy-600/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-10 h-[260px] w-[260px] rounded-full bg-accent-700/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-9 sm:py-14 lg:py-20">
        <nav aria-label="Breadcrumb" className="hero-in" style={delay(0)}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-navy-100">
            {trail.map((item, index) => {
              const isLast = index === trail.length - 1;
              return (
                <li key={item.path} className="flex items-center gap-2">
                  {isLast ? (
                    <span aria-current="page" className="text-white">
                      {item.name}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={item.path}
                        className="transition-colors duration-200 hover:text-accent-500"
                      >
                        {item.name}
                      </Link>
                      <span aria-hidden="true" className="text-navy-100/50">
                        /
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div
          className={`mt-6 gap-10 sm:mt-8 ${art ? "grid items-center lg:grid-cols-12 lg:gap-8" : "max-w-4xl"}`}
        >
          <div className={art ? "lg:col-span-7" : undefined}>
            <span className="hero-in inline-block" style={delay(80)}>
              <Eyebrow inverted>{eyebrow}</Eyebrow>
            </span>

            {/* Title and lead paint immediately — no entrance animation on LCP text. */}
            <h1 className="mt-4 text-[clamp(1.75rem,3.6vw,2.95rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:mt-5">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-[15.5px] leading-relaxed text-navy-100 sm:mt-5 sm:text-[17px]">
              {lead}
            </p>

            <div
              className="hero-in mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center"
              style={delay(200)}
            >
              <ButtonLink href={primaryCta.href} size="lg" withArrow>
                {primaryCta.label}
              </ButtonLink>
              {secondaryCta ? (
                <ButtonLink
                  href={secondaryCta.href}
                  external={secondaryCta.external}
                  variant="outlineLight"
                  size="lg"
                >
                  {secondaryCta.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>

          {art ? (
            <figure className="flex flex-col gap-3 lg:col-span-5">
              {artLabel ? (
                <figcaption className="index-mark self-end text-[11px] font-bold tracking-[0.2em] text-white/45">
                  {artLabel}
                </figcaption>
              ) : null}
              {art}
            </figure>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
