"use client";

import { useEffect, useRef, useState } from "react";

export type SectionNavItem = { id: string; label: string };

/**
 * Sticky in-page navigation with scroll-spy.
 *
 * Sits directly beneath the sticky header and highlights the section currently
 * in view, so long SEO pages stay navigable without adding top-level tabs.
 * Renders as plain anchor links, so it still works before hydration.
 */
export function SectionNav({ items }: { items: SectionNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // The section whose top has most recently passed the reading line.
      const line = window.innerHeight * 0.3;
      let current = sections[0]!.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      // At the very bottom, always highlight the last section.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1]!.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  // Keep the active chip in view when the bar scrolls horizontally on mobile.
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>(`[data-nav-id="${active}"]`);
    if (!list || !chip) return;
    const overflowsLeft = chip.offsetLeft < list.scrollLeft;
    const overflowsRight = chip.offsetLeft + chip.offsetWidth > list.scrollLeft + list.clientWidth;
    if (overflowsLeft || overflowsRight) {
      list.scrollTo({ left: chip.offsetLeft - 16, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav
      aria-label="Sections on this page"
      /* Pinned to the header's live height, which the header publishes as
         --header-h — it changes when the utility bar collapses on scroll. */
      style={{ top: "var(--header-h)" }}
      className="sticky z-40 border-y border-steel-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <ul ref={listRef} className="flex items-center gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  data-nav-id={item.id}
                  aria-current={isActive ? "true" : undefined}
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
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
