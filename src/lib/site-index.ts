import { blogPosts } from "@/data/blog";
import { consultingBlocks } from "@/data/consulting";
import { marketRegions } from "@/data/countries";
import {
  consultingFaqs,
  manufacturingFaqs,
  modelFaqs,
  odcFaqs,
  partsFaqs,
  reportFaqs,
  routeSurveyFaqs,
  tradeFaqs,
} from "@/data/faqs";
import { manufacturingSections } from "@/data/manufacturing";
import { partCategoryDetails } from "@/data/part-categories";
import { partCategories } from "@/data/parts";
import { navDestinations } from "@/data/site";
import { odcScope } from "@/data/logistics";
import { tradeSections, vehicleCategories } from "@/data/trade";
import { modelName, vehicleModels } from "@/data/vehicle-models";
import type { Faq } from "@/data/types";

/**
 * One flat, searchable index of everything on the site.
 *
 * Built once per server process from the same data modules the pages render
 * from, so search results can never drift from the pages themselves. It is
 * deliberately server-only — it is reached through /api/search rather than
 * shipped to the browser, which keeps ~100KB of catalogue out of the bundle.
 *
 * Two consumers: the site search dialog, and the assistant, which is given a
 * condensed form of the same index as grounding so it can only point at pages
 * that actually exist.
 */

export type SearchKind =
  | "page"
  | "component"
  | "vehicle"
  | "article"
  | "faq"
  | "service"
  | "market";

export type SearchDoc = {
  id: string;
  title: string;
  href: string;
  kind: SearchKind;
  /** Module the result belongs to, shown as the result's overline. */
  section: string;
  summary: string;
  /** Extra match terms that are not in the title or summary. */
  keywords: string[];
};

const KIND_LABELS: Record<SearchKind, string> = {
  page: "Page",
  component: "Component",
  vehicle: "Vehicle model",
  article: "Article",
  faq: "FAQ",
  service: "Service",
  market: "Market",
};

export const kindLabel = (kind: SearchKind) => KIND_LABELS[kind];

/** Turn a FAQ set into documents that deep-link to the page's FAQ block. */
const faqDocs = (faqs: Faq[], href: string, section: string): SearchDoc[] =>
  faqs.map((faq, index) => ({
    id: `faq:${href}:${index}`,
    title: faq.question,
    // Every page that carries an FAQ set wraps it in `<Section id="faqs">`.
    href: `${href}#faqs`,
    kind: "faq" as const,
    section,
    summary: faq.answer,
    keywords: [],
  }));

/** Category blocks (trade, manufacturing, ODC, consulting scope). */
const blockDocs = (
  blocks: { id: string; title: string; summary: string; items: string[] }[],
  href: string,
  section: string,
): SearchDoc[] =>
  blocks.map((block) => ({
    id: `block:${href}:${block.id}`,
    title: block.title,
    href: `${href}#${block.id}`,
    kind: "service" as const,
    section,
    summary: block.summary,
    keywords: block.items,
  }));

