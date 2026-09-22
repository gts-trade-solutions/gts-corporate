import type { IconName } from "@/components/Icon";
import type { MediaKey } from "./media";

/**
 * The four home banner slides.
 *
 * One per primary capability, in the order the navigation lists them. The
 * banner cross-fades between them and the strip beneath doubles as the
 * selector, so `label` has to stay short enough to fit four across on a phone
 * and `detail` short enough for one line at xl.
 *
 * `slot` is a media slot rather than a file path, so a slide renders its scene
 * artwork until a photograph is dropped into `src/data/media.ts` — the same
 * rule as every other image on the site.
 */
export type HeroSlide = {
  label: string;
  title: string;
  lead: string;
  detail: string;
  icon: IconName;
  slot: MediaKey;
  href: string;
  cta: string;
  enquiry: string;
};

export const heroSlides: HeroSlide[] = [
  {
    label: "Import & Export",
    title: "Global Import & Export",
    lead: "Connect products, suppliers and markets. Sourcing and trade support for industrial goods, machinery and complete vehicles across international markets.",
    detail: "Product sourcing, vehicle trade and India distribution",
    icon: "globe",
    slot: "slideTrade",
    href: "/import-export",
    cta: "Explore Trade Services",
    enquiry: "import-product",
  },
  {
    label: "Automotive Parts",
    title: "Automotive Parts & Components",
    lead: "The right components for the vehicles you build and run. Sourcing for commercial vehicles, passenger cars, EVs and agricultural machinery.",
    detail: "Axles, braking, suspension and EV components",
    icon: "gear",
    slot: "slideComponents",
    href: "/automotive-parts",
    cta: "Explore Automotive Parts",
    enquiry: "component-sourcing",
  },
  {
    label: "Manufacturing",
    title: "Contract Manufacturing & Fabrication",
    lead: "From your drawing to a finished assembly. Build-to-print support for vehicle bodies, trailers, containers and industrial structures.",
    detail: "Prototypes, fabrication and vehicle body solutions",
    icon: "factory",
    slot: "slideManufacturing",
    href: "/manufacturing",
    cta: "Explore Manufacturing",
    enquiry: "manufacturing",
  },
  {
    label: "Consulting",
    title: "Engineering & Market Consulting",
    lead: "Technical guidance for your next market or project. Homologation, testing coordination, fire and safety advisory, and commercial vehicle support.",
    detail: "Homologation, technical support and market entry",
    icon: "clipboard",
    slot: "slideConsulting",
    href: "/consulting",
    cta: "Explore Consulting",
    enquiry: "homologation-testing",
  },
];
