import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ModelFinder } from "@/components/ModelFinder";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { VehicleModelCard } from "@/components/VehicleModelCard";
import { AxleBlueprint } from "@/components/illustrations/AxleBlueprint";
import { modelFaqs } from "@/data/faqs";
import {
  modelName,
  vehicleModelGroups,
  vehicleModelMarkets,
  vehicleModelOems,
  vehicleModels,
} from "@/data/vehicle-models";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, itemListSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("vehicle-models");

const trail = [
  { name: "Home", path: "/" },
  { name: "Vehicle Models", path: "/vehicle-models" },
];

const navItems = [
  { id: "how-it-works", label: "How It Works" },
  { id: "models", label: "All Models" },
  { id: "faqs", label: "FAQs" },
];

const steps = [
  {
    title: "Find your model",
    description:
      "Filter by vehicle type or OEM, or search a model, a destination market or a part name. Every model in the schedule is on this one page.",
    icon: "search" as const,
  },
  {
    title: "Tick the components",
    description:
      "Each model page lists the parts that move most on it. Select exactly what you need — one line item or the whole service kit.",
    icon: "clipboard" as const,
  },
  {
    title: "Send the enquiry",
    description:
      "Your selection travels with you into the enquiry form, already written up. Add quantities and contact details and send it.",
    icon: "route" as const,
  },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

/** Coverage figures, all derived — they cannot drift from the schedule. */
const coverage = [
  { value: vehicleModels.length, label: "Models in the schedule" },
  { value: vehicleModelOems.length, label: "OEMs covered" },
  { value: vehicleModelMarkets.length, label: "Destination markets" },
  {
    value: new Set(vehicleModels.flatMap((item) => item.parts)).size,
    label: "Distinct part groups",
  },
];

export default function VehicleModelsPage() {
  const groupOptions = vehicleModelGroups.map((group) => ({
    id: group.id,
    title: group.shortTitle,
    count: vehicleModels.filter((item) => item.group === group.id).length,
  }));

  const oemOptions = vehicleModelOems.map((oem) => ({
    id: oem,
    title: oem,
    count: vehicleModels.filter((item) => item.oem === oem).length,
  }));

  return (
    <>
      <PageHero
        eyebrow="Vehicle Models & Spare Parts"
        title="Find Spare Parts by Vehicle Model"
        lead={`Every vehicle model we are regularly asked to supply parts for — ${vehicleModels.length} models across ${vehicleModelOems.length} OEMs — with the components that move most on each one. Pick your model, tick the parts, and the selection carries straight into the enquiry form.`}
        primaryCta={{ label: "Browse all models", href: "#models" }}
        secondaryCta={{ label: "Request a part not listed", href: "/contact?enquiry=component-sourcing#rfq" }}
        trail={trail}
        art={<AxleBlueprint className="w-full" />}
        artLabel="FIG. 03 — MODEL SCHEDULE"
      />

      {/* Wrapper bounds the sticky nav, so it scrolls away with the sections. */}
      <div>
        <SectionNav items={navItems} />

        <Section tone="steel" id="how-it-works">
          <Reveal>
            <SectionHeading
              eyebrow="How It Works"
              index={1}
              title="From a model name to a quotable enquiry in three steps"
              lead="The list below is a demand schedule, not a stock list — it records what buyers in each market actually ask for, so an enquiry can be assembled without a round of questions first."
            />
          </Reveal>

          <Reveal>
            <ol className="mt-11 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  style={stagger(index)}
                  className="stagger-item corner-ticks group relative rounded-sm border border-steel-200 bg-white p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="flex items-center gap-3">
                    <span className="index-mark text-[12px] font-bold tabular-nums text-ink-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="rule-draw h-px w-6 bg-accent-600" aria-hidden="true" />
                    <Icon name={step.icon} className="h-[18px] w-[18px] text-accent-600" />
                  </div>
                  <h3 className="mt-4 text-[17px] font-bold text-ink transition-colors duration-200 group-hover:text-navy-800">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:grid-cols-4">
              {coverage.map((item) => (
                <div key={item.label} className="bg-white px-5 py-5">
                  <dt className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                    {item.label}
                  </dt>
                  <dd className="index-mark mt-1.5 text-[30px] font-bold leading-none tabular-nums text-navy-800">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {vehicleModelGroups.map((group, index) => (
                <div
                  key={group.id}
                  style={stagger(index)}
                  className="stagger-item rounded-sm border-l-[3px] border-navy-700 bg-white px-4 py-4"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon name={group.icon} className="h-[18px] w-[18px] shrink-0 text-navy-700" />
                    <h3 className="text-[14.5px] font-bold text-ink">{group.title}</h3>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                    {group.summary}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        <Section id="models">
          <Reveal>
            <SectionHeading
              eyebrow="All Models"
              index={2}
              title="The full model schedule"
              lead="Filter by vehicle type and OEM together, or search across model names, destination markets and every part name on the page."
            />
          </Reveal>

          <Reveal>
            <div className="mt-11">
              <ModelFinder
                groups={groupOptions}
                oems={oemOptions}
                total={vehicleModels.length}
              >
                {vehicleModels.map((item) => (
                  <div
                    key={item.slug}
                    data-model={item.slug}
                    data-group={item.group}
                    data-oem={item.oem}
                    /* Everything the search box matches against, pre-lowercased. */
                    data-search={`${item.oem} ${item.model} ${item.segment} ${item.exportedFrom} ${item.markets.join(
                      " ",
                    )} ${item.parts.join(" ")}`.toLowerCase()}
                    className="h-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    <VehicleModelCard item={item} />
                  </div>
                ))}
              </ModelFinder>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-10 max-w-4xl rounded-sm border-l-[3px] border-accent-600 bg-steel-50 p-6 text-[15px] leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">Please note:</strong> this schedule records
              the models and components we are most often asked for, and the markets those enquiries
              come from. It is not a stock list, and it does not imply an OEM appointment or
              authorisation. Parts are quoted per enquiry against the specification, grade and
              volume you confirm. Sourcing a model that is not listed works exactly the same way —{" "}
              <Link
                href="/contact?enquiry=component-sourcing#rfq"
                className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
              >
                send the make, model and part
              </Link>
              .
            </p>
          </Reveal>
        </Section>

        <Section tone="steel" id="faqs">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="sticky-heading self-start lg:col-span-4">
              <Reveal>
                <SectionHeading
                  eyebrow="Questions"
                  index={3}
                  title="Model &amp; spare parts FAQs"
                  lead="What buyers usually confirm before sending a parts schedule."
                />
                <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
                  Sourcing by component group rather than by model? See{" "}
                  <Link
                    href="/automotive-parts"
                    className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                  >
                    automotive, EV and agricultural components
                  </Link>
                  . Looking for the complete vehicle instead of the parts? See{" "}
                  <Link
                    href="/import-export#vehicle-trade-categories"
                    className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                  >
                    vehicle import and export
                  </Link>
                  .
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <div className="rounded-sm bg-white px-6 shadow-card">
                  <FAQ faqs={modelFaqs} id="faq-list" />
                </div>
              </Reveal>
            </div>
          </div>
        </Section>
      </div>

      <CTASection
        eyebrow="Spare Parts Enquiry"
        title="Send a parts schedule for one model or a whole fleet"
        lead="Tick the components on a model page, or attach your own parts schedule as a spreadsheet. Include quantities and the destination market and we will come back with a sourcing route and an indicative commercial position."
        primaryCta={{ label: "Request Component Sourcing", href: "/contact?enquiry=component-sourcing#rfq" }}
        secondaryCta={{ label: "Browse component categories", href: "/automotive-parts" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "Vehicle Spare Parts Sourcing by Model",
            description: pageSeo["vehicle-models"].description,
            path: "/vehicle-models",
            serviceType: "Vehicle spare parts sourcing and export",
            offers: vehicleModelGroups.map((group) => group.title),
          }),
          itemListSchema({
            name: "Vehicle models and priority spare parts",
            description: pageSeo["vehicle-models"].description,
            items: vehicleModels.map((item) => ({
              name: modelName(item),
              path: `/vehicle-models/${item.slug}`,
            })),
          }),
          faqSchema(modelFaqs),
        ]}
      />
    </>
  );
}
