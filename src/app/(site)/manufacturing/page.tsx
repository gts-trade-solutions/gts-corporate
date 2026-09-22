import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { ModuleNav } from "@/components/ModuleNav";
import { SplitHero } from "@/components/SplitHero";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { manufacturingFaqs } from "@/data/faqs";
import {
  manufacturingNav,
  manufacturingSections,
  manufacturingServiceList,
} from "@/data/manufacturing";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, itemListSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("manufacturing");

const trail = [
  { name: "Home", path: "/" },
  { name: "Manufacturing", path: "/manufacturing" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 80}ms` }) as CSSProperties;

/**
 * Manufacturing overview.
 *
 * Scope and process each have their own page; this index introduces both and
 * carries the FAQs, which span the two. The banner already lists the scope,
 * so the cards carry each page's photograph rather than repeating it.
 */
export default function ManufacturingPage() {
  return (
    <>
      <SplitHero
        trail={trail}
        title="Contract Manufacturing & Fabrication"
        media="manufacturingHero"
        eyebrow="Build to Print, Build to Specification"
        lead="From your drawing to a finished assembly — automotive structures, industrial fabrication, trailers, containers and reefer bodies, staged so the first article is validated before a batch runs."
        services={manufacturingServiceList}
        cta={{ label: "Discuss a Manufacturing Project", href: "/contact?enquiry=manufacturing" }}
        secondary={{ label: "Send drawings or an RFQ", href: "/contact?enquiry=manufacturing#rfq" }}
      />

      <ModuleNav items={manufacturingNav} active="/manufacturing" />

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="In This Section"
            index={1}
            title="What we build, and how a project runs"
            lead="The scope covers the processes and product types we manufacture and fabricate. The process page sets out the stages a project passes through before volume is committed."
          />
        </Reveal>
        <Reveal>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2">
            <div className="stagger-item h-full" style={stagger(0)}>
              <ServiceCard
                title="Manufacturing Scope"
                description="Automotive contract manufacturing, industrial fabrication, trailers, container and reefer solutions and prototype-to-production work — delivered directly or through the partner network."
                icon="factory"
                href="/manufacturing/scope"
                cta="Explore manufacturing scope"
                media="trailerModification"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="stagger-item h-full" style={stagger(1)}>
              <ServiceCard
                title="How a Project Runs"
                description="A staged route from requirement and drawing review to batch production, so the first article is validated against your acceptance criteria before volume is committed."
                icon="clipboard"
                href="/manufacturing/process"
                cta="See how a project runs"
                media="manufacturingProcess"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
        </Reveal>
      </Section>

      <Section id="faqs" tone="steel">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="sticky-heading self-start lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="Questions"
                index={2}
                title="Manufacturing FAQs"
                lead={`${manufacturingFaqs.length} questions on scope, process, prototyping and what buyers confirm before sending a drawing.`}
              />
              <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
                Need the components that go into the build?{" "}
                <Link
                  href="/automotive-parts"
                  className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                >
                  Automotive and agri components
                </Link>{" "}
                covers axles, suspension, braking and EV systems. Taking the finished product into a new
                market?{" "}
                <Link
                  href="/consulting/homologation-market-entry"
                  className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                >
                  Homologation and market entry
                </Link>{" "}
                picks it up from there.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <FAQ faqs={manufacturingFaqs} id="faq-list" />
            </Reveal>
          </div>
        </div>
      </Section>

      <CTASection
        eyebrow="Manufacturing Enquiry"
        title="Send the drawing — we will tell you if it is buildable"
        lead="Share dimensions, material grade, finish, batch quantity and the application. Drawings, specifications and RFQ documents can be attached to the enquiry form."
        primaryCta={{ label: "Discuss a Manufacturing Project", href: "/contact?enquiry=manufacturing" }}
        secondaryCta={{ label: "Trailer / Container / Reefer Enquiry", href: "/contact?enquiry=trailer-container-reefer" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "Contract Manufacturing & Fabrication",
            description: pageSeo.manufacturing.description,
            path: "/manufacturing",
            serviceType: "Contract manufacturing and fabrication support",
            offers: manufacturingSections.map((section) => section.title),
          }),
          itemListSchema({
            name: "Manufacturing pages",
            items: [
              { name: "Manufacturing Scope", path: "/manufacturing/scope" },
              { name: "How a Project Runs", path: "/manufacturing/process" },
            ],
          }),
          faqSchema(manufacturingFaqs),
        ]}
      />
    </>
  );
}
