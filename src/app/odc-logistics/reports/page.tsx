import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { MediaFigure } from "@/components/MediaFigure";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { ConnectBand } from "@/components/logistics/ConnectBand";
import { ReportFinder } from "@/components/logistics/ReportFinder";
import { TopicTabs } from "@/components/logistics/TopicTabs";
import { reportFaqs } from "@/data/faqs";
import {
  odcTopicTabs,
  reportFormats,
  reportListings,
  reportSections,
} from "@/data/logistics";
import { buildMetadata, pageSeo } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
  serviceSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("lbi-reports");

const trail = [
  { name: "Home", path: "/" },
  { name: "ODC Logistics", path: "/odc-logistics" },
  { name: "LBI Reports", path: "/odc-logistics/reports" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

export default function LbiReportsPage() {
  return (
    <>
      {/* Centred hero on a light ground: badge, title, lead, two buttons. */}
      <div className="border-b border-steel-200 bg-gradient-to-b from-navy-50 to-white">
        <Container className="py-14 sm:py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="flex justify-center">
            <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-ink-muted">
              {trail.map((item, index) => {
                const isLast = index === trail.length - 1;
                return (
                  <li key={item.path} className="flex items-center gap-2">
                    {isLast ? (
                      <span aria-current="page" className="font-medium text-ink">
                        {item.name}
                      </span>
                    ) : (
                      <>
                        <Link href={item.path} className="transition-colors hover:text-accent-700">
                          {item.name}
                        </Link>
                        <span aria-hidden="true" className="text-steel-300">
                          /
                        </span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="mx-auto mt-7 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-navy-700">
              <Icon name="pin" className="h-3.5 w-3.5 text-accent-600" />
              Location-Based Intelligence
            </span>

            <h1 className="mt-5 font-display text-[clamp(2.3rem,4.6vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
              LBI Reports
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-ink-soft">
              Location-Based Intelligence reports for ODC logistics, route survey, route
              feasibility, port connectivity, corridor intelligence and heavy cargo movement
              planning — produced against your route and your cargo envelope.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="#catalogue" size="lg" withArrow>
                Explore Reports
              </ButtonLink>
              <ButtonLink href="/contact?enquiry=route-survey#rfq" variant="outline" size="lg">
                Talk to an Expert
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      <TopicTabs items={odcTopicTabs} />

      {/* Catalogue: filter bar over a card grid. */}
      <Section id="catalogue" tone="steel">
        <Reveal>
          <SectionHeading
            eyebrow="Report Catalogue"
            index={1}
            title="Report types we produce"
            lead="Each report is scoped against a named route and a defined cargo envelope, so these are the report types rather than a stock list. Filter by category or region, or search across every listing."
          />
        </Reveal>
        <Reveal>
          <div className="mt-11">
            <ReportFinder listings={reportListings} />
          </div>
        </Reveal>
      </Section>

      {/* What is inside a report. */}
      <Section id="contents">
        <Reveal>
          <SectionHeading
            eyebrow="What's Inside"
            index={2}
            title="Seven sections, in the order you need them"
            lead="The obstruction schedule is the body of the document and everything else exists to make it readable — what the cargo is, where the route runs, and what has to happen at each point before the consignment can pass."
          />
        </Reveal>

        <Reveal>
          <ol className="mt-12 divide-y divide-steel-200 border-y border-steel-200">
            {reportSections.map((section, index) => (
              <li
                key={section.title}
                style={stagger(index)}
                className="stagger-item grid gap-2 py-6 lg:grid-cols-[64px_280px_1fr] lg:gap-8"
              >
                <span className="index-mark text-[13px] font-bold tabular-nums text-accent-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[17px] font-bold leading-snug text-ink">{section.title}</h3>
                <p className="max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
                  {section.description}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <MediaFigure
              slot="odcConsultation"
              plate="PLATE 03"
              caption="The report is what the conversation is held against"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="aspect-[16/10] lg:aspect-[16/11]"
            />
            <div>
              <h3 className="text-[20px] font-bold leading-tight text-ink">
                Written to be handed over
              </h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft [hyphens:auto] sm:text-justify">
                A survey report is only worth producing if the people who did not drive the route
                can act on it — the transporter planning the run, the authority assessing the
                application, the utility owner scheduling a shutdown. That is why every point
                carries a measurement, a coordinate and a photograph rather than a description.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft [hyphens:auto] sm:text-justify">
                A survey records far more than belongs in a report. After the fieldwork the points
                are reviewed and the ones that matter are selected for the document, so the schedule
                carries the constraints that affect the movement rather than every frame captured on
                the road.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Formats. */}
      <Section tone="steel" id="formats">
        <Reveal>
          <SectionHeading
            eyebrow="Formats"
            index={3}
            title="Issued in the formats each reader actually needs"
            lead="An editable master for your own team, a fixed version for circulation, and a navigable track for the vehicle. It is your document once issued."
          />
        </Reveal>
        <Reveal>
          <div className="mt-11 grid gap-5 md:grid-cols-3">
            {reportFormats.map((format, index) => (
              <div
                key={format.title}
                style={stagger(index)}
                className="stagger-item keyline group relative overflow-hidden rounded-sm border border-steel-200 bg-white p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white">
                  <Icon name={format.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-ink transition-colors duration-200 group-hover:text-navy-800">
                  {format.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-10 max-w-4xl rounded-sm border-l-[3px] border-accent-600 bg-white p-6 text-[15px] leading-relaxed text-ink-soft shadow-card">
            <strong className="font-semibold text-ink">On approvals:</strong> the report is written
            to be the technical content behind an oversize or overweight application, but the permit
            itself is issued by the competent road, bridge, rail or utility authority. GTS prepares
            and coordinates the submission — we do not issue approvals.
          </p>
        </Reveal>
      </Section>

      <Section id="faqs">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="sticky-heading self-start lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="Questions"
                index={4}
                title="Report FAQs"
                lead={`${reportFaqs.length} questions on contents, formats, how the report is produced and who it is written for.`}
              />
              <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
                New to this? Start with{" "}
                <Link
                  href="/odc-logistics/route-survey"
                  className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
                >
                  what a route survey covers
                </Link>
                , then come back to the deliverable.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <FAQ faqs={reportFaqs} id="faq-list" />
            </Reveal>
          </div>
        </div>
      </Section>

      <ConnectBand
        title="Connect with us for a survey and report"
        cta={{ label: "For More Enquiries", href: "/contact?enquiry=route-survey#rfq" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "LBI Route Survey Reports",
            description: pageSeo["lbi-reports"].description,
            path: "/odc-logistics/reports",
            serviceType: "Route survey reporting and transport documentation",
            offers: reportSections.map((section) => section.title),
          }),
          itemListSchema({
            name: "LBI report types",
            description: pageSeo["lbi-reports"].description,
            items: reportListings.map((report) => ({
              name: report.title,
              path: `/odc-logistics/reports#${report.id}`,
            })),
          }),
          faqSchema(reportFaqs),
        ]}
      />
    </>
  );
}
