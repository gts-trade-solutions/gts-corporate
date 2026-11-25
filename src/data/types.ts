import type { IconName } from "@/components/Icon";
import type { MediaKey } from "./media";
import type { Photo } from "./photos";

export type Card = {
  /** Optional sub-items, listed under the description. */
  bullets?: string[];
  title: string;
  description: string;
  icon: IconName;
  href?: string;
  cta?: string;
  /** Photograph across the top of the card — usually the destination page's own slot. */
  media?: MediaKey;
};

/** A titled block of scope with a bullet list — used for page sections and category grids. */
export type CategoryBlock = {
  id: string;
  title: string;
  icon: IconName;
  summary: string;
  items: string[];
  /** Photograph across the top of the card, and the banner of its detail page. */
  media?: MediaKey;
  /**
   * A credited photograph for the top of the card (see card-photos.ts). Used
   * instead of `media` when both are set; its credit is printed on the card.
   */
  photo?: Photo;
};

export type Faq = {
  question: string;
  answer: string;
};
