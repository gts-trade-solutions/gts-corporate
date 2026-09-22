import { ArrowLink } from "./Button";
import { Icon } from "./Icon";
import { Media } from "./Media";
import { componentsLabel } from "@/data/parts";
import type { CategoryBlock } from "@/data/types";

/**
 * Category card used for trade sections, vehicle segments, part categories
 * and manufacturing scope: icon + heading + summary + scope list, led by a
 * photograph when the block carries a `media` slot.
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
      className="keyline group relative flex h-full scroll-mt-40 flex-col overflow-hidden rounded-sm border border-steel-200 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
    >
      {block.media ? (
        <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-navy-900">
          <Media
            slot={block.media}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>
      ) : null}
      <div className="relative flex flex-1 flex-col p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-50 sm:h-12 sm:w-12 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white">
            <Icon name={block.icon} className="h-5 w-5 sm:h-[23px] sm:w-[23px]" />
          </span>
          <Heading className="pt-1.5 text-[17px] font-bold leading-snug text-ink sm:pt-2.5 sm:text-lg transition-colors duration-200 group-hover:text-navy-800">
            {block.title}
          </Heading>
        </div>

        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft sm:mt-4 sm:text-[15px]">{block.summary}</p>

        {block.items.length > 0 ? (
          <ul
            className={`mt-4 grid gap-x-6 gap-y-1.5 border-t border-steel-200 pt-4 text-[14px] text-ink-soft sm:mt-5 sm:gap-y-2 sm:pt-5 sm:text-[14.5px] ${
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
            <ArrowLink href={href}>View {componentsLabel(block.title).toLowerCase()}</ArrowLink>
          </span>
        ) : null}
      </div>
    </article>
  );
}
