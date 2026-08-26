import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PartsSelector } from "@/components/PartsSelector";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { VehicleModelCard } from "@/components/VehicleModelCard";
import { siteUrl } from "@/data/site";
import {
  componentImage,
  componentSets,
  enquiryHref,
  findVehicleModel,
  modelName,
  vehicleImage,
  vehicleImageAlt,
  vehicleModelGroup,
  vehicleModels,
} from "@/data/vehicle-models";
import { breadcrumbSchema, modelPartsSchema } from "@/lib/structured-data";

/** One pre-rendered page per model — long-tail "<model> spare parts" queries. */
export function generateStaticParams() {
  return vehicleModels.map((item) => ({ slug: item.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const seoTitleFor = (name: string) =>
  `${name} Spare Parts — Supplier & Exporter | GTS Trade Solutions`;

const descriptionFor = (item: NonNullable<ReturnType<typeof findVehicleModel>>) =>
  `Source ${modelName(item)} spare parts — ${item.parts
    .slice(0, 6)
    .join(", ")
    .toLowerCase()} and more. Select the components you need and send the enquiry in one step.`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findVehicleModel(slug);
  if (!item) return {};

  const name = modelName(item);
  const title = seoTitleFor(name);
  const description = descriptionFor(item);
  const path = `/vehicle-models/${slug}`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${item.model} spare parts`,
      `${name} spare parts`,
      `${item.model} parts exporter`,
      `${item.oem} spare parts supplier`,
      `${item.segment.toLowerCase()} spare parts`,
      ...item.markets.map((market) => `${item.model} parts ${market}`),
    ],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${siteUrl}${path}`,
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function VehicleModelPage({ params }: Props) {
  const { slug } = await params;
  const item = findVehicleModel(slug);
  if (!item) notFound();

  const group = vehicleModelGroup(item.group);
  const name = modelName(item);

  /* Same vehicle type first, then anything else, so "related" stays useful
     even for a group with only one model in it. */
  const related = [
    ...vehicleModels.filter((other) => other.group === item.group && other.slug !== item.slug),
    ...vehicleModels.filter((other) => other.group !== item.group),
  ].slice(0, 3);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Vehicle Models", path: "/vehicle-models" },
    { name: name, path: `/vehicle-models/${slug}` },
  ];

  const spec = [
    { label: "OEM", value: item.oem },
    { label: "Model", value: item.model },
    { label: "Vehicle type", value: item.segment },
    { label: "Exported from", value: item.exportedFrom },
    { label: "Markets served", value: item.markets.join(", ") },
    { label: "Priority parts listed", value: String(item.parts.length) },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${item.oem} — ${item.segment}`}
        title={`${item.model} Spare Parts`}
        lead={`Components most often requested for the ${name}, exported from ${
          item.exportedFrom
        } into ${item.markets.join(", ")}. Select what you need below and the list travels with you into the enquiry form.`}
        primaryCta={{ label: "Select components", href: "#select-parts" }}
        secondaryCta={{ label: "All vehicle models", href: "/vehicle-models" }}
        trail={trail}
        art={
          /* The catalogue photograph, on its own white plate so the cut-out
             shot reads against the blueprint ground rather than bleeding into it. */
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm border border-white/15 bg-white shadow-lift">
            <Image
              src={vehicleImage(item)}
              alt={vehicleImageAlt(item)}
              fill
              priority
              sizes="(min-width: 1024px) 480px, 92vw"
              className="object-contain p-4"
            />
          </div>
        }
        artLabel={`FIG. 03 — ${item.model.toUpperCase()}`}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div id="select-parts" className="scroll-mt-32 lg:col-span-8">
            <Reveal>
              <PartsSelector model={item} />
            </Reveal>

            <Reveal>
              <div className="mt-8 rounded-sm border-l-[3px] border-navy-700 bg-steel-50 p-6">
                <h2 className="text-[16px] font-bold text-ink">
                  What to add to your enquiry
                </h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                  A parts enquiry is quotable first time when it carries these. None of them are
                  mandatory on the form — they just remove a round of questions.
                </p>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {[
                    "Quantity per part, and expected annual volume",
                    "OEM-genuine or aftermarket grade",
                    "Model year or variant, where the part changed",
                    "OEM part numbers, if you have them",
                    "Destination port and country",
                    "Any packaging or labelling requirement",
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft"
                    >
                      <Icon
                        name="shieldCheck"
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-600"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Spec panel — the schedule row for this model, read as a data sheet. */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="sticky-heading rounded-sm border border-steel-200 bg-white p-6 shadow-card">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
                  Schedule entry
                </span>
                <h2 className="mt-2.5 flex items-center gap-2.5 text-[19px] font-bold leading-tight text-ink">
                  <Icon
                    name={group?.icon ?? "car"}
                    className="h-5 w-5 shrink-0 text-navy-700"
                  />
                  {item.model}
                </h2>

                <dl className="mt-5 divide-y divide-steel-200 border-y border-steel-200">
                  {spec.map((row) => (
                    <div key={row.label} className="grid grid-cols-[104px_1fr] gap-3 py-3">
                      <dt className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                        {row.label}
                      </dt>
                      <dd className="text-[14px] font-medium text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 text-[13.5px] leading-relaxed text-ink-soft">
                  Listed for reference only. Nothing here implies stock, an OEM appointment or an
                  authorisation — every line is quoted per enquiry.
                </p>

                <div className="mt-5 flex flex-col gap-2.5 border-t border-steel-200 pt-5">
                  <ArrowLink href={enquiryHref(item, item.parts)}>
                    Enquire about all {item.parts.length} parts
                  </ArrowLink>
                  <ArrowLink href="/vehicle-models#models">
                    Browse the full model schedule
                  </ArrowLink>
                  {group ? (
                    <ArrowLink href="/automotive-parts">
                      {group.title} component categories
                    </ArrowLink>
                  ) : null}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Plain-text parts list — server-rendered, so it is indexable and works
          with JavaScript disabled, where the selector's checkboxes do not. */}
      <Section tone="steel">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="Parts Reference"
                index={2}
                title={`${item.model} priority spare parts`}
                lead={`The components that move most on this model in ${item.markets.join(
                  " and ",
                )}. If the part you need is not listed, send the part number, a drawing or a photograph — the sourcing route is the same.`}
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <ul className="grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 sm:grid-cols-2">
                {item.parts.map((part, index) => (
                  <li
                    key={part}
                    className="group flex items-center gap-3 bg-white px-4 py-3.5 transition-colors duration-200 hover:bg-steel-50"
                  >
                    <span className="index-mark shrink-0 text-[11.5px] font-bold tabular-nums text-ink-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14.5px] font-medium text-ink">
                      {item.model} {part.toLowerCase()}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {item.partsNote ? (
              <Reveal>
                <p className="mt-5 rounded-sm border-l-[3px] border-accent-600 bg-white px-5 py-4 text-[14.5px] leading-relaxed text-ink-soft">
                  {item.partsNote}
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Section>

      {/* The component photo grid the catalogue prints beside this model. */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Component Photographs"
            index={3}
            title={`What the ${item.model} part groups look like`}
            lead="Representative photographs of each component group, as printed in the model catalogue. They show the kind of part, not the exact part that ships — fitment is confirmed against your VIN or chassis number, model year and engine specification when the enquiry is quoted."
          />
        </Reveal>
        <Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {componentSets[item.components].map((photo) => (
              <li
                key={photo.label}
                className="group overflow-hidden rounded-sm border border-steel-200 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-square bg-white">
                  <Image
                    src={componentImage(photo.image)}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 260px, (min-width: 640px) 30vw, 45vw"
                    className="object-contain p-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="border-t border-steel-200 px-4 py-3 text-center text-[13.5px] font-semibold text-ink">
                  {photo.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section tone="steel">
        <Reveal>
          <SectionHeading
            eyebrow="Related"
            index={4}
            title="Other models in the schedule"
            lead="Most parts programmes cover more than one model. Consolidating them into one shipment is part of the sourcing work."
          />
        </Reveal>
        <Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((other) => (
              <VehicleModelCard key={other.slug} item={other} />
            ))}
          </div>
        </Reveal>
        <div className="mt-9">
          <ArrowLink href="/vehicle-models">See all {vehicleModels.length} models</ArrowLink>
        </div>
      </Section>

      <CTASection
        eyebrow="Spare Parts Enquiry"
        title={`Send a parts schedule for the ${item.model}`}
        lead="Include quantities, whether you need OEM-genuine or aftermarket grade, and the destination market. Spreadsheets and part-number lists can be attached directly to the enquiry form."
        primaryCta={{ label: "Request these parts", href: enquiryHref(item, item.parts) }}
        secondaryCta={{ label: "Back to all models", href: "/vehicle-models" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          modelPartsSchema({
            name: `${name} spare parts`,
            description: descriptionFor(item),
            path: `/vehicle-models/${slug}`,
            brand: item.oem,
            parts: item.parts,
            image: vehicleImage(item),
          }),
        ]}
      />
    </>
  );
}
