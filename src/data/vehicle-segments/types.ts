import type { IconName } from "@/components/Icon";
import type { MediaKey } from "../media";
import type { VehicleModelGroupId } from "../vehicle-models";

export type PhotoCredit = {
  name: string;
  licence: string;
  licenceUrl: string;
  /** The file's page on Wikimedia Commons. */
  url: string;
};

export type SegmentPhoto = {
  src: string;
  alt: string;
  credit?: PhotoCredit;
  /** Catalogue cut-outs on a white ground are shown whole rather than cropped. */
  fit?: "cover" | "contain";
};

export type SegmentType = {
  /** Anchor on the page, e.g. #tippers. */
  id: string;
  title: string;
  /** One sentence: what it is. Used as the lead and in the at-a-glance index. */
  summary: string;
  body: string[];
  /** Typical figures for the class. Hedged ranges, or a named model's recorded spec. */
  facts: { label: string; value: string }[];
  uses: string[];
  photo: SegmentPhoto;
  /**
   * Which models in the schedule belong to this type. `match` is tested
   * against the model's `segment` text, `matchName` against "<OEM> <model>",
   * for groups where the segment alone does not separate the types (most
   * motorcycles are simply "Motorcycle"). `exclude` vetoes a match on either.
   * A model the admin adds later lands under the right type as long as it
   * reads like the catalogue's; one that matches nothing still appears in
   * /vehicle-models, just not here.
   */
  match?: RegExp;
  matchName?: RegExp;
  exclude?: RegExp;
  /** Schedule groups this type draws on, when not the segment's own group. */
  groups?: VehicleModelGroupId[];
  related?: { label: string; href: string };
};

export type SegmentClass = { code: string; label: string };

export type VehicleSegmentId =
  | "passenger-vehicles"
  | "two-wheelers"
  | "three-wheelers"
  | "commercial-vehicles"
  | "buses"
  | "electric-vehicles"
  | "special-purpose-vehicles"
  | "agricultural-equipment"
  | "construction-equipment";

export type VehicleSegment = {
  /** Matches the category id in `vehicleCategories` (trade.ts). */
  id: VehicleSegmentId;
  /**
   * The schedule group this page draws its models from. Absent for categories
   * the schedule does not cover; a type can widen it with its own `groups`.
   */
  group?: VehicleModelGroupId;
  title: string;
  /** Short name for cards and links. */
  shortTitle: string;
  icon: IconName;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroLead: string;
  media: MediaKey;
  /** Printed on the page when the banner photograph's licence requires it. */
  heroCredit?: PhotoCredit;
  intro: string[];
  classes: { title: string; items: SegmentClass[]; note: string };
  types: SegmentType[];
  /** A short explainer band, where the category has one worth having. */
  explainer?: { eyebrow: string; title: string; paragraphs: string[] };
  considerations: {
    title: string;
    icon: IconName;
    text: string;
    link?: { label: string; href: string };
  }[];
  specify: string[];
  /** `product` value carried into the enquiry form. */
  enquiryProduct: string;
};

/** A Creative Commons credit for a Wikimedia Commons file. */
export const cc = (name: string, licence: string, file: string): PhotoCredit => {
  const version = licence.match(/\d\.\d/)?.[0] ?? "4.0";
  const kind = licence.includes("BY-SA") ? "by-sa" : "by";
  return {
    name,
    licence,
    licenceUrl:
      licence === "CC0"
        ? "https://creativecommons.org/publicdomain/zero/1.0/"
        : `https://creativecommons.org/licenses/${kind}/${version}/`,
    url: `https://commons.wikimedia.org/wiki/File:${file}`,
  };
};

/** Shared links, so every page points at the same places. */
export const links = {
  homologation: { label: "Homologation and market entry", href: "/consulting/homologation-market-entry" },
  odc: { label: "ODC logistics and route surveys", href: "/odc-logistics" },
  schedule: { label: "Vehicle model schedule", href: "/vehicle-models" },
  manufacturing: { label: "Body and tanker manufacturing", href: "/manufacturing/scope" },
} as const;

export const segmentPath = (id: VehicleSegmentId) => `/import-export/vehicle-trade/${id}`;
