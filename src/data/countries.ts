/**
 * Markets GTS covers, and where a local partner is already in place.
 *
 * Drives the country selector on the contact page and the market band that
 * sits above it. The list is the one agreed with the client: South and
 * South-East Asia named country by country, Africa covered as a whole, the
 * central Arab states, and the two Latin American markets.
 *
 * `partner: "local"` means there is a named local representative on the
 * ground; `"direct"` means enquiries are handled from Chennai. The individual
 * partner names, addresses and desk numbers are still to come from Srikanth —
 * add them to `partnerName` / `partnerNote` as they are confirmed. Nothing is
 * invented here: a country with no confirmed partner simply says enquiries are
 * handled from the India desk.
 */

export type MarketPartner = "local" | "direct";

export type Market = {
  /** ISO 3166-1 alpha-2, used for the flag and as the stable option value. */
  code: string;
  name: string;
  partner: MarketPartner;
  /** Named local representative, once confirmed. */
  partnerName?: string;
  /** One line shown under the country when it is selected. */
  partnerNote?: string;
};

export type MarketRegion = {
  id: string;
  label: string;
  /** Shown on the region card above the selector. */
  blurb: string;
  markets: Market[];
};

export const marketRegions: MarketRegion[] = [
  {
    id: "south-asia",
    label: "South Asia",
    blurb:
      "Overland and short-sea routes from India, with documentation handled for the land borders as well as the ports.",
    markets: [
      { code: "IN", name: "India", partner: "local", partnerNote: "Head office and marketing desk in Chennai." },
      { code: "LK", name: "Sri Lanka", partner: "local" },
      { code: "NP", name: "Nepal", partner: "local" },
      { code: "BT", name: "Bhutan", partner: "local" },
      { code: "BD", name: "Bangladesh", partner: "direct" },
    ],
  },
  {
    id: "south-east-asia",
    label: "South-East Asia",
    blurb:
      "Component sourcing, vehicle trade and contract manufacturing support across the ASEAN manufacturing belt.",
    markets: [
      { code: "TH", name: "Thailand", partner: "local" },
      { code: "MY", name: "Malaysia", partner: "local" },
      { code: "ID", name: "Indonesia", partner: "local" },
      { code: "VN", name: "Vietnam", partner: "direct" },
      { code: "SG", name: "Singapore", partner: "direct" },
      { code: "PH", name: "Philippines", partner: "direct" },
    ],
  },
  {
    id: "middle-east",
    label: "Middle East",
    blurb:
      "The central Arab states, covering vehicle and equipment trade, fabrication and fire & safety scope.",
    markets: [
      { code: "AE", name: "United Arab Emirates", partner: "local" },
      { code: "SA", name: "Saudi Arabia", partner: "local" },
      { code: "QA", name: "Qatar", partner: "local" },
      { code: "KW", name: "Kuwait", partner: "local" },
      { code: "OM", name: "Oman", partner: "direct" },
      { code: "BH", name: "Bahrain", partner: "direct" },
      { code: "JO", name: "Jordan", partner: "direct" },
      { code: "IQ", name: "Iraq", partner: "direct" },
    ],
  },
  {
    id: "africa",
    label: "Africa",
    blurb:
      "Full continental coverage. The countries below are the established lanes — enquiries from anywhere in Africa are handled.",
    markets: [
      { code: "NG", name: "Nigeria", partner: "local" },
      { code: "KE", name: "Kenya", partner: "local" },
      { code: "TZ", name: "Tanzania", partner: "local" },
      { code: "ZA", name: "South Africa", partner: "local" },
      { code: "GH", name: "Ghana", partner: "direct" },
      { code: "ET", name: "Ethiopia", partner: "direct" },
      { code: "EG", name: "Egypt", partner: "direct" },
      { code: "UG", name: "Uganda", partner: "direct" },
      { code: "ZM", name: "Zambia", partner: "direct" },
      { code: "MZ", name: "Mozambique", partner: "direct" },
      { code: "CI", name: "Côte d'Ivoire", partner: "direct" },
      { code: "SN", name: "Senegal", partner: "direct" },
    ],
  },
  {
    id: "latin-america",
    label: "Latin America",
    blurb:
      "Vehicle, component and equipment trade into the Andean and North American Spanish-speaking markets.",
    markets: [
      { code: "PE", name: "Peru", partner: "local" },
      { code: "MX", name: "Mexico", partner: "local" },
      { code: "CL", name: "Chile", partner: "direct" },
      { code: "CO", name: "Colombia", partner: "direct" },
      { code: "BR", name: "Brazil", partner: "direct" },
    ],
  },
];

/** Every market, flattened — used by the selector and the RFQ validation. */
export const allMarkets: Market[] = marketRegions.flatMap((region) => region.markets);

/** Look a market up by its ISO code. */
export const marketByCode = (code: string) =>
  allMarkets.find((market) => market.code === code.toUpperCase());

/** The region a market belongs to. */
export const regionOf = (code: string) =>
  marketRegions.find((region) => region.markets.some((market) => market.code === code));

/**
 * Flag emoji from an ISO 3166-1 alpha-2 code — each letter maps to its
 * regional indicator symbol. Avoids shipping 30-odd flag images.
 */
export const flagOf = (code: string) =>
  code
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .map((letter) => String.fromCodePoint(0x1f1e6 + letter.charCodeAt(0) - 65))
    .join("");

/** Countries with a named local representative, for the "local partners" count. */
export const localPartnerMarkets = allMarkets.filter((market) => market.partner === "local");

/** Headline numbers for the market band. */
export const marketStats = {
  regions: marketRegions.length,
  countries: allMarkets.length,
  localPartners: localPartnerMarkets.length,
} as const;
