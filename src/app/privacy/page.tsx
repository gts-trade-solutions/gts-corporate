import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { contact, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How GTS Trade Solutions collects, uses and protects the information submitted through enquiry and RFQ forms on this website.",
  alternates: { canonical: "/privacy" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
];

const sections = [
  {
    title: "What we collect",
    body: [
      "When you send an enquiry through this website we collect the details you enter in the form: your name, company, country, business email, phone number, optional WhatsApp number, enquiry type, product or service, quantity, application, target market, your message and any files you attach.",
      "Our hosting and email providers also process standard technical information such as IP address and browser user agent as part of delivering the site and preventing abuse.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "Enquiry details are used to understand your requirement, prepare a response or quotation, and contact you about that enquiry. Where a requirement needs a supplier, manufacturer or service partner, relevant details may be shared with that partner strictly for the purpose of responding to your enquiry.",
      "We do not sell your information, and we do not use enquiry details for unrelated marketing.",
    ],
  },
  {
    title: "Files you attach",
    body: [
      "Drawings, specifications and RFQ documents are delivered by email to our team. Uploaded files are never published on this website and are not exposed at a public URL.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "This website does not set advertising cookies. If web analytics is enabled, it is used only to understand aggregate site usage — such as which pages are visited and how visitors arrive — and not to identify you personally.",
    ],
  },
  {
    title: "Retention",
    body: [
      "Enquiry correspondence is retained for as long as needed to respond to the enquiry and to maintain a record of the commercial discussion, after which it is deleted or archived in line with our internal record-keeping practice.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can ask us to confirm what enquiry information we hold about you, correct it, or delete it. Contact us using the details below and we will action reasonable requests.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead="How we handle the information you send us through this website."
        primaryCta={{ label: "Contact us", href: "/contact" }}
        trail={trail}
      />

      <Section>
        <Reveal>
        <div className="max-w-3xl">
          {sections.map((section) => (
            <div key={section.title} className="mb-10">
              <h2 className="text-[22px] font-bold text-ink">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div className="rounded-sm border border-steel-200 bg-steel-50 p-6">
            <h2 className="text-[18px] font-bold text-ink">Contact</h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
              {site.legalName}, {contact.office.lines.join(", ")}.
            </p>
            <p className="mt-2 text-[15.5px] leading-relaxed text-ink-soft">
              Phone: {contact.phones.join(" · ")}
              {contact.email ? ` · Email: ${contact.email}` : ""}
            </p>
            <p className="mt-4 text-[15.5px] text-ink-soft">
              Prefer to send a message?{" "}
              <Link href="/contact" className="font-semibold text-navy-700 underline underline-offset-2">
                Use the enquiry form
              </Link>
              .
            </p>
          </div>
        </div>
        </Reveal>
      </Section>
    </>
  );
}
