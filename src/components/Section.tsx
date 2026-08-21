import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "white" | "steel" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-white",
  steel: "bg-steel-50 border-y border-steel-200",
  navy: "bg-navy-900 text-navy-100 bg-blueprint",
};

export function Section({
  id,
  tone = "white",
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${tones[tone]} py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/**
 * Small uppercase label with an accent rule, used above every section title.
 * An optional index renders a spec-sheet style number ("01") ahead of it.
 */
export function Eyebrow({
  children,
  inverted = false,
  index,
}: {
  children: ReactNode;
  inverted?: boolean;
  index?: number;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {index !== undefined ? (
        <span
          className={`index-mark text-[11px] font-bold tabular-nums ${
            inverted ? "text-white/55" : "text-ink-muted"
          }`}
        >
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      <span className="rule-draw h-px w-7 bg-accent-600" aria-hidden="true" />
      <span
        className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
          inverted ? "text-accent-500" : "text-accent-700"
        }`}
      >
        {children}
      </span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  inverted = false,
  align = "left",
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  index?: number;
  title: ReactNode;
  lead?: ReactNode;
  inverted?: boolean;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow ? (
        <Eyebrow inverted={inverted} index={index}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag
        className={`mt-4 text-[30px] font-bold leading-[1.1] tracking-[-0.025em] sm:text-[38px] ${
          inverted ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </Tag>
      {lead ? (
        <p
          className={`mt-4 max-w-[62ch] text-pretty text-base leading-relaxed sm:text-[17px] ${
            inverted ? "text-navy-100" : "text-ink-soft"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
