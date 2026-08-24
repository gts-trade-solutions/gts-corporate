import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { Spotlight } from "@/components/Spotlight";
import { consultingBlocks, regulatoryNote } from "@/data/consulting";
import { consultingFaqs } from "@/data/faqs";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("consulting");

const trail = [
  { name: "Home", path: "/" },
  { name: "Consulting", path: "/consulting" },
];

/** Short labels — the full block titles are too long for a nav bar. */
const navItems = [
  { id: "fire-safety", label: "Fire & Safety" },
  { id: "commercial-vehicle-service", label: "CV Service & Support" },
  { id: "homologation-market-entry", label: "Homologation & Market Entry" },
  { id: "faqs", label: "FAQs" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 80}ms` }) as CSSProperties;

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="Consulting"
        title="Automotive, Engineering & Market Consulting"
        lead="Fire & safety advisory, commercial vehicle service and technical support, and homologation, testing and market-entry consulting for manufacturers entering India and international markets."
        primaryCta={{ label: "Talk to a Technical Specialist", href: "/contact?enquiry=homologation-testing" }}
        secondaryCta={{ label: "Fire & Safety Enquiry", href: "/contact?enquiry=fire-safety" }}
        trail={trail}
      />

      {/* Wrapper bounds the sticky nav, so it scrolls away with the sections. */}
      <div>
        <SectionNav items={navItems} />

        {consultingBlocks.map((block, index) => (
          <Section key={block.id} id={block.id} tone={index % 2 === 1 ? "steel" : "white"}>
            <Reveal>
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-navy-800 text-white">
                  <Icon name={block.icon} className="h-6 w-6" />
                </span>
                <div className="max-w-3xl">
                  <Eyebrow>{`Consulting service ${String.fromCharCode(65 + index)}`}</Eyebrow>
                  <h2 className="mt-3 text-[28px] font-bold leading-tight text-ink sm:text-[34px]">
                    {block.title}
                  </h2>
                </div>
              </div>
              <p className="mt-6 max-w-3xl text-[16.5px] leading-relaxed text-ink-soft">{block.lead}</p>
            </Reveal>

            <Reveal>
              <div className="mt-11 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {block.groups.map((group, groupIndex) => (
                  <div key={group.id} className="stagger-item h-full" style={stagger(groupIndex)}>
                    <ProductCategoryCard block={group} />
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>
        ))}

        <Spotlight className="bg-navy-900 bg-blueprint py-16 text-navy-100 sm:py-20 lg:py-24">
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

        <Section id="faqs">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="sticky-heading self-start lg:col-span-4">
              <Reveal>
                <SectionHeading
                  eyebrow="Questions"
                  index={4}
                  title="Consulting FAQs"
                  lead={`${consultingFaqs.length} questions from manufacturers and fleet operators — on homologation, market entry, supplier development, service support and fire & safety.`}
                />
                <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
                  Consulting work usually connects back to{" "}
                  <Link
                    href="/automotive-parts"
                    className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                  >
                    component sourcing
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/manufacturing"
                    className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                  >
                    contract manufacturing
                  </Link>
                  , so a programme can move from specification to supply without changing partners.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <FAQ faqs={consultingFaqs} id="faq-list" />
              </Reveal>
            </div>
          </div>
        </Section>
      </div>

      <CTASection
        eyebrow="Technical Consultation"
        title="Talk to a technical specialist about your programme"
        lead="Homologation, testing coordination, fire & safety scope, fleet service or a market-entry plan — tell us where the programme is today and what has to happen next."
        primaryCta={{ label: "Talk to a Technical Specialist", href: "/contact?enquiry=homologation-testing" }}
        secondaryCta={{ label: "Truck / Bus Service Enquiry", href: "/contact?enquiry=truck-bus-service" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "Automotive, Engineering & Market Consulting",
            description: pageSeo.consulting.description,
            path: "/consulting",
            serviceType: "Automotive consulting, homologation support and market entry",
            offers: consultingBlocks.flatMap((block) => block.groups.map((group) => group.title)),
          }),
          faqSchema(consultingFaqs),
        ]}
      />
    </>
  );
}
