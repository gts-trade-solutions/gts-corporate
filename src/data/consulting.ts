import type { CategoryBlock } from "./types";

/**
 * Consulting — the three service blocks in section 9 of the MVP brief.
 *
 * Each block is its own page at `/consulting/<id>`; the Consulting index is an
 * overview that links to all three. `navLabel` is the short form used in the
 * section nav and the primary nav, where the full title does not fit.
 */
export const consultingBlocks: {
  id: string;
  title: string;
  navLabel: string;
  icon: import("@/components/Icon").IconName;
  lead: string;
  /** Enquiry types this service routes to, as `?enquiry=` values on /contact. */
  ctas: { label: string; enquiry: string }[];
  /**
   * Photograph for this service — the banner of its page and its card on the
   * Consulting index. A slot in `media.ts`.
   */
  media: import("./media").MediaKey;
  /** Introduces the scope cards on this service's page. */
  scopeLead: string;
  /** The closing call to action on this service's page. */
  cta: { title: string; lead: string };
  groups: CategoryBlock[];
}[] = [
  {
    id: "fire-safety",
    title: "Fire & Safety Advisory & Solutions",
    navLabel: "Fire & Safety",
    icon: "flame",
    lead: "Active and passive fire protection for industrial, commercial and vehicle applications, from product supply through to documentation and maintenance support.",
    ctas: [
      { label: "Start a Fire & Safety Enquiry", enquiry: "fire-safety" },
      { label: "Talk to a Technical Specialist", enquiry: "homologation-testing" },
    ],
    media: "consultingFireSafety",
    scopeLead:
      "Each area is specified for the risk profile of the site or vehicle — tell us the application and we will confirm what we supply directly and what runs through our partner network.",
    cta: {
      title: "Tell us the site and the risk you need to protect",
      lead: "Share the building or vehicle application, the area and occupancy, and any existing system or drawings — we will confirm what can be supplied, coordinated and documented.",
    },
    groups: [
      {
        id: "active-fire-protection",
        title: "Active fire protection",
        icon: "flame",
        summary: "Detection and suppression systems selected for the risk profile of the site or application.",
        items: [
          "Fire alarm systems",
          "Detection systems",
          "Fire extinguishers",
          "Hydrants",
          "Sprinklers",
          "Pumps",
          "Suppression systems",
        ],
      },
      {
        id: "passive-fire-protection",
        title: "Passive fire protection",
        icon: "shieldCheck",
        summary: "Containment and compartmentation products that slow fire and smoke spread.",
        items: [
          "Fire-rated doors and partitions",
          "Fire stopping",
          "Fire-protective coatings",
          "Sealants",
          "Penetration protection",
        ],
      },
      {
        id: "fire-support-services",
        title: "Support services",
        icon: "clipboard",
        summary: "The coordination around a fire-safety scope, delivered directly or through our partner network.",
        items: [
          "Product supply",
          "Design coordination",
          "Installation coordination",
          "Inspection and testing support",
          "Documentation",
          "Maintenance / AMC where available",
        ],
      },
    ],
  },
  {
    id: "commercial-vehicle-service",
    title: "Commercial Vehicle Service & Technical Support",
    navLabel: "CV Service & Support",
    icon: "wrench",
    lead: "Integrated service and technical support for trucks, buses, trailers, tankers and special-application vehicles, including fleet maintenance planning.",
    ctas: [
      { label: "Truck / Bus Service Enquiry", enquiry: "truck-bus-service" },
      { label: "Talk to a Technical Specialist", enquiry: "homologation-testing" },
    ],
    media: "consultingVehicleService",
    scopeLead:
      "Support is planned around the fleet's duty cycle and operating region — tell us the vehicles and the issue and we will confirm what is handled directly and what runs through our partner network.",
    cta: {
      title: "Tell us about the fleet and what keeps it off the road",
      lead: "Share the vehicle types, fleet size, operating region and the service or technical issue — we will confirm what support can be arranged, and how.",
    },
    groups: [
      {
        id: "vehicle-maintenance",
        title: "Vehicle maintenance",
        icon: "truck",
        summary: "Workshop and on-site maintenance across commercial vehicle types.",
        items: [
          "Trucks",
          "Buses",
          "Trailers",
          "Tankers",
          "Special-application vehicles",
        ],
      },
      {
        id: "aggregate-service",
        title: "Aggregate & system service",
        icon: "gear",
        summary: "Repair and overhaul of the systems that keep a commercial vehicle in service.",
        items: [
          "Brake systems",
          "Suspension",
          "Axles",
          "Electrical systems",
          "Hydraulics",
          "PTO systems",
        ],
      },
      {
        id: "fleet-support",
        title: "Fleet support",
        icon: "chart",
        summary: "Planned upkeep that reduces unscheduled downtime across an operating fleet.",
        items: [
          "Preventive maintenance",
          "Diagnostics",
          "Fleet-maintenance support",
          "Tankers and firefighting vehicles",
          "Caravans and utility vehicles",
          "Refrigerated vehicles",
        ],
      },
    ],
  },
  {
    id: "homologation-market-entry",
    title: "Homologation, Testing & Market Entry Consulting",
    navLabel: "Homologation & Market Entry",
    icon: "clipboard",
    lead: "Support and coordination for manufacturers taking a vehicle, component or product line into a new market — including India.",
    ctas: [
      { label: "Homologation / Testing Enquiry", enquiry: "homologation-testing" },
      { label: "Market Entry Enquiry", enquiry: "market-entry" },
    ],
    media: "consultingHomologation",
    scopeLead:
      "Every programme starts from the product and the target market — tell us both and we will confirm which testing and approval steps we coordinate, and with whom.",
    cta: {
      title: "Tell us the product and the market it is going into",
      lead: "Share the vehicle or component, its existing approvals and the target market — we will set out the testing and approval route we can coordinate with authorised facilities.",
    },
    groups: [
      {
        id: "homologation-testing",
        title: "Homologation & testing",
        icon: "shieldCheck",
        summary: "Coordination with authorised facilities and agencies, with documentation prepared alongside you.",
        items: [
          "Vehicle and component homologation support",
          "Regulatory requirement review",
          "Documentation coordination",
          "Testing and validation coordination with authorised facilities",
        ],
      },
      {
        id: "sourcing-engineering",
        title: "Sourcing & engineering support",
        icon: "wrench",
        summary: "Technical support on the component and supplier side of a market-entry programme.",
        items: [
          "Component sourcing",
          "Supplier development",
          "EV powertrain and component selection support",
        ],
      },
      {
        id: "market-entry",
        title: "Market entry & go-to-market",
        icon: "target",
        summary: "Commercial groundwork before and during launch in a new market.",
        items: [
          "Market assessment",
          "Competitor benchmarking",
          "Product positioning",
          "Importer, distributor, dealer and service-partner identification",
          "Parts, training and after-sales network planning",
          "Go-to-market and product-launch support",
        ],
      },
    ],
  },
];