function build(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  /* Pages that are reachable from the footer rather than the primary nav, so
     they are missing from navDestinations but still need to be findable. */
  docs.push({
    id: "page:/faq",
    title: "Frequently Asked Questions",
    href: "/faq",
    kind: "page",
    section: "Site",
    summary:
      "Every question we are asked, across trade, sourcing, vehicle models, manufacturing, ODC logistics, route surveys and consulting.",
    keywords: ["faq", "questions", "answers", "help"],
  });

  // Every destination in the primary navigation.
  for (const item of navDestinations) {
    docs.push({
      id: `page:${item.href}`,
      title: item.label,
      href: item.href,
      kind: "page",
      section: "Site",
      summary: item.description ?? item.label,
      keywords: [],
    });
  }

  // Component categories, plus the deeper detail pages with their keywords.
  for (const category of partCategories) {
    docs.push({
      id: `parts:${category.id}`,
      title: category.title,
      href: `/automotive-parts/${category.id}`,
      kind: "component",
      section: "Automotive Parts",
      summary: category.summary,
      keywords: category.items,
    });
  }
  for (const [slug, detail] of Object.entries(partCategoryDetails)) {
    // The detail record carries SEO copy, not a display title — take the
    // heading from the category the page is built from.
    const title = partCategories.find((category) => category.id === slug)?.title;
    if (!title) continue;
    docs.push({
      id: `part-detail:${slug}`,
      title,
      href: `/automotive-parts/${slug}`,
      kind: "component",
      section: "Automotive Parts",
      summary: detail.intro,
      keywords: [...detail.keywords, ...detail.applications],
    });
  }

  // The vehicle model schedule. The static catalogue is used rather than the
  // admin store so the index stays synchronous; a model edited in /admin keeps
  // its slug, so its result still resolves to the right page.
  for (const model of vehicleModels) {
    docs.push({
      id: `model:${model.slug}`,
      title: modelName(model),
      href: `/vehicle-models/${model.slug}`,
      kind: "vehicle",
      section: "Vehicle Models",
      summary: `${model.segment} — priority spare parts: ${model.parts.slice(0, 6).join(", ")}.`,
      keywords: [model.oem, model.model, model.segment, ...model.parts, ...model.markets],
    });
  }

  for (const post of blogPosts) {
    docs.push({
      id: `post:${post.slug}`,
      title: post.title,
      href: `/blog/${post.slug}`,
      kind: "article",
      section: "Blog",
      summary: post.excerpt,
      keywords: [...post.keywords, post.category],
    });
  }

  docs.push(...blockDocs(tradeSections, "/import-export", "Import & Export"));
  docs.push(...blockDocs(vehicleCategories, "/import-export/vehicle-trade", "Vehicle Trade"));
  docs.push(...blockDocs(manufacturingSections, "/manufacturing/scope", "Manufacturing"));
  docs.push(...blockDocs(odcScope, "/odc-logistics", "ODC Logistics"));

  for (const block of consultingBlocks) {
    docs.push({
      id: `consulting:${block.id}`,
      title: block.title,
      href: `/consulting#${block.id}`,
      kind: "service",
      section: "Consulting",
      summary: block.lead,
      keywords: block.groups.flatMap((group) => group.items),
    });
  }

  // Markets, so "do you export to Kenya" resolves to the contact page.
  for (const region of marketRegions) {
    for (const market of region.markets) {
      docs.push({
        id: `market:${market.code}`,
        title: market.name,
        href: `/contact?market=${market.code}#rfq`,
        kind: "market",
        section: region.label,
        summary:
          market.partner === "local"
            ? `${market.name} is covered with a local partner on the ground. ${region.blurb}`
            : `${market.name} enquiries are handled directly from the India desk. ${region.blurb}`,
        keywords: [region.label, market.partner === "local" ? "local partner" : "direct"],
      });
    }
  }

  docs.push(...faqDocs(tradeFaqs, "/import-export", "Import & Export"));
  docs.push(...faqDocs(partsFaqs, "/automotive-parts", "Automotive Parts"));
  docs.push(...faqDocs(modelFaqs, "/vehicle-models", "Vehicle Models"));
  docs.push(...faqDocs(odcFaqs, "/odc-logistics", "ODC Logistics"));
  docs.push(...faqDocs(routeSurveyFaqs, "/odc-logistics/route-survey", "Route Survey"));
  docs.push(...faqDocs(reportFaqs, "/odc-logistics/reports", "Reports"));
  docs.push(...faqDocs(manufacturingFaqs, "/manufacturing", "Manufacturing"));
  docs.push(...faqDocs(consultingFaqs, "/consulting", "Consulting"));

  return docs;
}

let cached: SearchDoc[] | null = null;

/** The index, built on first use and reused for the life of the process. */
export const siteIndex = (): SearchDoc[] => (cached ??= build());

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "can", "do", "does", "for", "from", "has",
  "have", "how", "i", "in", "is", "it", "me", "my", "of", "on", "or", "the", "to", "we", "what",
  "when", "where", "which", "who", "why", "will", "with", "you", "your",
]);

const tokenise = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9+&/\s-]/g, " ")
    .split(/[\s/-]+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));

/**
 * Field-weighted token overlap.
 *
 * Not BM25 — the corpus is small and uniform enough that term frequency adds
 * nothing, while an exact phrase hit in the title is what people actually
 * expect to win. A term must appear somewhere for the document to score at
 * all, and every term matching is worth a large bonus, so "tata truck axle"
 * beats a document that only mentions axles.
 */
export function searchSite(query: string, limit = 8): SearchDoc[] {
  const terms = tokenise(query);
  if (!terms.length) return [];

  const phrase = query.trim().toLowerCase();
  const scored: { doc: SearchDoc; score: number }[] = [];

  for (const doc of siteIndex()) {
    const title = doc.title.toLowerCase();
    const summary = doc.summary.toLowerCase();
    const keywords = doc.keywords.join(" ").toLowerCase();

    let score = 0;
    let matched = 0;

    for (const term of terms) {
      let termScore = 0;
      if (title.includes(term)) termScore += 10;
      if (keywords.includes(term)) termScore += 4;
      if (summary.includes(term)) termScore += 2;
      if (doc.section.toLowerCase().includes(term)) termScore += 2;
      if (termScore) matched += 1;
      score += termScore;
    }

    if (!matched) continue;

    // Whole-phrase hits and complete term coverage both outrank partial hits.
    if (phrase.length > 2 && title.includes(phrase)) score += 25;
    if (matched === terms.length) score += 12 * terms.length;

    // A page is a better landing point than one FAQ entry at equal relevance.
    if (doc.kind === "page") score += 3;

    scored.push({ doc, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.doc.title.length - b.doc.title.length)
    .slice(0, limit)
    .map((entry) => entry.doc);
}

/**
 * A compact catalogue of the site for the assistant's system prompt.
 *
 * Only titles, paths and sections — roughly 12KB, small enough to cache as a
 * stable prompt prefix and complete enough that the model never has to invent
 * a URL. Individual FAQ entries are left out; the assistant gets the retrieved
 * ones per question instead.
 */
export function siteMap(): string {
  const grouped = new Map<string, string[]>();
  for (const doc of siteIndex()) {
    if (doc.kind === "faq") continue;
    const list = grouped.get(doc.section) ?? [];
    list.push(`${doc.title} — ${doc.href}`);
    grouped.set(doc.section, list);
  }

  return [...grouped.entries()]
    .map(([section, entries]) => `## ${section}\n${entries.join("\n")}`)
    .join("\n\n");
}
