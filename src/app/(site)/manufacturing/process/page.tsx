import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { ModuleNav } from "@/components/ModuleNav";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { manufacturingNav, manufacturingProcess } from "@/data/manufacturing";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("manufacturing-process");

const trail = [
  { name: "Home", path: "/" },
  { name: "Manufacturing", path: "/manufacturing" },
  { name: "How a Project Runs", path: "/manufacturing/process" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

export default function ManufacturingProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Prototype to Production"
        title="How a manufacturing project runs"
        lead="A staged route, so the first article is validated against your acceptance criteria before volume is committed — from requirement and drawing review through sourcing and feasibility to prototype coordination, batch production and dispatch."
        primaryCta={{ label: "Send Drawings / RFQ", href: "/contact?enquiry=manufacturing#rfq" }}
        secondaryCta={{ label: "Discuss a Manufacturing Project", href: "/contact?enquiry=manufacturing" }}
        trail={trail}
        media="manufacturingProcess"
      />

      <ModuleNav items={manufacturingNav} active="/manufacturing/process" />

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Prototype to Production"
            index={1}
            title="Four stages, in order"
            lead="Nothing moves to the next stage until the previous one is signed off, so a specification problem is found on the first article rather than on the first container."
          />
        </Reveal>

        <Reveal>
          <div className="relative mt-14">
            {/* Connector that draws itself across the stages as the section reveals. */}
            <span
              className="rule-draw absolute left-0 right-0 top-[13px] hidden h-px bg-gradient-to-r from-accent-600 via-accent-500 to-steel-300 xl:block"
              aria-hidden="true"
            />
            <ol className="grid gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
              {manufacturingProcess.map((step, index) => (
                <li key={step.step} className="stagger-item relative" style={stagger(index)}>
                  <span className="relative z-10 flex h-7 w-12 items-center justify-center rounded-sm bg-navy-800 font-display text-[12px] font-bold tracking-wider text-white">
                    {step.step}
                  </span>
                  <div className="group mt-5 rounded-sm border border-steel-200 bg-white p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
                    <h2 className="text-[17px] font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-navy-800">
                      {step.title}
                    </h2>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-12 max-w-4xl text-[15px] leading-relaxed text-ink-soft">
            The processes and product types this route is applied to are set out under{" "}
            <Link
              href="/manufacturing/scope"
              className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
            >
              manufacturing scope
            </Link>
            . Taking the finished product into a new market?{" "}
            <Link
              href="/consulting/homologation-market-entry"
              className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
            >
              Homologation and market entry
            </Link>{" "}
            picks it up from there.
          </p>
        </Reveal>
      </Section>

      <CTASection
        eyebrow="Manufacturing Enquiry"
        title="Start with stage one: send the drawing for review"
        lead="Share the drawing, your acceptance criteria and the target volume — the review sets out what the first article has to prove before a batch is committed."
        primaryCta={{ label: "Discuss a Manufacturing Project", href: "/contact?enquiry=manufacturing" }}
        secondaryCta={{ label: "Trailer / Container / Reefer Enquiry", href: "/contact?enquiry=trailer-container-reefer" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "Contract Manufacturing Project Process",
            description: pageSeo["manufacturing-process"].description,
            path: "/manufacturing/process",
            serviceType: "Contract manufacturing project management",
          }),
        ]}
      />
    </>
  );
}
