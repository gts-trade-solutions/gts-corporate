"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

/**
 * The fixed bottom tab bar, phones only.
 *
 * Four tabs plus a raised back-to-top button, following the reference layout:
 * a dark bar pinned to the bottom of the viewport with an icon over a short
 * label in each slot, the last of which opens the navigation drawer.
 *
 * It is rendered by `Header` rather than standing on its own, because two of
 * the four tabs drive state the header owns — the search dialog and the
 * drawer. The remaining two are ordinary links.
 *
 * `FloatingActions` positions the assistant launcher and the Talk to Expert
 * pill directly above this bar; the offsets there and the bar's height here
 * are a pair. Changing one means changing the other.
 */

export const TAB_BAR_HEIGHT = 64;

/**
 * Tab glyphs.
 *
 * Search and Parts come from the site's own icon set, so they are the same
 * drawings used everywhere else — a hand-rolled cog here read as a sun at
 * 22px. Contact and Menu have no equivalent in that set and are drawn to
 * match its 24px grid and 1.5 stroke.
 */
function TabIcon({ name }: { name: "search" | "parts" | "contact" | "menu" }) {
  const size = "h-[22px] w-[22px]";

  if (name === "search") return <Icon name="search" className={size} />;
  if (name === "parts") return <Icon name="gear" className={size} />;

  return (
    <svg
      viewBox="0 0 24 24"
      className={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "contact" ? (
        <>
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="m3 7.5 9 6 9-6" />
        </>
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export function MobileTabBar({
  onOpenSearch,
  onOpenMenu,
  menuOpen,
}: {
  onOpenSearch: () => void;
  onOpenMenu: () => void;
  menuOpen: boolean;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // The back-to-top button is pointless before there is anything to go back to.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 520);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const tab =
    "flex flex-1 flex-col items-center justify-center gap-1 px-1 py-2 text-[10.5px] font-semibold tracking-[0.01em] transition-colors duration-200";
  const inactive = "text-navy-100 hover:text-white";
  const active = "text-accent-500";

  return (
    <>
      {/* Raised back-to-top, sitting clear above the bar rather than straddling
          it — on the reference it overlaps the first tab, which makes that tab
          hard to hit. */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-accent-700 text-white shadow-raise transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          scrolled ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
        }`}
        style={{ bottom: `${TAB_BAR_HEIGHT + 12}px` }}
      >
        <span className="sr-only">Back to top</span>
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      <nav
        aria-label="Quick navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy-900 md:hidden"
        style={{
          height: `${TAB_BAR_HEIGHT}px`,
          /* Clears the iOS home indicator, so the labels are not sitting under
             the gesture bar on a notched phone. */
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="flex h-full items-stretch">
          <button type="button" onClick={onOpenSearch} className={`${tab} ${inactive}`}>
            <TabIcon name="search" />
            Search
          </button>

          <Link
            href="/automotive-parts"
            className={`${tab} ${isActive("/automotive-parts") ? active : inactive}`}
          >
            <TabIcon name="parts" />
            Parts
          </Link>

          <Link
            href="/contact"
            className={`${tab} ${isActive("/contact") ? active : inactive}`}
          >
            <TabIcon name="contact" />
            Contact
          </Link>

          <button
            type="button"
            onClick={onOpenMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className={`${tab} ${menuOpen ? active : inactive}`}
          >
            <TabIcon name="menu" />
            Menu
          </button>
        </div>
      </nav>
    </>
  );
}
