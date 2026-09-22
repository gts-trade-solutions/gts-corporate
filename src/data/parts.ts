import type { IconName } from "@/components/Icon";
import type { CategoryBlock } from "./types";

/**
 * Automotive Parts page — vehicle / application categories.
 * Rendered on one SEO-rich landing page with client-side chips, not as
 * separate top-level navigation tabs.
 */
export const partCategories: CategoryBlock[] = [
  {
    id: "two-wheelers",
    title: "Two Wheelers",
    icon: "motorcycle",
    media: "partsTwoWheelers",
    summary: "Petrol and electric two-wheeler components for OEM, aftermarket and assembly programmes.",
    items: [
      "Motors and controllers",
      "Battery packs and BMS",
      "Chargers",
      "Wheels and tyres",
      "Brakes and suspension",
      "Electrical components",
      "Body parts",
    ],
  },
  {
    id: "three-wheelers",
    title: "Three Wheelers",
    icon: "threeWheeler",
    media: "partsThreeWheelers",
    summary: "Driveline, chassis and electrical components for passenger, cargo and electric three-wheelers.",
    items: [
      "Rear axles and differentials",
      "EV axles",
      "Motors and controllers",
      "Batteries",
      "Brakes and suspension",
      "Tyres and rims",
      "Electrical systems",
    ],
  },
  {
    id: "cars-lcvs",
    title: "Cars & LCVs",
    icon: "car",
    media: "partsCars",
    summary: "Passenger car and light commercial vehicle components across chassis, driveline and electricals.",
    items: [
      "Suspension and steering",
      "Braking systems",
      "Drivetrain components",
      "Wheels and tyres",
      "Electrical components",
      "Thermal components",
      "Chassis components",
    ],
  },
  {
    id: "trucks",
    title: "Trucks",
    icon: "truck",
    media: "partsTrucks",
    summary: "Medium and heavy commercial vehicle aggregates and body components for OEM and fleet supply.",
    items: [
      "Front and rear axles",
      "Mechanical and air suspension",
      "Brakes, ABS and EBS",
      "Tyres and wheel rims",
      "Differentials and propeller shafts",
      "PTOs, pumps and hydraulics",
      "Cabin and body parts",
    ],
  },
  {
    id: "buses",
    title: "Buses",
    icon: "bus",
    media: "partsBuses",
    summary: "Bus and coach aggregates plus interior, safety and passenger-comfort components.",
    items: [
      "Axles and air suspension",
      "Steering and brakes",
      "Tyres and rims",
      "Doors and seats",
      "HVAC systems",
      "Lighting and electricals",
      "Safety and interior components",
    ],
  },
  {
    id: "ev-components",
    title: "EV Components",
    icon: "bolt",
    media: "partsEv",
    summary: "Electric powertrain, energy storage and thermal components for EV manufacturers and integrators.",
    items: [
      "E-axles and traction motors",
      "Controllers and inverters",
      "Battery systems and BMS",
      "Chargers and DC-DC converters",
      "High-voltage harnesses",
      "Thermal management",
    ],
  },
  {
    id: "trailer-components",
    title: "Trailer Components",
    icon: "trailer",
    media: "partsTrailer",
    summary: "Running gear, coupling and braking components for trailer builders and fleet operators.",
    items: [
      "Trailer axles",
      "Mechanical and air suspension",
      "Landing legs and kingpins",
      "Fifth wheels and coupling systems",
      "Brakes, ABS and EBS",
      "Tyres, rims and mudguards",
      "Lighting",
    ],
  },
  {
    id: "agriculture-off-highway",
    title: "Agriculture & Off-Highway",
    icon: "tractor",
    media: "partsAgriculture",
    summary: "Tractor, implement and off-highway machinery components for OEM and aftermarket buyers.",
    items: [
      "Tractor axles and transmission parts",
      "PTOs",
      "Hydraulic pumps and cylinders",
      "Linkages",
      "Tyres and rims",
      "Disc blades and rotavator parts",
      "Harvester parts",
      "Bearings, filters and fabricated components",
    ],
  },
];

/**
 * "Trucks" → "Trucks Components", but "EV Components" stays as it is — two of
 * the category titles already end in the word, and appending it again printed
 * "Trailer Components Components".
 */
export const componentsLabel = (title: string) =>
  /\bcomponents$/i.test(title) ? title : `${title} Components`;

/** Priority product groups to feature visually — section 7 of the MVP brief. */
export const priorityProductGroups: { title: string; icon: IconName }[] = [
  { title: "Trailer axle / truck axle / EV e-axle", icon: "gear" },
  { title: "Truck and commercial vehicle tyres", icon: "truck" },
  { title: "Steel wheel rims and alloy wheels", icon: "target" },
  { title: "Mechanical and air suspension", icon: "wrench" },
  { title: "Brake systems, ABS and EBS", icon: "shieldCheck" },
  { title: "PTOs, hydraulic pumps and cylinders", icon: "factory" },
  { title: "EV motors, controllers, inverters and chargers", icon: "bolt" },
  { title: "Battery packs and BMS", icon: "layers" },
  { title: "Truck, bus and trailer body components", icon: "container" },
  { title: "Tractor and agricultural machinery parts", icon: "tractor" },
];

export const buyerTypes = [
  "OEMs",
  "Tier-1 suppliers",
  "Distributors",
  "Aftermarket importers",
  "Fleet operators",
  "Body builders",
  "Trailer manufacturers",
  "EV startups",
  "Farm-equipment companies",
  "International sourcing teams",
];

/**
 * The three grades a parts enquiry is quoted against.
 *
 * Buyers name a grade before they ask a price, and genuine / OEM / aftermarket
 * is the distinction most often muddled in an incoming enquiry — so stating it
 * plainly removes a round of questions before quotation.
 *
 * Content rule, as everywhere else on the site: describing a grade is not a
 * claim of stock, of an OEM appointment or of an authorisation. Every line is
 * quoted per enquiry, against the specification the buyer confirms.
 */
export const partGrades: { title: string; summary: string; note: string }[] = [
  {
    title: "Genuine spare parts",
    summary:
      "Supplied in the vehicle manufacturer's own branding and packaging, to the specification the vehicle left the line with.",
    note: "Usually specified for warranty work, fleet contracts, and anything where the part number has to match the service manual exactly.",
  },
  {
    title: "OEM spare parts",
    summary:
      "The same component from the manufacturer that supplies the vehicle maker, without the vehicle maker's branding on the box.",
    note: "The common choice where fitment and specification matter but the packaging does not.",
  },
  {
    title: "Aftermarket spare parts",
    summary:
      "Made by independent manufacturers to fit the same application, across a range of quality tiers and price points.",
    note: "Specified for vehicles out of warranty, for high-wear service items, and wherever landed cost decides the order.",
  },
];

/**
 * The service list on the Automotive Parts banner.
 *
 * One entry per component category, each linking to its own detail page —
 * derived from `partCategories`, so adding a category adds it to the banner.
 */
export const partsServiceList: { label: string; icon: IconName; href: string }[] =
  partCategories.map((category) => ({
    label: category.title,
    icon: category.icon,
    href: `/automotive-parts/${category.id}`,
  }));
