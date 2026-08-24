import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink, ButtonLink } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PostBody, headingId } from "@/components/PostBody";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import {
  blogPosts,
  findBlogPost,
  formatPostDate,
  relatedPosts,
  type BlogBlock,
} from "@/data/blog";
import { site, siteUrl } from "@/data/site";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";

/** One pre-rendered page per post. */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) return {};

  const path = `/blog/${slug}`;
  return {
    title: { absolute: post.seoTitle },
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: `${siteUrl}${path}`,
      title: post.seoTitle,
      description: post.metaDescription,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.seoTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.seoTitle }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) notFound();

  const related = relatedPosts(post, 3);
  const headings = post.body.filter(
    (block): block is Extract<BlogBlock, { type: "heading" }> => block.type === "heading",
  );

  const trail = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ];

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        lead={post.excerpt}
        primaryCta={post.cta}
        secondaryCta={{ label: "All articles", href: "/blog" }}
        trail={trail}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <article className="lg:col-span-8">
            {/* Byline. Attributed to the company rather than to an individual —
                nothing here invents a named author. */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-steel-200 pb-6 text-[13.5px] text-ink-muted">
              <span className="inline-flex items-center gap-2 font-semibold text-ink">
                <Icon name="article" className="h-4 w-4 text-accent-600" />
                {site.name}
              </span>
              <span aria-hidden="true" className="text-steel-300">
                |
              </span>
              <span>
                Published{" "}
                <time dateTime={post.publishedAt} className="font-medium text-ink-soft">
                  {formatPostDate(post.publishedAt)}
                </time>
              </span>
              {post.updatedAt ? (
                <span>
                  Updated{" "}
                  <time dateTime={post.updatedAt} className="font-medium text-ink-soft">
                    {formatPostDate(post.updatedAt)}
                  </time>
                </span>
              ) : null}
              <span>{post.readingMinutes} min read</span>
            </div>

            <div className="mt-9">
              <PostBody blocks={post.body} />
            </div>

            <div className="mt-12 rounded-sm border-l-[3px] border-accent-600 bg-steel-50 p-6 sm:p-7">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
                Next step
              </span>
              <h2 className="mt-2.5 text-[20px] font-bold leading-tight text-ink">
                Ready to put this into an enquiry?
              </h2>
              <p className="mt-2.5 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
                Send what you have — the gaps are what the first reply is for. Drawings,
                specifications and parts schedules can be attached directly to the form.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={post.cta.href} withArrow>
                  {post.cta.label}
                </ButtonLink>
                <ButtonLink href="/contact#rfq" variant="outline">
                  Request a Quote
                </ButtonLink>
              </div>
            </div>
          </article>

          {/* Contents + navigation. Sticky on wide screens only, so it never
              traps the reader on a short viewport. */}
          <aside className="lg:col-span-4">
            <div className="sticky-heading">
              {headings.length > 1 ? (
                <nav aria-labelledby="post-contents" className="rounded-sm border border-steel-200 bg-white p-6 shadow-card">
                  <h2
                    id="post-contents"
                    className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700"
                  >
                    In this article
                  </h2>
                  <ol className="mt-4 space-y-2.5">
                    {headings.map((heading, index) => (
                      <li key={heading.text} className="flex gap-3">
                        <span className="index-mark mt-[3px] shrink-0 text-[11.5px] font-bold tabular-nums text-ink-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <a
                          href={`#${headingId(heading.text)}`}
                          className="text-[14px] font-medium leading-snug text-ink-soft transition-colors duration-200 hover:text-navy-800"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}

              <div className="mt-6 rounded-sm border border-steel-200 bg-steel-50 p-6">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
                  Where to go next
                </h2>
                <ul className="mt-4 space-y-3">
                  {[
                    { label: "Find parts by vehicle model", href: "/vehicle-models" },
                    { label: "Component categories", href: "/automotive-parts" },
                    { label: "Vehicle import & export", href: "/import-export" },
                    { label: "Homologation & market entry", href: "/consulting#homologation-market-entry" },
                  ].map((link) => (
                    <li key={link.href}>
                      <ArrowLink href={link.href}>{link.label}</ArrowLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="steel">
          <Reveal>
            <SectionHeading
              eyebrow="Keep reading"
              title="Related articles"
              lead="Other notes on the same part of the process."
            />
          </Reveal>
          <Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </Reveal>
          <div className="mt-9">
            <Link
              href="/blog"
              className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors duration-200 hover:text-accent-700"
            >
              <span className="relative">
                All articles
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:scale-x-100"
                  aria-hidden="true"
                />
              </span>
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </Section>
      ) : null}

      <CTASection
        eyebrow="Send Us Your Requirement"
        title="Tell us the product, quantity and destination market"
        lead="We will confirm whether we can support the requirement and on what commercial basis — and tell you plainly where the regulatory limits sit."
        primaryCta={post.cta}
        secondaryCta={{ label: "Request a Quote", href: "/contact#rfq" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          articleSchema({
            title: post.title,
            description: post.metaDescription,
            path: `/blog/${slug}`,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            keywords: post.keywords,
          }),
        ]}
      />
    </>
  );
}
