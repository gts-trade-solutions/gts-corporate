"use client";

import { Children, useEffect, useId, useRef, useState } from "react";
import type { ReactNode, TouchEvent } from "react";
import { Container } from "./Container";
import { Icon, type IconName } from "./Icon";

type SlideLabel = { label: string; detail: string; icon: IconName };

/** Automatic banner rotation with direct service selection and touch navigation. */
export function HeroSlider({ children, labels }: { children: ReactNode; labels: SlideLabel[] }) {
  const slides = Children.toArray(children);
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || touching || !visible || slides.length < 2) return;
    let timer: number | undefined;
    const schedule = () => {
      window.clearTimeout(timer);
      if (!document.hidden) {
        timer = window.setTimeout(() => setActive((index) => (index + 1) % slides.length), 5000);
      }
    };
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [active, paused, touching, visible, slides.length]);

  const move = (direction: number) => {
    setActive((index) => (index + direction + slides.length) % slides.length);
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    const point = event.touches[0];
    touchStart.current = { x: point.clientX, y: point.clientY };
    setTouching(true);
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const point = event.changedTouches[0];
    touchStart.current = null;
    setTouching(false);
    if (!start || !point) return;
    const dx = point.clientX - start.x;
    const dy = point.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
  };

  const controlClass = "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-accent-500 hover:bg-white/10 focus-visible:outline-accent-500";

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured GTS services"
      className="relative flex min-h-0 flex-1 flex-col"
    >
      <div
        className="relative min-h-0 flex-1 touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={() => { touchStart.current = null; setTouching(false); }}
      >
        {slides.map((slide, index) => (
          <div
            key={labels[index].label}
            id={`${id}-slide-${index}`}
            role="group"
            aria-roledescription="slide"
            aria-label={labels[index].label}
            aria-hidden={index !== active}
            inert={index !== active}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
              index === active ? "z-10 opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* `data-float-clear`: the assistant launcher lifts above this strip while
          it sits along the bottom of the viewport, so it never covers the
          slide controls. */}
      <div data-float-clear="" className="relative z-20 shrink-0 border-t border-white/15 bg-navy-900">
        <Container className="flex items-center gap-3 sm:gap-6">
          <div className="grid min-w-0 flex-1 grid-cols-2 lg:grid-cols-4" role="group" aria-label="Choose a service slide">
            {labels.map((item, index) => (
              <button
                key={item.label}
                type="button"
                aria-label={`Show ${item.label} slide`}
                aria-pressed={index === active}
                aria-controls={`${id}-slide-${index}`}
                onClick={() => setActive(index)}
                className={`group relative min-w-0 px-2 py-3 text-left transition-colors sm:px-4 lg:py-5 ${
                  index === active ? "bg-white/5" : "hover:bg-white/5"
                }`}
              >
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-[3px] bg-accent-600 transition-opacity ${index === active ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
                <Icon name={item.icon} className="mb-2 hidden h-5 w-5 text-accent-500 sm:block [@media(max-height:700px)]:hidden" />
                <span className="block font-display text-[12px] font-bold leading-snug text-white sm:text-[14px] lg:text-[15px]">{item.label}</span>
                <span className="mt-1.5 hidden text-[13px] leading-relaxed text-navy-100 xl:block [@media(max-height:820px)]:hidden">{item.detail}</span>
              </button>
            ))}
          </div>
          <div className="flex shrink-0 flex-col gap-2 py-3 sm:flex-row" role="group" aria-label="Banner controls">
            <button type="button" className={controlClass} aria-label="Previous banner" onClick={() => move(-1)}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
            </button>
            <button type="button" className={controlClass} aria-label={paused ? "Play banner slideshow" : "Pause banner slideshow"} onClick={() => setPaused((value) => !value)}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {paused ? <path d="m8 5 11 7-11 7V5Z" /> : <path d="M8 5v14M16 5v14" />}
              </svg>
            </button>
            <button type="button" className={controlClass} aria-label="Next banner" onClick={() => move(1)}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
}
