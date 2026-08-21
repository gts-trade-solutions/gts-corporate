/** Enquiry taxonomy shared by the RFQ form, the API route and deep links. */

export type EnquiryType = {
  /** Stable slug — usable as ?enquiry=<value> to pre-select the form. */
  value: string;
  label: string;
};

export const enquiryTypes: EnquiryType[] = [
  { value: "import-product", label: "Import product" },
  { value: "export-product", label: "Export product" },
  { value: "vehicle-trade", label: "Vehicle import / export" },
  { value: "component-sourcing", label: "Source automotive / agri component" },
  { value: "manufacturing", label: "Manufacturing / fabrication" },
  { value: "trailer-container-reefer", label: "Trailer / container / reefer" },
  { value: "india-dealership", label: "India dealership / distribution" },
  { value: "truck-bus-service", label: "Truck / bus service" },
  { value: "fire-safety", label: "Fire & safety" },
  { value: "homologation-testing", label: "Homologation / testing" },
  { value: "market-entry", label: "Market entry / go-to-market" },
  { value: "supplier-partner", label: "Become a supplier / partner" },
];

export const enquiryTypeValues = enquiryTypes.map((t) => t.value);

export const enquiryLabel = (value: string) =>
  enquiryTypes.find((t) => t.value === value)?.label ?? value;

/**
 * Enquiry types where "application / vehicle type" and
 * "target market / destination country" are worth showing.
 * Both stay optional — they are conditional helpers, not gates.
 */
export const vehicleContextTypes = new Set([
  "vehicle-trade",
  "component-sourcing",
  "manufacturing",
  "trailer-container-reefer",
  "truck-bus-service",
  "homologation-testing",
]);

export const marketContextTypes = new Set([
  "import-product",
  "export-product",
  "vehicle-trade",
  "component-sourcing",
  "india-dealership",
  "market-entry",
  "supplier-partner",
]);

/** Safe file handling: allow-list of extensions and MIME types for RFQ attachments. */
export const upload = {
  maxBytes: 10 * 1024 * 1024,
  maxFiles: 3,
  extensions: [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png"],
  mimeTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "image/jpeg",
    "image/png",
  ],
} as const;

export const uploadAccept = [...upload.extensions, ...upload.mimeTypes].join(",");
