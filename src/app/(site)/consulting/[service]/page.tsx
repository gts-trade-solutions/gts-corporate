import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardCarousel } from "@/components/CardCarousel";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { ModuleNav } from "@/components/ModuleNav";
import { PageHero } from "@/components/PageHero";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { Spotlight } from "@/components/Spotlight";
import { consultingBlocks, consultingNav, regulatoryNote } from "@/data/consulting";
import { buildMetadata, type PageKey } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

/** One page per consulting service — the three blocks the section is built from. */
export function generateStaticParams() {
  return consultingBlocks.map((block) => ({ service: block.id }));
}

type Props = { params: Promise<{ service: string }> };

const lookup = (id: string) => consultingBlocks.find((block) => block.id === id) ?? null;

/** Each service has its own SEO entry, keyed by the block id. */
const seoKey = (id: string) => `consulting-${id}` as PageKey;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  return lookup(service) ? buildMetadata(seoKey(service)) : {};
}

const stagger = (index: number) => ({ "--stagger-delay": `${index * 80}ms` }) as CSSProperties;

export default async function ConsultingServicePage({ params }: Props) {
  const { service } = await params;
  const block = lookup(service);
  if (!block) notFound();

  const path = `/consulting/${block.id}`;
  const [primary, secondary] = block.ctas;

  const trail = [
    { name: "Home", path: "/" },
    { name: "Consulting", path: "/consulting" },
    { name: block.navLabel, path },
  ];

  return (
    <>
      <PageHero
        eyebrow="Consulting"
        title={block.title}
        lead={block.lead}
        primaryCta={{ label: primary!.label, href: `/contact?enquiry=${primary!.enquiry}` }}
        secondaryCta={
          secondary ? { label: secondary.label, href: `/contact?enquiry=${secondary.enquiry}` } : undefined
        }
        trail={trail}
        media={block.media}
      />

      <ModuleNav items={consultingNav} active={path} />

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Scope"
            index={1}
            title="What this service covers"
            lead={block.scopeLead}
          />
        </Reveal>
        <Reveal>
          <CardCarousel className="mt-12" label={block.title}>
            {block.groups.map((group, index) => (
              <div key={group.id} className="stagger-item h-full" style={stagger(index)}>
                <ProductCategoryCard block={group} />
              </div>
            ))}
          </CardCarousel>
        </Reveal>
      </Section>

      {/*
        The approval/certification disclaimer belongs with the page that talks
        about approvals. It is repeated on the Consulting index, which covers
        all three services.
      */}
      {block.id === "homologation-market-entry" ? (
        <Spotlight className="bg-navy-900 bg-blueprint py-16 text-navy-100 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-4xl">
                <Eyebrow inverted>Regulatory wording</Eyebrow>
                <h2 className="mt-4 text-2xl font-bold text-white sm:text-[30px]">
                  How we describe approval and certification work
                </h2>
                <p className="mt-5 text-[16.5px] leading-relaxed text-navy-100">{regulatoryNote}</p>
              </div>
            </Reveal>
          </div>
        </Spotlight>
      ) : null}

      {/* The other two services are one tap away in the module nav above, so
          they are not repeated as cards here. */}
      <CTASection
        eyebrow="Technical Consultation"
        title={block.cta.title}
        lead={block.cta.lead}
        primaryCta={{ label: primary!.label, href: `/contact?enquiry=${primary!.enquiry}` }}
        secondaryCta={
          secondary ? { label: secondary.label, href: `/contact?enquiry=${secondary.enquiry}` } : undefined
        }
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: block.title,
            description: block.lead,
            path,
            serviceType: block.title,
            offers: block.groups.map((group) => group.title),
          }),
        ]}
      />
    </>
  );
}
