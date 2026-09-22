import Link from "next/link";

export type ModuleNavItem = { href: string; label: string };

/**
 * Sticky navigation across the pages a module is split into.
 *
 * The link-based counterpart to `SectionNav`: where that scroll-spies anchors
 * on one long page, this moves between sibling pages. The active item is passed
 * in rather than read from the router, so the bar is a server component — it
 * needs no JavaScript and is already correct in the first paint.
 *
 * Sits inside the module's `ModuleTheme` wrapper, so `accent-600` and the
 * steels below resolve to that section's palette.
 */
export function ModuleNav({ items, active }: { items: ModuleNavItem[]; active: string }) {
  return (
    <nav
      aria-label="Pages in this section"
      /* Pinned to the header's live height, which the header publishes as
         --header-h — it changes when the utility bar collapses on scroll. */
      style={{ top: "var(--header-h)" }}
      className="sticky z-40 border-y border-steel-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <ul className="flex items-center gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = item.href === active;
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative block rounded-sm px-3.5 py-2 text-[13.5px] font-semibold transition-colors duration-200 ${
                    isActive ? "text-navy-800" : "text-ink-soft hover:text-navy-800"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
