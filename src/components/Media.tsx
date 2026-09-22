import Image from "next/image";
import { MediaVideo } from "./MediaVideo";
import { FabricationScene } from "./illustrations/FabricationScene";
import { PortScene } from "./illustrations/PortScene";
import { media, type MediaKey, type SceneName } from "@/data/media";

const scenes: Record<SceneName, (props: { className?: string }) => React.ReactElement> = {
  port: PortScene,
  fabrication: FabricationScene,
};

/**
 * Renders an image slot: a real photograph once one is configured in
 * `src/data/media.ts`, otherwise the generated scene artwork for that slot.
 * Fills its positioned parent, so wrap it in a container with an aspect ratio.
 */
export function Media({
  slot,
  className = "",
  priority = false,
  sizes = "100vw",
  quality,
}: {
  slot: MediaKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /**
   * Encoding quality for next/image. Must be one of `images.qualities` in
   * next.config.ts; pass 85 only for full-width banners.
   */
  quality?: 75 | 85;
}) {
  const config = media[slot];

  // A video slot always carries its poster in `src`, so nothing downstream has
  // to care which kind of media a slot turned out to hold.
  if (config.video) {
    return (
      <MediaVideo src={config.video} poster={config.src} alt={config.alt} className={className} />
    );
  }

  if (config.src) {
    return (
      <Image
        src={config.src}
        alt={config.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`object-cover ${className}`}
        style={config.position ? { objectPosition: config.position } : undefined}
      />
    );
  }

  const Scene = scenes[config.scene];
  return <Scene className={`absolute inset-0 h-full w-full ${className}`} />;
}

/**
 * Dark scrim for text sitting over a Media slot.
 *
 * Only the band the text actually occupies is darkened — the gradient reaches
 * transparent well before the far edge, so the photograph is untouched where
 * nothing sits on it. There is deliberately no flat overlay on top: a uniform
 * wash reads as a muddy image rather than as contrast, and it was what made
 * these photographs look dull.
 *
 * If you strengthen a value here, check the caption still clears 4.5:1 — white
 * text over the *lightest* part of the photograph beneath it, not the average.
 *
 * The one exception is `side="left"` below `md`. On a phone the headline and
 * lead run the full width of the banner, so a left-to-right gradient leaves
 * the right half of every line over bare photograph. There the scrim is an even
 * 72% tint instead: white text over pure white beneath it still measures ~7:1.
 */
export function MediaScrim({
  side = "left",
  /**
   * "soft" is for a small caption — a plate label and a line or two. "default"
   * carries a page H1, which is physically larger and sits higher up the image,
   * so it needs the darker band. Measured: soft still clears 4.5:1 for captions,
   * default clears it for the heroes.
   */
  strength = "default",
}: {
  side?: "left" | "bottom";
  strength?: "default" | "soft";
}) {
  const gradient =
    side === "left"
      ? "bg-navy-900/72 md:bg-transparent md:bg-gradient-to-r md:from-navy-900 md:via-navy-900/75 md:via-45% md:to-transparent md:to-80%"
      : strength === "soft"
        ? "bg-gradient-to-t from-navy-900 via-navy-900/72 via-16% to-transparent to-56%"
        : "bg-gradient-to-t from-navy-900 via-navy-900/80 via-18% to-transparent to-62%";

  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${gradient}`} />;
}
