"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "../Container";

/**
 * The horizontal topic strip that sits directly under an ODC page's hero,
 * following the reference layout. It is a sibling-navigation bar, not an
 * in-page nav — each entry is a route.
 *
 * This is the ODC section's equivalent of `ModuleNav`, which the other modules
 * use. It is a separate component because the ODC pages follow the reference's
 * darker layout, and it carries a second group: `related` entries link out to
 * the modules an ODC enquiry most often continues into. They sit after a
 * divider so they never read as pages within this section.
 *
 * Sticky beneath the header, like `ModuleNav` — the ODC pages are long, and a
 * nav that scrolls away at the top of a 4,000px page is one nobody uses.
 *
 * Scrolls horizontally on narrow screens rather than wrapping, so the strip
 * stays one line at every width.
 */
export function TopicTabs({
  items,
  related = [],
}: {
  items: { label: string; href: string }[];
  related?: { label: string; href: string }[];
}) {
  const pathname = usePathname();

  const tab = (item: { label: string; href: string }, muted: boolean) => {
    const active = pathname === item.href;
    return (
      <li key={item.href} className="shrink-0 flex-1">
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={`relative block whitespace-nowrap px-6 py-4 text-center text-[14px] font-semibold transition-colors duration-200 ${
            active
              ? "bg-white/10 text-white"
              : muted
                ? "text-navy-200 hover:bg-white/5 hover:text-white"
                : "text-navy-100 hover:bg-white/5 hover:text-white"
          }`}
        >
          {item.label}
          <span
            className={`absolute inset-x-4 bottom-0 h-[2.5px] origin-left rounded-full bg-accent-500 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              active ? "scale-x-100" : "scale-x-0"
            }`}
            aria-hidden="true"
          />
        </Link>
      </li>
    );
  };

  return (
    <nav
      aria-label="ODC Logistics pages"
      /* Pinned to the header's live height, which the header publishes as
         --header-h — it changes when the utility row collapses on scroll. */
      style={{ top: "var(--header-h)" }}
      className="sticky z-40 border-y border-steel-200 bg-navy-800"
    >
      <Container className="px-0 sm:px-0 lg:px-0">
        <ul className="flex items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => tab(item, false))}
          {related.length ? (
            <li
              className="my-3 w-px shrink-0 bg-white/20"
              role="separator"
              aria-orientation="vertical"
            />
          ) : null}
          {related.map((item) => tab(item, true))}
        </ul>
      </Container>
    </nav>
  );
}
