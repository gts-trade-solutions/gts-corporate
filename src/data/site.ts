/**
 * Single place to edit brand, contact and navigation details.
 *
 * Contact details below are the ones published on the existing GTS reference
 * page (globalgtstech.com/business-automotive). Replace them once the final
 * contact information for this site is approved.
 */

/**
 * Public origin used for canonical URLs, Open Graph tags, sitemap.xml and
 * robots.txt.
 *
 * Resolution order: the explicit setting, then Vercel's production domain,
 * then the per-deployment Vercel URL, then localhost.
 *
 * `||` rather than `??` is deliberate. An environment variable that exists but
 * is empty — which is what you get from an empty field in a hosting dashboard
 * — must fall through. With `??` it does not, and `new URL("")` then throws
 * ERR_INVALID_URL while Next collects page data, failing the whole build.
 * A malformed value is warned about and skipped rather than crashing.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    // Vercel exposes these to Next.js projects automatically.
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    // Bare hostnames (example.com) are accepted and assumed https.
    const absolute = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      // .origin also normalises away any path or trailing slash.
      return new URL(absolute).origin;
    } catch {
      console.warn(`[gts] Ignoring invalid site URL: ${JSON.stringify(value)}`);
    }
  }

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

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

export type NavChild = {
  label: string;
  href: string;
  /** One line shown under the label in the dropdown panel. */
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
  /**
   * Turns the item into a dropdown. The parent label is a button rather than a
   * link, so the overview page is repeated as the first child — otherwise it
   * becomes unreachable on touch, where there is no hover to open the panel.
   */
  children?: NavChild[];
  /** Full topic name, shown as the dropdown panel's heading. */
  panelTitle?: string;
};

/**
 * Primary navigation.
 *
 * Two of these are dropdowns, which is what keeps the bar at eight slots while
 * covering eleven destinations. `label` is what the bar shows and is
 * deliberately shorter than `panelTitle` — the full topic name would not fit
 * the fixed 70px header at the xl breakpoint alongside the logo and the
 * Request a Quote button. Measured, not guessed; see the note in the README
 * before lengthening one.
 */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Import & Export", href: "/import-export" },
  { label: "Automotive Parts", href: "/automotive-parts" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Consulting", href: "/consulting" },
  {
    label: "ODC Logistics",
    href: "/odc-logistics",
    panelTitle: "ODC Logistics & Route Survey",
    children: [
      {
        label: "ODC Logistics",
        href: "/odc-logistics",
        description: "Over-dimensional and heavy-lift cargo movement, planned end to end.",
      },
      {
        label: "LBI Route Survey",
        href: "/odc-logistics/route-survey",
        description: "Physical survey of the route, chainage by chainage, with GPS and photographs.",
      },
      {
        label: "LBI Reports",
        href: "/odc-logistics/reports",
        description: "The survey deliverable — obstruction schedule, drawings and route map.",
      },
    ],
  },
  {
    label: "Resources",
    href: "/vehicle-models",
    panelTitle: "Resources",
    children: [
      {
        label: "Vehicle Models",
        href: "/vehicle-models",
        description: "Find spare parts by vehicle model and send the selection as an enquiry.",
      },
      {
        label: "Blog",
        href: "/blog",
        description: "Working notes on export, sourcing, specification and market entry.",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/** Every destination in the primary nav, flattened and de-duplicated. */
export const navDestinations = [
  ...new Map(
    primaryNav
      .flatMap((item) => (item.children ? item.children : [{ label: item.label, href: item.href }]))
      .map((item) => [item.href, item]),
  ).values(),
];

export const footerEnquiryLinks = [
  { label: "Request a Quote", href: "/contact" },
  { label: "Become a Supplier", href: "/contact?enquiry=supplier-partner" },
  { label: "India Distribution / Dealership", href: "/contact?enquiry=india-dealership" },
] as const;
