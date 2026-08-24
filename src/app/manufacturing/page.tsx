import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { manufacturingFaqs } from "@/data/faqs";
import { manufacturingProcess, manufacturingSections } from "@/data/manufacturing";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("manufacturing");

const trail = [
  { name: "Home", path: "/" },
  { name: "Manufacturing", path: "/manufacturing" },
];

const navItems = [
  { id: "scope", label: "Manufacturing Scope" },
  { id: "process", label: "How a Project Runs" },
  { id: "faqs", label: "FAQs" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="Contract Manufacturing, Fabrication & Vehicle Body Solutions"
        lead="Build-to-print and build-to-specification support for automotive structures, industrial fabrication, trailers, containers, reefer bodies and special-application assemblies."
        primaryCta={{ label: "Discuss a Manufacturing Project", href: "/contact?enquiry=manufacturing" }}
        secondaryCta={{ label: "Send Drawings / RFQ", href: "/contact?enquiry=manufacturing#rfq" }}
        trail={trail}
      />

      {/* Wrapper bounds the sticky nav, so it scrolls away with the sections. */}
      <div>
        <SectionNav items={navItems} />

        <Section id="scope">
          <Reveal>
            <SectionHeading
              eyebrow="Manufacturing Scope"
              index={1}
              title="What we manufacture and fabricate"
              lead="Work is delivered directly or coordinated through our manufacturing partner network, depending on the process, tolerance and volume involved."
            />
          </Reveal>
          <Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {manufacturingSections.map((section, index) => (
                <div key={section.id} className="stagger-item h-full" style={stagger(index)}>
                  <ProductCategoryCard block={section} compact />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-10 max-w-4xl rounded-sm border-l-[3px] border-navy-700 bg-steel-50 p-6 text-[15px] leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">How capability is described:</strong> where a
              process is delivered through our partner network rather than owned directly, we describe it
              as manufacturing support, sourcing or coordination. You will be told which route your
              project takes before it starts.
            </p>
          </Reveal>
        </Section>

        <Section tone="steel" id="process">
          <Reveal>
            <SectionHeading
              eyebrow="Prototype to Production"
              index={2}
              title="How a manufacturing project runs"
              lead="A staged route, so the first article is validated against your acceptance criteria before volume is committed."
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
                      <h3 className="text-[17px] font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-navy-800">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Section>

        <Section id="faqs">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="sticky-heading self-start lg:col-span-4">
              <Reveal>
                <SectionHeading
                  eyebrow="Questions"
                  index={3}
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
                    href="/consulting#homologation-market-entry"
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
      </div>

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
          faqSchema(manufacturingFaqs),
        ]}
      />
    </>
  );
}
