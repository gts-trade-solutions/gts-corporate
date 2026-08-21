/**
 * Single place to edit brand, contact and navigation details.
 *
 * Contact details below are the ones published on the existing GTS reference
 * page (globalgtstech.com/business-automotive). Replace them once the final
 * contact information for this site is approved.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const site = {
  name: "GTS Trade Solutions",
  legalName: "GTS Trade Solutions",
  shortName: "GTS",
  tagline: "Global Import & Export. Automotive Parts. Contract Manufacturing. Market Entry.",
  supportingLine:
    "Connecting manufacturers, products and markets through international trade, component sourcing, manufacturing, technical services and distribution support.",
  footerBlurb:
    "GTS Trade Solutions supports international trade, automotive and agricultural component sourcing, contract manufacturing, vehicle solutions and market-entry support.",
  url: siteUrl,
} as const;

export const contact = {
  /** Marketing office as published on the existing GTS reference page. */
  office: {
    label: "Marketing Office",
    lines: ["Olympia Platina", "Guindy Industrial Estate", "Chennai - 600032", "Tamil Nadu, India"],
    locality: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600032",
    country: "IN",
  },
  /** Phone numbers as published on the existing GTS reference page. */
  phones: ["+91 96001 22296", "+91 78457 99668", "+91 93848 57579"],
  /**
   * Public enquiry address. Left blank until the final address is confirmed —
   * set NEXT_PUBLIC_CONTACT_EMAIL and it appears in the header, footer and
   * contact page automatically. Nothing is invented if it stays empty.
   */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /**
   * Floating WhatsApp CTA. Optional per the MVP brief — switch `enabled` on
   * once the final WhatsApp number is confirmed (digits only, with country code).
   */
  whatsapp: {
    enabled: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? true : false,
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    message: "Hello GTS Trade Solutions, I would like to discuss a requirement.",
  },
  businessHours: "Monday to Saturday, 09:30 - 18:30 IST",
} as const;

/** Digits-only version of a phone number, for tel: links. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** Exactly six primary navigation items — see MVP acceptance criteria. */
export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Import & Export", href: "/import-export" },
  { label: "Automotive Parts", href: "/automotive-parts" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Consulting", href: "/consulting" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerEnquiryLinks = [
  { label: "Request a Quote", href: "/contact" },
  { label: "Become a Supplier", href: "/contact?enquiry=supplier-partner" },
  { label: "India Distribution / Dealership", href: "/contact?enquiry=india-dealership" },
] as const;
