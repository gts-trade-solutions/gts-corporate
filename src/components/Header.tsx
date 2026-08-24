"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { contact, primaryNav, telHref, type NavItem } from "@/data/site";

/** The desktop bar omits Home — the logo already links there. */
const desktopNav = primaryNav.filter((item) => item.href !== "/");

/** Chevron that rotates when its dropdown is open. */
function Caret({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3 w-3 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "-rotate-180" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

/**
 * One dropdown topic in the desktop bar.
 *
 * The trigger is a button, not a link: on touch there is no hover, so a link
 * would navigate before the panel could ever open. The overview page is
 * therefore repeated as the first item inside the panel, which is also how the
 * reference design behaves.
 *
 * Opens on hover and on click, closes on Escape, on outside click and on
 * navigation. Hovering is a convenience — everything works from the keyboard.
 */
function NavDropdown({
  item,
  active,
  open,
  onOpen,
  onClose,
  isActive,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const wrapRef = useRef<HTMLLIElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /*
    Longest match wins. The overview page is repeated as the first child, and
    its href is a prefix of its siblings' — without this, /odc-logistics/reports
    would light up both "ODC Logistics" and "LBI Reports". Prefix matching is
    still what decides it, so /vehicle-models/swift correctly marks
    "Vehicle Models".
  */
  const currentChild = item.children
    ?.filter((child) => isActive(child.href))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  // Escape closes and returns focus to the trigger.
  const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      onClose();
      wrapRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      return;
    }
    if ((event.key === "ArrowDown" || event.key === "Enter") && !open) {
      onOpen();
    }
  };

  /* Closing on blur rather than only on outside click means tabbing past the
     last item in the panel closes it, which is what a keyboard user expects. */
  const onBlur = (event: React.FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onClose();
  };

  return (
    <li
      ref={wrapRef}
      className="relative shrink-0"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
        className={`group relative flex items-center gap-1.5 whitespace-nowrap rounded-sm px-2 py-2 text-[14.5px] font-semibold transition-colors duration-200 2xl:px-2.5 ${
          active ? "text-navy-800" : "text-ink-soft hover:text-navy-800"
        }`}
      >
        {item.label}
        <Caret open={open} />
        <span
          className={`absolute inset-x-2 bottom-0.5 h-[2.5px] origin-left rounded-full bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] 2xl:inset-x-2.5 ${
            active || open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
          aria-hidden="true"
        />
      </button>

      {/* No vertical gap between trigger and panel, so the pointer can travel
          into the panel without crossing dead space and closing it. */}
      <div
        ref={panelRef}
        className={`absolute left-0 top-full z-50 w-[336px] origin-top-left pt-2 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-sm border border-steel-200 bg-white shadow-lift">
          {item.panelTitle && item.panelTitle !== item.label ? (
            <p className="border-b border-steel-200 bg-steel-50 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-700">
              {item.panelTitle}
            </p>
          ) : null}
          <ul>
            {item.children?.map((child) => {
              const childActive = child.href === currentChild;
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    tabIndex={open ? undefined : -1}
                    aria-current={childActive ? "page" : undefined}
                    onClick={onClose}
                    className={`group/item block border-b border-steel-100 px-4 py-3 transition-colors duration-200 last:border-b-0 hover:bg-steel-50 ${
                      childActive ? "bg-steel-50" : ""
                    }`}
                  >
                    <span
                      className={`flex items-center gap-1.5 text-[14.5px] font-semibold transition-colors duration-200 ${
                        childActive ? "text-accent-700" : "text-ink group-hover/item:text-navy-800"
                      }`}
                    >
                      {child.label}
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3 w-3 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:translate-x-0 group-hover/item:opacity-100"
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
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-muted">
                      {child.description}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu and any dropdown whenever the route changes.
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
    setOpenMenu(null);
    setOpenMobileGroup(null);
  }

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Drives the drop shadow only — deliberately nothing that changes height.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
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

  /*
    Publish the header bar's height so the sticky in-page SectionNav can pin
    directly beneath it. Only the bar is measured — not the expanded mobile menu,
    and not the dropdown panels, which are absolutely positioned and so never
    change it.
  */
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // A click anywhere else closes an open dropdown.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  /** A dropdown topic is active when the current page is any of its children. */
  const isItemActive = (item: NavItem) =>
    item.children ? item.children.some((child) => isActive(child.href)) : isActive(item.href);

  /** Longest matching child — see the note in NavDropdown. */
  const currentChildOf = (item: NavItem) =>
    item.children
      ?.filter((child) => isActive(child.href))
      .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-steel-200 bg-white/95 backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-white/85 ${
        scrolled ? "shadow-[0_10px_28px_-20px_rgb(8_25_43/0.55)]" : "shadow-none"
      }`}
    >
      <div ref={barRef}>
        {/* Wider than the page container at 2xl: the row carries a logo, eight
            nav slots and a CTA, and 1280px does not fit them at full spacing.
            Page content stays at max-w-7xl. */}
        <Container className="flex h-[70px] items-center justify-between gap-3 sm:gap-6 xl:gap-4 2xl:max-w-[1440px] 2xl:gap-6">
          <Logo />

          {/* Home is deliberately absent from the desktop bar — the logo is the
              home link, and the row does not fit eight labels plus the CTA. It
              is still the first item in the mobile menu. */}
          <nav aria-label="Primary" className="hidden min-w-0 xl:block">
            <ul className="flex items-center gap-0">
              {desktopNav.map((item) =>
                item.children ? (
                  <NavDropdown
                    key={item.href}
                    item={item}
                    active={isItemActive(item)}
                    open={openMenu === item.href}
                    onOpen={() => setOpenMenu(item.href)}
                    onClose={() => setOpenMenu(null)}
                    isActive={isActive}
                  />
                ) : (
                  <li key={item.href} className="shrink-0">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onMouseEnter={() => setOpenMenu(null)}
                      className={`group relative block whitespace-nowrap rounded-sm px-2 py-2 text-[14.5px] font-semibold transition-colors duration-200 2xl:px-2.5 ${
                        isActive(item.href) ? "text-navy-800" : "text-ink-soft hover:text-navy-800"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute inset-x-2 bottom-0.5 h-[2.5px] origin-left rounded-full bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] 2xl:inset-x-2.5 ${
                          isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={telHref(contact.phones[0])}
              className="shrink-0 rounded-sm border border-steel-300 px-3.5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-navy-700 hover:text-navy-700 lg:hidden"
            >
              Call
            </a>
            <ButtonLink href="/contact" className="max-sm:hidden" withArrow>
              Request a Quote
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-steel-300 text-ink transition-colors duration-200 hover:border-navy-700 xl:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {/* Three bars that morph into a cross. */}
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-[2px] w-5 rounded-full bg-current transition-all duration-200 ${
                    open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile menu — animated open, with the links stepping in one by one.
          Dropdown topics become inline expanding groups; there is no hover on
          touch, so they are toggled by their own button. */}
      <div
        id="mobile-nav"
        className={`grid overflow-hidden border-steel-200 bg-white transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden ${
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <Container className="max-h-[calc(100dvh-70px)] overflow-y-auto py-4">
            <ul className="flex flex-col">
              {primaryNav.map((item, index) => {
                const rowStyle = {
                  transitionDelay: open ? `${60 + index * 45}ms` : "0ms",
                };
                const rowClass = `flex w-full items-center justify-between border-b border-steel-100 py-3.5 text-left text-[15px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                }`;

                if (!item.children) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        style={rowStyle}
                        className={`${rowClass} ${isActive(item.href) ? "text-accent-700" : "text-ink"}`}
                      >
                        {item.label}
                        <svg viewBox="0 0 16 16" className="h-4 w-4 text-ink-muted" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M6 3l5 5-5 5" />
                        </svg>
                      </Link>
                    </li>
                  );
                }

                const groupOpen = openMobileGroup === item.href;
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      aria-expanded={groupOpen}
                      onClick={() => setOpenMobileGroup(groupOpen ? null : item.href)}
                      style={rowStyle}
                      className={`${rowClass} ${
                        isItemActive(item) ? "text-accent-700" : "text-ink"
                      } ${groupOpen ? "border-b-transparent" : ""}`}
                    >
                      {item.panelTitle ?? item.label}
                      <span className="text-ink-muted">
                        <Caret open={groupOpen} />
                      </span>
                    </button>

                    <div
                      className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        groupOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="mb-1 border-b border-steel-100 pb-1 pl-4">
                          {item.children.map((child) => {
                            const childActive = child.href === currentChildOf(item);
                            return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                aria-current={childActive ? "page" : undefined}
                                className={`flex items-center justify-between border-l-2 py-3 pl-4 text-[14.5px] font-medium transition-colors duration-200 ${
                                  childActive
                                    ? "border-accent-600 text-accent-700"
                                    : "border-steel-200 text-ink-soft"
                                }`}
                              >
                                {child.label}
                                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-ink-muted" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M6 3l5 5-5 5" />
                                </svg>
                              </Link>
                            </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 flex flex-col gap-2.5">
              <ButtonLink href="/contact" size="lg" className="w-full" withArrow>
                Request a Quote
              </ButtonLink>
              <a
                href={telHref(contact.phones[0])}
                className="flex w-full items-center justify-center rounded-sm border border-steel-300 px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-navy-700"
              >
                {contact.phones[0]}
              </a>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
