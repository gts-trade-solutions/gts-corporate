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
import { tradeNav, tradeSections } from "@/data/trade";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("trade-categories");

const trail = [
  { name: "Home", path: "/" },
  { name: "Import & Export", path: "/import-export" },
  { name: "Trade Categories", path: "/import-export/trade-categories" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

export default function TradeCategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Trade Categories"
        title="What we import and export"
        lead="General products, food, cosmetics and personal care, steel and metals, raw materials, machinery, complete vehicles and India distribution support — every category handled against a written specification, an agreed quantity and a defined destination market."
        primaryCta={{ label: "Start an Import / Export Enquiry", href: "/contact?enquiry=import-product" }}
        secondaryCta={{ label: "Become a Supplier / Partner", href: "/contact?enquiry=supplier-partner" }}
        trail={trail}
        media="tradeCategories"
      />

      <ModuleNav items={tradeNav} active="/import-export/trade-categories" />

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Trade Categories"
            index={1}
            title="Specification, quantity, destination"
            lead="Those three things are what make a trade enquiry quotable. Tell us all three and we will confirm whether we can support it, and on what commercial basis."
          />
        </Reveal>
        <Reveal>
          <CardCarousel className="mt-12" label="Trade categories">
            {tradeSections.map((section, index) => (
              <div key={section.id} className="stagger-item h-full" style={stagger(index)}>
                <ProductCategoryCard block={section} />
              </div>
            ))}
          </CardCarousel>
        </Reveal>

        <Reveal>
          <p className="mt-10 text-[15px] leading-relaxed text-ink-soft">
            Trading complete vehicles or equipment rather than goods? See{" "}
            <Link
              href="/import-export/vehicle-trade"
              className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
            >
              vehicle import and export
            </Link>
            . Manufacturing outside India and looking for a route in?{" "}
            <Link
              href="/import-export/india-partner"
              className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
            >
              India distribution and dealership
            </Link>{" "}
            covers representation and market development.
          </p>
        </Reveal>
      </Section>

      <CTASection
        eyebrow="Start a Trade Enquiry"
        title="Send the specification for the goods you want to move"
        lead="Include the product, its grade or standard, the quantity per shipment and the destination country, with any documentation you already hold — we will confirm what can be supplied and on what terms."
        primaryCta={{ label: "Start an Import / Export Enquiry", href: "/contact?enquiry=import-product" }}
        secondaryCta={{ label: "Become a Supplier / Partner", href: "/contact?enquiry=supplier-partner" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "Import & Export Trade Categories",
            description: pageSeo["trade-categories"].description,
            path: "/import-export/trade-categories",
            serviceType: "Import and export trade facilitation",
            offers: tradeSections.map((section) => section.title),
          }),
        ]}
      />
    </>
  );
}
