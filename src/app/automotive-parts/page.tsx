import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { AxleBlueprint } from "@/components/illustrations/AxleBlueprint";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { partsFaqs } from "@/data/faqs";
import { buyerTypes, partCategories, priorityProductGroups } from "@/data/parts";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("automotive-parts");

const trail = [
  { name: "Home", path: "/" },
  { name: "Automotive Parts", path: "/automotive-parts" },
];

const navItems = [
  { id: "categories", label: "Vehicle Categories" },
  { id: "priority-products", label: "Priority Product Groups" },
  { id: "buyers", label: "Who We Supply" },
  { id: "faqs", label: "FAQs" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 55}ms` }) as CSSProperties;

export default function AutomotivePartsPage() {
  return (
    <>
      <PageHero
        eyebrow="Automotive Parts"
        title="Automotive, EV & Agricultural Components"
        lead="Component sourcing and supply for two-wheelers, three-wheelers, cars and LCVs, trucks, buses, trailers, electric vehicles and agricultural machinery — quoted against your drawing, application and annual volume."
        primaryCta={{ label: "Request Component Sourcing", href: "/contact?enquiry=component-sourcing" }}
        secondaryCta={{ label: "Send Drawing / RFQ", href: "/contact?enquiry=component-sourcing#rfq" }}
        trail={trail}
        art={<AxleBlueprint className="w-full" />}
        artLabel="FIG. 02 — TRAILER AXLE"
      />

      {/* Wrapper bounds the sticky nav, so it scrolls away with the sections. */}
      <div>
        <SectionNav items={navItems} />

        <Section id="categories">
          <Reveal>
            <SectionHeading
              eyebrow="Vehicle & Application Categories"
              index={1}
              title="Find components by vehicle type"
              lead="Filter by segment, or scroll the full range. Every category is quoted against the specific application — axle rating, duty cycle, voltage and volume all change the right answer."
            />
          </Reveal>

          <Reveal>
            <div className="mt-11">
              <CategoryFilter options={partCategories.map(({ id, title }) => ({ id, title }))}>
                {partCategories.map((category) => (
                  <div
                    key={category.id}
                    data-category={category.id}
                    /* Everything the search box matches against, pre-lowercased. */
                    data-search={`${category.title} ${category.summary} ${category.items.join(
                      " ",
                    )}`.toLowerCase()}
                    className="h-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    <ProductCategoryCard
                      block={category}
                      compact
                      href={`/automotive-parts/${category.id}`}
                    />
                  </div>
                ))}
              </CategoryFilter>
            </div>
          </Reveal>
        </Section>

        <Section tone="steel" id="priority-products">
          <Reveal>
            <SectionHeading
              eyebrow="Priority Product Groups"
              index={2}
              title="Component groups we are asked for most"
              lead="These move regularly across OEM, fleet, body-builder and aftermarket buyers. If your requirement sits outside the list, send it anyway — the sourcing route is the same."
            />
          </Reveal>
          <Reveal>
            <ul className="mt-11 grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:grid-cols-3">
              {priorityProductGroups.map((group, index) => (
                <li
                  key={group.title}
                  style={stagger(index)}
                  className="stagger-item group relative flex items-center gap-4 overflow-hidden bg-white px-5 py-5 transition-colors duration-200 hover:bg-steel-50"
                >
                  <span
                    className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white">
                    <Icon name={group.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-[15px] font-semibold text-ink">{group.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section id="buyers">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="sticky-heading self-start lg:col-span-5">
              <Reveal>
                <SectionHeading
                  eyebrow="Who We Supply"
                  index={3}
                  title="Buyer types we work with"
                  lead="From a single development sample to a scheduled annual volume, the commercial conversation is adjusted to who is buying and why."
                />
                <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
                  Need a part built rather than sourced? It moves to{" "}
                  <Link
                    href="/manufacturing"
                    className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                  >
                    contract manufacturing and fabrication
                  </Link>
                  . Taking a new component or vehicle into a new market? See{" "}
                  <Link
                    href="/consulting#homologation-market-entry"
                    className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                  >
                    homologation, testing and market entry
                  </Link>
                  .
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <ul className="flex flex-wrap gap-2.5">
                  {buyerTypes.map((buyer, index) => (
                    <li
                      key={buyer}
                      style={{ "--stagger-delay": `${index * 40}ms` } as CSSProperties}
                      className="stagger-item cursor-default rounded-sm border border-steel-300 bg-white px-4 py-2.5 text-[14.5px] font-medium text-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-navy-700 hover:text-navy-800 hover:shadow-card"
                    >
                      {buyer}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Section>

        <Section tone="steel" id="faqs">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="sticky-heading self-start lg:col-span-4">
              <Reveal>
                <SectionHeading
                  eyebrow="Questions"
                  index={4}
                  title="Component sourcing FAQs"
                  lead="What buyers usually confirm before sending a drawing or part number."
                />
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <div className="rounded-sm bg-white px-6 shadow-card">
                  <FAQ faqs={partsFaqs} id="faq-list" />
                </div>
              </Reveal>
            </div>
          </div>
        </Section>
      </div>

      <CTASection
        eyebrow="Component Sourcing"
        title="Send a drawing, part number or sample photo"
        lead="Include the vehicle or machine application and your annual volume, and we will come back with a sourcing route and an indicative commercial position."
        primaryCta={{ label: "Request Component Sourcing", href: "/contact?enquiry=component-sourcing" }}
        secondaryCta={{ label: "Send Drawing / RFQ", href: "/contact?enquiry=component-sourcing#rfq" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "Automotive, EV and Agricultural Component Sourcing",
            description: pageSeo["automotive-parts"].description,
            path: "/automotive-parts",
            serviceType: "Automotive component sourcing and supply",
            offers: partCategories.map((category) => category.title),
          }),
          faqSchema(partsFaqs),
        ]}
      />
    </>
  );
}
