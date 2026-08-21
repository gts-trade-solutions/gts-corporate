"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { contact, primaryNav, telHref } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);
  const barRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu whenever the route changes.
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
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
    directly beneath it. Only the bar is measured — not the expanded mobile menu.
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
      <header
        className={`sticky top-0 z-50 border-b border-steel-200 bg-white/95 backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-white/85 ${
          scrolled ? "shadow-[0_10px_28px_-20px_rgb(8_25_43/0.55)]" : "shadow-none"
        }`}
      >
        <div ref={barRef}>
          <Container className="flex h-[70px] items-center justify-between gap-3 sm:gap-6">
            <Logo />

            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-1">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`group relative block rounded-sm px-3.5 py-2 text-[14.5px] font-semibold transition-colors duration-200 ${
                        isActive(item.href) ? "text-navy-800" : "text-ink-soft hover:text-navy-800"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute inset-x-3.5 bottom-0.5 h-[2.5px] origin-left rounded-full bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
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

        {/* Mobile menu — animated open, with the links stepping in one by one. */}
        <div
          id="mobile-nav"
          className={`grid overflow-hidden border-steel-200 bg-white transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden ${
            open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <Container className="py-4">
              <ul className="flex flex-col">
                {primaryNav.map((item, index) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      style={{ transitionDelay: open ? `${60 + index * 45}ms` : "0ms" }}
                      className={`flex items-center justify-between border-b border-steel-100 py-3.5 text-[15px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                      } ${isActive(item.href) ? "text-accent-700" : "text-ink"}`}
                    >
                      {item.label}
                      <svg viewBox="0 0 16 16" className="h-4 w-4 text-ink-muted" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 3l5 5-5 5" />
                      </svg>
                    </Link>
                  </li>
                ))}
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
