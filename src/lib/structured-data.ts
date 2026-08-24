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

/** Ordered list of internal pages — used for the vehicle model and blog indexes. */
export function itemListSchema(input: {
  name: string;
  description?: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${siteUrl}${item.path}`,
    })),
  };
}

/**
 * A vehicle model page. `Product` with the parts as an OfferCatalog is the
 * honest shape here: it says these components can be enquired about, without
 * asserting price, stock or an OEM authorisation we do not claim.
 */
export function modelPartsSchema(input: {
  name: string;
  description: string;
  path: string;
  brand: string;
  parts: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url: `${siteUrl}${input.path}`,
    category: "Vehicle spare parts",
    brand: { "@type": "Brand", name: input.brand },
    ...(input.parts.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${input.name} — spare parts`,
            itemListElement: input.parts.map((part) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Product", name: `${input.name} ${part.toLowerCase()}` },
              seller: { "@id": orgId },
            })),
          },
        }
      : {}),
  };
}

/** A single blog post. */
export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
}) {
  const url = `${siteUrl}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    image: `${siteUrl}/opengraph-image`,
    inLanguage: "en",
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
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
