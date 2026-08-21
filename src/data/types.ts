import type { IconName } from "@/components/Icon";

export type Card = {
  /** Optional sub-items, shown in the tall bento tile on the home page. */
  bullets?: string[];
  title: string;
  description: string;
  icon: IconName;
  href?: string;
  cta?: string;
};

/** A titled block of scope with a bullet list — used for page sections and category grids. */
export type CategoryBlock = {
  id: string;
  title: string;
  icon: IconName;
  summary: string;
  items: string[];
};

export type Faq = {
  question: string;
  answer: string;
};
