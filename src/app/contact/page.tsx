import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CopyButton } from "@/components/CopyButton";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RFQForm } from "@/components/RFQForm";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { enquiryTypes } from "@/data/enquiry";
import { contact, siteUrl, telHref } from "@/data/site";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("contact");

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

const helpsUsQuote = [
  "Product or component name, part number or drawing",
  "Quantity per order and expected annual volume",
  "Vehicle, machine or application it is used on",
  "Destination country or target market",
  "Any specification, standard or certification requirement",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact / RFQ"
        title="Tell Us What You Need"
        lead="Send an enquiry for import or export, vehicle trade, automotive and agri components, contract manufacturing, dealership and distribution, commercial vehicle service, fire & safety, homologation or market entry."
        primaryCta={{ label: "Go to the enquiry form", href: "#rfq" }}
        secondaryCta={{ label: `Call ${contact.phones[0]}`, href: telHref(contact.phones[0]) }}
        trail={trail}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Not sticky: this column is taller than the viewport, so pinning it
              would put its lower half out of reach. */}
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="text-xl font-bold text-ink">{contact.office.label}</h2>
              <address className="mt-4 space-y-1 text-[15.5px] not-italic leading-relaxed text-ink-soft">
                {contact.office.lines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </address>

              <h3 className="mt-8 text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
                Phone
              </h3>
              <ul className="mt-3 space-y-2">
                {contact.phones.map((phone) => (
                  <li key={phone} className="group/copy flex items-center gap-1">
                    <a
                      href={telHref(phone)}
                      className="text-[15.5px] font-semibold text-navy-700 transition-colors duration-200 hover:text-accent-700"
                    >
                      {phone}
                    </a>
                    <CopyButton value={phone} label={`phone number ${phone}`} />
                  </li>
                ))}
              </ul>

              {contact.email ? (
                <>
                  <h3 className="mt-8 text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
                    Email
                  </h3>
                  <div className="group/copy mt-3 flex items-center gap-1">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-[15.5px] font-semibold text-navy-700 transition-colors duration-200 hover:text-accent-700"
                    >
                      {contact.email}
                    </a>
                    <CopyButton value={contact.email} label="email address" />
                  </div>
                </>
              ) : null}

              <h3 className="mt-8 text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
                Business hours
              </h3>
              <p className="mt-3 text-[15.5px] text-ink-soft">{contact.businessHours}</p>

              <div className="mt-10 rounded-sm border-l-[3px] border-accent-600 bg-steel-50 p-6">
                <h3 className="text-[15px] font-bold text-ink">What helps us quote faster</h3>
                <ul className="mt-4 space-y-2.5">
                  {helpsUsQuote.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[14.5px] leading-relaxed text-ink-soft"
                    >
                      <Icon name="shieldCheck" className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
                  Enquiry types
                </h3>
                <p className="mt-2 text-[13px] text-ink-muted">
                  Pick one to pre-fill the form.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {enquiryTypes.map((type) => (
                    <li key={type.value}>
                      <Link
                        href={`/contact?enquiry=${type.value}#rfq`}
                        scroll={false}
                        className="block rounded-sm border border-steel-200 bg-white px-3 py-1.5 text-[13px] font-medium text-ink-soft transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-navy-700 hover:text-navy-800 hover:shadow-card"
                      >
                        {type.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div id="rfq" className="scroll-mt-40 lg:col-span-8">
            <Reveal>
              <Suspense
                fallback={
                  <div className="rounded-sm border border-steel-200 bg-white p-8 text-[15px] text-ink-soft">
                    Loading the enquiry form…
                  </div>
                }
              >
                <RFQForm />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Request a Quote",
            url: `${siteUrl}/contact`,
            description: pageSeo.contact.description,
          },
        ]}
      />
    </>
  );
}
