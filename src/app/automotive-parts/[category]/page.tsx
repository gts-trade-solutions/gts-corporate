import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { AxleBlueprint } from "@/components/illustrations/AxleBlueprint";
import { partCategoryDetails } from "@/data/part-categories";
import { partCategories } from "@/data/parts";
import { siteUrl } from "@/data/site";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

/** Pre-render one page per component category — no new top-level nav items. */
export function generateStaticParams() {
  return partCategories.map((category) => ({ category: category.id }));
}

type Props = { params: Promise<{ category: string }> };

const lookup = (id: string) => {
  const block = partCategories.find((category) => category.id === id);
  const detail = partCategoryDetails[id];
  return block && detail ? { block, detail } : null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const found = lookup(category);
  if (!found) return {};

  const path = `/automotive-parts/${category}`;
  return {
    title: { absolute: found.detail.seoTitle },
    description: found.detail.metaDescription,
    keywords: found.detail.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${siteUrl}${path}`,
      title: found.detail.seoTitle,
      description: found.detail.metaDescription,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: found.detail.seoTitle }],
    },
  };
}

export default async function PartCategoryPage({ params }: Props) {
  const { category } = await params;
  const found = lookup(category);
  if (!found) notFound();

  const { block, detail } = found;
  const related = partCategories.filter((c) => c.id !== category).slice(0, 4);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Automotive Parts", path: "/automotive-parts" },
    { name: block.title, path: `/automotive-parts/${category}` },
  ];

  return (
    <>
      <PageHero
        eyebrow={`Components — ${block.title}`}
        title={`${block.title} Components`}
        lead={block.summary}
        primaryCta={{
          label: "Request Component Sourcing",
          href: `/contact?enquiry=component-sourcing&product=${encodeURIComponent(block.title)}#rfq`,
        }}
        secondaryCta={{ label: "All component categories", href: "/automotive-parts" }}
        trail={trail}
        art={<AxleBlueprint className="w-full" />}
        artLabel="FIG. 02 — TRAILER AXLE"
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading eyebrow="Overview" index={1} title={`Sourcing ${block.title.toLowerCase()}`} />
              <p className="mt-5 max-w-[62ch] text-pretty text-[16.5px] leading-relaxed text-ink-soft">
                {detail.intro}
              </p>
            </Reveal>

            <Reveal>
              <h3 className="mt-12 text-[19px] font-bold text-ink">Components we source</h3>
              <ul className="mt-5 grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 sm:grid-cols-2">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-3 bg-white px-5 py-4 transition-colors duration-200 hover:bg-steel-50"
                  >
                    <Icon
                      name={block.icon}
                      className="h-[18px] w-[18px] shrink-0 text-accent-600 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="text-[14.5px] font-medium text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Spec sheet — what to send so the enquiry can be quoted first time. */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="corner-ticks sticky-heading rounded-sm border border-steel-200 bg-steel-50 p-6 sm:p-7">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
                  Enquiry spec sheet
                </span>
                <h3 className="mt-3 text-[20px] font-bold leading-tight text-ink">
                  What to tell us
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                  Send these with your enquiry and we can usually come back with a sourcing route
                  and an indicative position without a second round of questions.
                </p>
                <dl className="mt-6 divide-y divide-steel-200 border-y border-steel-200">
                  {detail.specify.map((line, index) => (
                    <div key={line} className="flex gap-4 py-3.5">
                      <dt className="index-mark shrink-0 text-[12px] font-bold tabular-nums text-ink-soft">
                        {String(index + 1).padStart(2, "0")}
                      </dt>
                      <dd className="text-[14.5px] leading-relaxed text-ink">{line}</dd>
                    </div>
                  ))}
                </dl>
                <ArrowLink
                  href={`/contact?enquiry=component-sourcing&product=${encodeURIComponent(block.title)}#rfq`}
                  className="mt-6"
                >
                  Send this enquiry
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="steel">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="Applications"
                index={2}
                title="Typical applications"
                lead="Where this category is normally fitted. If your application is not listed, send it anyway — the sourcing route is the same."
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <ul className="grid gap-3 sm:grid-cols-2">
                {detail.applications.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-sm border border-steel-200 bg-white px-4 py-3.5 text-[14.5px] font-medium text-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-navy-700 hover:shadow-card"
                  >
                    <Icon name="shieldCheck" className="h-[18px] w-[18px] shrink-0 text-accent-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Related"
            index={3}
            title="Other component categories"
            lead="Most programmes draw on more than one category."
          />
        </Reveal>
        <Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/automotive-parts/${item.id}`}
                className="keyline group relative overflow-hidden rounded-sm border border-steel-200 bg-white p-5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
              >
                <Icon name={item.icon} className="h-6 w-6 text-navy-700" />
                <span className="mt-4 block text-[15.5px] font-bold text-ink group-hover:text-navy-800">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>

      <CTASection
        eyebrow="Component Sourcing"
        title={`Send a drawing or part number for ${block.title.toLowerCase()}`}
        lead="Include the application and your annual volume, and we will come back with a sourcing route and an indicative commercial position."
        primaryCta={{
          label: "Request Component Sourcing",
          href: `/contact?enquiry=component-sourcing&product=${encodeURIComponent(block.title)}#rfq`,
        }}
        secondaryCta={{ label: "Back to all components", href: "/automotive-parts" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: `${block.title} Component Sourcing`,
            description: detail.metaDescription,
            path: `/automotive-parts/${category}`,
            serviceType: "Automotive component sourcing and supply",
            offers: block.items,
          }),
        ]}
      />
    </>
  );
}
