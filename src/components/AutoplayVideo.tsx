"use client";

import { useEffect, useRef } from "react";

/**
 * A film that starts itself when it scrolls into view.
 *
 * Browsers only allow autoplay when a video is muted, so this always starts
 * silent. `controls` stays on: it is how a viewer unmutes, and WCAG 2.2.2
 * requires anything auto-playing for more than five seconds to be pausable.
 *
 * Playback is started by an IntersectionObserver rather than the `autoplay`
 * attribute. The attribute begins downloading on page load wherever the video
 * sits, which for a 5MB film below the fold is a lot of bandwidth spent on
 * something nobody has scrolled to yet. `preload="metadata"` plus a poster
 * keeps the initial cost to one image.
 *
 * Three things it deliberately does *not* do:
 *
 * - Restart a film the viewer paused. A programmatic pause is flagged so it can
 *   be told apart from a real one; once someone presses pause, scrolling away
 *   and back leaves it paused.
 * - Play under `prefers-reduced-motion`. The poster stays and the controls work.
 * - Loop. It plays once and stops on its last frame.
 */
export function AutoplayVideo({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let pausedByViewer = false;
    /* Our own pause() fires the same event a viewer's does — this tells them apart. */
    let pausingOurselves = false;

    const onPause = () => {
      if (!pausingOurselves && !video.ended) pausedByViewer = true;
      pausingOurselves = false;
    };
    const onPlay = () => {
      pausedByViewer = false;
    };

    const sync = () => {
      if (reduced.matches || !visible || document.hidden || pausedByViewer) {
        if (!video.paused) {
          pausingOurselves = true;
          video.pause();
        }
        return;
      }
      // A rejected play() is normal — autoplay policy, or a background tab. The
      // poster and controls are already there, so there is nothing to recover.
      void video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        sync();
      },
      /* Enough of the frame on screen that it is genuinely being looked at. */
      { threshold: 0.4 },
    );

    observer.observe(video);
    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      playsInline
      controls
      preload="metadata"
      poster={poster}
      aria-label={label}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
