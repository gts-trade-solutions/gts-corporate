import Link from "next/link";
import type { CSSProperties } from "react";
import { ButtonLink } from "./Button";
import { Icon, type IconName } from "./Icon";
import { Media, MediaScrim } from "./Media";
import type { MediaKey } from "@/data/media";

/**
 * The split module banner: a full-bleed photograph on one side carrying the
 * breadcrumb and the page's h1, and a dark panel on the other carrying the
 * module's service list and its one accent call to action.
 *
 * This started as the ODC Logistics hero and is now the pattern for every
 * module landing page. The point of it is the list: a visitor arriving on a
 * module page sees everything that module covers, and can go straight to the
 * part they came for, instead of a paragraph and two buttons.
 *
 * Each module supplies its own `services` from the data it already publishes
 * (see `serviceList` in the data files), so the banner cannot list something
 * the module does not actually have.
 *
 * The panel inherits the module's accent through `ModuleTheme`, which is why
 * `accent-500` here is green on ODC, red on trade, and so on — no colour is
 * passed in.
 */

export type HeroService = { label: string; icon: IconName; href: string };

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

export function SplitHero({
  trail,
  title,
  media,
  eyebrow,
  lead,
  services,
  cta,
  secondary,
}: {
  trail: { name: string; path: string }[];
  title: string;
  media: MediaKey;
  eyebrow: string;
  lead: string;
  services: HeroService[];
  cta: { label: string; href: string };
  /** Optional second action, rendered as a text link under the button. */
  secondary?: { label: string; href: string };
}) {
  return (
    <div className="bg-navy-900">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[240px] overflow-hidden sm:min-h-[360px] lg:min-h-[480px]">
          <Media slot={media} sizes="(min-width: 1024px) 50vw, 100vw" priority quality={85} />
          <MediaScrim side="bottom" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <nav aria-label="Breadcrumb">
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
                            className="transition-colors hover:text-accent-500"
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
            <h1 className="mt-3 max-w-[18ch] font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.03em] text-white sm:mt-4">
              {title}
            </h1>
          </div>
        </div>

        <div className="bg-grain relative flex flex-col justify-center bg-navy-800 bg-blueprint px-5 py-8 sm:px-10 sm:py-10 lg:py-14">
          <span className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-accent-500 sm:text-[11px] sm:tracking-[0.18em]">
            {eyebrow}
          </span>
          <p className="mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-navy-100 sm:mt-4 sm:text-[16.5px]">
            {lead}
          </p>

          <ul className="mt-5 divide-y divide-white/10 border-y border-white/10 sm:mt-7">
            {services.map((service, index) => (
              <li key={service.label} style={stagger(index)} className="stagger-item">
                <Link
                  href={service.href}
                  className="group flex items-center gap-3.5 py-2.5 transition-colors duration-200"
                >
                  <Icon
                    name={service.icon}
                    className="h-[18px] w-[18px] shrink-0 text-accent-500 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <span className="text-[14.5px] font-medium text-white group-hover:text-accent-500">
                    {service.label}
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    className="ml-auto h-3.5 w-3.5 shrink-0 text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent-500"
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
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
            <ButtonLink href={cta.href} size="lg" withArrow>
              {cta.label}
            </ButtonLink>
            {secondary ? (
              <Link
                href={secondary.href}
                className="inline-flex min-h-11 items-center justify-center text-[14.5px] font-semibold text-navy-100 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-accent-500 sm:justify-start"
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
