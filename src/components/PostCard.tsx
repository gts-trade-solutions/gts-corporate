import Link from "next/link";
import { Icon } from "./Icon";
import { formatPostDate, type BlogPost } from "@/data/blog";

/**
 * A post on the blog index. The whole card is one link, so the "read" cue at
 * the foot is styled text rather than a nested anchor.
 */
export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`keyline group relative flex h-full flex-col overflow-hidden rounded-sm border border-steel-200 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift ${
        featured ? "p-7 sm:p-9" : "p-6"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="inline-flex items-center gap-2 rounded-sm bg-navy-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-navy-700">
          <Icon name="article" className="h-3.5 w-3.5" />
          {post.category}
        </span>
        <span className="text-[12.5px] font-medium text-ink-muted">
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          {" · "}
          {post.readingMinutes} min read
        </span>
      </div>

      <h3
        className={`mt-4 font-bold leading-[1.2] tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-navy-800 ${
          featured ? "text-[26px] sm:text-[32px]" : "text-[19px]"
        }`}
      >
        {post.title}
      </h3>

      <p
        className={`mt-3.5 text-pretty leading-relaxed text-ink-soft ${
          featured ? "max-w-[60ch] text-[16.5px]" : "text-[15px]"
        }`}
      >
        {post.excerpt}
      </p>

      <span className="mt-6 flex flex-1 items-end">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors duration-200 group-hover:text-accent-700">
          <span className="relative">
            Read the article
            <span
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              aria-hidden="true"
            />
          </span>
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
