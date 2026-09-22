"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import { ChatPanel } from "./ChatPanel";
import { TAB_BAR_HEIGHT } from "./MobileTabBar";
import { contact, primaryContactAction, teamsHref, whatsappHref } from "@/data/site";

/**
 * The floating conversion chrome: Talk to Expert, the assistant launcher, and
 * the desktop messaging rail.
 *
 * Split by breakpoint, because the two layouts have different furniture:
 *
 *  - **Phone** — the tab bar (`MobileTabBar`, mounted by `Header`) owns the
 *    bottom edge and carries navigation and back-to-top. This component adds
 *    one row directly above it: the Talk to Expert pill beside the assistant
 *    bubble, matching the reference layout.
 *  - **Desktop** — no tab bar, so the assistant sits in the corner with the
 *    WhatsApp / Teams / back-to-top rail stacked above it.
 *
 * The assistant launcher is always visible, on every page, so visitors can
 * find it. Everything else waits until the visitor has scrolled, so none of it
 * lands on a hero call to action.
 *
 * The launcher never covers a control: an element marked `data-float-clear`
 * (the home banner's slide selector, which sits along the bottom of the
 * viewport) lifts it while that element is in the bottom band of the screen.
 *
 * There is no Call button. WhatsApp replaced it across the whole site.
 */

/** Set once a visitor has seen and dismissed the hint, or opened the chat. */
const NUDGE_KEY = "gts-assistant-nudged";

const readFlag = () => {
  try {
    return window.localStorage.getItem(NUDGE_KEY) === "1";
  } catch {
    return false;
  }
};
const writeFlag = () => {
  try {
    window.localStorage.setItem(NUDGE_KEY, "1");
  } catch {
    /* Storage blocked — the hint simply shows again next visit. */
  }
};

