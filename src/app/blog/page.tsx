import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { TruckBlueprint } from "@/components/illustrations/TruckBlueprint";
import { blogCategories, blogPostsByDate } from "@/data/blog";
import { siteUrl } from "@/data/site";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("blog");

const trail = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 60}ms` }) as CSSProperties;

export default function BlogPage() {
  const [featured, ...rest] = blogPostsByDate;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Trade & Automotive Insights"
        lead="Working notes on the things buyers, exporters and manufacturers ask us about most — what a quotable enquiry looks like, how components are specified, what homologation actually involves, and how a distribution route into India gets built."
        primaryCta={{ label: "Send us a requirement", href: "/contact#rfq" }}
        secondaryCta={{ label: "Browse component categories", href: "/automotive-parts" }}
        trail={trail}
        art={<TruckBlueprint className="w-full" />}
        artLabel="FIG. 04 — INSIGHTS"
      />

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Latest"
            index={1}
            title="Practical guidance, not press releases"
            lead="Every post here comes out of a question we have answered more than once. They are written for the person doing the buying, and they say where the limits are as plainly as they say what is possible."
          />
        </Reveal>

        {/* Topic list, not a filter: with a small archive, chips that hide most
            of the page cost more than they give. */}
        <Reveal>
          <ul className="mt-8 flex flex-wrap gap-2">
            {blogCategories.map((category, index) => (
              <li
                key={category}
                style={stagger(index)}
                className="stagger-item cursor-default rounded-sm border border-steel-300 bg-white px-3.5 py-2 text-[13.5px] font-semibold text-ink-soft"
              >
                {category}
              </li>
            ))}
          </ul>
        </Reveal>

        {featured ? (
          <Reveal>
            <div className="mt-11">
              <PostCard post={featured} featured />
            </div>
          </Reveal>
        ) : null}

        <Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post, index) => (
              <div key={post.slug} style={stagger(index)} className="stagger-item h-full">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-11 max-w-3xl rounded-sm border-l-[3px] border-navy-700 bg-steel-50 p-6 text-[15px] leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">Have a question we have not covered?</strong>{" "}
            Send it with your requirement through the{" "}
            <Link
              href="/contact#rfq"
              className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
            >
              enquiry form
            </Link>
            . The questions that come up repeatedly are what get written up next.
          </p>
        </Reveal>
      </Section>

      <CTASection
        eyebrow="Send Us Your Requirement"
        title="Reading up before you send an enquiry?"
        lead="You do not have to have every answer first. Send the product, quantity and destination market and we will tell you what else the enquiry needs."
        primaryCta={{ label: "Request a Quote", href: "/contact#rfq" }}
        secondaryCta={{ label: "Find parts by vehicle model", href: "/vehicle-models" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "GTS Trade Solutions — Trade & Automotive Insights",
            description: pageSeo.blog.description,
            url: `${siteUrl}${pageSeo.blog.path}`,
            inLanguage: "en",
          },
          itemListSchema({
            name: "Trade and automotive insights",
            description: pageSeo.blog.description,
            items: blogPostsByDate.map((post) => ({
              name: post.title,
              path: `/blog/${post.slug}`,
            })),
          }),
        ]}
      />
    </>
  );
}
