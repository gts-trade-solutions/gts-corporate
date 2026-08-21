"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { contact, telHref } from "@/data/site";

/**
 * Bottom-of-screen actions: a persistent quote/call bar on mobile, plus
 * back-to-top and the optional WhatsApp button. All of it appears only after
 * the visitor has scrolled, so it never covers the hero.
 */
export function FloatingActions() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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

  // The contact page is the destination — no need to push people back to it.
  const showBar = scrolled && pathname !== "/contact";
  const whatsapp = contact.whatsapp.enabled && contact.whatsapp.number;
  const whatsappHref = whatsapp
    ? `https://wa.me/${contact.whatsapp.number.replace(/\D/g, "")}?text=${encodeURIComponent(contact.whatsapp.message)}`
    : "";

  return (
    <aside aria-label="Quick actions">
      {/* Persistent mobile conversion bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-steel-200 bg-white/95 px-4 py-3 backdrop-blur transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Link
            href="/contact"
            className="flex-1 rounded-sm bg-accent-700 px-4 py-3 text-center text-[15px] font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Request a Quote
          </Link>
          <a
            href={telHref(contact.phones[0])}
            className="rounded-sm border border-steel-300 px-4 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-navy-700"
          >
            Call
          </a>
        </div>
      </div>

      {/* Stacked circular actions */}
      <div className="fixed bottom-24 right-4 z-40 flex flex-col items-center gap-3 md:bottom-6 md:right-6">
        {whatsapp ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-raise transition-transform duration-200 hover:scale-110"
          >
            <span className="sr-only">Chat with GTS Trade Solutions on WhatsApp</span>
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7.59.26 1.04.4 1.4.51.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
            </svg>
          </a>
        ) : null}

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-steel-200 bg-white text-navy-800 shadow-card transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-navy-700 hover:shadow-lift ${
            scrolled ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
          }`}
        >
          <span className="sr-only">Back to top</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
