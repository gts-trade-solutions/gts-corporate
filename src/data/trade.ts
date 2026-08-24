import type { CategoryBlock } from "./types";

/** Import & Export page — required sections, per section 6 of the MVP brief. */
export const tradeSections: CategoryBlock[] = [
  {
    id: "general-trade",
    title: "General Trade",
    icon: "globe",
    summary:
      "International sourcing and trade facilitation for general products, industrial goods and machinery, matched to buyer specification, volume and destination market.",
    items: [
      "Product identification and supplier shortlisting",
      "Commercial and specification comparison",
      "Industrial goods and machinery trade",
      "Consolidated sourcing across categories",
    ],
  },
  {
    id: "food-products",
    title: "Food Products",
    icon: "leaf",
    summary:
      "Trade in legally tradable food categories, coordinated with documentation and inspection requirements of the destination market.",
    items: [
      "Processed and packaged foods",
      "Grains and pulses",
      "Spices and seasonings",
      "Food ingredients",
    ],
  },
  {
    id: "cosmetics-personal-care",
    title: "Cosmetics & Personal Care",
    icon: "sparkle",
    summary:
      "Finished personal-care products together with the packaging and ingredient inputs used to produce them.",
    items: [
      "Cosmetics and colour products",
      "Skincare and haircare",
      "Personal-care products",
      "Packaging and ingredients",
    ],
  },
  {
    id: "steel-metals",
    title: "Steel & Metals",
    icon: "layers",
    summary:
      "Steel and metal products supplied to grade, dimension and finish requirements for construction, fabrication and manufacturing buyers.",
    items: [
      "Coils, sheets and plates",
      "Pipes and tubes",
      "Structural steel",
      "Stainless steel",
      "Fabricated steel products",
    ],
  },
  {
    id: "raw-materials",
    title: "Raw Materials",
    icon: "package",
    summary:
      "Industrial inputs for manufacturing operations, sourced against grade, specification and annual volume.",
    items: [
      "Polymers and plastics",
      "Rubber and rubber compounds",
      "Metals and alloys",
      "Other legally tradable industrial inputs",
    ],
  },
  {
    id: "vehicle-import-export",
    title: "Vehicle Import & Export",
    icon: "truck",
    summary:
      "Import and export of complete vehicles and equipment between markets, from single units to fleet and project quantities.",
    items: [
      "Cars, SUVs and pick-ups",
      "Two-wheelers and three-wheelers",
      "LCVs, trucks and tippers",
      "Buses and coaches",
      "Electric vehicles",
      "Special-purpose vehicles",
      "Agricultural equipment",
      "Construction equipment",
    ],
  },
  {
    id: "india-distribution",
    title: "India Distribution & Dealership",
    icon: "handshake",
    summary:
      "Distribution, dealership, representation and market-development support for overseas brands building a presence in India.",
    items: [
      "Distributor and dealer opportunities",
      "Brand representation",
      "Market-development support",
      "Product launch assistance",
    ],
  },
  {
    id: "trade-support",
    title: "Trade Support",
    icon: "route",
    summary:
      "The coordination work around a transaction — so an enquiry becomes a shipment without gaps between the parties involved.",
    items: [
      "Supplier identification",
      "Buyer identification",
      "Documentation coordination",
      "Inspection coordination",
      "Logistics support",
      "Market-entry support",
    ],
  },
];

/** Vehicle trade categories — section 6 of the MVP brief. */
export const vehicleCategories: CategoryBlock[] = [
  {
    id: "passenger-vehicles",
    title: "Passenger Vehicles",
    icon: "car",
    summary: "Personal and fleet passenger vehicles for import, export and distribution.",
    items: ["Cars", "SUVs", "MPVs", "Pick-ups"],
  },
  {
    id: "two-wheelers",
    title: "Two-Wheelers",
    icon: "motorcycle",
    summary: "Petrol and electric two-wheelers for retail, fleet and last-mile operators.",
    items: ["Motorcycles", "Scooters", "Electric two-wheelers"],
  },
  {
    id: "three-wheelers",
    title: "Three-Wheelers",
    icon: "threeWheeler",
    summary: "Passenger and cargo three-wheelers, including electric variants.",
    items: ["Passenger three-wheelers", "Cargo three-wheelers", "Electric three-wheelers"],
  },
  {
    id: "commercial-vehicles",
    title: "Commercial Vehicles",
    icon: "truck",
    summary: "Goods-carrying vehicles from light commercial to heavy haulage.",
    items: ["LCVs", "Medium and heavy trucks", "Tractor heads", "Tippers"],
  },
  {
    id: "buses",
    title: "Buses",
    icon: "bus",
    summary: "Passenger transport vehicles for city, intercity, school and staff operations.",
    items: ["Minibuses", "City buses", "Coaches", "School buses", "Electric buses"],
  },
  {
    id: "electric-vehicles",
    title: "Electric Vehicles",
    icon: "bolt",
    summary: "Electric vehicles across passenger, commercial and small-mobility segments.",
    items: ["Passenger EVs", "Electric trucks", "Electric buses", "Electric 2W and 3W"],
  },
  {
    id: "special-purpose-vehicles",
    title: "Special-Purpose Vehicles",
    icon: "container",
    summary: "Application-built vehicles supplied against project and operational requirements.",
    items: [
      "Fire trucks",
      "Tankers",
      "Refrigerated vehicles",
      "Utility vehicles",
      "Mobile workshops",
      "Other project-based vehicles",
    ],
  },
  {
    id: "agricultural-equipment",
    title: "Agricultural Equipment",
    icon: "tractor",
    summary:
      "Tractors and farm machinery for agriculture, cultivation, harvesting and material-handling applications.",
    items: [
      "Tractors",
      "Power tillers",
      "Harvesters",
      "Seeders & planters",
      "Sprayers",
      "Agricultural implements",
    ],
  },
  {
    id: "construction-equipment",
    title: "Construction Equipment",
    icon: "excavator",
    summary:
      "Heavy and compact equipment for construction, infrastructure, mining and material-handling applications.",
    items: [
      "Excavators",
      "Backhoe loaders",
      "Wheel loaders",
      "Motor graders",
      "Compactors",
      "Skid-steer loaders",
    ],
  },
];

/** "Looking for an India Partner?" module — aimed at international manufacturers. */
export const indiaPartnerModule = {
  title: "Looking for an India Partner?",
  lead: "If you manufacture outside India and want a structured route into the Indian market, we can act as your representation and market-development partner.",
  items: [
    {
      title: "Distributor representation",
      description: "Representation of your product line with Indian buyers, fleets and channel partners.",
    },
    {
      title: "Authorised dealership",
      description: "Dealership discussions and appointment structures for your product categories.",
    },
    {
      title: "Market-development support",
      description: "Segment assessment, positioning and demand-building activity in target regions.",
    },
    {
      title: "Dealer-network development",
      description: "Identification and onboarding support for regional dealers and channel partners.",
    },
    {
      title: "After-sales setup",
      description: "Service, spares and technical support planning for the Indian market.",
    },
    {
      title: "Localisation support",
      description: "Guidance on product, packaging and documentation adaptation for Indian buyers.",
    },
    {
      title: "Product launch assistance",
      description: "Launch planning, customer introductions and first-order coordination.",
    },
  ],
};
