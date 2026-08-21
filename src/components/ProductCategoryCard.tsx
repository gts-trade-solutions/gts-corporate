import { ArrowLink } from "./Button";
import { Icon } from "./Icon";
import type { CategoryBlock } from "@/data/types";

/**
 * Category card used for trade sections, vehicle segments, part categories
 * and manufacturing scope: icon + heading + summary + scope list.
 */
export function ProductCategoryCard({
  block,
  headingLevel: Heading = "h3",
  compact = false,
  href,
}: {
  block: CategoryBlock;
  headingLevel?: "h2" | "h3" | "h4";
  compact?: boolean;
  /** When set, the card gets a link through to its detail page. */
  href?: string;
}) {
  return (
    <article
      id={block.id}
      className="keyline group relative flex h-full scroll-mt-40 flex-col overflow-hidden rounded-sm border border-steel-200 bg-white p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white">
          <Icon name={block.icon} className="h-[23px] w-[23px]" />
        </span>
        <Heading className="pt-2.5 text-lg font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-navy-800">
          {block.title}
        </Heading>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{block.summary}</p>

      {block.items.length > 0 ? (
        <ul
          className={`mt-5 grid gap-x-6 gap-y-2 border-t border-steel-200 pt-5 text-[14.5px] text-ink-soft ${
            compact ? "sm:grid-cols-2" : ""
          }`}
        >
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span
                className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-150"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {href ? (
        <span className="mt-6 flex flex-1 items-end">
          <ArrowLink href={href}>View {block.title.toLowerCase()} components</ArrowLink>
        </span>
      ) : null}
    </article>
  );
}
