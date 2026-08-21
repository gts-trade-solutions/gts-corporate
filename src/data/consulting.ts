import type { CategoryBlock } from "./types";

/** Consulting page — the three service blocks in section 9 of the MVP brief. */
export const consultingBlocks: {
  id: string;
  title: string;
  icon: import("@/components/Icon").IconName;
  lead: string;
  groups: CategoryBlock[];
}[] = [
  {
    id: "fire-safety",
    title: "Fire & Safety Advisory & Solutions",
    icon: "flame",
    lead: "Active and passive fire protection for industrial, commercial and vehicle applications, from product supply through to documentation and maintenance support.",
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
    icon: "wrench",
    lead: "Integrated service and technical support for trucks, buses, trailers, tankers and special-application vehicles, including fleet maintenance planning.",
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
    icon: "clipboard",
    lead: "Support and coordination for manufacturers taking a vehicle, component or product line into a new market — including India.",
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
