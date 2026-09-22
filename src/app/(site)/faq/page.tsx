import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { FaqBrowser } from "@/components/FaqBrowser";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { TalkToExpert } from "@/components/TalkToExpert";
import { allFaqs, faqGroups } from "@/data/faq-groups";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("faq");

const trail = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

/**
 * The FAQ hub.
 *
 * The entry point for someone who has a question but does not yet know which
 * service it belongs to, which is most people arriving from search. It is
 * topic-first: the browser renders an index of the eight sets and opens one at
 * a time, because 110 stacked accordion headers is not something anyone reads.
 * Search spans every topic.
 *
 * Deliberately no FAQPage schema here. The answers are not all in the HTML at
 * first paint any more, and every one of them is already published — visibly,
 * with its own FAQPage schema — on the service page it belongs to. Marking up
 * questions this page does not render would be describing content that is not
 * there. The ItemList below describes what the page actually is: an index.
 */
export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Questions We Are Asked Most"
        lead={`${allFaqs.length} answers across import and export, component sourcing, vehicle models, contract manufacturing, ODC logistics, route surveys and consulting. If yours is not here, send it — we would rather answer it than have you guess.`}
        primaryCta={{ label: "Ask us directly", href: "/contact#rfq" }}
        secondaryCta={{ label: "Browse the topics", href: "#questions" }}
        trail={trail}
      />

      <Section id="questions">
        <FaqBrowser />
      </Section>

      <TalkToExpert
        title="Still not answered?"
        lead="Send the question with the product, quantity and destination market, and it goes to the person who would quote it."
      />

      <CTASection
        title="Have a requirement rather than a question?"
        lead="Send us the product, quantity and destination market. Drawings, specifications and RFQ documents can be attached directly to the enquiry form."
      />

      <JsonLd
        data={[
          breadcrumbSchema(trail),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "FAQ topics",
            itemListElement: faqGroups.map((group, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${group.label} — ${group.faqs.length} questions`,
              url: `${group.href}#faqs`,
            })),
          },
        ]}
      />
    </>
  );
}
