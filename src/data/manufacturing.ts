import type { CategoryBlock } from "./types";

/** Manufacturing page — required sections, per section 8 of the MVP brief. */
export const manufacturingSections: CategoryBlock[] = [
  {
    id: "automotive-contract-manufacturing",
    title: "Automotive Contract Manufacturing",
    icon: "factory",
    summary:
      "Build-to-print and build-to-specification manufacturing support for automotive structures, bodies and subassemblies.",
    items: [
      "Truck containers and bodies",
      "Trailers and tippers",
      "Tankers",
      "Cabins",
      "Brackets and chassis structures",
      "Subassemblies",
      "Special-purpose vehicle structures",
    ],
  },
  {
    id: "industrial-fabrication",
    title: "Industrial Fabrication",
    icon: "wrench",
    summary:
      "Sheet-metal and structural fabrication coordinated through our partner network, from cutting through to finished assembly.",
    items: [
      "Sheet-metal fabrication",
      "Structural fabrication",
      "Cutting and bending",
      "Welding",
      "Machining",
      "Painting and coating",
      "Assembly support",
    ],
  },
  {
    id: "trailer-manufacturing",
    title: "Trailer Manufacturing Support",
    icon: "trailer",
    summary:
      "Support across trailer types, from standard flatbeds to special-purpose configurations built for a defined duty cycle.",
    items: [
      "Flatbed trailers",
      "Container trailers",
      "Low-bed trailers",
      "Tipper trailers",
      "Tanker trailers",
      "Box and curtain-side trailers",
      "Special-purpose trailers",
    ],
  },
  {
    id: "container-solutions",
    title: "Container Solutions",
    icon: "container",
    summary: "Manufacturing support and trade for standard and application-built containers.",
    items: [
      "Dry-freight containers",
      "Cargo containers",
      "Custom containers",
      "Office containers",
      "Workshop containers",
      "Special-application containers",
    ],
  },
  {
    id: "reefer-solutions",
    title: "Reefer Solutions",
    icon: "snowflake",
    summary:
      "Refrigerated body and container support for cold-chain operators, distributors and body builders.",
    items: [
      "Refrigerated bodies and containers",
      "Insulated panels",
      "Doors",
      "Cooling-unit integration",
      "Flooring",
      "Temperature-monitoring support",
    ],
  },
  {
    id: "prototype-to-production",
    title: "Prototype to Production",
    icon: "draft",
    summary:
      "A staged route from drawing to repeat batches, so a first article is validated before volume is committed.",
    items: [
      "Drawing review",
      "Sourcing",
      "Prototype coordination",
      "Fabrication",
      "Assembly",
      "Batch production support",
    ],
  },
];

export const manufacturingProcess = [
  {
    step: "01",
    title: "Requirement & drawing review",
    description:
      "Share drawings, specifications or a sample. We review dimensions, materials, finish and application before quoting.",
  },
  {
    step: "02",
    title: "Sourcing & feasibility",
    description:
      "We identify suitable manufacturing partners, confirm process capability and return an indicative commercial position.",
  },
  {
    step: "03",
    title: "Prototype coordination",
    description:
      "A first article or prototype build is coordinated and reviewed against your acceptance criteria.",
  },
  {
    step: "04",
    title: "Batch production & dispatch",
    description:
      "Agreed batches are produced with inspection coordination, followed by packing, documentation and dispatch support.",
  },
];
