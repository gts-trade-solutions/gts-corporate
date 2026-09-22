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
import { tradeNav, vehicleCategories } from "@/data/trade";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("vehicle-trade");

const trail = [
  { name: "Home", path: "/" },
  { name: "Import & Export", path: "/import-export" },
  { name: "Vehicle Trade", path: "/import-export/vehicle-trade" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

export default function VehicleTradePage() {
  return (
    <>
      <PageHero
        eyebrow="Vehicle Trade"
        title="Complete vehicle import and export"
        lead="From single units to fleet and project quantities — across passenger, two- and three-wheeler, commercial, electric and special-purpose vehicles, and agricultural and construction equipment."
        primaryCta={{ label: "Start a Vehicle Trade Enquiry", href: "/contact?enquiry=vehicle-trade" }}
        secondaryCta={{ label: "Become a Supplier / Partner", href: "/contact?enquiry=supplier-partner" }}
        trail={trail}
        media="vehicleTrade"
      />

      <ModuleNav items={tradeNav} active="/import-export/vehicle-trade" />

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Vehicle Trade"
            index={1}
            title="Vehicle and equipment categories"
            lead="Tell us the category, the destination market and the quantity, and we will confirm what can be supplied and on what basis."
          />
        </Reveal>
        <Reveal>
          <CardCarousel className="mt-12" label="Vehicle trade categories">
            {vehicleCategories.map((category, index) => (
              <div key={category.id} className="stagger-item h-full" style={stagger(index)}>
                <ProductCategoryCard block={category} compact />
              </div>
            ))}
          </CardCarousel>
        </Reveal>

        <Reveal>
          <p className="mt-10 max-w-4xl rounded-sm border-l-[3px] border-accent-600 bg-steel-50 p-6 text-[15px] leading-relaxed text-ink-soft">
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

      <CTASection
        eyebrow="Start a Vehicle Enquiry"
        title="Tell us the vehicle, quantity and destination market"
        lead="Send the specification or model list with the destination country and we will confirm what can legally and commercially be supplied."
        primaryCta={{ label: "Start a Vehicle Trade Enquiry", href: "/contact?enquiry=vehicle-trade" }}
        secondaryCta={{ label: "Source Spare Parts", href: "/contact?enquiry=component-sourcing" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "Vehicle Import & Export",
            description: pageSeo["vehicle-trade"].description,
            path: "/import-export/vehicle-trade",
            serviceType: "Complete vehicle and equipment import and export",
            offers: vehicleCategories.map((category) => category.title),
          }),
        ]}
      />
    </>
  );
}
