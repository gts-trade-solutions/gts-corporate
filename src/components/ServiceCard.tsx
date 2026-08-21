import Link from "next/link";
import { Icon } from "./Icon";
import type { Card } from "@/data/types";

const shell =
  "keyline group relative flex h-full flex-col overflow-hidden rounded-sm border border-steel-200 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift";

/**
 * Capability card. `featured` gives it the larger treatment used for the lead
 * tile of the home-page bento grid: bigger type and a blueprint corner motif.
 */
export function ServiceCard({
  title,
  description,
  icon,
  href,
  cta,
  bullets,
  featured = false,
}: Card & { featured?: boolean }) {
  const body = (
    <>
      {featured ? (
        /* Blueprint grid bleeding out of the top-right corner. */
        <span
          className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 bg-blueprint-ink [mask-image:radial-gradient(circle,black,transparent_70%)]"
          aria-hidden="true"
        />
      ) : null}

      <span
        className={`relative flex shrink-0 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white ${
          featured ? "h-14 w-14" : "h-12 w-12"
        }`}
      >
        <Icon name={icon} className={featured ? "h-7 w-7" : "h-[23px] w-[23px]"} />
      </span>

      <h3
        className={`relative mt-5 font-bold tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-navy-800 ${
          featured ? "text-[26px] leading-tight" : "text-lg"
        }`}
      >
        {title}
      </h3>
      <p
        className={`relative mt-2.5 leading-relaxed text-ink-soft ${
          featured ? "max-w-md text-[16px]" : "text-[15px]"
        }`}
      >
        {description}
      </p>

      {bullets?.length ? (
        <ul className="relative mt-6 grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200">
          {bullets.map((item) => (
            <li
              key={item}
              className="bg-white px-4 py-2.5 text-[13.5px] font-medium text-ink-soft transition-colors duration-200 group-hover:bg-steel-50"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  const padding = featured ? "p-7 sm:p-8" : "p-6";

  if (!href) {
    return <div className={`${shell} ${padding}`}>{body}</div>;
  }

  return (
    <Link href={href} className={`${shell} ${padding}`}>
      {body}
      {cta ? (
        /* Styled as a link but rendered as a span — the whole card is the anchor. */
        <span className="relative mt-6 flex flex-1 items-end">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors duration-200 group-hover:text-accent-700">
            {cta}
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </span>
      ) : null}
    </Link>
  );
}
