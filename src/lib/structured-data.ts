import { contact, site, siteUrl } from "@/data/site";
import type { Faq } from "@/data/types";

/**
 * JSON-LD builders. Only facts stated in the MVP brief are emitted here —
 * no invented certifications, ratings, awards or coverage claims.
 */

const orgId = `${siteUrl}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: siteUrl,
    description: site.supportingLine,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contact.office.lines[0]}, ${contact.office.lines[1]}`,
      addressLocality: contact.office.locality,
      addressRegion: contact.office.region,
      postalCode: contact.office.postalCode,
      addressCountry: contact.office.country,
    },
    telephone: contact.phones[0],
    ...(contact.email ? { email: contact.email } : {}),
    contactPoint: contact.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["en"],
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  offers?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: `${siteUrl}${input.path}`,
    provider: { "@id": orgId },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    ...(input.offers?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: input.name,
            itemListElement: input.offers.map((offer) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: offer },
            })),
          },
        }
      : {}),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
