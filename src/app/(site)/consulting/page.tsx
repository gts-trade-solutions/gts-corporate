import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { ModuleNav } from "@/components/ModuleNav";
import { SplitHero } from "@/components/SplitHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { Spotlight } from "@/components/Spotlight";
import {
  consultingBlocks,
  consultingNav,
  consultingServiceList,
  regulatoryNote,
} from "@/data/consulting";
import { consultingFaqs } from "@/data/faqs";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, itemListSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("consulting");

const trail = [
  { name: "Home", path: "/" },
  { name: "Consulting", path: "/consulting" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 80}ms` }) as CSSProperties;

/**
 * Consulting overview.
 *
 * Each of the three services has its own page under /consulting; this index
 * introduces them and carries the FAQs and the regulatory wording, which apply
 * across all three. Each card carries its service page's photograph; the scope
 * groups are already listed in the banner.
 */
export default function ConsultingPage() {
  return (
    <>
      <SplitHero
        trail={trail}
        title="Automotive, Engineering & Market Consulting"
        media="consultingHero"
        eyebrow="Technical & Regulatory Advisory"
        lead="Fire and safety advisory, commercial vehicle service and technical support, and homologation, testing and market-entry consulting for manufacturers entering India and international markets."
        services={consultingServiceList}
        cta={{ label: "Talk to a Technical Specialist", href: "/contact?enquiry=homologation-testing" }}
        secondary={{ label: "Fire & Safety enquiry", href: "/contact?enquiry=fire-safety" }}
      />

      <ModuleNav items={consultingNav} active="/consulting" />

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Consulting Services"
            index={1}
            title="Three services, one technical desk"
            lead="Each runs as its own programme with its own scope and enquiry route, and most projects draw on more than one."
          />
        </Reveal>
        <Reveal>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {consultingBlocks.map((block, index) => (
              <div key={block.id} className="stagger-item h-full" style={stagger(index)}>
                <ServiceCard
                  title={block.title}
                  description={block.lead}
                  icon={block.icon}
                  href={`/consulting/${block.id}`}
                  cta={`Explore ${block.navLabel}`}
                  media={block.media}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

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

      <Section id="faqs" tone="steel">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="sticky-heading self-start lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="Questions"
                index={2}
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
          itemListSchema({
            name: "Consulting services",
            items: consultingBlocks.map((block) => ({
              name: block.title,
              path: `/consulting/${block.id}`,
            })),
          }),
          faqSchema(consultingFaqs),
        ]}
      />
    </>
  );
}
