import Image from "next/image";
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
}: {
  slot: MediaKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const config = media[slot];

  if (config.src) {
    return (
      <Image
        src={config.src}
        alt={config.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  const Scene = scenes[config.scene];
  return <Scene className={`absolute inset-0 h-full w-full ${className}`} />;
}

/**
 * Dark scrim for text sitting over a Media slot. Two stacked gradients rather
 * than one flat overlay, so the image stays visible where there is no text.
 */
export function MediaScrim({ side = "left" }: { side?: "left" | "bottom" }) {
  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          side === "left"
            ? "bg-gradient-to-r from-navy-900 via-navy-900/80 via-55% to-navy-900/5"
            : "bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent"
        }`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-navy-900/15"
      />
    </>
  );
}
