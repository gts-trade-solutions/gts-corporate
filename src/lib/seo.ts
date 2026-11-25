import type { Metadata } from "next";
import { site, siteUrl } from "@/data/site";

export type PageKey =
  | "home"
  | "import-export"
  | "trade-categories"
  | "vehicle-trade"
  | "india-partner"
  | "automotive-parts"
  | "vehicle-models"
  | "manufacturing"
  | "manufacturing-scope"
  | "manufacturing-process"
  | "consulting"
  | "consulting-fire-safety"
  | "consulting-commercial-vehicle-service"
  | "consulting-homologation-market-entry"
  | "odc-logistics"
  | "route-survey"
  | "route-survey-reports"
  | "blog"
  | "contact"
  | "faq";

type PageSeo = {
  path: string;
  /** Full <title> — the brief specifies complete titles, so these are absolute. */
  title: string;
  description: string;
  /** Primary keyword cluster from section 11 of the brief. */
  keywords: string[];
};

export const pageSeo: Record<PageKey, PageSeo> = {
  home: {
    path: "/",
    title: "Import Export Company in Chennai, India | GTS Trade Solutions",
    description:
      "Chennai import export company for general trade, vehicle export, automotive spare parts and contract manufacturing, serving buyers in India and worldwide.",
    keywords: [
      "import export company India",
      "import export company in Chennai",
      "export company India",
      "general trading company India",
      "contract manufacturing India",
      "automotive spare parts exporter India",
      "auto parts exporter India",
      "vehicle exporter India",
      "product sourcing India",
      "international trading company",
      "global sourcing company",
    ],
  },
  "import-export": {
    path: "/import-export",
    title: "Import Export Company in India | General & Vehicle Trade | GTS",
    description:
      "Import and export from Chennai, India: general trade, steel, food, raw materials, machinery, vehicles and automotive spares, plus distribution in India.",
    keywords: [
      "import export company in India",
      "import export company Chennai",
      "export company India",
      "import agent in India",
      "international trading company India",
      "general trading company India",
      "vehicle export from India",
      "vehicle exporter India",
      "truck exporter India",
      "car exporter India",
      "steel exporter India",
      "food products exporter India",
      "raw material supplier India",
      "automotive spare parts exporter India",
    ],
  },
  "trade-categories": {
    path: "/import-export/trade-categories",
    title: "General Trading Company India | Steel, Food, Machinery | GTS",
    description:
      "General trade from India: steel and metals, food products and spices, cosmetics, raw materials, machinery and industrial goods, sourced to your specification.",
    keywords: [
      "general trading company India",
      "general trading company Chennai",
      "general trade India",
      "product sourcing India",
      "sourcing agent India",
      "industrial goods exporter India",
      "machinery exporter India",
      "steel exporter India",
      "food products exporter India",
      "spices exporter India",
      "cosmetics exporter India",
      "raw material supplier India",
    ],
  },
  "vehicle-trade": {
    path: "/import-export/vehicle-trade",
    title: "Vehicle Exporter India | Cars, Trucks, Buses & Tractors | GTS",
    description:
      "Vehicle export from India, from single units to fleets: cars, motorcycles, auto rickshaws, trucks, buses, EVs, tractors and construction equipment.",
    keywords: [
      "vehicle exporter India",
      "vehicle export from India",
      "car exporter India",
      "truck exporter India",
      "bus exporter India",
      "motorcycle exporter India",
      "auto rickshaw exporter",
      "three wheeler exporter India",
      "electric vehicle exporter India",
      "tractor exporter India",
      "construction equipment exporter India",
      "special purpose vehicle export India",
      "vehicle import India",
    ],
  },
  "india-partner": {
    path: "/import-export/india-partner",
    title: "Distributor in India for Foreign Brands | Import Partner | GTS",
    description:
      "Importing into India? Distributor representation, dealership appointment, dealer networks, after-sales setup and product launch for overseas brands.",
    keywords: [
      "distributor in India for foreign brands",
      "import agent in India",
      "India distribution partner",
      "India market entry partner",
      "importer and distributor India",
      "dealership appointment India",
      "dealer network development India",
      "after sales setup India",
      "product launch India",
    ],
  },
  "automotive-parts": {
    path: "/automotive-parts",
    title: "Automotive Spare Parts Exporter & Supplier India | GTS",
    description:
      "Automotive spare parts trade from India: truck, bus, car, two- and three-wheeler, tractor, trailer and EV parts, sourced by part number, drawing or model.",
    keywords: [
      "automotive spare parts exporter India",
      "auto parts exporter India",
      "automotive spare parts supplier",
      "truck spare parts exporter India",
      "two wheeler spare parts exporter India",
      "three wheeler spare parts exporter",
      "bus spare parts supplier India",
      "car spare parts exporter India",
      "tractor spare parts exporter India",
      "EV components supplier India",
      "trailer parts supplier India",
      "commercial vehicle spare parts",
      "aftermarket spare parts",
      "automotive components exporter",
      "truck tyres",
      "wheel rims",
      "air suspension",
    ],
  },
  "vehicle-models": {
    path: "/vehicle-models",
    title: "Spare Parts by Vehicle Model | Tata, Bajaj, TVS, Eicher | GTS",
    description:
      "Spare parts for Indian vehicle models: Tata, Bajaj, TVS, Eicher, Ashok Leyland, Mahindra, Royal Enfield and more. Pick the parts and send one enquiry.",
    keywords: [
      "spare parts by vehicle model",
      "Indian vehicle spare parts exporter",
      "Bajaj Boxer spare parts",
      "Bajaj RE spare parts",
      "Bajaj Maxima spare parts",
      "TVS King spare parts",
      "Tata Super Ace spare parts",
      "Eicher Pro truck spare parts",
      "Ashok Leyland Dost spare parts",
      "Mahindra Pik Up spare parts",
      "Royal Enfield spare parts exporter",
      "Maruti Suzuki spare parts exporter",
      "Indian truck parts",
      "three wheeler spare parts",
      "motorcycle spare parts exporter",
    ],
  },
  manufacturing: {
    path: "/manufacturing",
    title: "Contract Manufacturing Company in Chennai, India | GTS",
    description:
      "Contract manufacturing and fabrication in India: build-to-print automotive parts, truck bodies, trailers, containers, reefers, tankers and custom assemblies.",
    keywords: [
      "contract manufacturing India",
      "contract manufacturing company Chennai",
      "automotive contract manufacturing India",
      "build to print manufacturing India",
      "metal fabrication company India",
      "sheet metal fabrication Chennai",
      "CNC machining services India",
      "truck body manufacturer India",
      "trailer manufacturer India",
      "container manufacturer India",
      "reefer body manufacturer India",
      "tanker manufacturer India",
      "prototype to production manufacturing",
    ],
  },
  "manufacturing-scope": {
    path: "/manufacturing/scope",
    title: "Manufacturing Scope | Truck Bodies, Trailers, Containers | GTS",
    description:
      "Automotive contract manufacturing, sheet-metal and structural fabrication, trailers, containers, reefer bodies and prototype-to-production work in India.",
    keywords: [
      "automotive contract manufacturing India",
      "contract manufacturing India",
      "sheet metal fabrication India",
      "industrial fabrication",
      "metal fabrication company India",
      "truck body manufacturer India",
      "trailer manufacturer India",
      "container manufacturer India",
      "reefer body manufacturer India",
      "CNC machining services India",
    ],
  },
  "manufacturing-process": {
    path: "/manufacturing/process",
    title: "Contract Manufacturing Process | Prototype to Production | GTS",
    description:
      "How a contract manufacturing project runs: drawing review, sourcing, prototype, first-article validation, batch production and dispatch.",
    keywords: [
      "contract manufacturing process",
      "prototype to production",
      "build to print",
      "build to specification",
      "manufacturing feasibility",
      "first article validation",
      "batch production India",
      "drawing review manufacturing",
    ],
  },
  consulting: {
    path: "/consulting",
    title: "Automotive Consulting, Vehicle Homologation & Market Entry | GTS",
    description:
      "Truck and bus service, fire safety solutions, vehicle homologation, testing coordination, component sourcing and go-to-market support.",
    keywords: [
      "automotive consulting services",
      "vehicle homologation",
      "automotive testing",
      "vehicle certification",
      "market entry India",
      "go to market strategy",
      "distributor in India",
      "fire safety solutions",
      "commercial vehicle service",
      "truck service",
      "bus maintenance",
    ],
  },
  "consulting-fire-safety": {
    path: "/consulting/fire-safety",
    title: "Fire Safety Solutions | Active & Passive Fire Protection | GTS",
    description:
      "Active and passive fire protection for industrial, commercial and vehicle use: detection, suppression, fire stopping, fire-rated products and design support.",
    keywords: [
      "fire safety solutions",
      "active fire protection",
      "passive fire protection",
      "fire alarm systems",
      "fire detection systems",
      "fire suppression systems",
      "fire extinguishers supplier",
      "sprinkler systems",
      "fire stopping",
      "fire rated doors",
      "fire safety consultant India",
    ],
  },
  "consulting-commercial-vehicle-service": {
    path: "/consulting/commercial-vehicle-service",
    title: "Commercial Vehicle Service | Truck, Bus & Fleet Support | GTS",
    description:
      "Service and technical support for trucks, buses, trailers and tankers: brakes, suspension, axles, electricals and hydraulics, with fleet maintenance planning.",
    keywords: [
      "commercial vehicle service",
      "truck service",
      "bus maintenance",
      "trailer maintenance",
      "tanker maintenance",
      "fleet maintenance support",
      "preventive maintenance fleet",
      "brake system repair",
      "suspension repair",
      "axle overhaul",
      "refrigerated vehicle service",
    ],
  },
  "consulting-homologation-market-entry": {
    path: "/consulting/homologation-market-entry",
    title: "Vehicle Homologation & India Market Entry Consulting | GTS",
    description:
      "Homologation and testing coordination, regulatory review, supplier development and go-to-market support for vehicles and components entering new markets.",
    keywords: [
      "vehicle homologation",
      "homologation support",
      "automotive testing",
      "vehicle certification",
      "type approval coordination",
      "market entry India",
      "go to market strategy",
      "distributor in India",
      "supplier development",
      "EV component sourcing",
      "product launch support",
    ],
  },
  "odc-logistics": {
    path: "/odc-logistics",
    title: "ODC Logistics & Heavy-Lift Transport India | GTS",
    description:
      "Over-dimensional cargo logistics: transport engineering, route survey, movement planning, permits and supervised execution for heavy-lift and project cargo.",
    keywords: [
      "ODC logistics",
      "ODC transport",
      "ODC transportation",
      "over dimensional cargo transport",
      "oversized cargo transport",
      "heavy lift transport India",
      "heavy lift logistics",
      "heavy cargo transport",
      "heavy haulage",
      "ODC cargo movement",
      "project cargo",
      "project cargo logistics",
      "transport engineering services",
      "oversize load permit India",
      "heavy haulage consultancy",
      "hydraulic axle transport",
      "multimodal project logistics",
    ],
  },
  "route-survey": {
    path: "/odc-logistics/route-survey",
    title: "Route Survey for ODC & Heavy-Lift Cargo | GTS Trade Solutions",
    description:
      "Physical route surveys for over-dimensional cargo — every bridge, cable, junction and narrow section recorded with chainage, GPS coordinates and photographs.",
    keywords: [
      "route survey",
      "route survey reports",
      "ODC route survey",
      "heavy lift route survey",
      "route feasibility study",
      "transport feasibility study",
      "bridge load assessment",
      "obstruction survey",
      "swept path analysis",
      "GPS route survey India",
    ],
  },
  "route-survey-reports": {
    path: "/odc-logistics/reports",
    title: "Route Survey Reports — Obstruction Schedule & Drawings | GTS",
    description:
      "Route survey reports for ODC moves: obstruction schedule with chainage, GPS and photos, route map, GA drawing and action per point, in Word, PDF and GPX.",
    keywords: [
      "route survey reports",
      "route survey report",
      "ODC survey report format",
      "obstruction schedule",
      "transport feasibility report",
      "route survey deliverables",
      "GA drawing transport",
    ],
  },
  blog: {
    path: "/blog",
    title: "Import Export, Spare Parts & Manufacturing Insights | GTS",
    description:
      "Practical notes on import and export, vehicle trade, spare-parts sourcing, contract manufacturing and India market entry, for buyers and manufacturers.",
    keywords: [
      "vehicle export blog",
      "automotive sourcing insights",
      "spare parts export guide",
      "vehicle homologation guide",
      "India market entry automotive",
      "trailer axle specification",
      "EV component sourcing",
    ],
  },
  contact: {
    path: "/contact",
    title: "Request a Quote | Import Export, Spares & Manufacturing | GTS",
    description:
      "Send an RFQ for import/export, vehicle trade, automotive parts, contract manufacturing, dealership, service, homologation or market-entry support.",
    keywords: [
      "request quote automotive parts",
      "component sourcing India",
      "automotive parts RFQ",
      "import export enquiry",
      "contract manufacturing quote",
    ],
  },
  faq: {
    path: "/faq",
    title: "Frequently Asked Questions | GTS Trade Solutions",
    description:
      "Answers on import and export, automotive parts sourcing, vehicle models, contract manufacturing, ODC logistics, route surveys, consulting and market entry.",
    keywords: [
      "import export FAQ",
      "automotive parts sourcing questions",
      "contract manufacturing FAQ",
      "ODC logistics FAQ",
      "route survey FAQ",
      "how to source automotive components",
      "minimum order quantity automotive parts",
      "export documentation India",
    ],
  },
};

/**
 * Builds page metadata with canonical URL and Open Graph / Twitter cards.
 *
 * The generated card at /opengraph-image is referenced explicitly: page-level
 * `openGraph` replaces the layout's object wholesale, so it is not inherited.
 */
export function buildMetadata(key: PageKey): Metadata {
  const page = pageSeo[key];
  const url = `${siteUrl}${page.path}`;
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: page.title }];

  return {
    title: { absolute: page.title },
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: page.path },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: page.title,
      description: page.description,
      locale: "en_IN",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images,
    },
  };
}
