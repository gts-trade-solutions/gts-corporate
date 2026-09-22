import { Container } from "../Container";
import { MediaFigure } from "../MediaFigure";
import { Reveal } from "../Reveal";
import type { AlternatingSection } from "@/data/logistics";

/**
 * One image/text row of the zig-zag stack, following the reference layout:
 * a 50/50 split, the heading in the accent colour above justified body copy,
 * and the image alternating side row by row.
 *
 * The image is ordered *first* in the DOM and moved with `lg:order`, so the
 * reading order on a phone is always heading → text → image regardless of which
 * side the picture sits on at desktop.
 */
export function AlternatingRow({
  section,
  index,
}: {
  section: AlternatingSection;
  index: number;
}) {
  return (
    /*
      Eight of these stack on the ODC page, so the per-row cost is multiplied
      by eight on a phone: the padding, the gap and the picture's aspect ratio
      are all set tighter below sm for that reason. A 16/10 plate eight times
      over is most of the page's scrolling on its own.
    */
    <section id={section.id} className="scroll-mt-28 bg-white py-8 sm:py-12 lg:py-14">
      <Container>
        <Reveal>
          <div className="grid items-center gap-4 sm:gap-8 lg:grid-cols-2 lg:gap-14">
            <MediaFigure
              slot={section.slot}
              plate={section.plate}
              caption={section.caption}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className={`aspect-[16/9] sm:aspect-[16/10] lg:aspect-[16/11] ${
                section.reversed ? "lg:order-2" : "lg:order-1"
              }`}
            />

            <div className={section.reversed ? "lg:order-1" : "lg:order-2"}>
              <span className="inline-flex items-center gap-2.5">
                <span className="index-mark text-[11px] font-bold tabular-nums text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rule-draw h-px w-7 bg-accent-600" aria-hidden="true" />
              </span>
              <h2 className="mt-2.5 text-[22px] font-bold leading-tight tracking-[-0.025em] text-navy-800 sm:mt-3 sm:text-[28px] lg:text-[32px]">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  /* Justified, as the reference sets it — with hyphenation on,
                     because justified text without it opens rivers of space. */
                  className="mt-3 text-[15px] leading-relaxed text-ink-soft [hyphens:auto] sm:mt-4 sm:text-[15.5px] sm:text-justify"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
