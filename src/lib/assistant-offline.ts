import { contact, site } from "@/data/site";
import { searchSite, siteIndex, type SearchDoc } from "./site-index";

/**
 * The assistant without Claude.
 *
 * Answers when `ANTHROPIC_API_KEY` is not set, so the chat is useful on day
 * one instead of replying "not configured". It never composes facts of its
 * own: a few intents (greeting, contact details, pricing) get fixed wording
 * taken from `src/data/site.ts`, and everything else is answered with the
 * best-matching entries from the same site index the AI mode is grounded on.
 *
 * Output uses the same small markdown subset the chat panel renders: internal
 * links, `**bold**`, `- ` list lines and blank-line paragraph breaks.
 */

const GREETING =
  /^(hi+|hello|hey|hai|good (morning|afternoon|evening)|namaste|vanakkam|greetings)\b[\s!.,]*$/;
const THANKS = /^(thanks|thank you|thx|ok(ay)?|great|cool|got it|fine)\b[\s!.,]*$/;
const CONTACT =
  /\b(contact|phone|call|number|mobile|email|e-mail|address|office|located|location|visit|reach|whatsapp|teams|talk to)\b/;
const HOURS = /\b(hours|timings?|opening|working days|weekends?|sunday|holiday)\b/;
const PRICING =
  /\b(price|prices|pricing|cost|costs|quote|quotation|rate|rates|how much|moq|minimum order|lead time|delivery time|discount|in stock|stock)\b/;
const WHO = /\b(who are you|what (is|does) gts|about gts|about (the )?company|what do you do)\b/;

const ENQUIRY_LINE = "For a quotation, send your requirement through the [enquiry form](/contact).";

/** Trims a summary to a readable length on a word boundary. */
function clip(text: string, max = 180): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.lastIndexOf(" ", max);
  return `${clean.slice(0, cut > 40 ? cut : max).replace(/[,;:–—-]+$/, "")}…`;
}

/** Link text must not contain the characters that close a markdown link. */
const linkText = (text: string) => text.replace(/[[\]()]/g, "");

function contactDetails(): string {
  const lines = [
    `Our marketing office is at ${contact.office.lines.join(", ")}.`,
    `Phone: ${contact.phones.join(", ")}.`,
    `Hours: ${contact.businessHours}.`,
  ];
  if (contact.email) lines.push(`Email: ${contact.email}.`);
  return `${lines.join(" ")}\n\nThe quickest route to the team is the [enquiry form](/contact) — it reaches the desk that quotes.`;
}

/** One entry per page: several FAQ answers on the same page collapse to the best one. */
function distinct(docs: SearchDoc[]): SearchDoc[] {
  const seen = new Set<string>();
  return docs.filter((doc) => (seen.has(doc.href) ? false : (seen.add(doc.href), true)));
}

/**
 * Words that carry no subject in a chat question. Keyword search can afford
 * to match them — a person reads the result list — but a chat reply built on
 * "tell" or "supply" alone answers a question nobody asked.
 */
const FILLER = new Set(
  (
    "a an and are as at be by can do does for from has have how i in is it me my of on or the to we " +
    "what when where which who why will with you your about tell please need want looking look give " +
    "show know get any some there this that our us all also like just much many more could would " +
    "should may might provide provides offer offers supply supplies gts company help if so not no " +
    "yes into out up them they their its am was were been cover covers covered handle deal " +
    // Pricing words are answered by the fixed quotation line, not by pages.
    "price prices pricing cost costs quote quotes quotation rate rates moq discount stock"
  ).split(" "),
);

/**
 * Light suffix stripping, applied to the question's words only — they are
 * then matched as substrings, so "manufactur" finds both "manufacture" and
 * "manufacturing", and "draw" finds "drawings".
 */
function stem(token: string): string {
  if (token.length > 5 && token.endsWith("ing")) return token.slice(0, -3);
  if (token.length > 4 && token.endsWith("ed")) return token.slice(0, -2);
  if (token.length > 4 && token.endsWith("es")) return token.slice(0, -2);
  if (token.length > 4 && token.endsWith("s")) return token.slice(0, -1);
  if (token.length > 5 && token.endsWith("e")) return token.slice(0, -1);
  return token;
}

/** Subject words of a question: filler removed, stemmed. */
const subjectTerms = (question: string) =>
  question
    .toLowerCase()
    .replace(/[^a-z0-9&\s.-]/g, " ")
    .split(/[\s/-]+/)
    .map((token) => token.replace(/\.$/, ""))
    .filter((token) => token.length > 1 && !FILLER.has(token))
    .map(stem);

/**
 * Short terms ("RE", "T6", "EV") must match as whole words — as substrings
 * they are inside half the words on the site.
 */
