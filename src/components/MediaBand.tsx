import type { MediaKey } from "@/data/media";
import { Container } from "./Container";
import { MediaFigure } from "./MediaFigure";
import { Reveal } from "./Reveal";

/**
 * Full-width editorial photograph between two sections.
 *
 * One plate per page, so no section of the site is unphotographed — the
 * counterpart to the home page's image band. Photography sits alongside the
 * blueprints rather than replacing them (README §5), which is why this is a
 * captioned plate with a number rather than a decorative background.
 *
 * Slots without a photograph render their generated scene artwork, so a page
 * carrying one of these is complete before the real picture arrives.
 */
export function MediaBand({
  slot,
  plate,
  caption,
  tone = "white",
}: {
  slot: MediaKey;
  /** Spec-sheet label, e.g. "PLATE 01". */
  plate: string;
  caption: string;
  tone?: "white" | "steel";
}) {
  return (
    <section className={tone === "steel" ? "bg-steel-50 py-10 sm:py-14 lg:py-16" : "bg-white py-10 sm:py-14 lg:py-16"}>
      <Container>
        <Reveal>
          <MediaFigure
            slot={slot}
            plate={plate}
            caption={caption}
            className="aspect-[16/10] sm:aspect-[2/1] lg:aspect-[21/9]"
            sizes="(min-width: 1280px) 1216px, 100vw"
          />
        </Reveal>
      </Container>
    </section>
  );
}
