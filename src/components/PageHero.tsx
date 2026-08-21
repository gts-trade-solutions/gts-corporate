import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { Eyebrow } from "./Section";

type Cta = { label: string; href: string };

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
}) {
  return (
    <div className="relative overflow-hidden bg-grain bg-navy-900 bg-blueprint text-white">
      <div
        className="pointer-events-none absolute -right-20 -top-28 h-[380px] w-[380px] rounded-full bg-navy-600/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-10 h-[260px] w-[260px] rounded-full bg-accent-700/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-12 sm:py-16 lg:py-20">
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
          className={`mt-8 gap-10 ${art ? "grid items-center lg:grid-cols-12 lg:gap-8" : "max-w-4xl"}`}
        >
          <div className={art ? "lg:col-span-7" : undefined}>
            <span className="hero-in inline-block" style={delay(80)}>
              <Eyebrow inverted>{eyebrow}</Eyebrow>
            </span>

            {/* Title and lead paint immediately — no entrance animation on LCP text. */}
            <h1 className="mt-5 text-[clamp(2rem,3.6vw,2.95rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-[17px] leading-relaxed text-navy-100">
              {lead}
            </p>

            <div
              className="hero-in mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={delay(200)}
            >
              <ButtonLink href={primaryCta.href} size="lg" withArrow>
                {primaryCta.label}
              </ButtonLink>
              {secondaryCta ? (
                <ButtonLink href={secondaryCta.href} variant="outlineLight" size="lg">
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
