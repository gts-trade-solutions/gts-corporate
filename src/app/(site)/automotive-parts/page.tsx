import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { MediaBand } from "@/components/MediaBand";
import { SplitHero } from "@/components/SplitHero";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { Spotlight } from "@/components/Spotlight";
import { partsFaqs } from "@/data/faqs";
import {
  buyerTypes,
  partCategories,
  partGrades,
  partsServiceList,
  priorityProductGroups,
} from "@/data/parts";
import { oemsOf, vehicleModelGroups } from "@/data/vehicle-models";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";
import { listVehicleModels } from "@/lib/vehicle-models-store";

/**
 * The vehicle model counts below come from the admin-editable schedule, so
 * the page is revalidated whenever a model is saved. The interval is a
 * backstop for a missed revalidation.
 */
export const revalidate = 300;

export const metadata: Metadata = buildMetadata("automotive-parts");

const trail = [
  { name: "Home", path: "/" },
  { name: "Automotive Parts", path: "/automotive-parts" },
];

const navItems = [
  { id: "categories", label: "Vehicle Categories" },
  { id: "by-model", label: "By Vehicle Model" },
  { id: "priority-products", label: "Priority Product Groups" },
  { id: "grades", label: "Genuine, OEM & Aftermarket" },
  { id: "buyers", label: "Who We Supply" },
  { id: "faqs", label: "FAQs" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 55}ms` }) as CSSProperties;

export default async function AutomotivePartsPage() {
  const vehicleModels = await listVehicleModels();
  const vehicleModelOems = oemsOf(vehicleModels);

  return (
    <>
      <SplitHero
        trail={trail}
        title="Automotive, EV & Agricultural Components"
        media="automotivePartsHero"
        eyebrow="Component Sourcing & Supply"
        lead="Components for two-wheelers through to buses, trailers, electric vehicles and agricultural machinery — quoted against your drawing, your application and your annual volume."
        services={partsServiceList}
        cta={{ label: "Request Component Sourcing", href: "/contact?enquiry=component-sourcing" }}
        secondary={{ label: "Send a drawing or RFQ", href: "/contact?enquiry=component-sourcing#rfq" }}
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

        {/* Route into the model schedule — the other way buyers look for parts:
            by the vehicle they run, not by the component group. */}
        <Spotlight className="bg-navy-800 bg-blueprint py-16 text-white sm:py-20">
          <div id="by-model" className="mx-auto w-full max-w-7xl scroll-mt-40 px-5 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <span className="inline-flex items-center gap-2.5">
                    <span className="index-mark text-[11px] font-bold tabular-nums text-white/55">
                      02
                    </span>
                    <span className="rule-draw h-px w-7 bg-accent-500" aria-hidden="true" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-500">
                      By Vehicle Model
                    </span>
                  </span>
                  <h2 className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.025em] text-white sm:text-[36px]">
                    Know the vehicle? Start from the model instead
                  </h2>
                  <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-navy-100">
                    The model schedule lists {vehicleModels.length} vehicles across{" "}
                    {vehicleModelOems.length} OEMs — cars, motorcycles, three-wheelers, trucks and
                    bus chassis — each with the components most often requested for it. Tick the
                    parts you need on a model page and the selection carries straight into the
                    enquiry form.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href="/vehicle-models" size="lg" withArrow>
                      Browse vehicle models
                    </ButtonLink>
                    <ButtonLink
                      href="/contact?enquiry=component-sourcing#rfq"
                      variant="outlineLight"
                      size="lg"
                    >
                      Send a parts schedule
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {vehicleModelGroups.map((group, index) => (
                      <li
                        key={group.id}
                        style={stagger(index)}
                        className="stagger-item group flex items-center gap-3 rounded-sm border border-white/15 bg-white/[0.04] px-4 py-3.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-accent-600/50 hover:bg-white/[0.08]"
                      >
                        <Icon
                          name={group.icon}
                          className="h-[18px] w-[18px] shrink-0 text-accent-500 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                        />
                        <span className="text-[14.5px] font-medium text-white">
                          {group.shortTitle}
                        </span>
                        <span className="index-mark ml-auto text-[12px] font-bold tabular-nums text-white/55">
                          {vehicleModels.filter((item) => item.group === group.id).length}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </Spotlight>

        <Section id="priority-products">
          <Reveal>
            <SectionHeading
              eyebrow="Priority Product Groups"
              index={3}
              title="Component groups we are asked for most"
              lead="These move regularly across OEM, fleet, body-builder and aftermarket buyers. If your requirement sits outside the list, send it anyway — the sourcing route is the same."
            />
          </Reveal>
          <Reveal>
            <ul className="mt-7 grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 sm:mt-11 sm:grid-cols-2 lg:grid-cols-3">
              {priorityProductGroups.map((group, index) => (
                <li
                  key={group.title}
                  style={stagger(index)}
                  className="stagger-item group relative flex items-center gap-3 overflow-hidden bg-white px-4 py-3 transition-colors duration-200 hover:bg-steel-50 sm:gap-4 sm:px-5 sm:py-5"
                >
                  <span
                    className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-navy-50 sm:h-11 sm:w-11 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white">
                    <Icon name={group.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-[15px] font-semibold text-ink">{group.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section tone="steel" id="grades">
          <Reveal>
            <SectionHeading
              eyebrow="Grades"
              index={4}
              title="Genuine, OEM and aftermarket spare parts"
              lead="Every auto spare parts enquiry is quoted against a grade, and which one is right depends on the age of the vehicle, the destination market and what the part is doing. As an auto parts supplier and automotive parts exporter we quote all three against the same schedule, so a mixed order still ships as one consignment."
            />
          </Reveal>

          <Reveal>
            <ul className="mt-7 grid gap-4 sm:mt-11 sm:gap-5 md:grid-cols-3">
              {partGrades.map((grade, index) => (
                <li
                  key={grade.title}
                  style={stagger(index)}
                  className="stagger-item corner-ticks flex flex-col rounded-sm border border-steel-200 bg-white p-4 transition-all sm:p-6 duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="index-mark text-[11.5px] font-bold tabular-nums text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 text-[17px] font-bold leading-tight text-ink sm:mt-3 sm:text-[19px]">{grade.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft sm:mt-2.5 sm:text-[15px]">{grade.summary}</p>
                  <p className="mt-3 border-t border-steel-200 pt-3 text-[13.5px] leading-relaxed text-ink-muted sm:mt-4 sm:pt-4 sm:text-[14px]">
                    {grade.note}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <p className="mt-9 max-w-4xl rounded-sm border-l-[3px] border-accent-600 bg-steel-50 p-6 text-[15px] leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">Please note:</strong> naming a grade is
              not a claim of stock, of an OEM appointment or of an authorisation. Tell us the
              grade with the part number, the quantity and the destination and it is quoted
              against that specification.
            </p>
          </Reveal>
        </Section>

        <Section id="buyers">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="sticky-heading self-start lg:col-span-5">
              <Reveal>
                <SectionHeading
                  eyebrow="Who We Supply"
                  index={5}
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
                    href="/consulting/homologation-market-entry"
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
                  index={6}
                  title="Component sourcing FAQs"
                  lead={`${partsFaqs.length} questions on what we source, how parts are identified, and what buyers confirm before sending a drawing or part number.`}
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

      <MediaBand
        slot="automotiveParts"
        plate="PLATE 01"
        caption="Trade stock: the components that keep a fleet on the road"
      />

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
