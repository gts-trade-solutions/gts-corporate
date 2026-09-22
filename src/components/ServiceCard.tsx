import Link from "next/link";
import { Icon } from "./Icon";
import { Media } from "./Media";
import type { Card } from "@/data/types";

const shell =
  "keyline group relative flex h-full flex-col overflow-hidden rounded-sm border border-steel-200 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift";

/**
 * Capability card: icon, heading, description and an optional scope list.
 *
 * With `media` the card leads with a photograph and the icon badge sits on its
 * lower edge. Landing pages pass the destination page's own slot, so the
 * picture a visitor clicks is the picture they arrive at.
 */
export function ServiceCard({
  title,
  description,
  icon,
  href,
  cta,
  bullets,
  media,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: Card & { sizes?: string }) {
  const body = (
    <>
      <span
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white sm:h-12 sm:w-12 ${
          media ? "-mt-10 bg-white shadow-card ring-4 ring-white sm:-mt-12" : "bg-navy-50"
        }`}
      >
        <Icon name={icon} className="h-5 w-5 sm:h-[23px] sm:w-[23px]" />
      </span>

      <h3 className="relative mt-3.5 text-[17px] font-bold tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-navy-800 sm:mt-5 sm:text-lg">
        {title}
      </h3>
      <p className="relative mt-2 text-[14.5px] leading-relaxed text-ink-soft sm:mt-2.5 sm:text-[15px]">
        {description}
      </p>

      {/* Two columns on a phone. These are short qualifier phrases, not
          sentences, so they read fine narrow. */}
      {bullets?.length ? (
        <ul className="relative mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 sm:mt-6 sm:grid-cols-1">
          {bullets.map((item) => (
            <li
              key={item}
              className="bg-white px-3 py-2 text-[13px] font-medium text-ink-soft transition-colors duration-200 group-hover:bg-steel-50 sm:px-4 sm:py-2.5 sm:text-[13.5px]"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  const photo = media ? (
    <div className="relative aspect-[2/1] shrink-0 overflow-hidden bg-navy-900 sm:aspect-[16/10]">
      <Media
        slot={media}
        sizes={sizes}
        className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
    </div>
  ) : null;

  const padding = "relative flex flex-1 flex-col p-4.5 sm:p-6";

  if (!href) {
    return (
      <div className={shell}>
        {photo}
        <div className={padding}>{body}</div>
      </div>
    );
  }

  return (
    <Link href={href} className={shell}>
      {photo}
      <div className={padding}>
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
      </div>
    </Link>
  );
}
