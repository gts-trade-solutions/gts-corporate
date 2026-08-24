"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "../Container";

/**
 * The horizontal topic strip that sits directly under the route-survey hero,
 * following the reference layout. It is a sibling-navigation bar, not an
 * in-page nav — each entry is a route.
 *
 * Scrolls horizontally on narrow screens rather than wrapping, so the strip
 * stays one line at every width.
 */
export function TopicTabs({ items }: { items: { label: string; href: string }[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Related services" className="border-y border-steel-200 bg-navy-800">
      <Container className="px-0 sm:px-0 lg:px-0">
        <ul className="flex items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href} className="shrink-0 flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative block whitespace-nowrap px-6 py-4 text-center text-[14px] font-semibold transition-colors duration-200 ${
                    active ? "bg-white/10 text-white" : "text-navy-100 hover:bg-white/5 hover:text-white"
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
          })}
        </ul>
      </Container>
    </nav>
  );
}
