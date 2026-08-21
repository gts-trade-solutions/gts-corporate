"use client";

import type { ReactNode } from "react";

/**
 * Tracks the pointer across a dark panel and exposes it as --mx/--my for the
 * `spotlight` utility. Pointer-only: without JS or on touch the panel is
 * simply flat, and nothing is announced to assistive technology.
 */
export function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`spotlight ${className}`}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
    >
      {children}
    </div>
  );
}
