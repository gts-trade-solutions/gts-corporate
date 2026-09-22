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
  /**
   * Phone numbers as published on the existing GTS reference page.
   *
   * Listed as text only. There is deliberately no tel: link anywhere on the
   * site — the agreed contact routes are WhatsApp, email and the enquiry form,
   * so a "Call" action would send people down a channel nobody is staffing.
   * `whatsappHref` below is what every former call button now points at.
   */
  phones: ["+91 96001 22296", "+91 78457 99668", "+91 93848 57579"],
  /**
   * Public enquiry address, shown in the header utility row, the footer, the
   * contact page and the mobile menu. Set NEXT_PUBLIC_CONTACT_EMAIL and it
   * appears everywhere at once; left empty, every mailto surface is skipped
   * rather than rendering a broken link. Nothing is invented.
   */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /**
   * WhatsApp is the primary conversational channel — the floating button, the
   * header action, the mobile menu and every CTA band route to it. Digits with
   * the country code, no spaces or symbols (e.g. 919600122296).
   */
  whatsapp: {
    enabled: Boolean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    message: "Hello GTS Trade Solutions, I would like to discuss a requirement.",
  },
  /**
   * Microsoft Teams, for corporate buyers who would rather meet than message.
   * Accepts either a full meeting/chat URL or a bare Teams address — the
   * helper below turns an address into a deep link.
   */
  teams: {
    enabled: Boolean(process.env.NEXT_PUBLIC_TEAMS_ID),
    id: process.env.NEXT_PUBLIC_TEAMS_ID ?? "",
  },
  businessHours: "Monday to Saturday, 09:30 - 18:30 IST",
} as const;

/**
 * WhatsApp deep link with a pre-filled message.
 *
 * Returns an empty string when no number is configured — every caller treats
 * that as "fall back to the enquiry form", so an unset environment variable
 * degrades to a working CTA rather than a dead link.
 */
export const whatsappHref = (message: string = contact.whatsapp.message) =>
  contact.whatsapp.enabled
    ? `https://wa.me/${contact.whatsapp.number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    : "";

/**
 * Teams deep link. A configured value that already looks like a URL is used as
 * it is; anything else is treated as a Teams address and wrapped in the
 * chat deep link.
 */
export const teamsHref = () => {
  const id = contact.teams.id.trim();
  if (!id) return "";
  if (/^https?:\/\//i.test(id)) return id;
  return `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(id)}`;
};

/** mailto: link with an optional subject, or "" when no address is set. */
export const mailtoHref = (subject?: string) =>
  contact.email
    ? `mailto:${contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`
    : "";

/**
 * Where a "talk to us" action should go, in order of preference:
 * WhatsApp, then email, then the enquiry form. Used by every CTA that used to
 * be a Call button so none of them can ever render as a dead link.
 */
export const primaryContactAction = (message?: string) => {
  const whatsapp = whatsappHref(message);
  if (whatsapp) return { href: whatsapp, label: "Chat on WhatsApp", external: true as const };
  const mail = mailtoHref(message);
  if (mail) return { href: mail, label: "Email us", external: true as const };
  return { href: "/contact", label: "Send an enquiry", external: false as const };
};

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
 * Five of these are dropdowns, which is what keeps the bar at eight slots while
 * covering nineteen destinations. `label` is what the bar shows and is
 * deliberately shorter than `panelTitle` — the full topic name would not fit
 * the fixed 70px header at the xl breakpoint alongside the logo and the
 * Request a Quote button. Measured, not guessed; see the note in the README
 * before lengthening one.
 */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Import & Export",
    href: "/import-export",
    panelTitle: "Global Import & Export",
    children: [
      {
        label: "Import & Export",
        href: "/import-export",
        description: "How we trade — goods, vehicles and representation, with the FAQs.",
      },
      {
        label: "Trade Categories",
        href: "/import-export/trade-categories",
        description: "General products, food, cosmetics, steel, raw materials and machinery.",
      },
      {
        label: "Vehicle Trade",
        href: "/import-export/vehicle-trade",
        description: "Complete vehicles and equipment, from single units to fleet quantities.",
      },
      {
        label: "India Partner",
        href: "/import-export/india-partner",
        description: "Distribution, dealership and market development for overseas brands.",
      },
    ],
  },
  { label: "Automotive Parts", href: "/automotive-parts" },
  {
    label: "Manufacturing",
    href: "/manufacturing",
    panelTitle: "Contract Manufacturing & Fabrication",
    children: [
      {
        label: "Manufacturing",
        href: "/manufacturing",
        description: "What we build and how a project runs, with the FAQs.",
      },
      {
        label: "Manufacturing Scope",
        href: "/manufacturing/scope",
        description: "Automotive structures, fabrication, trailers, containers and reefer bodies.",
      },
      {
        label: "How a Project Runs",
        href: "/manufacturing/process",
        description: "Drawing review to batch production, staged so the first article is validated.",
      },
    ],
  },
  {
    label: "Consulting",
    href: "/consulting",
    panelTitle: "Automotive, Engineering & Market Consulting",
    children: [
      {
        label: "Consulting",
        href: "/consulting",
        description: "The three consulting services, the regulatory wording and the FAQs.",
      },
      {
        label: "Fire & Safety",
        href: "/consulting/fire-safety",
        description: "Active and passive fire protection for sites, buildings and vehicles.",
      },
      {
        label: "CV Service & Support",
        href: "/consulting/commercial-vehicle-service",
        description: "Truck, bus, trailer and tanker service, with fleet maintenance planning.",
      },
      {
        label: "Homologation & Market Entry",
        href: "/consulting/homologation-market-entry",
        description: "Approval and testing coordination, sourcing and go-to-market support.",
      },
    ],
  },
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
        label: "Route Survey Reports",
        href: "/odc-logistics/route-survey",
        description: "Physical survey of the route, chainage by chainage, with GPS and photographs.",
      },
      {
        label: "Reports",
        href: "/odc-logistics/reports",
        description: "The survey deliverable — obstruction schedule, drawings and route map.",
      },
    ],
  },
  {
    label: "Vehicle Models",
    href: "/vehicle-models",
    panelTitle: "Indian Vehicle Models Gallery",
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

/** A flattened nav destination. Top-level items without a panel have no description. */
export type NavDestination = { label: string; href: string; description?: string };

/** Every destination in the primary nav, flattened and de-duplicated. */
export const navDestinations: NavDestination[] = [
  ...new Map<string, NavDestination>(
    primaryNav
      .flatMap<NavDestination>((item) =>
        item.children ? item.children : [{ label: item.label, href: item.href }],
      )
      .map((item) => [item.href, item]),
  ).values(),
];

export const footerEnquiryLinks = [
  { label: "Request a Quote", href: "/contact" },
  { label: "Become a Supplier", href: "/contact?enquiry=supplier-partner" },
  { label: "India Distribution / Dealership", href: "/contact?enquiry=india-dealership" },
] as const;