function matcher(term: string): (text: string) => boolean {
  if (term.length > 3) return (text) => text.includes(term);
  const pattern = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
  return (text) => pattern.test(text);
}

const haystack = (doc: SearchDoc) =>
  `${doc.title} ${doc.summary} ${doc.keywords.join(" ")} ${doc.section}`.toLowerCase();

/**
 * How rare each term is across the whole site. "Tata" appears on a handful of
 * entries and "components" on hundreds, so a match on the first says far more
 * about what the visitor wants than a match on the second.
 */
function termWeights(matchers: ((text: string) => boolean)[]): number[] {
  const docs = siteIndex().map(haystack);
  return matchers.map((matches) => {
    const df = docs.filter(matches).length;
    return Math.log((docs.length + 1) / (df + 1)) + 0.1;
  });
}

/** Share of the question's weight a document covers, 0 to 1. */
const coverage = (doc: SearchDoc, matchers: ((text: string) => boolean)[], weights: number[]) => {
  const text = haystack(doc);
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  const hit = matchers.reduce((sum, matches, i) => sum + (matches(text) ? weights[i] : 0), 0);
  return hit / total;
};

function results(question: string): string | null {
  const terms = subjectTerms(question);
  if (!terms.length) return null;
  const matchers = terms.map(matcher);
  const weights = termWeights(matchers);

  // Search wide — by the stemmed terms too, so a word form the keyword search
  // misses still brings its pages into the pool — then keep only entries about
  // at least half of what was asked (by weight), best-covered first.
  const pool = distinct([...searchSite(question, 40), ...searchSite(terms.join(" "), 40)]);
  const docs = pool
    .map((doc, index) => ({ doc, index, score: coverage(doc, matchers, weights) }))
    .filter((entry) => entry.score >= 0.5)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 4);
  if (!docs.length) return null;

  const [topEntry] = docs;
  const top = topEntry.doc;
  const rest = docs.slice(1).map((entry) => entry.doc);
  const parts: string[] = [];

  // A FAQ that covers the whole question already *is* the answer — lead with it.
  const led = top.kind === "faq" && topEntry.score > 0.999;
  if (led) {
    parts.push(`**${top.title}**\n${clip(top.summary, 420)}`);
    parts.push(`More on this: [${linkText(top.section)} FAQs](${top.href})`);
  } else {
    parts.push(`Here is what I found on the site:`);
    rest.unshift(top);
  }

  // Summaries are trimmed hard: the panel is narrow, and the link is the point.
  const list = rest
    .slice(0, 3)
    .map((doc) => `- [${linkText(doc.title)}](${doc.href}) — ${clip(doc.summary, 110)}`);
  if (list.length) parts.push((led ? "Related pages:\n" : "") + list.join("\n"));

  return parts.join("\n\n");
}

export function offlineReply(question: string): string {
  const q = question.toLowerCase().trim();

  if (GREETING.test(q)) {
    return `Hello! I can help you find the right page on the ${site.name} site — component sourcing, vehicle models, manufacturing, ODC logistics, consulting or the markets we cover.\n\nTry a part, a vehicle model or a country, for example "Tata Ultra T.7 parts" or "do you cover Kenya".`;
  }
  if (THANKS.test(q)) {
    return `You're welcome. ${ENQUIRY_LINE}`;
  }
  if (WHO.test(q)) {
    return `${site.name} supports international trade, automotive and agricultural component sourcing, contract manufacturing, vehicle solutions, ODC logistics and market-entry support, from Chennai.\n\n- [Import & Export](/import-export)\n- [Automotive Parts](/automotive-parts)\n- [Manufacturing](/manufacturing)\n- [Consulting](/consulting)\n- [ODC Logistics](/odc-logistics)\n- [Vehicle Models](/vehicle-models)\n\n${ENQUIRY_LINE}`;
  }

  const sections: string[] = [];
  const wantsContact = CONTACT.test(q) || HOURS.test(q);
  const wantsPrice = PRICING.test(q);

  if (wantsContact) sections.push(contactDetails());

  if (wantsPrice) {
    sections.push(
      "Prices, lead times, MOQs and availability are only given in a quotation. Send the part number or drawing, the quantity and the destination through the [enquiry form](/contact#rfq) and the team will quote against it.",
    );
  }

  // A pure contact question does not need a list of pages under it.
  const found = wantsContact && !wantsPrice ? null : results(question);
  if (found) sections.push(found);

  if (!sections.length) {
    return `I couldn't find that on this site. Try a product, a vehicle model or a country — for example "trailer axles", "Bajaj RE 4S parts" or "Nigeria" — or send your requirement through the [enquiry form](/contact) and the team will come back to you.`;
  }

  if (!wantsContact && !wantsPrice) sections.push(ENQUIRY_LINE);
  return sections.join("\n\n");
}
