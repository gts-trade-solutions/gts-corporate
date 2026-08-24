import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { TruckBlueprint } from "@/components/illustrations/TruckBlueprint";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { Spotlight } from "@/components/Spotlight";
import { tradeFaqs } from "@/data/faqs";
import { indiaPartnerModule, tradeSections, vehicleCategories } from "@/data/trade";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("import-export");

const trail = [
  { name: "Home", path: "/" },
  { name: "Import & Export", path: "/import-export" },
];

const navItems = [
  { id: "trade-categories", label: "Trade Categories" },
  { id: "vehicle-trade-categories", label: "Vehicle Trade" },
  { id: "india-partner", label: "India Partner" },
  { id: "faqs", label: "FAQs" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

export default function ImportExportPage() {
  return (
    <>
      <PageHero
        eyebrow="Import & Export"
        title="Global Import & Export Solutions"
        lead="GTS Trade Solutions handles import and export across general products, industrial goods, machinery, complete vehicles and agricultural and construction equipment — and supports overseas brands that need a distribution or dealership route into India."
        primaryCta={{ label: "Start an Import / Export Enquiry", href: "/contact?enquiry=import-product" }}
        secondaryCta={{ label: "Become a Supplier / Partner", href: "/contact?enquiry=supplier-partner" }}
        trail={trail}
        art={<TruckBlueprint className="w-full" />}
        artLabel="FIG. 01 — VEHICLE TRADE"
      />

      {/* Wrapper bounds the sticky nav, so it scrolls away with the sections. */}
      <div>
        <SectionNav items={navItems} />

        <Section id="trade-categories">
          <Reveal>
            <SectionHeading
              eyebrow="Trade Categories"
              index={1}
              title="What we import and export"
              lead="Every category below is handled against a written specification, an agreed quantity and a defined destination market — the three things that make a trade enquiry quotable."
            />
          </Reveal>
          <Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tradeSections.map((section, index) => (
                <div key={section.id} className="stagger-item h-full" style={stagger(index)}>
                  <ProductCategoryCard block={section} />
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        <Section tone="steel" id="vehicle-trade-categories">
          <Reveal>
            <SectionHeading
              eyebrow="Vehicle Trade"
              index={2}
              title="Complete vehicle import and export"
              lead="From single units to fleet and project quantities — across passenger, commercial, electric and special-purpose vehicles, and agricultural and construction equipment."
            />
          </Reveal>
          <Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {vehicleCategories.map((category, index) => (
                <div key={category.id} className="stagger-item h-full" style={stagger(index)}>
                  <ProductCategoryCard block={category} compact />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-10 max-w-4xl rounded-sm border-l-[3px] border-accent-600 bg-white p-6 text-[15px] leading-relaxed text-ink-soft shadow-card">
              <strong className="font-semibold text-ink">Please note:</strong> vehicle and equipment
              import and export rules differ by destination country, machine age, emission standard
              and specification. Not every vehicle can legally be imported into every market. We
              review the requirement for your specific destination before a shipment is committed.
            </p>
          </Reveal>

          <Reveal>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
              Need spare parts rather than complete units? The{" "}
              <Link
                href="/vehicle-models"
                className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
              >
                vehicle model schedule
              </Link>{" "}
              lists the components most often requested for each model we export — select what you
              need and it carries straight into an enquiry.
            </p>
          </Reveal>
        </Section>

        {/* India dealership / distribution module — aimed at international manufacturers. */}
        <Spotlight className="bg-navy-800 bg-blueprint py-16 text-white sm:py-20">
          <div id="india-partner" className="mx-auto w-full max-w-7xl scroll-mt-40 px-5 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2.5">
                  <span className="index-mark text-[11px] font-bold tabular-nums text-white/55">
                    03
                  </span>
                  <span className="rule-draw h-px w-7 bg-accent-500" aria-hidden="true" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-500">
                    India Distribution &amp; Dealership
                  </span>
                </span>
                <h2 className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.025em] text-white sm:text-[36px]">
                  {indiaPartnerModule.title}
                </h2>
                <p className="mt-4 text-[16.5px] leading-relaxed text-navy-100">
                  {indiaPartnerModule.lead}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {indiaPartnerModule.items.map((item, index) => (
                  <div
                    key={item.title}
                    style={stagger(index)}
                    className="stagger-item group rounded-sm border border-white/15 bg-white/[0.04] p-5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-accent-600/50 hover:bg-white/[0.08]"
                  >
                    <Icon
                      name="handshake"
                      className="h-5 w-5 text-accent-500 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    />
                    <h3 className="mt-4 text-[16px] font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-navy-100">{item.description}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact?enquiry=india-dealership" size="lg" withArrow>
                  Discuss an India partnership
                </ButtonLink>
                <ButtonLink href="/contact?enquiry=supplier-partner" variant="outlineLight" size="lg">
                  Become a Supplier / Partner
                </ButtonLink>
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
                  title="Import &amp; export FAQs"
                  lead={`${tradeFaqs.length} questions from buyers, exporters and overseas manufacturers — on vehicle and equipment export, sourcing from India, documentation and market coverage.`}
                />
                <div className="mt-8 rounded-sm border-l-[3px] border-navy-700 bg-steel-50 p-5 text-[14.5px] leading-relaxed text-ink-soft">
                  <strong className="block font-semibold text-ink">Regulatory note</strong>
                  Approvals, registrations and certificates are issued by the competent authorities and
                  licensed agents. GTS supports, coordinates and facilitates the process — we do not issue
                  them ourselves.
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <FAQ faqs={tradeFaqs} id="faq-list" />
                <p className="mt-8 text-[15px] leading-relaxed text-ink-soft">
                  Sourcing components rather than finished goods? See{" "}
                  <Link
                    href="/automotive-parts"
                    className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                  >
                    automotive and agricultural components
                  </Link>
                  , or move a requirement into{" "}
                  <Link
                    href="/manufacturing"
                    className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                  >
                    contract manufacturing
                  </Link>
                  .
                </p>
              </Reveal>
            </div>
          </div>
        </Section>
      </div>

      <CTASection
        eyebrow="Start a Trade Enquiry"
        title="Tell us the product, quantity and destination market"
        lead="Send your requirement with any specification or documentation and we will confirm whether we can support it, and on what commercial basis."
        primaryCta={{ label: "Start an Import / Export Enquiry", href: "/contact?enquiry=import-product" }}
        secondaryCta={{ label: "Become a Supplier / Partner", href: "/contact?enquiry=supplier-partner" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "Import & Export Services",
            description: pageSeo["import-export"].description,
            path: "/import-export",
            serviceType: "Import and export trade facilitation",
            offers: tradeSections.map((section) => section.title),
          }),
          faqSchema(tradeFaqs),
        ]}
      />
    </>
  );
}
