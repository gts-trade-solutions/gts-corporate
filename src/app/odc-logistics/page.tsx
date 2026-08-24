import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Media, MediaScrim } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { AlternatingRow } from "@/components/logistics/AlternatingRow";
import { ConnectBand } from "@/components/logistics/ConnectBand";
import { odcFaqs } from "@/data/faqs";
import { odcCargoTypes, odcSections, odcServiceList } from "@/data/logistics";
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
      {/*
        Split hero, following the reference layout: a full-height photograph on
        one side and a dark panel on the other carrying the service list and the
        single accent CTA.
      */}
      <div className="bg-navy-900">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[480px]">
            <Media slot="odcJetty" sizes="(min-width: 1024px) 50vw, 100vw" priority />
            <MediaScrim side="bottom" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-navy-100">
                  {trail.map((item, index) => {
                    const isLast = index === trail.length - 1;
                    return (
                      <li key={item.path} className="flex items-center gap-2">
                        {isLast ? (
                          <span aria-current="page" className="text-white">
                            {item.name}
                          </span>
                        ) : (
                          <>
                            <Link href={item.path} className="transition-colors hover:text-accent-500">
                              {item.name}
                            </Link>
                            <span aria-hidden="true" className="text-navy-100/50">
                              /
                            </span>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
              <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.03em] text-white">
                Transforming heavy movement. Delivering results.
              </h1>
            </div>
          </div>

          <div className="bg-grain relative flex flex-col justify-center bg-navy-800 bg-blueprint px-6 py-10 sm:px-10 lg:py-14">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-500">
              Customised Transport Services
            </span>
            <p className="mt-4 max-w-[46ch] text-[16.5px] leading-relaxed text-navy-100">
              Consignments that will not fit a standard trailer need the route solved before the
              transport is booked. GTS handles the engineering, the survey, the approvals and the
              supervision.
            </p>

            <ul className="mt-7 divide-y divide-white/10 border-y border-white/10">
              {odcServiceList.map((service, index) => (
                <li key={service.label} style={stagger(index)} className="stagger-item">
                  <Link
                    href={service.href}
                    className="group flex items-center gap-3.5 py-2.5 transition-colors duration-200"
                  >
                    <Icon
                      name={service.icon}
                      className="h-[18px] w-[18px] shrink-0 text-accent-500 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    />
                    <span className="text-[14.5px] font-medium text-white group-hover:text-accent-500">
                      {service.label}
                    </span>
                    <svg
                      viewBox="0 0 16 16"
                      className="ml-auto h-3.5 w-3.5 shrink-0 text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <ButtonLink href="/contact?enquiry=odc-logistics#rfq" size="lg" withArrow>
                Get an estimate for an ODC movement
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* Service rows, alternating side to side. */}
      <Section className="!pb-0">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            index={1}
            title="What we do on an ODC movement"
            lead="Eight services that cover a consignment end to end — from the engineering that decides whether it can move, through clearance and the movement itself, to the trailer it moves on."
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
