import type { Metadata } from "next";
import { site, siteUrl } from "@/data/site";

export type PageKey =
  | "home"
  | "import-export"
  | "automotive-parts"
  | "vehicle-models"
  | "manufacturing"
  | "consulting"
  | "odc-logistics"
  | "route-survey"
  | "route-survey-reports"
  | "blog"
  | "contact";

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
      "contract manufacturing company",
      "global sourcing company",
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
      "car exporter India",
      "truck exporter India",
      "food exporter India",
      "steel exporter India",
      "raw material supplier",
    ],
  },
  "automotive-parts": {
    path: "/automotive-parts",
    title: "Automotive Parts Supplier & Exporter India | Truck, EV & Agri Parts",
    description:
      "Source automotive, truck, bus, trailer, EV and agricultural machinery parts including axles, tyres, wheel rims, suspension, motors and more.",
    keywords: [
      "automotive parts supplier",
      "auto parts exporter India",
      "truck spare parts",
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
      "car spare parts list",
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
      "contract manufacturing India",
      "fabrication services India",
      "metal fabrication company",
      "trailer manufacturer India",
      "truck body fabrication",
      "container manufacturer India",
      "reefer body manufacturer",
      "tanker manufacturer",
      "automotive contract manufacturing",
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
  "odc-logistics": {
    path: "/odc-logistics",
    title: "ODC Logistics & Heavy-Lift Transport | Route Survey | GTS Trade Solutions",
    description:
      "Over-dimensional cargo logistics — transport engineering, route survey, movement planning, permit coordination and supervised execution for heavy-lift and project cargo.",
    keywords: [
      "ODC logistics",
      "over dimensional cargo transport",
      "heavy lift transport India",
      "ODC cargo movement",
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
