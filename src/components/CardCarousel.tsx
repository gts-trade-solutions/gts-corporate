"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import styles from "./CardCarousel.module.css";

/** Adds horizontal navigation while leaving the server-rendered cards intact. */
export function CardCarousel({
  children,
  label,
  className = "",
  columns = 3,
  resetKey,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  columns?: 2 | 3;
  /** Return to the first card when a search or category selection changes. */
  resetKey?: string;
}) {
  const trackId = useId();
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const previousResetKey = useRef(resetKey);
  const [position, setPosition] = useState({ previous: false, next: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (previousResetKey.current !== resetKey) {
      track.scrollTo({ left: 0, behavior: "instant" });
      previousResetKey.current = resetKey;
    }

    const update = () => {
      const next = {
        previous: track.scrollLeft > 1,
        next: track.scrollWidth - track.clientWidth - track.scrollLeft > 1,
      };
      setPosition((current) =>
        current.previous === next.previous && current.next === next.next ? current : next,
      );
    };

    // Observing the cards also catches the existing filter's display changes.
    const observer = new ResizeObserver(update);
    observer.observe(track);
    Array.from(track.children).forEach((card) => observer.observe(card));
    track.addEventListener("scroll", update, { passive: true });
    const frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, [children, resetKey]);

  const move = useCallback((direction: "previous" | "next" | "first" | "last") => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement && child.offsetWidth > 0,
    );
    const padding = parseFloat(getComputedStyle(track).paddingLeft);
    const stops = cards.map((card) => card.offsetLeft - padding);
    let left = 0;
    if (direction === "last") left = track.scrollWidth - track.clientWidth;
    if (direction === "next") {
      left = stops.find((stop) => stop > track.scrollLeft + 1) ?? track.scrollWidth;
    }
    if (direction === "previous") {
      left = stops.findLast((stop) => stop < track.scrollLeft - 1) ?? 0;
    }
    track.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    const track = trackRef.current;
    if (!carousel || !track) return;

    let visible = false;
    let interacting = false;
    let timer: number | undefined;

    const schedule = () => {
      window.clearTimeout(timer);
      if (!visible || document.hidden || interacting) return;

      timer = window.setTimeout(() => {
        const end = track.scrollWidth - track.clientWidth;
        if (end > 1) move(track.scrollLeft >= end - 1 ? "first" : "next");
        schedule();
      }, 4000);
    };

    // Restart the full delay after a gesture; hovering or retained button focus
    // must not leave autoplay paused. Reduced motion uses instant steps in move().
    const onPointerDown = () => {
      interacting = true;
      window.clearTimeout(timer);
    };
    const onPointerEnd = () => {
      if (!interacting) return;
      interacting = false;
      schedule();
    };
    const onVisibilityChange = () => {
      interacting = false;
      schedule();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    observer.observe(carousel);
    carousel.addEventListener("pointerdown", onPointerDown);
    carousel.addEventListener("keydown", schedule);
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("pointercancel", onPointerEnd);
    window.addEventListener("blur", onPointerEnd);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      carousel.removeEventListener("pointerdown", onPointerDown);
      carousel.removeEventListener("keydown", schedule);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      window.removeEventListener("blur", onPointerEnd);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [move, resetKey]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Keep the keyboard behavior of links and other controls inside each card.
    if (event.target !== event.currentTarget) return;
    const direction = {
      ArrowLeft: "previous",
      ArrowRight: "next",
      Home: "first",
      End: "last",
    } as const;
    const action = direction[event.key as keyof typeof direction];
    if (!action) return;
    event.preventDefault();
    move(action);
  };

  const canScroll = position.previous || position.next;

  return (
    <div ref={carouselRef} className={`${styles.carousel} ${className}`} role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        id={trackId}
        className={`${styles.track} ${columns === 2 ? styles.twoColumns : ""}`}
        tabIndex={0}
        role="group"
        aria-label={`${label} cards`}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
      {canScroll ? (
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            aria-label="Previous cards"
            aria-controls={trackId}
            disabled={!position.previous}
            onClick={() => move("previous")}
            className={styles.arrow}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m14 6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next cards"
            aria-controls={trackId}
            disabled={!position.next}
            onClick={() => move("next")}
            className={styles.arrow}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m10 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
