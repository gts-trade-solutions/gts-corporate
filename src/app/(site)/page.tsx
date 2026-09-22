import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowLink, ButtonLink } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { Spotlight } from "@/components/Spotlight";
import { indiaPartner, whatWeDo, whyGts } from "@/data/home";
import type { Card } from "@/data/types";
import { blogPostsByDate } from "@/data/blog";
import { homeFaqs } from "@/data/faq-groups";
import { oemsOf } from "@/data/vehicle-models";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";
import { listVehicleModels } from "@/lib/vehicle-models-store";

/**
 * The vehicle model counts below come from the admin-editable schedule, so
 * the page is revalidated whenever a model is saved. The interval is a
 * backstop for a missed revalidation.
 */
export const revalidate = 300;

export const metadata: Metadata = buildMetadata("home");

const stagger = (index: number) => ({ "--stagger-delay": `${index * 80}ms` }) as CSSProperties;

/**
 * Home.
 *
 * Each service appears once below the banner — as a photo card that leads to
 * its own page — rather than as a card, then a full section, then a "why us"
 * point restating it. The detail lives on the service pages.
 */
export default async function HomePage() {
  const vehicleModels = await listVehicleModels();
  const vehicleModelOems = oemsOf(vehicleModels);

  const services: Card[] = [
    ...whatWeDo,
    {
      title: "Vehicle Models",
      description: `${vehicleModels.length} Indian models across ${vehicleModelOems.length} OEMs, each with the spare parts most often requested for it — tick what you need and it carries into the enquiry.`,
      icon: "car",
      href: "/vehicle-models",
      cta: "Browse the model schedule",
      media: "vehicleModelsHero",
    },
  ];

  return (
    <>
      <Hero />

      <Section id="what-we-do">
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            index={1}
            title="One partner from sourcing to market"
            lead="Trade, components, manufacturing, heavy-lift logistics and technical consulting sit in one place — so a requirement can move from sourcing to production to market without changing partners."
          />
        </Reveal>
        <Reveal>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {services.map((card, index) => (
              <div key={card.title} style={stagger(index)} className="stagger-item h-full">
                <ServiceCard {...card} />
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* India partner band — deliberately the one loud, full-colour moment. */}
      <Spotlight className="bg-grain relative bg-accent-700 py-11 text-white sm:py-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgb(0_0_0/0.6)_1px,transparent_1px),linear-gradient(90deg,rgb(0_0_0/0.6)_1px,transparent_1px)] [background-size:56px_56px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-7 sm:gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-2.5">
                  <span className="index-mark text-[11px] font-bold tabular-nums text-white/70">
                    02
                  </span>
                  <span className="rule-draw h-px w-7 bg-white" aria-hidden="true" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                    India Partner
                  </span>
                </span>
                <h2 className="mt-3 text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:mt-4">
                  {indiaPartner.title}
                </h2>
                <p className="mt-3 max-w-[52ch] text-pretty text-[15.5px] leading-relaxed text-accent-50 sm:mt-4 sm:text-[16.5px]">
                  {indiaPartner.lead}
                </p>
                <ButtonLink
                  href="/contact?enquiry=india-dealership"
                  className="mt-7"
                  variant="light"
                  withArrow
                >
                  Discuss distribution or dealership
                </ButtonLink>
              </div>
              <div className="lg:col-span-7">
                <ul className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                  {indiaPartner.items.map((item, index) => (
                    <li
                      key={item}
                      style={{ "--stagger-delay": `${index * 60}ms` } as CSSProperties}
                      className="stagger-item group flex items-center gap-3 rounded-sm border border-white/30 bg-white/10 px-3.5 py-2.5 transition-all sm:px-4 sm:py-3.5 duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
                    >
                      <Icon
                        name="shieldCheck"
                        className="h-[18px] w-[18px] shrink-0 text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      />
                      <span className="text-[14.5px] font-medium text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Spotlight>

      <Section tone="steel">
        <Reveal>
          <SectionHeading
            eyebrow="Why GTS"
            index={3}
            title="Built around what a technical buyer actually needs"
            lead="Sourcing is straightforward when the person on the other side understands the drawing, the application and the market it is going into."
          />
        </Reveal>
        <Reveal>
          {/*
            Six cards. On a phone they were six stacked boxes — two full
            screens of scrolling for six short points — so below sm the card
            becomes a row: icon on the left, text on the right, no card
            chrome. Same content, roughly half the height.
          */}
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-steel-200 bg-steel-200 sm:mt-12 sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent lg:grid-cols-3">
            {whyGts.map((item, index) => (
              <div
                key={item.title}
                style={stagger(index)}
                className="stagger-item keyline group relative flex items-start gap-3.5 overflow-hidden bg-white p-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:block sm:rounded-sm sm:border sm:border-steel-200 sm:p-6 sm:hover:-translate-y-1 sm:hover:border-navy-200 sm:hover:shadow-lift"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white sm:h-12 sm:w-12">
                  <Icon name={item.icon} className="h-5 w-5 sm:h-[23px] sm:w-[23px]" />
                </span>
                <div className="min-w-0 sm:mt-5">
                  <h3 className="text-[16px] font-bold text-ink transition-colors duration-200 group-hover:text-navy-800 sm:text-[17px]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-ink-soft sm:mt-2.5 sm:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* The blog's main entry point from the home page. */}
      <Section>
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Insights"
              index={4}
              title="Notes from the specification desk"
              lead="How an enquiry, a specification or a market entry is put together — written up from the questions buyers ask most."
            />
            <span className="shrink-0">
              <ArrowLink href="/blog">All articles</ArrowLink>
            </span>
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-8 grid gap-4 sm:mt-11 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogPostsByDate.slice(0, 3).map((post, index) => (
              <div
                key={post.slug}
                style={stagger(index)}
                className={`stagger-item h-full ${index === 2 ? "max-xl:hidden" : ""}`}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* The questions we are asked before anything else. One per service,
          read from the same sets the service pages publish. */}
      <Section id="faqs" tone="steel">
        <Reveal>
          <SectionHeading
            eyebrow="Frequently Asked"
            index={5}
            title="The questions we are asked first"
            lead="One from each service. The full set, with everything on ODC logistics, route surveys and vehicle models, is on the FAQ page."
          />
        </Reveal>
        <Reveal>
          <div className="mt-7 sm:mt-10">
            <FAQ faqs={homeFaqs} />
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="Have a product to source, sell, manufacture or launch?"
        lead="Send us your requirement with the product, quantity and destination market. Drawings, specifications and RFQ documents can be attached directly to the enquiry form."
      />

      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(homeFaqs),
          serviceSchema({
            name: "Import, export, component sourcing and contract manufacturing",
            description: pageSeo.home.description,
            path: "/",
            serviceType: "International trade and manufacturing support",
            offers: services.map((card) => card.title),
          }),
        ]}
      />
    </>
  );
}
