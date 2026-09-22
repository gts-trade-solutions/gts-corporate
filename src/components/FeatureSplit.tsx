import Link from "next/link";
import { ArrowLink } from "./Button";
import { Icon } from "./Icon";
import { Eyebrow } from "./Section";
import type { CategoryBlock } from "@/data/types";

/**
 * How many scope items a phone shows before the list is cut short.
 *
 * Five is roughly one thumb-scroll. The rest are one tap away on the page the
 * section already links to, which publishes the full list in context — so
 * nothing is hidden, it is just not all repeated on the home page.
 */
const MOBILE_ITEM_LIMIT = 5;

/**
 * Two-column section: narrative on one side, a hairline "spec sheet" grid of
 * scope items on the other. Used for the required home-page sections.
 */
export function FeatureSplit({
  block,
  eyebrow,
  index,
  link,
  reversed = false,
}: {
  block: CategoryBlock;
  eyebrow: string;
  index?: number;
  link?: { label: string; href: string };
  reversed?: boolean;
}) {
  /* Only truncate when there is somewhere to send people for the rest, and
     only when it saves more than a row or two. The cut is done in CSS, not by
     slicing the array, so every item stays in the HTML for crawlers and the
     full list is there the moment the viewport is wide enough. */
  const overflow = block.items.length - MOBILE_ITEM_LIMIT;
  const truncate = Boolean(link) && overflow > 1;

  return (
    <div id={block.id} className="grid scroll-mt-40 items-start gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-14">
      <div
        className={`sticky-heading self-start lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}
      >
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-[24px] font-bold leading-tight tracking-[-0.025em] text-ink sm:mt-4 sm:text-[30px] lg:text-[34px]">
          {block.title}
        </h2>
        <p className="mt-3 max-w-[52ch] text-pretty text-[15.5px] leading-relaxed text-ink-soft sm:mt-4 sm:text-[16.5px]">
          {block.summary}
        </p>
        {link ? (
          <ArrowLink href={link.href} className="mt-5 sm:mt-6">
            {link.label}
          </ArrowLink>
        ) : null}
      </div>

      <div className={`lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
        {/* Rows are tighter on a phone: the scope lists run to ten items and
            are a single column there, so the row padding is the difference
            between a readable list and half a screen of scrolling. */}
        <ul className="grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 sm:grid-cols-2">
          {block.items.map((item, index) => (
            <li
              key={item}
              className={`stagger-item group/row relative flex items-center gap-3 bg-white px-4 py-2.5 transition-colors duration-200 hover:bg-steel-50 sm:px-5 sm:py-4 ${
                truncate && index >= MOBILE_ITEM_LIMIT ? "max-sm:hidden" : ""
              }`}
              style={{ "--stagger-delay": `${index * 55}ms` } as React.CSSProperties}
            >
              {/* Accent bar that grows down the left edge on hover. */}
              <span
                className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/row:scale-y-100"
                aria-hidden="true"
              />
              <Icon
                name={block.icon}
                className="h-[18px] w-[18px] shrink-0 text-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/row:scale-110"
              />
              <span className="text-[14.5px] font-medium text-ink">{item}</span>
            </li>
          ))}

          {/* The tail of the list, on phones only. */}
          {truncate && link ? (
            <li className="bg-white sm:hidden">
              <Link
                href={link.href}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-[13.5px] font-semibold text-accent-700 transition-colors hover:bg-steel-50"
              >
                {overflow} more — see the full scope
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 shrink-0"
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
          ) : null}
        </ul>
      </div>
    </div>
  );
}
