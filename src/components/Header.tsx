"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileTabBar } from "./MobileTabBar";
import { SiteSearch, useSearchHotkey } from "./SiteSearch";
import {
  contact,
  mailtoHref,
  primaryNav,
  teamsHref,
  whatsappHref,
  type NavItem,
} from "@/data/site";

/**
 * The desktop bar omits Home and Contact.
 *
 * Home because the logo already links there. Contact because the button
 * immediately to its right — "Request a Quote" — goes to the same page, and
 * the row does not fit both plus the search button: measured at 1280px, the
 * search button overlapped the Contact link by 47px. Contact is still in the
 * footer, the mobile drawer, the phone tab bar and the sitemap.
 *
 * Before adding anything else to this row, measure it. See the fit budget note
 * in the README.
 */
const desktopNav = primaryNav.filter((item) => item.href !== "/" && item.href !== "/contact");

/** Chevron that rotates when its dropdown is open. */
function Caret({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-2.5 w-2.5 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
    would light up both "ODC Logistics" and "Reports". Prefix matching is
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
        className={`group relative flex items-center gap-1 whitespace-nowrap rounded-sm px-1.5 py-2 text-[14.5px] font-semibold transition-colors duration-200 2xl:px-2 ${
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const email = mailtoHref();
  const whatsapp = whatsappHref();
  const teams = teamsHref();

  useSearchHotkey(useCallback(() => setSearchOpen(true), []));

  // Close the drawer and any dropdown whenever the route changes.
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
    setOpenMenu(null);
    setOpenMobileGroup(null);
  }

  // Prevent background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape closes the drawer and hands focus back to the button that opened
     it, so keyboard users are not dropped at the top of the document. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (open) drawerRef.current?.focus();
  }, [open]);

  /* Drives the shadow and collapses the utility row. The row is the only thing
     that changes the bar's height, and the ResizeObserver below republishes
     --header-h when it does. */
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
    Publish the header bar's height so the sticky in-page SectionNav and the
    ModuleNav can pin directly beneath it. Only the bar is measured — not the
    drawer, which is fixed, and not the dropdown panels, which are absolutely
    positioned and so never change it.
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

  const iconButton =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-steel-300 text-ink transition-colors duration-200 hover:border-navy-700 hover:text-navy-700";

  return (
    <>
      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Phones get a fixed bottom tab bar instead of reaching for the header.
          Two of its tabs drive state this component owns, which is why it is
          mounted here rather than alongside the other floating chrome. */}
      <MobileTabBar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenMenu={() => setOpen((v) => !v)}
        menuOpen={open}
      />

      <header
        className={`sticky top-0 z-50 border-b border-steel-200 bg-white/95 backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-white/85 ${
          scrolled ? "shadow-[0_10px_28px_-20px] shadow-navy-800/55" : "shadow-none"
        }`}
      >
        <div ref={barRef}>
          {/*
            Utility row. Carries the published email address and the messaging
            channels, and collapses on scroll so the sticky bar returns to its
            70px travelling height. Every item is conditional — an unset
            environment variable removes it rather than rendering a dead link.
          */}
          {email || whatsapp || teams ? (
            <div
              className={`hidden overflow-hidden border-b border-steel-100 bg-steel-50 transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
                scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
              }`}
            >
              <Container className="flex h-10 items-center justify-between gap-6">
                <p className="truncate text-[12.5px] text-ink-muted">{contact.businessHours}</p>
                <div className="flex shrink-0 items-center gap-5 text-[12.5px] font-semibold">
                  {email ? (
                    <a
                      href={email}
                      className="flex items-center gap-1.5 text-ink-soft transition-colors hover:text-navy-800"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      >
                        <rect x="2.5" y="5" width="19" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                      {contact.email}
                    </a>
                  ) : null}
                  {whatsapp ? (
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-soft transition-colors hover:text-navy-800"
                    >
                      WhatsApp
                    </a>
                  ) : null}
                  {teams ? (
                    <a
                      href={teams}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-soft transition-colors hover:text-navy-800"
                    >
                      Microsoft Teams
                    </a>
                  ) : null}
                </div>
              </Container>
            </div>
          ) : null}

          {/* Wider than the page container at 2xl: the row carries a logo, eight
              nav slots and a CTA, and 1280px does not fit them at full spacing.
              Page content stays at max-w-7xl. */}
          <Container className="flex h-[70px] items-center justify-between gap-3 sm:gap-6 xl:gap-3 2xl:max-w-[1440px] 2xl:gap-4">
            <Logo />

            {/* Home is deliberately absent from the desktop bar — the logo is the
                home link, and the row does not fit eight labels plus the CTA. It
                is still the first item in the drawer. */}
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
                        className={`group relative block whitespace-nowrap rounded-sm px-1.5 py-2 text-[14.5px] font-semibold transition-colors duration-200 2xl:px-2 ${
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
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={iconButton}
                title="Search this site (Ctrl+K)"
              >
                <span className="sr-only">Search this site</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>

              <ButtonLink href="/contact" className="max-sm:hidden" withArrow>
                Request a Quote
              </ButtonLink>

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                className={`${iconButton} xl:hidden`}
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
      </header>

      {/*
        Mobile navigation — an off-canvas drawer rather than a panel that pushes
        the page down.

        Two reasons it is a drawer: the nav is nineteen destinations deep, and a
        push-down menu that long leaves the visitor scrolling the document to
        reach the last item and the contact block; and the drawer keeps its own
        scroll, so opening a topic never moves the page behind it.

        It sits outside <header> so it is not inside a stacking context created
        by the sticky bar, and so the backdrop can cover the bar itself.
      */}
      <div
        className={`fixed inset-0 z-[55] xl:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-navy-900/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="sr-only">Close menu</span>
        </button>

        <div
          id="mobile-nav"
          ref={drawerRef}
          tabIndex={-1}
          role="dialog"
          aria-modal={open}
          aria-label="Site menu"
          className={`absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col bg-white shadow-raise outline-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-steel-200 px-5">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-sm text-ink-soft transition-colors hover:bg-steel-50 hover:text-navy-800"
            >
              <span className="sr-only">Close menu</span>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => {
                setOpen(false);
                setSearchOpen(true);
              }}
              className="flex w-full items-center gap-2.5 rounded-sm border border-steel-200 bg-steel-50 px-3.5 py-3 text-left text-[14px] text-ink-muted transition-colors hover:border-navy-700"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              Search parts, models, services…
            </button>

            <ul className="mt-4 flex flex-col">
              {primaryNav.map((item) => {
                const rowClass =
                  "flex w-full items-center justify-between border-b border-steel-100 py-3.5 text-left text-[15px] font-semibold";

                if (!item.children) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        tabIndex={open ? 0 : -1}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`${rowClass} ${isActive(item.href) ? "text-accent-700" : "text-ink"}`}
                      >
                        {item.label}
                        <svg
                          viewBox="0 0 16 16"
                          className="h-4 w-4 text-ink-muted"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
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
                      tabIndex={open ? 0 : -1}
                      aria-expanded={groupOpen}
                      onClick={() => setOpenMobileGroup(groupOpen ? null : item.href)}
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
                        <ul className="mb-1 border-b border-steel-100 pb-1 pl-1">
                          {item.children.map((child) => {
                            const childActive = child.href === currentChildOf(item);
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  tabIndex={open && groupOpen ? 0 : -1}
                                  aria-current={childActive ? "page" : undefined}
                                  className={`flex items-center justify-between border-l-2 py-3 pl-4 text-[14.5px] font-medium transition-colors duration-200 ${
                                    childActive
                                      ? "border-accent-600 text-accent-700"
                                      : "border-steel-200 text-ink-soft"
                                  }`}
                                >
                                  {child.label}
                                  <svg
                                    viewBox="0 0 16 16"
                                    className="h-3.5 w-3.5 text-ink-muted"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
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

            {/* Contact block. Mirrors the utility row, plus the office numbers
                as plain text — nothing here dials. */}
            <div className="mt-6 rounded-sm border border-steel-200 bg-steel-50 p-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
                Talk to us
              </h2>
              <ul className="mt-3 space-y-2.5 text-[14px]">
                {email ? (
                  <li>
                    <a
                      href={email}
                      tabIndex={open ? 0 : -1}
                      className="font-semibold text-navy-800 underline underline-offset-2"
                    >
                      {contact.email}
                    </a>
                  </li>
                ) : null}
                {whatsapp ? (
                  <li>
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={open ? 0 : -1}
                      className="font-semibold text-navy-800 underline underline-offset-2"
                    >
                      Chat on WhatsApp
                    </a>
                  </li>
                ) : null}
                {teams ? (
                  <li>
                    <a
                      href={teams}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={open ? 0 : -1}
                      className="font-semibold text-navy-800 underline underline-offset-2"
                    >
                      Microsoft Teams
                    </a>
                  </li>
                ) : null}
                <li className="pt-1 text-ink-muted">{contact.phones.join(" · ")}</li>
                <li className="text-ink-muted">{contact.businessHours}</li>
              </ul>
            </div>
          </div>

          <div className="shrink-0 border-t border-steel-200 p-4">
            <ButtonLink
              href="/contact"
              size="lg"
              className="w-full"
              withArrow
              tabIndex={open ? 0 : -1}
            >
              Request a Quote
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
