import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ModuleNav } from "@/components/ModuleNav";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { indiaPartnerModule, tradeNav } from "@/data/trade";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("india-partner");

const trail = [
  { name: "Home", path: "/" },
  { name: "Import & Export", path: "/import-export" },
  { name: "India Partner", path: "/import-export/india-partner" },
];

const stagger = (index: number) => ({ "--stagger-delay": `${index * 70}ms` }) as CSSProperties;

/** Aimed at international manufacturers looking for a route into India. */
export default function IndiaPartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="India Distribution & Dealership"
        title={indiaPartnerModule.title}
        lead={indiaPartnerModule.lead}
        primaryCta={{ label: "Discuss an India Partnership", href: "/contact?enquiry=india-dealership" }}
        secondaryCta={{ label: "Become a Supplier / Partner", href: "/contact?enquiry=supplier-partner" }}
        trail={trail}
        media="indiaPartner"
      />

      <ModuleNav items={tradeNav} active="/import-export/india-partner" />

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            index={1}
            title="Representation, network and after-sales"
            lead="A structured route into the Indian market — from first representation through dealer appointment to the service and spares cover a product needs once it is selling."
          />
        </Reveal>

        <Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {indiaPartnerModule.items.map((item, index) => (
              <div
                key={item.title}
                style={stagger(index)}
                className="stagger-item group rounded-sm border border-steel-200 bg-white p-6 shadow-card transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-navy-800 group-hover:text-white">
                  <Icon name="handshake" className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-[16px] font-bold text-ink">{item.title}</h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-10 text-[15px] leading-relaxed text-ink-soft">
            Bringing a vehicle or product line into India usually needs approval work alongside the
            commercial route —{" "}
            <Link
              href="/consulting/homologation-market-entry"
              className="font-semibold text-navy-700 underline decoration-accent-600/40 underline-offset-2 transition-colors hover:text-accent-700 hover:decoration-accent-600"
            >
              homologation, testing and market entry
            </Link>{" "}
            covers that side from the same desk.
          </p>
        </Reveal>
      </Section>

      <CTASection
        eyebrow="India Partnership"
        title="Tell us the product line and the market you want to reach"
        lead="Send your product range, target segment and current export markets, and we will come back on how a distribution or dealership route into India could be structured."
        primaryCta={{ label: "Discuss an India Partnership", href: "/contact?enquiry=india-dealership" }}
        secondaryCta={{ label: "Become a Supplier / Partner", href: "/contact?enquiry=supplier-partner" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: "India Distribution & Dealership Partnership",
            description: pageSeo["india-partner"].description,
            path: "/import-export/india-partner",
            serviceType: "India market representation and distribution partnership",
            offers: indiaPartnerModule.items.map((item) => item.title),
          }),
        ]}
      />
    </>
  );
}
