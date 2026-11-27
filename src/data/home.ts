import type { Card } from "./types";

export const heroCopy = {
  eyebrow: "Import & Export · Automotive Parts · Contract Manufacturing · Consulting",
  h1: "Global Import Export, Automotive Parts & Contract Manufacturing Solutions",
  lead: "GTS Trade Solutions helps businesses source, import, export, manufacture and launch products across automotive, agricultural and industrial markets.",
  sub: "From complete vehicles and automotive components to contract manufacturing, distribution and technical services, we connect the right products, suppliers and markets.",
};

/**
 * The home page's service grid — one photo card per module, in navigation
 * order. Each card uses its destination page's banner photograph. Vehicle
 * Models is appended on the page itself, because its description carries live
 * counts from the admin-editable schedule.
 */
export const whatWeDo: Card[] = [
  {
    title: "Import & Export",
    description:
      "General product trade, complete vehicle import/export and India distribution support across international markets.",
    icon: "globe",
    href: "/import-export",
    cta: "Explore trade services",
    media: "importExportHero",
  },
  {
    title: "Automotive Parts",
    description:
      "Components for two-wheelers, three-wheelers, cars, LCVs, trucks, buses, trailers, EVs and agricultural machinery.",
    icon: "gear",
    href: "/automotive-parts",
    cta: "Browse component categories",
    media: "automotivePartsHero",
  },
  {
    title: "Manufacturing",
    description:
      "Contract manufacturing, fabrication and vehicle body solutions including trailers, containers and reefer bodies.",
    icon: "factory",
    href: "/manufacturing",
    cta: "See manufacturing scope",
    media: "manufacturingHero",
  },
  {
    title: "Consulting",
    description:
      "Vehicle homologation and testing coordination, market entry, fire & safety advisory and commercial vehicle technical support.",
    icon: "clipboard",
    href: "/consulting",
    cta: "View consulting services",
    media: "consultingHero",
  },
  {
    title: "ODC Logistics & Route Survey",
    description:
      "Over-dimensional and heavy-lift cargo movement — transport engineering, physical route survey, permit coordination and supervised execution.",
    icon: "crane",
    href: "/odc-logistics",
    cta: "Explore ODC logistics",
    media: "odcJetty",
  },
];

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

/**
 * The corporate film. The file and its poster both live in `public/`, and the
 * poster is a frame from the film itself — so the picture a crawler indexes,
 * the one a reduced-motion viewer keeps and the one sitting under the play
 * button are all the same frame.
 *
 * `seconds` and `uploaded` only feed the VideoObject schema. Keep `seconds` in
 * step with the file if the film is ever recut.
 */
export const corporateFilm = {
  src: "/videos/gts-corporate-film.mp4",
  poster: "/images/gts-corporate-film-poster.webp",
  seconds: 86,
  uploaded: "2026-11-26",
  title: "See how the four lines work together",
  lead: "A minute and a half on how sourcing, components, manufacturing and heavy-lift logistics run through one team — and what that means for a requirement moving from drawing to destination market.",
  label:
    "GTS Trade Solutions corporate film — sourcing, automotive components, contract manufacturing and ODC logistics.",
  description:
    "An overview of GTS Trade Solutions: global sourcing, automotive and agricultural components built to specification, build-to-print manufacturing of trailers, containers and reefer bodies, over-dimensional cargo logistics, and India distribution and dealer setup.",
};

/**
 * Why GTS — how the work is done, not what the services are. The services
 * have their own cards above, so nothing here restates one of them.
 */
export const whyGts: Card[] = [
  {
    title: "Technical support",
    description:
      "Engineering-literate discussion of drawings, specifications and application requirements before a quotation is issued.",
    icon: "draft",
  },
  {
    title: "Quoted to your specification",
    description:
      "Every quotation is written against your drawing or part number, the grade, the quantity and the destination market — not a catalogue price.",
    icon: "target",
  },
  {
    title: "Supplier network",
    description:
      "Access to manufacturers and suppliers across automotive, agricultural, industrial and general trade categories.",
    icon: "route",
  },
  {
    title: "Scope agreed up front",
    description:
      "We confirm what we support directly and what runs through partners before work starts, so responsibility is never unclear.",
    icon: "clipboard",
  },
  {
    title: "Destination checked first",
    description:
      "Documentation, labelling and approval requirements for the destination market are raised before goods move, not after they arrive.",
    icon: "map",
  },
  {
    title: "After-sales coordination",
    description:
      "Service, spares and technical support planning so products stay supported after the first shipment.",
    icon: "wrench",
  },
];
