"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

/**
 * Fades each client-side navigation in. Deliberately skipped on the very first
 * render so the initial paint — and therefore LCP — is never delayed: the class
 * only appears once the pathname has actually changed at least once.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [renderedPath, setRenderedPath] = useState(pathname);
  const [hasNavigated, setHasNavigated] = useState(false);

  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    if (!hasNavigated) setHasNavigated(true);
  }

  return (
    <div key={pathname} className={hasNavigated ? "page-in" : undefined}>
      {children}
    </div>
  );
}
