import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CardCarousel } from "@/components/CardCarousel";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Media } from "@/components/Media";
import { ModuleNav } from "@/components/ModuleNav";
import { PageHero } from "@/components/PageHero";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { tradeNav, vehicleCategories } from "@/data/trade";
import { findVehicleSegment, vehicleSegmentHref, vehicleSegments } from "@/data/vehicle-segments";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("vehicle-trade");

const trail = [
  { name: "Home", path: "/" },
  { name: "Import & Export", path: "/import-export" },
  { name: "Vehicle Trade", path: "/import-export/vehicle-trade" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

/**
 * The vehicle type whose photograph leads each category card. The segment
 * banners are already in the In Depth grid further down, so the cards use a
 * different picture from the same page.
 */
const cardType: Record<string, string> = {
  "passenger-vehicles": "compact-suvs",
  "two-wheelers": "classic-motorcycles",
  "three-wheelers": "cargo-three-wheelers",
  "commercial-vehicles": "light-trucks",
  buses: "coaches",
  "electric-vehicles": "electric-two-wheelers",
  "special-purpose-vehicles": "ambulances",
  "agricultural-equipment": "high-horsepower-tractors",
  "construction-equipment": "compactors",
};

const creditLink = "underline decoration-steel-300 underline-offset-2 hover:text-ink";

/** The In Depth banners that need a printed credit (the CC0 ones do not). */
const bannerCredits = vehicleSegments.flatMap((segment) =>
  segment.heroCredit ? [{ id: segment.id, title: segment.shortTitle, credit: segment.heroCredit }] : [],
);

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
            {vehicleCategories.map((category, index) => {
              const segment = findVehicleSegment(category.id);
              const photo = segment?.types.find((type) => type.id === cardType[category.id])?.photo;
              return (
                <div key={category.id} className="stagger-item h-full" style={stagger(index)}>
                  <ProductCategoryCard
                    block={photo ? { ...category, photo } : category}
                    compact
                    href={segment ? vehicleSegmentHref(segment.id) : undefined}
                    linkLabel={segment ? `Explore ${segment.types.length} types in depth` : undefined}
                  />
                </div>
              );
            })}
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

      {/* Every category has a page of its own, explained type by type. */}
      <Section tone="steel">
        <Reveal>
          <SectionHeading
            eyebrow="In Depth"
            index={2}
            title="Every category, type by type"
            lead="What each type is built for, the figures that matter when you specify one, photographs of each in service, and the models in our export schedule."
          />
        </Reveal>
        <Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vehicleSegments.map((segment) => (
              <li key={segment.id}>
                <Link
                  href={vehicleSegmentHref(segment.id)}
                  className="keyline group flex h-full flex-col overflow-hidden rounded-sm border border-steel-200 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-navy-900">
                    <Media
                      slot={segment.media}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3">
                      <Icon name={segment.icon} className="h-[22px] w-[22px] shrink-0 text-navy-700" />
                      <h3 className="text-[18px] font-bold leading-snug text-ink group-hover:text-navy-800">
                        {segment.shortTitle}
                      </h3>
                    </div>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                      {segment.types.map((type) => type.title).join(" · ")}
                    </p>
                    <span className="mt-5 flex flex-1 items-end text-[14px] font-semibold text-navy-700 group-hover:text-accent-700">
                      Explore {segment.types.length} types →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        {/* The cards are links, so the banners' Creative Commons credits are
            listed here rather than on the pictures. */}
        <Reveal>
          <p className="mt-6 text-[12.5px] leading-relaxed text-ink-muted">
            Photographs via Wikimedia Commons:{" "}
            {bannerCredits.map(({ id, title, credit }, index) => (
              <span key={id}>
                {title} —{" "}
                <a href={credit.url} target="_blank" rel="noopener noreferrer" className={creditLink}>
                  {credit.name}
                </a>
                ,{" "}
                <a href={credit.licenceUrl} target="_blank" rel="noopener noreferrer license" className={creditLink}>
                  {credit.licence}
                </a>
                {index < bannerCredits.length - 1 ? "; " : "."}
              </span>
            ))}
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
