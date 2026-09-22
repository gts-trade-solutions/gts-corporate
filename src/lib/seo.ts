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
    title: "Import Export Company & Automotive Parts Supplier | GTS Trade Solutions",
    description:
      "GTS Trade Solutions supports global import & export, automotive parts sourcing, contract manufacturing, vehicle trade, technical services and India market entry.",
    keywords: [
      "import export company",
      "automotive parts supplier",
      "auto parts supplier",
      "contract manufacturing",
      "contract manufacturing company",
      "global sourcing company",
      "sourcing company India",
      "product sourcing India",
      "automotive sourcing",
      "automotive components exporter",
    ],
  },
  "import-export": {
    path: "/import-export",
    title: "Import Export Company in India | Vehicle & General Trade | GTS",
    description:
      "Import and export solutions for vehicles, food, cosmetics, steel, raw materials, machinery and industrial products, with India distribution support.",
    keywords: [
      "import export company in India",
      "export company India",
      "import company India",
      "international trading company",
      "vehicle export from India",
      "vehicle import India",
      "vehicle export",
      "vehicle exporter",
      "commercial vehicle exporter",
      "car exporter India",
      "truck exporter",
      "truck exporter India",
      "Indian vehicles",
      "food exporter India",
      "steel exporter India",
      "raw material supplier",
    ],
  },
  "trade-categories": {
    path: "/import-export/trade-categories",
    title: "Import & Export Trade Categories | Food, Steel, Machinery | GTS",
    description:
      "What GTS Trade Solutions imports and exports — general products, food, cosmetics, steel and metals, raw materials, machinery and vehicles, with India distribution support.",
    keywords: [
      "import export categories",
      "general trading company",
      "food exporter India",
      "cosmetics exporter India",
      "steel exporter India",
      "raw material supplier",
      "machinery export India",
      "industrial goods exporter",
      "product sourcing India",
    ],
  },
  "vehicle-trade": {
    path: "/import-export/vehicle-trade",
    title: "Vehicle Import & Export | Cars, Trucks, Buses, EVs & Equipment | GTS",
    description:
      "Complete vehicle import and export from single units to fleet and project quantities — passenger, two- and three-wheeler, commercial, electric and special-purpose vehicles, plus agricultural and construction equipment.",
    keywords: [
      "vehicle export from India",
      "vehicle import India",
      "vehicle exporter",
      "car exporter India",
      "truck exporter India",
      "commercial vehicle exporter",
      "bus exporter India",
      "two wheeler exporter",
      "three wheeler exporter",
      "electric vehicle export India",
      "tractor exporter India",
      "construction equipment exporter",
      "special purpose vehicle export",
    ],
  },
  "india-partner": {
    path: "/import-export/india-partner",
    title: "India Distribution & Dealership Partner for Overseas Brands | GTS",
    description:
      "Distributor representation, dealership appointment, dealer-network development, after-sales setup, localisation and product-launch support for manufacturers entering the Indian market.",
    keywords: [
      "India distribution partner",
      "distributor in India",
      "authorised dealership India",
      "dealer network development",
      "market development India",
      "after sales setup India",
      "product launch India",
      "India representation partner",
      "localisation support India",
    ],
  },
  "automotive-parts": {
    path: "/automotive-parts",
    title: "Automotive Parts Supplier & Exporter India | Truck, EV & Agri Parts",
    description:
      "Source automotive, truck, bus, trailer, EV and agricultural machinery parts including axles, tyres, wheel rims, suspension, motors and more.",
    keywords: [
      "automotive parts supplier",
      "automotive parts exporter",
      "auto spare parts",
      "automotive spare parts",
      "auto parts exporter",
      "auto parts exporter India",
      "spare parts exporter",
      "vehicle spare parts",
      "automotive components",
      "automotive components exporter",
      "OEM spare parts",
      "genuine spare parts",
      "aftermarket spare parts",
      "truck parts",
      "truck parts exporter",
      "truck spare parts",
      "commercial vehicle parts",
      "commercial vehicle spare parts",
      "bus spare parts",
      "trailer axle",
      "truck tyres",
      "wheel rims",
      "air suspension",
      "EV components",
      "electric vehicle parts",
      "EV motor",
      "e axle",
      "two wheeler spare parts",
      "three wheeler parts",
      "tractor parts",
      "agricultural machinery parts",
    ],
  },
  "vehicle-models": {
    path: "/vehicle-models",
    title: "Vehicle Models & Spare Parts List | Car, Bike, 3W & Truck Parts | GTS",
    description:
      "Browse vehicle models by type and OEM, pick the spare parts you need for a specific model, and send the selection straight to our enquiry form.",
    keywords: [
      "vehicle spare parts by model",
      "car spare parts",
      "car spare parts list",
      "Indian truck parts",
      "motorcycle spare parts exporter",
      "three wheeler spare parts",
      "truck spare parts by model",
      "Maruti Suzuki spare parts exporter",
      "Bajaj spare parts exporter",
      "TVS spare parts exporter",
      "Royal Enfield spare parts exporter",
      "Tata Motors spare parts exporter",
      "Hyundai spare parts exporter",
      "Nissan spare parts exporter",
      "Mahindra pick-up spare parts",
      "Indian vehicle spare parts Africa",
      "spare parts exporter India",
    ],
  },
  manufacturing: {
    path: "/manufacturing",
    title: "Contract Manufacturing & Fabrication Services India | GTS",
    description:
      "Contract manufacturing and fabrication support for automotive products, trailers, containers, reefers, truck bodies, tankers and custom assemblies.",
    keywords: [
      "contract manufacturing",
      "contract manufacturing India",
      "automotive manufacturing",
      "automotive component manufacturer",
      "CNC machining",
      "fabrication services India",
      "metal fabrication",
      "metal fabrication company",
      "custom fabrication",
      "trailer manufacturer",
      "trailer manufacturer India",
      "truck body fabrication",
      "container manufacturer India",
      "reefer body manufacturer",
      "tanker manufacturer",
      "automotive contract manufacturing",
    ],
  },
  "manufacturing-scope": {
    path: "/manufacturing/scope",
    title: "Manufacturing & Fabrication Scope | Trailers, Containers, Reefers | GTS",
    description:
      "What GTS manufactures and fabricates — automotive contract manufacturing, industrial fabrication, trailer manufacturing support, container and reefer solutions, and prototype-to-production work.",
    keywords: [
      "contract manufacturing India",
      "automotive contract manufacturing",
      "industrial fabrication",
      "metal fabrication company",
      "custom fabrication",
      "trailer manufacturer India",
      "container manufacturer India",
      "reefer body manufacturer",
      "truck body fabrication",
      "CNC machining",
    ],
  },
  "manufacturing-process": {
    path: "/manufacturing/process",
    title: "How a Contract Manufacturing Project Runs | Prototype to Production | GTS",
    description:
      "The staged route from requirement and drawing review through sourcing, feasibility and prototype coordination to batch production and dispatch — so the first article is validated before volume is committed.",
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
      "Active and passive fire protection for industrial, commercial and vehicle applications — detection, suppression, fire stopping and fire-rated products, with design, installation and documentation support.",
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
    title: "Commercial Vehicle Service & Technical Support | Truck & Bus | GTS",
    description:
      "Service and technical support for trucks, buses, trailers, tankers and special-application vehicles — brakes, suspension, axles, electricals, hydraulics and PTO, with fleet maintenance planning.",
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
    title: "Vehicle Homologation, Testing & India Market Entry Consulting | GTS",
    description:
      "Homologation and testing coordination with authorised facilities, regulatory requirement review, component sourcing, supplier development and go-to-market support for new markets including India.",
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
    title: "ODC Logistics & Heavy-Lift Transport | Route Survey | GTS Trade Solutions",
    description:
      "Over-dimensional cargo logistics — transport engineering, route survey, movement planning, permit coordination and supervised execution for heavy-lift and project cargo.",
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
    title: "Route Survey Reports for ODC & Heavy-Lift Cargo | GTS Trade Solutions",
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
      "Route survey reports for ODC movements: obstruction schedule with chainage, GPS and photographs, route map, GA drawing and required action per point, in Word, PDF and GPX.",
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
    title: "Trade & Automotive Insights | Export, Sourcing & Homologation | GTS",
    description:
      "Practical notes on vehicle export, spare-parts sourcing, homologation, trailer specification and India market entry — written for buyers, exporters and manufacturers.",
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
    title: "Request a Quote | Import Export, Automotive Parts & Manufacturing",
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
