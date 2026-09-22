"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Scroll-triggered reveal.
 *
 * Children stay server-rendered — this only toggles a class, so the markup is
 * unchanged for crawlers. The hidden state is defined under `.js` in
 * globals.css, so without JavaScript nothing is ever hidden. A single shared
 * IntersectionObserver handles every instance on the page.
 */

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        // Reveal once, then stop watching — no work on subsequent scrolls.
        observer?.unobserve(entry.target);
      }
    },
    /*
      threshold stays 0. A fractional threshold is a share of the *element*, so
      a block taller than the observer root can never intersect enough of itself
      to fire and stays hidden forever — which is exactly what the ~20,000px
      model grid on /vehicle-models did. 0 fires on the first pixel, which is
      all a scroll reveal ever needs.
    */
    { rootMargin: "0px 0px -12% 0px", threshold: 0 },
  );
  return observer;
}

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds, applied as a CSS transition delay. */
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

export function Reveal({ children, delay = 0, as: Tag = "div", className, style }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Anything already on screen at mount reveals immediately, so the first
    // viewport never waits for a scroll event.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      node.classList.add("is-visible");
      return;
    }

    const io = getObserver();
    io.observe(node);
    return () => io.unobserve(node);
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style}
    >
      {children}
    </Tag>
  );
}
