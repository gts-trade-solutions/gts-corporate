import type { Card, CategoryBlock } from "./types";

export const heroCopy = {
  eyebrow: "Import & Export · Automotive Parts · Contract Manufacturing · Consulting",
  h1: "Global Import Export, Automotive Parts & Contract Manufacturing Solutions",
  lead: "GTS Trade Solutions helps businesses source, import, export, manufacture and launch products across automotive, agricultural and industrial markets.",
  sub: "From complete vehicles and automotive components to contract manufacturing, distribution and technical services, we connect the right products, suppliers and markets.",
};

export const whatWeDo: Card[] = [
  {
    title: "Import & Export",
    description:
      "General product trade, complete vehicle import/export and India distribution support across international markets.",
    icon: "globe",
    href: "/import-export",
    cta: "Explore trade services",
  },
  {
    title: "Automotive Parts",
    description:
      "Components for two-wheelers, three-wheelers, cars, LCVs, trucks, buses, trailers, EVs and agricultural machinery.",
    icon: "gear",
    href: "/automotive-parts",
    cta: "Browse component categories",
    // Fills the tall bento tile, and doubles as a scannable segment list.
    bullets: [
      "Two & three wheelers",
      "Cars & LCVs",
      "Trucks & buses",
      "Trailer running gear",
      "EV powertrain & batteries",
      "Agriculture & off-highway",
    ],
  },
  {
    title: "Manufacturing",
    description:
      "Contract manufacturing, fabrication and vehicle body solutions including trailers, containers and reefer bodies.",
    icon: "factory",
    href: "/manufacturing",
    cta: "See manufacturing scope",
  },
  {
    title: "Consulting",
    description:
      "Vehicle homologation and testing coordination, market entry, fire & safety advisory and commercial vehicle technical support.",
    icon: "clipboard",
    href: "/consulting",
    cta: "View consulting services",
  },
];

export const globalTrade: CategoryBlock = {
  id: "global-trade",
  title: "Global Trade",
  icon: "package",
  summary:
    "Sourcing and trade facilitation across product categories, matched to buyer specifications and destination-market requirements.",
  items: [
    "Food products and food ingredients",
    "Cosmetics and personal care",
    "Steel and metal products",
    "Raw materials and industrial inputs",
    "Machinery and industrial goods",
    "Custom sourcing against buyer specifications",
  ],
};

export const vehicleTrade: CategoryBlock = {
  id: "vehicle-trade",
  title: "Vehicle Trade",
  icon: "truck",
  summary:
    "Import and export of complete vehicles between markets, coordinated with documentation, inspection and logistics partners.",
  items: [
    "Passenger cars, SUVs and pick-ups",
    "Two-wheelers and three-wheelers",
    "Trucks, tractor heads and tippers",
    "Buses and coaches",
    "Electric vehicles across segments",
    "Special-purpose and project vehicles",
  ],
};

export const componentsHighlight: CategoryBlock = {
  id: "components",
  title: "Automotive & Agri Components",
  icon: "wrench",
  summary:
    "Component sourcing and supply for OEMs, Tier-1 suppliers, distributors, fleet operators and body builders.",
  items: [
    "Axles, differentials and propeller shafts",
    "Truck, bus and trailer tyres",
    "Steel wheel rims and alloy wheels",
    "Mechanical and air suspension",
    "Brake systems, ABS and EBS",
    "EV motors, controllers and battery systems",
    "Truck, bus and trailer body components",
    "Agricultural machinery and tractor parts",
  ],
};

export const manufacturingHighlight: CategoryBlock = {
  id: "manufacturing",
  title: "Manufacturing",
  icon: "factory",
  summary:
    "Contract manufacturing and fabrication support from drawing review through prototype coordination to batch production.",
  items: [
    "Automotive contract manufacturing",
    "Sheet-metal and structural fabrication",
    "Trailer manufacturing support",
    "Container and reefer solutions",
    "Truck bodies, cabins and chassis structures",
    "Special-application assemblies",
  ],
};

export const odcHighlight: CategoryBlock = {
  id: "odc-logistics",
  title: "ODC Logistics & Route Survey",
  icon: "crane",
  summary:
    "Over-dimensional and heavy-lift cargo movement — transport engineering, physical route survey, permit coordination and supervised execution.",
  items: [
    "Transport engineering and feasibility studies",
    "Physical route survey with GPS and photographs",
    "Bridge, culvert and clearance assessment",
    "Trailer, hydraulic axle and prime-mover selection",
    "Oversize and overweight permit coordination",
    "Utility shutdown, escort and traffic-window planning",
    "Multimodal, port and jetty interface planning",
    "Route survey reports in Word, PDF and GPX",
  ],
};

export const consultingHighlight: CategoryBlock = {
  id: "consulting",
  title: "Consulting",
  icon: "clipboard",
  summary:
    "Automotive consulting for vehicle homologation, testing, market entry, fire safety advisory and commercial vehicle technical and service support in India and international markets.",
  items: [
    "Vehicle and component homologation support",
    "Testing and validation coordination",
    "Market entry and go-to-market support",
    "Fire & safety advisory and solutions",
    "Truck, bus and trailer technical service",
    "Distributor, dealer and service-partner identification",
  ],
};

export const indiaPartner = {
  title: "Looking for an India Partner?",
  lead: "We work with international manufacturers who want a route into the Indian market — and with Indian manufacturers looking for overseas representation.",
  items: [
    "Distributor representation",
    "Authorised dealership opportunities",
    "Market-development support",
    "Dealer-network development",
    "After-sales setup",
    "Localisation support",
    "Product launch assistance",
  ],
};

export const whyGts: Card[] = [
  {
    title: "Technical support",
    description:
      "Engineering-literate discussion of drawings, specifications and application requirements before a quotation is issued.",
    icon: "draft",
  },
  {
    title: "Supplier network",
    description:
      "Access to manufacturers and suppliers across automotive, agricultural, industrial and general trade categories.",
    icon: "route",
  },
  {
    title: "Global sourcing",
    description:
      "Product identification, supplier evaluation and commercial comparison against your target cost and volume.",
    icon: "search",
  },
  {
    title: "Manufacturing support",
    description:
      "Fabrication, assembly and contract manufacturing coordination for automotive and special-application products.",
    icon: "factory",
  },
  {
    title: "India market access",
    description:
      "Distribution, dealership and market-development support for overseas brands entering India.",
    icon: "handshake",
  },
  {
    title: "After-sales coordination",
    description:
      "Service, spares and technical support planning so products stay supported after the first shipment.",
    icon: "wrench",
  },
];
