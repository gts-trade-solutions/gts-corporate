"use client";

import { useEffect, useState } from "react";

/** Copies a value to the clipboard and confirms it inline for a couple of seconds. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          // Clipboard blocked (insecure context or denied permission) — the
          // value stays selectable on the page, so there is nothing to report.
        }
      }}
      className="inline-flex items-center gap-1 rounded-sm px-1.5 py-1 text-[12px] font-semibold text-ink-muted opacity-0 transition-all duration-200 hover:bg-steel-100 hover:text-navy-700 focus-visible:opacity-100 group-hover/copy:opacity-100"
    >
      <span className="sr-only">{copied ? `${label} copied` : `Copy ${label}`}</span>
      {copied ? (
        <>
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 8.5 6.5 12 13 4.5" />
          </svg>
          <span aria-hidden="true">Copied</span>
        </>
      ) : (
        <>
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 5.5v-1a1.5 1.5 0 0 0-1.5-1.5H4a1.5 1.5 0 0 0-1.5 1.5v5A1.5 1.5 0 0 0 4 11h1" />
          </svg>
          <span aria-hidden="true">Copy</span>
        </>
      )}
    </button>
  );
}
