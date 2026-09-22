"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Background video for a media slot.
 *
 * Decorative motion, so it behaves like the rest of the site's motion rather
 * than like a video player:
 *
 * - Muted, looping and inline, which is what browsers require to autoplay at
 *   all. No controls and no audio track is expected.
 * - `prefers-reduced-motion` stops it entirely and leaves the poster frame, the
 *   same contract as every other animation here.
 * - Paused off-screen and on a hidden tab, so a banner nobody is looking at is
 *   not decoding frames.
 * - If the file fails to load the poster stays, so the hero never goes blank.
 *
 * The poster is what the server renders and what a crawler sees, so it must be
 * a real still of the video, not a placeholder.
 */
export function MediaVideo({
  src,
  poster,
  alt,
  className = "",
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const sync = () => {
      if (reduced.matches || !visible || document.hidden) {
        video.pause();
        return;
      }
      // A rejected play() is normal — a background tab, or a browser that
      // declines autoplay. The poster is already showing, so there is
      // nothing to recover.
      void video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      sync();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  if (failed) {
    /* eslint-disable-next-line @next/next/no-img-element -- the poster is already
       a sized, optimised asset and this path must not re-enter the image pipeline. */
    return <img src={poster} alt={alt} className={`absolute inset-0 h-full w-full object-cover ${className}`} />;
  }

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    >
      <source src={src} />
    </video>
  );
}
