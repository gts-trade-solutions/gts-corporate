import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { ModuleNav } from "@/components/ModuleNav";
import { MediaBand } from "@/components/MediaBand";
import { SplitHero } from "@/components/SplitHero";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { tradeFaqs } from "@/data/faqs";
import {
  indiaPartnerModule,
  tradeNav,
  tradeSections,
  tradeServiceList,
} from "@/data/trade";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, itemListSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("import-export");

const trail = [
  { name: "Home", path: "/" },
  { name: "Import & Export", path: "/import-export" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 80}ms` }) as CSSProperties;

/**
 * Import & Export overview.
 *
 * Trade categories, vehicle trade and the India partnership each have their own
 * page; this index introduces the three and carries the FAQs, which span them.
 * The banner already lists every category, so the cards carry each page's
 * photograph rather than repeating that list.
 */
export default function ImportExportPage() {
  return (
    <>
      <SplitHero
        trail={trail}
        title="Global Import & Export Solutions"
        media="importExportHero"
        eyebrow="Trade, Sourcing & Representation"
        lead="Products found, quoted and moved between markets — general goods, industrial materials and complete vehicles — with India distribution for overseas brands handled from the same desk."
        services={tradeServiceList}
        cta={{ label: "Start an Import / Export Enquiry", href: "/contact?enquiry=import-product" }}
        secondary={{ label: "Become a Supplier / Partner", href: "/contact?enquiry=supplier-partner" }}
      />

      <ModuleNav items={tradeNav} active="/import-export" />

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="In This Section"
            index={1}
            title="Three ways we trade"
            lead="Goods and materials, complete vehicles and equipment, and representation for overseas manufacturers who want a route into India."
          />
        </Reveal>
        <Reveal>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <div className="stagger-item h-full" style={stagger(0)}>
              <ServiceCard
                title="Trade Categories"
                description="General products, food, cosmetics, steel and metals, raw materials and machinery — handled against a written specification, an agreed quantity and a defined destination market."
                icon="package"
                href="/import-export/trade-categories"
                cta="Explore trade categories"
                media="tradeCategories"
              />
            </div>
            <div className="stagger-item h-full" style={stagger(1)}>
              <ServiceCard
                title="Vehicle Trade"
                description="Complete vehicle import and export from single units to fleet and project quantities, across passenger, commercial, electric and special-purpose vehicles and equipment."
                icon="truck"
                href="/import-export/vehicle-trade"
                cta="Explore vehicle trade"
                media="vehicleTrade"
              />
            </div>
            <div className="stagger-item h-full" style={stagger(2)}>
              <ServiceCard
                title="India Partner"
                description={indiaPartnerModule.lead}
                icon="handshake"
                href="/import-export/india-partner"
                cta="Discuss an India route"
                media="indiaPartner"
              />
            </div>
          </div>
        </Reveal>
      </Section>

      <MediaBand
        slot="clearingForwarding"
        plate="PLATE 01"
        caption="Documentation and cargo meeting at the port interface"
      />

      <Section id="faqs" tone="steel">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="sticky-heading self-start lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="Questions"
                index={2}
                title="Import &amp; export FAQs"
                lead={`${tradeFaqs.length} questions from buyers, exporters and overseas manufacturers — on vehicle and equipment export, sourcing from India, documentation and market coverage.`}
              />
              <div className="mt-8 rounded-sm border-l-[3px] border-navy-700 bg-white p-5 text-[14.5px] leading-relaxed text-ink-soft">
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
          itemListSchema({
            name: "Import & export pages",
            items: [
              { name: "Trade Categories", path: "/import-export/trade-categories" },
              { name: "Vehicle Trade", path: "/import-export/vehicle-trade" },
              { name: "India Partner", path: "/import-export/india-partner" },
            ],
          }),
          faqSchema(tradeFaqs),
        ]}
      />
    </>
  );
}
