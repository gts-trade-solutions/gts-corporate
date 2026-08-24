import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Media } from "@/components/Media";
import { MediaFigure } from "@/components/MediaFigure";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { ConnectBand } from "@/components/logistics/ConnectBand";
import { TopicTabs } from "@/components/logistics/TopicTabs";
import { routeSurveyFaqs } from "@/data/faqs";
import {
  lbiIntro,
  lbiKeyFeatures,
  odcTopicTabs,
  surveyObstructions,
  surveyOutputs,
  surveyPointFields,
} from "@/data/logistics";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("route-survey");

const trail = [
  { name: "Home", path: "/" },
  { name: "ODC Logistics", path: "/odc-logistics" },
  { name: "LBI Route Survey", path: "/odc-logistics/route-survey" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

export default function RouteSurveyPage() {
  const obstructionCount = surveyObstructions.reduce((total, g) => total + g.items.length, 0);

  return (
    <>
      {/* Split hero: title on white at the left, photograph filling the right. */}
      <div className="bg-white">
        <Container className="lg:px-0">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-0">
            <div className="pt-10 lg:py-16 lg:pr-12 lg:pl-8">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-muted">
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

              <span className="mt-6 inline-flex items-center gap-2.5">
                <span className="rule-draw h-px w-7 bg-accent-600" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-700">
                  Location-Based Intelligence
                </span>
              </span>

              <h1 className="mt-4 font-display text-[clamp(2.2rem,4.4vw,3.4rem)] font-bold leading-[1.03] tracking-[-0.035em] text-navy-800">
                LBI Route Survey
              </h1>
              <p className="mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-ink-soft">
                A route is not surveyed from a map. It is driven end to end, and every bridge,
                cable, junction, culvert and narrow section along it is measured, photographed and
                fixed to a GPS coordinate and a chainage.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact?enquiry=route-survey#rfq" size="lg" withArrow>
                  Request a Route Survey
                </ButtonLink>
                <ButtonLink href="/odc-logistics/reports" variant="outline" size="lg">
                  See the report
                </ButtonLink>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-navy-900 lg:aspect-auto lg:min-h-[480px]">
              <Media slot="routeSurveyTeam" sizes="(min-width: 1024px) 50vw, 100vw" priority />
            </div>
          </div>
        </Container>
      </div>

      <TopicTabs items={odcTopicTabs} />

      {/* Intro row — image left, justified copy right. */}
      <Section>
        <Reveal>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <MediaFigure
              slot="routeSurveyInstrument"
              plate="PLATE 01"
              caption="Measurement, not observation"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="aspect-[16/11]"
            />
            <div>
              {lbiIntro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-4 text-[15.5px] leading-relaxed text-ink-soft [hyphens:auto] first:mt-0 sm:text-justify"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Key Features — two-tone heading, bullets left, photograph right. */}
      <Section tone="steel" id="key-features">
        <Reveal>
          <h2 className="font-display text-[30px] font-bold leading-tight tracking-[-0.025em] text-ink sm:text-[38px]">
            Key <span className="text-accent-700">Features</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <ul className="space-y-4">
                {lbiKeyFeatures.map((feature, index) => (
                  <li
                    key={feature.text.slice(0, 30)}
                    style={stagger(index)}
                    className="stagger-item flex gap-3.5"
                  >
                    <span
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600"
                      aria-hidden="true"
                    />
                    <span className="text-[15.5px] leading-relaxed text-ink-soft">
                      {feature.text}
                      {feature.conditional ? (
                        <span className="text-accent-700" aria-hidden="true">
                          {" "}
                          *
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-l-[3px] border-steel-300 pl-4 text-[13.5px] leading-relaxed text-ink-muted">
                <span className="text-accent-700" aria-hidden="true">
                  *
                </span>{" "}
                Included where the agreed survey scope covers it. Calculation work is quoted
                against the cargo envelope and the structures actually on the route.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <MediaFigure
                slot="routeSurveyTeam"
                plate="PLATE 02"
                caption="Recorded in the field, point by point"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="aspect-[4/3] lg:aspect-[3/4]"
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* What is recorded at each point. */}
      <Section id="point-data">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="sticky-heading self-start lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="What We Record"
                index={1}
                title="Seven fields at every single point"
                lead="A survey is only useful if someone who has never driven the route can work from it. That is why every obstruction carries a position, a measurement, an instruction and a photograph."
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <dl className="divide-y divide-steel-200 border-y border-steel-200">
                {surveyPointFields.map((field, index) => (
                  <div key={field.label} className="grid gap-1 py-5 sm:grid-cols-[190px_1fr] sm:gap-6">
                    <dt className="flex items-baseline gap-2.5">
                      <span className="index-mark text-[12px] font-bold tabular-nums text-ink-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] font-bold text-ink">{field.label}</span>
                    </dt>
                    <dd className="text-[14.5px] leading-relaxed text-ink-soft">
                      {field.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="steel" id="obstructions">
        <Reveal>
          <SectionHeading
            eyebrow="Obstructions"
            index={2}
            title={`${obstructionCount} categories of constraint, in four groups`}
            lead="Everything that can stop an over-dimensional consignment falls into one of these. Each is measured against the cargo envelope, then classified as clearable, avoidable or blocking."
          />
        </Reveal>
        <Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {surveyObstructions.map((group, index) => (
              <div key={group.id} className="stagger-item h-full" style={stagger(index)}>
                <ProductCategoryCard block={group} compact />
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section id="outputs">
        <Reveal>
          <SectionHeading
            eyebrow="What You Get"
            index={3}
            title="Six deliverables from one survey"
            lead="The survey data is assembled into documents that different people can each work from — the crew driving it, the authority approving it and the utility owner scheduling a shutdown."
          />
        </Reveal>
        <Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {surveyOutputs.map((output, index) => (
              <div
                key={output.title}
                style={stagger(index)}
                className="stagger-item keyline group relative overflow-hidden rounded-sm border border-steel-200 bg-white p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white">
                  <Icon name={output.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-ink transition-colors duration-200 group-hover:text-navy-800">
                  {output.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                  {output.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="steel" id="faqs">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="sticky-heading self-start lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="Questions"
                index={4}
                title="Route survey FAQs"
                lead={`${routeSurveyFaqs.length} questions on scope, timing, obstructions and how a survey feeds a permit application.`}
              />
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <div className="rounded-sm bg-white px-6 shadow-card">
                <FAQ faqs={routeSurveyFaqs} id="faq-list" />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <ConnectBand
        title="Connect with us for a route survey"
        cta={{ label: "For More Enquiries", href: "/contact?enquiry=route-survey#rfq" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "LBI Route Survey",
            description: pageSeo["route-survey"].description,
            path: "/odc-logistics/route-survey",
            serviceType: "Route survey and transport feasibility assessment",
            offers: surveyOutputs.map((output) => output.title),
          }),
          faqSchema(routeSurveyFaqs),
        ]}
      />
    </>
  );
}
