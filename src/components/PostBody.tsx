import { Icon } from "./Icon";
import type { BlogBlock } from "@/data/blog";

/**
 * Renders a post's structured blocks.
 *
 * Deliberately not a markdown renderer: the content layer is typed TypeScript
 * like the rest of `src/data`, so there is no parser in the bundle and no way
 * for raw HTML to reach the page. Headings are `h2` — the post title is the
 * page's only `h1`.
 */
export function PostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="max-w-[68ch]">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "heading") {
          return (
            <h2
              key={key}
              id={headingId(block.text)}
              className="mt-12 scroll-mt-32 text-[23px] font-bold leading-tight tracking-[-0.02em] text-ink first:mt-0 sm:text-[26px]"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p
              key={key}
              className="mt-5 text-pretty text-[16.5px] leading-[1.75] text-ink-soft"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag key={key} className="mt-6 space-y-3">
              {block.items.map((item, itemIndex) => (
                <li key={item} className="flex gap-3.5">
                  {block.ordered ? (
                    <span className="index-mark mt-[3px] shrink-0 text-[13px] font-bold tabular-nums text-accent-700">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                  ) : (
                    <span
                      className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600"
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-[16px] leading-[1.7] text-ink-soft">{item}</span>
                </li>
              ))}
            </Tag>
          );
        }

        return (
          <aside
            key={key}
            className="corner-ticks mt-9 rounded-sm border border-steel-200 bg-steel-50 p-6"
          >
            <div className="flex items-center gap-2.5">
              <Icon name="shieldCheck" className="h-[18px] w-[18px] shrink-0 text-accent-600" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
                {block.title ?? "Worth knowing"}
              </span>
            </div>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink">{block.text}</p>
          </aside>
        );
      })}
    </div>
  );
}

/** Stable anchor for a heading, so the in-post contents list can link to it. */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
