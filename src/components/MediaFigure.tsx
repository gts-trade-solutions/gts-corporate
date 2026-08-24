import { Media, MediaScrim } from "./Media";
import type { MediaKey } from "@/data/media";

/**
 * A photographic plate with a spec-sheet caption.
 *
 * Photography sits *alongside* the engineering drawings rather than replacing
 * them — see §5 of the README. The plate number and the caption are what keep a
 * photograph reading as part of the technical system rather than as decoration.
 *
 * The parent supplies the aspect ratio; `Media` fills its positioned box.
 */
export function MediaFigure({
  slot,
  plate,
  caption,
  className = "",
  sizes = "100vw",
  priority = false,
}: {
  slot: MediaKey;
  /** Spec-sheet label, e.g. "PLATE 03". */
  plate: string;
  caption: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`relative overflow-hidden rounded-sm bg-navy-900 ${className}`}>
      <Media slot={slot} sizes={sizes} priority={priority} />
      <MediaScrim side="bottom" strength="soft" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <span className="index-mark text-[11px] font-bold tracking-[0.2em] text-accent-500">
          {plate}
        </span>
        <p className="mt-2 max-w-[46ch] font-display text-[19px] font-bold leading-tight text-white sm:text-[22px]">
          {caption}
        </p>
      </figcaption>
    </figure>
  );
}
