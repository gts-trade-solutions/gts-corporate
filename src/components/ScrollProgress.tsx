"use client";

import { useEffect, useRef } from "react";

/**
 * Thin accent bar across the top of the viewport showing reading progress.
 * Writes straight to the DOM inside a rAF so scrolling never triggers a React
 * render.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const bar = ref.current;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-60 h-[3px]" aria-hidden="true">
      <div
        ref={ref}
        className="h-full origin-left bg-gradient-to-r from-accent-700 to-accent-500"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
