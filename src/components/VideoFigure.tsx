import { AutoplayVideo } from "./AutoplayVideo";

/**
 * A playable film with a spec-sheet caption.
 *
 * The counterpart to [MediaFigure](./MediaFigure.tsx): that one is a still with
 * the caption laid over it, this one is a video with a player.
 *
 * Two modes. By default it is a plain server-rendered `<video controls>` with
 * no autoplay and no JavaScript at all — the browser's own player does the
 * work, and a film with narration keeps its sound. Pass `autoPlay` and the
 * element is swapped for [AutoplayVideo](./AutoplayVideo.tsx), which starts it
 * on scroll-into-view; browsers only permit that when muted, so the narration
 * is silent until a viewer unmutes.
 *
 * Either way `preload="metadata"` keeps the page weight to the poster until
 * playback actually starts, and the caption sits *below* the frame rather than
 * over it, because the control bar occupies the bottom edge of a video.
 */
export function VideoFigure({
  src,
  poster,
  label,
  plate,
  caption,
  className = "",
  autoPlay = false,
}: {
  src: string;
  /** Still from the film. Also what a crawler and a reduced-motion viewer see. */
  poster: string;
  /** Describes the film for assistive technology. */
  label: string;
  /** Spec-sheet label, e.g. "PLATE 01". */
  plate: string;
  caption: string;
  className?: string;
  /** Start on scroll-into-view. Forces muted playback — see AutoplayVideo. */
  autoPlay?: boolean;
}) {
  const frame = "block aspect-video w-full";
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-sm border border-steel-200 bg-navy-900 shadow-card">
        {/* The film carries open (burned-in) captions, so the spoken content is
            already on screen. A <track> file would still be better: it is
            selectable, translatable and machine-readable. Add one if the source
            ever supplies an SRT/VTT. */}
        {autoPlay ? (
          <AutoplayVideo src={src} poster={poster} label={label} className={frame} />
        ) : (
          <video controls preload="metadata" poster={poster} aria-label={label} className={frame}>
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>
      <figcaption className="mt-5">
        <span className="index-mark text-[11px] font-bold tracking-[0.2em] text-accent-700">
          {plate}
        </span>
        <p className="mt-2 max-w-[62ch] font-display text-[19px] font-bold leading-tight text-ink sm:text-[22px]">
          {caption}
        </p>
        {autoPlay ? (
          /* Autoplay is muted by browser policy, and nothing on screen says so —
             a viewer would otherwise assume the film is silent. */
          <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
            Plays muted — use the player controls for sound.
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}
