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
    // Use the full supplied identity for search and knowledge panels.
    logo: `${siteUrl}/images/gts-logo.png`,
    description: site.supportingLine,
    // What the business does, main lines first, so search engines can tell
    // which searches it is relevant to.
    knowsAbout: [
      "Import and export",
      "General trade",
      "Automotive spare parts trade",
      "Contract manufacturing",
      "Vehicle export",
      "Metal fabrication",
      "Product sourcing from India",
      "ODC logistics",
    ],
    areaServed: { "@type": "Place", name: "Worldwide" },
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
 * A vehicle model page: an `ItemPage` about the vehicle, whose main entity is
 * the list of parts that can be enquired about.
 *
 * Deliberately not `Product`. Google checks every Product node for product
 * rich results, which need a price, a review or a rating. The site publishes
 * none of those (no pricing, by the brief), so Product markup here could never
 * earn a rich result and Search Console would report every model and every
 * part as an error. This says the same things without the errors: what
 * the page lists, for which vehicle and brand, with its photograph.
 */
export function modelPartsSchema(input: {
  /** Page name, e.g. "Tata Motors Super Ace spare parts". */
  name: string;
  /** The vehicle, e.g. "Tata Motors Super Ace". */
  vehicle: string;
  description: string;
  path: string;
  brand: string;
  parts: string[];
  /** Site-relative path to the model photograph. */
  image?: string;
}) {
  const url = `${siteUrl}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "@id": url,
    url,
    name: input.name,
    description: input.description,
    inLanguage: "en",
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": orgId },
    about: [
      { "@type": "Thing", name: input.vehicle },
      { "@type": "Brand", name: input.brand },
    ],
    ...(input.image
      ? { primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}${input.image}` } }
      : {}),
    ...(input.parts.length
      ? {
          mainEntity: {
            "@type": "ItemList",
            name: input.name,
            numberOfItems: input.parts.length,
            itemListElement: input.parts.map((part, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: part,
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

/**
 * A self-hosted film. `seconds` becomes the ISO-8601 duration Google expects,
 * and `path` is the page section the player sits in, so a video result links to
 * the film in context rather than to the bare MP4.
 *
 * There is deliberately no `embedUrl`: that field means a URL that loads a
 * player on its own — an iframe src — and a page anchor is not one. Google
 * asks for `contentUrl` or `embedUrl`, and for a self-hosted MP4 the file
 * itself is the right answer.
 */
export function videoSchema(input: {
  name: string;
  description: string;
  /** Page (and hash) the player sits on, e.g. "/#film". */
  path: string;
  /** Public path of the MP4. */
  contentPath: string;
  /** Public path of the poster frame. */
  thumbnailPath: string;
  seconds: number;
  /** ISO date the film was supplied. */
  uploadDate: string;
}) {
  const minutes = Math.floor(input.seconds / 60);
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: `${siteUrl}${input.thumbnailPath}`,
    contentUrl: `${siteUrl}${input.contentPath}`,
    url: `${siteUrl}${input.path}`,
    duration: `PT${minutes}M${input.seconds - minutes * 60}S`,
    uploadDate: input.uploadDate,
    publisher: { "@id": orgId },
    inLanguage: "en",
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
