import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink, ButtonLink } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { FeatureSplit } from "@/components/FeatureSplit";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Media, MediaScrim } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { Spotlight } from "@/components/Spotlight";
import { TruckBlueprint } from "@/components/illustrations/TruckBlueprint";
import {
  componentsHighlight,
  consultingHighlight,
  globalTrade,
  indiaPartner,
  manufacturingHighlight,
  odcHighlight,
  vehicleTrade,
  whatWeDo,
  whyGts,
} from "@/data/home";
import { blogPostsByDate } from "@/data/blog";
import { vehicleModelOems, vehicleModels } from "@/data/vehicle-models";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("home");

const stagger = (index: number) => ({ "--stagger-delay": `${index * 80}ms` }) as CSSProperties;

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="what-we-do">
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            index={1}
            title="Four connected capabilities, one commercial partner"
            lead="Trade, components, manufacturing and technical consulting sit in one place — so a requirement can move from sourcing to production to market without changing partners."
          />
        </Reveal>
        <Reveal>
          {/*
            Bento rather than four equal tiles: the lead capability gets a wide
            cell, components a tall one, so the grid has a hierarchy instead of
            reading as a row of identical boxes.
          */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            {whatWeDo.map((card, index) => (
              <div
                key={card.title}
                style={stagger(index)}
                className={`stagger-item h-full ${
                  index === 0 ? "lg:col-span-2" : index === 1 ? "lg:row-span-2" : ""
                }`}
              >
                <ServiceCard {...card} featured={index === 0} />
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="steel">
        <Reveal>
          <FeatureSplit
            block={globalTrade}
            eyebrow="Global Trade"
            index={2}
            link={{ label: "See our import & export scope", href: "/import-export" }}
          />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <FeatureSplit
            block={vehicleTrade}
            eyebrow="Vehicle Trade"
            index={3}
            reversed
            link={{ label: "Vehicle import & export categories", href: "/import-export#vehicle-import-export" }}
          />
        </Reveal>
      </Section>

      <Section tone="steel">
        <Reveal>
          <FeatureSplit
            block={componentsHighlight}
            eyebrow="Automotive & Agri Components"
            index={4}
            link={{ label: "Browse component categories", href: "/automotive-parts" }}
          />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <FeatureSplit
            block={manufacturingHighlight}
            eyebrow="Manufacturing"
            index={5}
            reversed
            link={{ label: "Discuss a manufacturing project", href: "/manufacturing" }}
          />
        </Reveal>
      </Section>

      <Section tone="steel">
        <Reveal>
          <FeatureSplit
            block={odcHighlight}
            eyebrow="ODC Logistics & Route Survey"
            index={6}
            link={{ label: "Explore ODC logistics", href: "/odc-logistics" }}
          />
        </Reveal>
      </Section>

      {/* Editorial image band — a visual break between the capability sections. */}
      <section className="bg-white pb-4">
        <Container>
          <Reveal>
            <div className="grid gap-4 lg:grid-cols-12">
              <figure className="relative col-span-full aspect-[16/10] overflow-hidden rounded-sm bg-navy-900 lg:col-span-7 lg:aspect-auto lg:min-h-[420px]">
                <Media slot="homeTrade" sizes="(min-width: 1024px) 58vw, 100vw" />
                <MediaScrim side="bottom" strength="soft" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <span className="index-mark text-[11px] font-bold tracking-[0.2em] text-accent-500">
                    PLATE 01
                  </span>
                  <p className="mt-2 font-display text-[22px] font-bold leading-tight text-white sm:text-[26px]">
                    Vehicles, components and general cargo moving between markets
                  </p>
                </figcaption>
              </figure>

              <div className="col-span-full grid gap-4 lg:col-span-5">
                <figure className="relative aspect-[16/9] overflow-hidden rounded-sm bg-navy-900">
                  <Media slot="homeManufacturing" sizes="(min-width: 1024px) 40vw, 100vw" />
                  <MediaScrim side="bottom" strength="soft" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <span className="index-mark text-[11px] font-bold tracking-[0.2em] text-accent-500">
                      PLATE 02
                    </span>
                    <p className="mt-2 font-display text-[19px] font-bold leading-tight text-white">
                      Fabrication, chassis and body build
                    </p>
                  </figcaption>
                </figure>

                <figure className="relative flex aspect-[16/9] flex-col justify-center overflow-hidden rounded-sm bg-navy-900 bg-blueprint px-6">
                  <TruckBlueprint className="w-full" />
                  <figcaption className="absolute right-5 top-5 index-mark text-[11px] font-bold tracking-[0.2em] text-white/45">
                    FIG. 01 — TRACTOR &amp; TRAILER
                  </figcaption>
                </figure>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* India partner band — deliberately the one loud, full-colour moment. */}
      <Spotlight className="bg-grain relative bg-accent-700 py-16 text-white sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgb(0_0_0/0.6)_1px,transparent_1px),linear-gradient(90deg,rgb(0_0_0/0.6)_1px,transparent_1px)] [background-size:56px_56px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-2.5">
                  <span className="index-mark text-[11px] font-bold tabular-nums text-white/70">
                    07
                  </span>
                  <span className="rule-draw h-px w-7 bg-white" aria-hidden="true" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                    India Partner
                  </span>
                </span>
                <h2 className="mt-4 text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                  {indiaPartner.title}
                </h2>
                <p className="mt-4 max-w-[52ch] text-pretty text-[16.5px] leading-relaxed text-accent-50">
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
                <ul className="grid gap-3 sm:grid-cols-2">
                  {indiaPartner.items.map((item, index) => (
                    <li
                      key={item}
                      style={{ "--stagger-delay": `${index * 60}ms` } as CSSProperties}
                      className="stagger-item group flex items-center gap-3 rounded-sm border border-white/30 bg-white/10 px-4 py-3.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
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
          <FeatureSplit
            block={consultingHighlight}
            eyebrow="Consulting"
            index={8}
            link={{ label: "View consulting services", href: "/consulting" }}
          />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Why GTS"
            index={9}
            title="Built around what a technical buyer actually needs"
            lead="Sourcing is straightforward when the person on the other side understands the drawing, the application and the market it is going into."
          />
        </Reveal>
        <Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyGts.map((item, index) => (
              <div
                key={item.title}
                style={stagger(index)}
                className="stagger-item keyline group relative overflow-hidden rounded-sm border border-steel-200 bg-white p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white">
                  <Icon name={item.icon} className="h-[23px] w-[23px]" />
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-ink transition-colors duration-200 group-hover:text-navy-800">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-10">
          <ArrowLink href="/contact">Send us your requirement</ArrowLink>
        </div>
      </Section>

      {/* Two routes that sit outside the six primary tabs: parts by model, and
          the blog. This is their main entry point for desktop visitors. */}
      <Section tone="steel">
        <Reveal>
          <SectionHeading
            eyebrow="Also On This Site"
            index={10}
            title="Two more ways in"
            lead="Find spare parts by the vehicle you actually run, or read up on how an enquiry, a specification or a market entry is put together."
          />
        </Reveal>
        <Reveal>
          <div className="mt-11 grid gap-6 lg:grid-cols-2">
            <div className="keyline group relative flex flex-col overflow-hidden rounded-sm border border-steel-200 bg-white p-7 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
              <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white">
                <Icon name="car" className="h-[23px] w-[23px]" />
              </span>
              <h3 className="mt-5 text-[20px] font-bold text-ink transition-colors duration-200 group-hover:text-navy-800">
                Spare parts by vehicle model
              </h3>
              <p className="mt-2.5 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft">
                {vehicleModels.length} models across {vehicleModelOems.length} OEMs — cars,
                motorcycles, three-wheelers, trucks and bus chassis — each with the components most
                often requested for it. Tick the parts you need and the selection carries into the
                enquiry form.
              </p>
              <span className="mt-6 flex flex-1 items-end">
                <ArrowLink href="/vehicle-models">Browse the model schedule</ArrowLink>
              </span>
            </div>

            <div className="keyline group relative flex flex-col overflow-hidden rounded-sm border border-steel-200 bg-white p-7 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
              <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white">
                <Icon name="article" className="h-[23px] w-[23px]" />
              </span>
              <h3 className="mt-5 text-[20px] font-bold text-ink transition-colors duration-200 group-hover:text-navy-800">
                Trade &amp; automotive insights
              </h3>
              <ul className="mt-4 space-y-3 border-t border-steel-200 pt-4">
                {blogPostsByDate.slice(0, 3).map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group/post block text-[15px] font-semibold leading-snug text-ink transition-colors duration-200 hover:text-accent-700"
                    >
                      {post.title}
                      <span className="mt-1 block text-[12.5px] font-medium text-ink-muted">
                        {post.category} · {post.readingMinutes} min read
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <span className="mt-6 flex flex-1 items-end">
                <ArrowLink href="/blog">All articles</ArrowLink>
              </span>
            </div>
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
          serviceSchema({
            name: "Import, export, component sourcing and contract manufacturing",
            description: pageSeo.home.description,
            path: "/",
            serviceType: "International trade and manufacturing support",
            offers: whatWeDo.map((card) => card.title),
          }),
        ]}
      />
    </>
  );
}
