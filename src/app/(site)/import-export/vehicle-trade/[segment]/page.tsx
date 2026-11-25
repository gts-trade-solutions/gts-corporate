import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/Button";
import { CreditedPhoto } from "@/components/CreditedPhoto";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ModuleNav } from "@/components/ModuleNav";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { VehicleModelTile } from "@/components/VehicleModelTile";
import { siteUrl } from "@/data/site";
import { tradeNav } from "@/data/trade";
import {
  findVehicleSegment,
  modelsByType,
  vehicleSegmentHref,
  vehicleSegments,
} from "@/data/vehicle-segments";
import { listVehicleModels } from "@/lib/vehicle-models-store";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

/**
 * One page per vehicle segment: /import-export/vehicle-trade/<segment>.
 *
 * The explanatory copy is static (src/data/vehicle-segments.ts). The model
 * tiles under each type come from the schedule, which is editable in /admin,
 * so the page is revalidated whenever a model is saved, with this interval as
 * a backstop.
 */
export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return vehicleSegments.map((segment) => ({ segment: segment.id }));
}

type Props = { params: Promise<{ segment: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const segment = findVehicleSegment((await params).segment);
  if (!segment) return {};

  const path = vehicleSegmentHref(segment.id);
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: segment.seoTitle }];
  return {
    title: { absolute: segment.seoTitle },
    description: segment.metaDescription,
    keywords: segment.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${siteUrl}${path}`,
      title: segment.seoTitle,
      description: segment.metaDescription,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: segment.seoTitle,
      description: segment.metaDescription,
      images,
    },
  };
}

const subheading = "text-[12px] font-bold uppercase tracking-[0.14em] text-ink-muted";

export default async function VehicleSegmentPage({ params }: Props) {
  const segment = findVehicleSegment((await params).segment);
  if (!segment) notFound();

  const path = vehicleSegmentHref(segment.id);
  const models = modelsByType(segment, await listVehicleModels());
  const others = vehicleSegments.filter((item) => item.id !== segment.id);
  const enquiryHref = `/contact?enquiry=vehicle-trade&product=${encodeURIComponent(segment.enquiryProduct)}#rfq`;
  const typeCount = segment.types.length;

  const trail = [
    { name: "Home", path: "/" },
    { name: "Import & Export", path: "/import-export" },
    { name: "Vehicle Trade", path: "/import-export/vehicle-trade" },
    { name: segment.title, path },
  ];

  return (
    <>
      <PageHero
        eyebrow="Vehicle Trade"
        title={segment.heroTitle}
        lead={segment.heroLead}
        primaryCta={{ label: `Enquire about ${segment.shortTitle.toLowerCase()}`, href: enquiryHref }}
        secondaryCta={{ label: "All vehicle categories", href: "/import-export/vehicle-trade" }}
        trail={trail}
        media={segment.media}
      />

      <ModuleNav items={tradeNav} active="/import-export/vehicle-trade" />

      {/* 01 — what the category is, and how it is classed. */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading eyebrow="Overview" index={1} title={`${segment.shortTitle} explained`} />
              {segment.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 max-w-[62ch] text-pretty text-[16.5px] leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="corner-ticks rounded-sm border border-steel-200 bg-steel-50 p-6 sm:p-7">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
                  Classification
                </span>
                <h3 className="mt-3 text-[20px] font-bold leading-tight text-ink">
                  {segment.classes.title}
                </h3>
                <dl className="mt-5 divide-y divide-steel-200 border-y border-steel-200">
                  {segment.classes.items.map((item) => (
                    <div key={item.code} className="flex gap-4 py-3.5">
                      <dt className="w-[4.5rem] shrink-0 text-[13px] font-bold tabular-nums text-navy-700">
                        {item.code}
                      </dt>
                      <dd className="text-[14.5px] leading-relaxed text-ink">{item.label}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[13.5px] leading-relaxed text-ink-soft">{segment.classes.note}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 02 — a visual index of the types, each a jump link to its section. */}
      <Section tone="steel">
        <Reveal>
          <SectionHeading
            eyebrow="Types"
            index={2}
            title={`${typeCount} types at a glance`}
            lead="Select a type for the full explanation, the figures that matter and the models in our export schedule."
          />
        </Reveal>
        <Reveal>
          <ul
            className={`mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 ${
              typeCount % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            }`}
          >
            {segment.types.map((type, index) => (
              <li key={type.id}>
                <a
                  href={`#${type.id}`}
                  className="keyline group flex h-full flex-col overflow-hidden rounded-sm border border-steel-200 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-white">
                    <Image
                      src={type.photo.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className={`transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
                        type.photo.fit === "contain" ? "object-contain p-3" : "object-cover"
                      }`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                    <span className="index-mark text-[11px] font-bold tabular-nums text-ink-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 text-[14.5px] font-bold leading-snug text-ink group-hover:text-navy-800 sm:text-[15.5px]">
                      {type.title}
                    </span>
                    <span className="mt-1.5 hidden text-[13px] leading-relaxed text-ink-soft sm:block">
                      {type.summary}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <p className="mt-6 max-w-4xl text-[13px] leading-relaxed text-ink-muted">
          The photographs show each type in service in India and in export markets. They illustrate
          the class; they are not GTS shipments. Each carries its photographer&apos;s credit.
          {segment.heroCredit ? (
            <>
              {" "}
              Banner photograph:{" "}
              <a
                href={segment.heroCredit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-steel-300 underline-offset-2 hover:text-ink"
              >
                {segment.heroCredit.name}
              </a>
              ,{" "}
              <a
                href={segment.heroCredit.licenceUrl}
                target="_blank"
                rel="noopener noreferrer license"
                className="underline decoration-steel-300 underline-offset-2 hover:text-ink"
              >
                {segment.heroCredit.licence}
              </a>
              , via Wikimedia Commons.
            </>
          ) : null}
        </p>
      </Section>

      {/* One section per type. Photograph and explanation side by side,
          alternating, then the figures, the uses and the schedule's models. */}
      {segment.types.map((type, index) => {
        const reversed = index % 2 === 1;
        const typeModels = models.get(type.id) ?? [];
        return (
          <Section
            key={type.id}
            id={type.id}
            tone={reversed ? "steel" : "white"}
            className="scroll-mt-28"
          >
            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
              <div className={`lg:col-span-6 ${reversed ? "lg:order-2" : ""}`}>
                <Reveal>
                  <CreditedPhoto photo={type.photo} sizes="(min-width: 1024px) 45vw, 100vw" />
                </Reveal>
              </div>
              <div className={`lg:col-span-6 ${reversed ? "lg:order-1" : ""}`}>
                <Reveal>
                  <Eyebrow>{`Type ${index + 1} of ${typeCount}`}</Eyebrow>
                  <h2 className="mt-3 text-[26px] font-bold leading-[1.12] tracking-[-0.025em] text-ink sm:mt-4 sm:text-[32px]">
                    {type.title}
                  </h2>
                  <p className="mt-4 text-pretty text-[17px] font-medium leading-relaxed text-ink">
                    {type.summary}
                  </p>
                  {type.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 text-pretty text-[15.5px] leading-relaxed text-ink-soft"
                    >
                      {paragraph}
                    </p>
                  ))}
                </Reveal>
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <Reveal>
                  <h3 className={subheading}>Key figures</h3>
                  <dl className="mt-4 grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 sm:grid-cols-2">
                    {type.facts.map((fact) => (
                      <div key={fact.label} className="bg-white px-5 py-4">
                        <dt className="text-[12px] font-semibold text-ink-muted">{fact.label}</dt>
                        <dd className="mt-1 text-[15px] font-semibold leading-snug text-ink">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
              <div className="lg:col-span-5">
                <Reveal>
                  <h3 className={subheading}>Typical uses</h3>
                  <ul className="mt-4 grid gap-2">
                    {type.uses.map((use) => (
                      <li
                        key={use}
                        className="flex items-center gap-3 rounded-sm border border-steel-200 bg-white px-4 py-2.5 text-[14.5px] font-medium text-ink"
                      >
                        <Icon name={segment.icon} className="h-[17px] w-[17px] shrink-0 text-accent-600" />
                        {use}
                      </li>
                    ))}
                  </ul>
                  {type.related ? (
                    <ArrowLink href={type.related.href} className="mt-5">
                      {type.related.label}
                    </ArrowLink>
                  ) : null}
                </Reveal>
              </div>
            </div>

            {typeModels.length ? (
              <div className="mt-12">
                <Reveal>
                  <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                    <h3 className="text-[19px] font-bold text-ink">
                      In our export schedule{" "}
                      <span className="font-semibold text-ink-muted">({typeModels.length})</span>
                    </h3>
                    <ArrowLink href="/vehicle-models">Full vehicle model schedule</ArrowLink>
                  </div>
                  <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">
                    Open a model for its specification and the spare parts most often ordered with it.
                    Listing a model is not a claim of stock or of an appointment by its manufacturer.
                  </p>
                </Reveal>
                <Reveal>
                  <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                    {typeModels.map((item) => (
                      <li key={item.slug}>
                        <VehicleModelTile item={item} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ) : null}
          </Section>
        );
      })}

      {segment.explainer ? (
        <Section tone="navy">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading eyebrow={segment.explainer.eyebrow} title={segment.explainer.title} inverted />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                {segment.explainer.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-pretty text-[16px] leading-relaxed text-navy-100 first:mt-0 lg:mt-5"
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
        </Section>
      ) : null}

      {/* 03 — the questions every export of this category raises. */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Exporting"
            index={3}
            title="What decides what can be shipped"
            lead="The questions that come up on every vehicle export, settled before the quotation rather than after it."
          />
        </Reveal>
        <Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {segment.considerations.map((item) => (
              <li
                key={item.title}
                className="keyline flex flex-col rounded-sm border border-steel-200 bg-white p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-navy-200 hover:shadow-card"
              >
                <Icon name={item.icon} className="h-6 w-6 text-navy-700" />
                <h3 className="mt-4 text-[17px] font-bold text-ink">{item.title}</h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-ink-soft">{item.text}</p>
                {item.link ? (
                  <ArrowLink href={item.link.href} className="mt-4">
                    {item.link.label}
                  </ArrowLink>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* 04 — what to send, and where to go next. */}
      <Section tone="steel">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="corner-ticks rounded-sm border border-steel-200 bg-white p-6 sm:p-7">
                <Eyebrow index={4}>Enquiry spec sheet</Eyebrow>
                <h2 className="mt-3 text-[22px] font-bold leading-tight text-ink sm:text-[26px]">
                  What to tell us
                </h2>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                  Send these with your enquiry and we can usually confirm what can be supplied, and on
                  what basis, without a second round of questions.
                </p>
                <dl className="mt-6 divide-y divide-steel-200 border-y border-steel-200">
                  {segment.specify.map((line, index) => (
                    <div key={line} className="flex gap-4 py-3.5">
                      <dt className="index-mark shrink-0 text-[12px] font-bold tabular-nums text-ink-soft">
                        {String(index + 1).padStart(2, "0")}
                      </dt>
                      <dd className="text-[14.5px] leading-relaxed text-ink">{line}</dd>
                    </div>
                  ))}
                </dl>
                <ArrowLink href={enquiryHref} className="mt-6">
                  Send this enquiry
                </ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <h2 className={subheading}>Other vehicle categories</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {others.map((other) => (
                  <li key={other.id}>
                    <Link
                      href={vehicleSegmentHref(other.id)}
                      className="group flex items-center gap-3.5 rounded-sm border border-steel-200 bg-white px-4 py-3 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-navy-200 hover:shadow-card"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-colors duration-300 group-hover:bg-navy-800 group-hover:text-white">
                        <Icon name={other.icon} className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14.5px] font-bold text-ink group-hover:text-navy-800">
                          {other.shortTitle}
                        </span>
                        <span className="block text-[12.5px] text-ink-muted">
                          {other.types.length} types explained
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 grid gap-4">
                <li className="grid gap-3 rounded-sm border border-steel-200 bg-white p-5">
                  <ArrowLink href="/vehicle-models">Vehicle model schedule and spare parts</ArrowLink>
                  <ArrowLink href="/import-export/vehicle-trade">All vehicle and equipment categories</ArrowLink>
                  <ArrowLink href="/consulting/homologation-market-entry">
                    Homologation and market entry
                  </ArrowLink>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <CTASection
        eyebrow="Start a Vehicle Enquiry"
        title="Tell us the vehicle, quantity and destination market"
        lead="Send the type, the specification or model list and the destination country, and we will confirm what can legally and commercially be supplied."
        primaryCta={{ label: `Enquire about ${segment.shortTitle.toLowerCase()}`, href: enquiryHref }}
        secondaryCta={{ label: "Browse the model schedule", href: "/vehicle-models" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: `${segment.title} Export from India`,
            description: segment.metaDescription,
            path,
            serviceType: "Complete vehicle import and export",
            offers: segment.types.map((type) => type.title),
          }),
        ]}
      />
    </>
  );
}