/** Shown on the Consulting page — required regulatory wording. */
export const regulatoryNote =
  "India type approval and certification is performed by authorised agencies. GTS Trade Solutions acts as a support and coordination partner: we review requirements, prepare and coordinate documentation and work with authorised test facilities on your behalf. We do not issue approvals, registrations or regulatory certificates ourselves.";

/**
 * Sticky nav across the Consulting pages. Derived from the blocks above so a
 * new service becomes a page, a nav entry and an overview card at once.
 */
export const consultingNav = [
  { href: "/consulting", label: "Overview" },
  ...consultingBlocks.map((block) => ({
    href: `/consulting/${block.id}`,
    label: block.navLabel,
  })),
];

/**
 * The service list on the Consulting banner.
 *
 * The three consulting services, each linking to its own page, followed by the
 * scope groups inside them — the module has only three top-level services, so
 * the groups are what give the banner the same useful density as the others.
 */
export const consultingServiceList: { label: string; icon: import("@/components/Icon").IconName; href: string }[] = [
  ...consultingBlocks.map((block) => ({
    label: block.title,
    icon: block.icon,
    href: `/consulting/${block.id}`,
  })),
  ...consultingBlocks.flatMap((block) =>
    block.groups.slice(0, 2).map((group) => ({
      label: group.title,
      icon: group.icon,
      href: `/consulting/${block.id}#${group.id}`,
    })),
  ),
];
