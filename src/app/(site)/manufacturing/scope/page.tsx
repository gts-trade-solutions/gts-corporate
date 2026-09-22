import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CardCarousel } from "@/components/CardCarousel";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { ModuleNav } from "@/components/ModuleNav";
import { PageHero } from "@/components/PageHero";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { manufacturingNav, manufacturingSections } from "@/data/manufacturing";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("manufacturing-scope");

const trail = [
  { name: "Home", path: "/" },
  { name: "Manufacturing", path: "/manufacturing" },
  { name: "Manufacturing Scope", path: "/manufacturing/scope" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

export default function ManufacturingScopePage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing Scope"
        title="What we manufacture and fabricate"
        lead="Automotive contract manufacturing, industrial fabrication, trailers, container and reefer solutions and prototype-to-production work — delivered directly or coordinated through our manufacturing partner network, depending on the process, tolerance and volume involved."
        primaryCta={{ label: "Discuss a Manufacturing Project", href: "/contact?enquiry=manufacturing" }}
        secondaryCta={{ label: "Send Drawings / RFQ", href: "/contact?enquiry=manufacturing#rfq" }}
        trail={trail}
        media="trailerModification"
      />

      <ModuleNav items={manufacturingNav} active="/manufacturing/scope" />

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Manufacturing Scope"
            index={1}
            title="Build-to-print and build-to-specification"
            lead="Each area below is quoted against a drawing or a written specification. Where a process runs through the partner network rather than in-house, you are told before the project starts."
          />
        </Reveal>
        <Reveal>
          <CardCarousel className="mt-12" label="Manufacturing scope">
            {manufacturingSections.map((section, index) => (
              <div key={section.id} className="stagger-item h-full" style={stagger(index)}>
                <ProductCategoryCard block={section} compact />
              </div>
            ))}
          </CardCarousel>
        </Reveal>

        <Reveal>
          <p className="mt-10 max-w-4xl rounded-sm border-l-[3px] border-navy-700 bg-steel-50 p-6 text-[15px] leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">How capability is described:</strong> where a
            process is delivered through our partner network rather than owned directly, we describe it
            as manufacturing support, sourcing or coordination. You will be told which route your
            project takes before it starts.
          </p>
        </Reveal>

        <Reveal>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
            Once the scope is agreed,{" "}
            <Link
              href="/manufacturing/process"
              className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
            >
              how a project runs
            </Link>{" "}
            sets out the staged route from drawing review to batch production.
          </p>
        </Reveal>
      </Section>

      <CTASection
        eyebrow="Manufacturing Enquiry"
        title="Tell us what you need built, and in what volume"
        lead="Share the drawing or specification, material grade, finish and batch quantity — we will confirm whether it is built directly or through the partner network, and when it can start."
        primaryCta={{ label: "Discuss a Manufacturing Project", href: "/contact?enquiry=manufacturing" }}
        secondaryCta={{ label: "Trailer / Container / Reefer Enquiry", href: "/contact?enquiry=trailer-container-reefer" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "Manufacturing & Fabrication Scope",
            description: pageSeo["manufacturing-scope"].description,
            path: "/manufacturing/scope",
            serviceType: "Contract manufacturing and fabrication support",
            offers: manufacturingSections.map((section) => section.title),
          }),
        ]}
      />
    </>
  );
}
