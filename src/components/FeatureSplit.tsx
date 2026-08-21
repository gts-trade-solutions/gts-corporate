import { ArrowLink } from "./Button";
import { Icon } from "./Icon";
import { Eyebrow } from "./Section";
import type { CategoryBlock } from "@/data/types";

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
  return (
    <div id={block.id} className="grid scroll-mt-40 items-start gap-10 lg:grid-cols-12 lg:gap-14">
      <div
        className={`sticky-heading self-start lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}
      >
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.025em] text-ink sm:text-[34px]">
          {block.title}
        </h2>
        <p className="mt-4 max-w-[52ch] text-pretty text-[16.5px] leading-relaxed text-ink-soft">
          {block.summary}
        </p>
        {link ? (
          <ArrowLink href={link.href} className="mt-6">
            {link.label}
          </ArrowLink>
        ) : null}
      </div>

      <div className={`lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
        <ul className="grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 sm:grid-cols-2">
          {block.items.map((item, index) => (
            <li
              key={item}
              className="stagger-item group/row relative flex items-center gap-3 bg-white px-5 py-4 transition-colors duration-200 hover:bg-steel-50"
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
        </ul>
      </div>
    </div>
  );
}