export function FloatingActions() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [clearance, setClearance] = useState(0);
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 520);

      // Lift the launcher above bottom-pinned page chrome while it occupies
      // the bottom band of the viewport; drop back once it has scrolled away.
      const chrome = document.querySelector<HTMLElement>("[data-float-clear]");
      const rect = chrome?.getBoundingClientRect();
      const inBand = rect && rect.top > 0 && rect.bottom > window.innerHeight - 100;
      setClearance(inBand ? Math.round(window.innerHeight - rect.top + 12) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // Re-measure on navigation: the chrome to clear belongs to the page.
  }, [pathname]);

  // A one-time hint beside the launcher, a few seconds into the first visit.
  useEffect(() => {
    if (readFlag()) return;
    const timer = window.setTimeout(() => setNudge(true), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissNudge = () => {
    setNudge(false);
    writeFlag();
  };

  const toggleChat = () => {
    dismissNudge();
    setChatOpen((value) => !value);
  };

  // The contact page is the destination — no need to push people back to it.
  const showBar = scrolled && pathname !== "/contact";
  const whatsapp = whatsappHref();
  const teams = teamsHref();

  /* Talk to Expert goes to WhatsApp when a number is configured, then email,
     then the enquiry form — so the pill is never a dead link. */
  const expert = primaryContactAction(
    "Hello GTS Trade Solutions, I would like to speak to an expert about a requirement.",
  );

  const railButton =
    "flex h-11 w-11 items-center justify-center rounded-full border border-steel-200 bg-white text-navy-800 shadow-card transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-navy-700 hover:shadow-lift";

  return (
    <aside aria-label="Quick actions">
      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />

      {/*
        Talk to Expert, beside the assistant launcher.

        The pill is the human channel and the bubble is the assistant — they sit
        together so the choice between them is obvious. On a phone the pair rides
        directly above the tab bar; the offset below is paired with
        TAB_BAR_HEIGHT, so changing one means changing the other.

        The pill appears only after a scroll, at every width. It was pinned
        visible on desktop, which put it straight on top of the split hero's
        own call-to-action row — the two occupy the same corner.
      */}
      {/*
        The offset is carried as a custom property rather than an inline
        `bottom`, because an inline style beats every class — including
        `md:bottom-6`, which is what puts this row back in the corner once the
        tab bar is gone. Setting it inline pinned the row at the phone offset
        on desktop too, where it collided with the rail below.
      */}
      <div
        className="fixed bottom-[max(var(--tab-offset),var(--clear))] right-4 z-40 flex items-center gap-2.5 transition-[bottom] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:bottom-[max(1.5rem,var(--clear))] md:right-6"
        style={
          { "--tab-offset": `${TAB_BAR_HEIGHT + 12}px`, "--clear": `${clearance}px` } as CSSProperties
        }
      >
        {/* The hint shows only while the launcher is lifted over the home
            banner (clearance > 0), and only from md up. There the space above
            the launcher is photograph — the headline and buttons are on the
            left — so it cannot cover a call to action, and the rail and Talk to
            Expert pill are still hidden. On a phone the text spans the full
            width, so the bubble goes without it. */}
        {nudge && clearance > 0 && !scrolled && !chatOpen ? (
          <div
            role="status"
            className="absolute bottom-full right-0 mb-3 hidden w-64 rounded-lg border border-steel-200 bg-white p-3.5 pr-9 text-[13.5px] leading-snug text-ink-soft shadow-raise md:block"
          >
            <p>
              <strong className="font-semibold text-ink">Need a hand?</strong> Ask me about parts,
              vehicle models, manufacturing or shipping.
            </p>
            <button
              type="button"
              onClick={toggleChat}
              className="mt-2 text-[13px] font-semibold text-accent-700 underline underline-offset-2 hover:text-accent-600"
            >
              Ask a question
            </button>
            <button
              type="button"
              onClick={dismissNudge}
              className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-sm text-ink-muted hover:bg-steel-50 hover:text-ink"
            >
              <span className="sr-only">Dismiss</span>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : null}

        <a
          href={expert.href}
          {...(expert.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`rounded-full bg-accent-700 px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-raise transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent-600 ${
            showBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
          }`}
          aria-hidden={showBar ? undefined : true}
          tabIndex={showBar ? undefined : -1}
        >
          Talk to Expert
        </a>

        <button
          type="button"
          onClick={toggleChat}
          aria-expanded={chatOpen}
          aria-controls="gts-assistant"
          title={chatOpen ? "Close the assistant" : "Ask the GTS assistant"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-800 text-white shadow-raise transition-transform duration-200 hover:scale-110 md:h-14 md:w-14"
        >
        <span className="sr-only">
          {chatOpen ? "Close the GTS assistant" : "Ask the GTS assistant"}
        </span>
        {chatOpen ? (
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
          </svg>
        )}
        </button>
      </div>

      {/*
        The messaging rail is desktop-only now. On a phone these actions are
        already covered: WhatsApp by the Talk to Expert pill, back-to-top by the
        raised button on the tab bar. Stacking them again would be three columns
        of circles over the content.

        Hidden while the assistant is open — the panel occupies this column.
      */}
      <div
        className={`fixed bottom-24 right-6 z-40 hidden flex-col items-center gap-3 transition-opacity duration-200 md:flex ${
          chatOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {whatsapp ? (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-raise transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 ${
              scrolled ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
            }`}
          >
            <span className="sr-only">Chat with GTS Trade Solutions on WhatsApp</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7.59.26 1.04.4 1.4.51.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
            </svg>
          </a>
        ) : null}

        {teams ? (
          <a
            href={teams}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-[#4B53BC] text-white shadow-raise transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 ${
              scrolled ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
            }`}
          >
            <span className="sr-only">Message GTS Trade Solutions on Microsoft Teams</span>
            <svg
              viewBox="0 0 24 24"
              className="h-[22px] w-[22px]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14.5 8.5h6A1.5 1.5 0 0 1 22 10v4.2a3.8 3.8 0 0 1-3.8 3.8h-.2a3.5 3.5 0 0 1-3.5-3.5v-6Zm3.25-5.25a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM10 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 9h11a.5.5 0 0 1 .5.5v6.2A5.3 5.3 0 0 1 8.7 21H8A6 6 0 0 1 2 15V9.5a.5.5 0 0 1 .5-.5Z" />
            </svg>
          </a>
        ) : null}

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`${railButton} ${
            scrolled ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
          }`}
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
      </div>

      {/* The phone numbers stay discoverable to assistive technology and to
          crawlers even though nothing on the site dials them any more. */}
      <p className="sr-only">
        GTS Trade Solutions can also be reached at {contact.phones.join(", ")}.
      </p>
    </aside>
  );
}
