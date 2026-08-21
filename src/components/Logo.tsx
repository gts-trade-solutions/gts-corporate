import Link from "next/link";

/**
 * Wordmark placeholder for the official GTS identity.
 * To use the supplied logo file instead, drop it in /public (e.g. logo.svg)
 * and swap the mark below for next/image — the layout allows for 40px height.
 */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex min-w-0 items-center gap-3"
      aria-label="GTS Trade Solutions — home"
    >
      <span
        /* accent-700 rather than accent-600: white on #dc6803 is only 3.48:1,
           below the AA threshold for text at this size. */
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm font-display text-[15px] font-bold tracking-tight text-white ${
          inverted ? "bg-accent-700" : "bg-navy-800"
        }`}
      >
        GTS
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-display text-[17px] font-bold tracking-tight ${
            inverted ? "text-white" : "text-ink"
          }`}
        >
          Trade Solutions
        </span>
        {/* Descriptor is dropped on the narrowest screens so the header row fits. */}
        <span
          className={`mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.16em] sm:block ${
            inverted ? "text-navy-100" : "text-ink-muted"
          }`}
        >
          Trade · Automotive · Engineering
        </span>
      </span>
    </Link>
  );
}
