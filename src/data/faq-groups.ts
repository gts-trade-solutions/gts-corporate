import {
  consultingFaqs,
  manufacturingFaqs,
  modelFaqs,
  odcFaqs,
  partsFaqs,
  reportFaqs,
  routeSurveyFaqs,
  tradeFaqs,
} from "./faqs";
import type { Faq } from "./types";

/**
 * Every FAQ set on the site, grouped for the /faq hub.
 *
 * The hub does not hold its own copy of anything — it reads the same eight
 * sets the service pages render, so an answer edited in `faqs.ts` changes both
 * at once. `href` is the page the set belongs to, which is where a visitor is
 * sent for the surrounding context.
 */
export type FaqGroup = {
  id: string;
  label: string;
  /** The page this set is published on. */
  href: string;
  faqs: Faq[];
};

export const faqGroups: FaqGroup[] = [
  { id: "trade", label: "Import & Export", href: "/import-export", faqs: tradeFaqs },
  { id: "parts", label: "Automotive Parts", href: "/automotive-parts", faqs: partsFaqs },
  { id: "models", label: "Vehicle Models", href: "/vehicle-models", faqs: modelFaqs },
  { id: "manufacturing", label: "Manufacturing", href: "/manufacturing", faqs: manufacturingFaqs },
  { id: "consulting", label: "Consulting", href: "/consulting", faqs: consultingFaqs },
  { id: "odc", label: "ODC Logistics", href: "/odc-logistics", faqs: odcFaqs },
  {
    id: "route-survey",
    label: "Route Survey",
    href: "/odc-logistics/route-survey",
    faqs: routeSurveyFaqs,
  },
  { id: "reports", label: "Reports", href: "/odc-logistics/reports", faqs: reportFaqs },
];

/** Every question on the site, flattened — used for the hub's structured data. */
export const allFaqs: Faq[] = faqGroups.flatMap((group) => group.faqs);

/**
 * The home page's FAQ block: the opening question from each of the five main
 * services. Taken from the sets rather than written separately, so there is
 * one copy of every answer on the site and the home page cannot drift from the
 * service page it summarises.
 */
export const homeFaqs: Faq[] = ["trade", "parts", "manufacturing", "consulting", "odc"]
  .map((id) => faqGroups.find((group) => group.id === id)?.faqs[0])
  .filter((faq): faq is Faq => Boolean(faq));
