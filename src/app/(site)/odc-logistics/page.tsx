import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { SplitHero } from "@/components/SplitHero";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { AlternatingRow } from "@/components/logistics/AlternatingRow";
import { ConnectBand } from "@/components/logistics/ConnectBand";
import { TopicTabs } from "@/components/logistics/TopicTabs";
import { odcFaqs } from "@/data/faqs";
import {
  odcCargoTypes,
  odcRelatedTabs,
  odcSections,
  odcServiceList,
  odcTopicTabs,
} from "@/data/logistics";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("odc-logistics");

const trail = [
  { name: "Home", path: "/" },
  { name: "ODC Logistics", path: "/odc-logistics" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

export default function OdcLogisticsPage() {
  return (
    <>
      <SplitHero
        trail={trail}
        title="Transforming heavy movement. Delivering results."
        media="odcJetty"
        eyebrow="Customised Transport Services"
        lead="Consignments that will not fit a standard trailer need the route solved before the transport is booked. GTS handles the engineering, the survey, the approvals and the supervision."
        services={odcServiceList}
        cta={{ label: "Get an estimate for an ODC movement", href: "/contact?enquiry=odc-logistics#rfq" }}
      />

      {/* The section nav. This page is the ODC overview, so it sat without one
          until now — the other two pages could reach it, but not the reverse. */}
      <TopicTabs items={odcTopicTabs} related={odcRelatedTabs} />

      {/* Service rows, alternating side to side. */}
      <Section className="!pb-0">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            index={1}
            title="What we do on an ODC movement"
            lead="Eight services that cover a consignment end to end — heavy lift logistics, oversized cargo transport and project cargo alike — from the engineering that decides whether it can move, through clearance and the movement itself, to the trailer it moves on."
          />
        </Reveal>
      </Section>

      {odcSections.map((section, index) => (
        <AlternatingRow key={section.id} section={section} index={index} />
      ))}

      <Section tone="steel" id="cargo">
        <Reveal>
          <SectionHeading
            eyebrow="Cargo We Move"
            index={2}
            title="If it exceeds a legal limit, it is an ODC movement"
            lead="Width, height, length or weight — exceeding any one of them puts the consignment outside ordinary transport and into permits, surveys and engineering."
          />
        </Reveal>
        <Reveal>
          <ul className="mt-11 flex flex-wrap gap-2.5">
            {odcCargoTypes.map((cargo, index) => (
              <li
                key={cargo}
                style={stagger(index)}
                className="stagger-item cursor-default rounded-sm border border-steel-300 bg-white px-4 py-2.5 text-[14.5px] font-medium text-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-navy-700 hover:text-navy-800 hover:shadow-card"
              >
                {cargo}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <p className="mt-10 max-w-4xl rounded-sm border-l-[3px] border-accent-600 bg-white p-6 text-[15px] leading-relaxed text-ink-soft shadow-card">
            <strong className="font-semibold text-ink">Please note:</strong> oversize and overweight
            permits, structure clearances and no-objection certificates are issued by the competent
            road, bridge, rail and utility authorities. GTS prepares, submits and coordinates those
            applications — we do not issue them. Transport, lifting and escort capability is
            delivered through coordinated partners selected for the specific movement rather than
            from an owned fleet.
          </p>
        </Reveal>
      </Section>

      <Section id="faqs">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="sticky-heading self-start lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="Questions"
                index={3}
                title="ODC logistics FAQs"
                lead={`${odcFaqs.length} questions on scope, feasibility, permits and what we need to assess a movement.`}
              />
              <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
                See{" "}
                <Link
                  href="/odc-logistics/route-survey"
                  className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                >
                  Route Survey Reports
                </Link>{" "}
                for how a route is recorded, and{" "}
                <Link
                  href="/odc-logistics/reports"
                  className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                >
                  Reports
                </Link>{" "}
                for what the deliverable contains.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <FAQ faqs={odcFaqs} id="faq-list" />
            </Reveal>
          </div>
        </div>
      </Section>

      <ConnectBand />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "ODC Logistics and Heavy-Lift Transport",
            description: pageSeo["odc-logistics"].description,
            path: "/odc-logistics",
            serviceType: "Over-dimensional cargo logistics and transport engineering",
            offers: odcSections.map((section) => section.title),
          }),
          faqSchema(odcFaqs),
        ]}
      />
    </>
  );
}
