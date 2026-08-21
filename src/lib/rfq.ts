import { z } from "zod";
import { enquiryTypeValues, upload } from "@/data/enquiry";

/** Shared RFQ contract — used by the client form and enforced again on the server. */
export const rfqSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  company: z.string().trim().min(2, "Please enter your company name.").max(160),
  country: z.string().trim().min(2, "Please enter your country.").max(80),
  email: z.email("Please enter a valid business email address.").max(160),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a contact phone number.")
    .max(40)
    .regex(/^[\d\s()+.-]+$/, "Please enter a valid phone number."),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  enquiryType: z
    .string()
    .refine((value) => enquiryTypeValues.includes(value), "Please select an enquiry type."),
  product: z.string().trim().min(2, "Please tell us the product or service.").max(200),
  quantity: z.string().trim().max(120).optional().or(z.literal("")),
  application: z.string().trim().max(160).optional().or(z.literal("")),
  targetMarket: z.string().trim().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please add a few lines about your requirement (20 characters or more).")
    .max(5000),
  consent: z
    .union([z.literal("on"), z.literal("true"), z.boolean()])
    .refine((value) => value === true || value === "on" || value === "true", {
      message: "Please accept the privacy notice to continue.",
    }),
});

export type RfqInput = z.infer<typeof rfqSchema>;

export type RfqFieldErrors = Partial<Record<keyof RfqInput | "attachments" | "form", string>>;

export type RfqResponse = { ok: true; message: string } | { ok: false; errors: RfqFieldErrors };

/** Field-by-field errors keyed the same way the form inputs are named. */
export function flattenIssues(error: z.ZodError): RfqFieldErrors {
  const errors: RfqFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in errors)) {
      errors[key as keyof RfqFieldErrors] = issue.message;
    }
  }
  return errors;
}

const extensionOf = (filename: string) => {
  const index = filename.lastIndexOf(".");
  return index === -1 ? "" : filename.slice(index).toLowerCase();
};

/**
 * Attachment allow-list. Both the extension and the reported MIME type must be
 * on the list, and the total payload is capped.
 */
export function validateAttachments(files: File[]): string | null {
  if (files.length === 0) return null;
  if (files.length > upload.maxFiles) {
    return `Please attach no more than ${upload.maxFiles} files.`;
  }

  let total = 0;
  for (const file of files) {
    if (file.size === 0) continue;
    total += file.size;

    const extension = extensionOf(file.name);
    const extensionOk = (upload.extensions as readonly string[]).includes(extension);
    const mimeOk = (upload.mimeTypes as readonly string[]).includes(file.type);

    if (!extensionOk || !mimeOk) {
      return `"${file.name}" is not an accepted file type. Allowed: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG.`;
    }
    if (file.size > upload.maxBytes) {
      return `"${file.name}" is larger than ${Math.round(upload.maxBytes / (1024 * 1024))} MB.`;
    }
  }

  if (total > upload.maxBytes) {
    return `Attachments total more than ${Math.round(upload.maxBytes / (1024 * 1024))} MB.`;
  }
  return null;
}

/** Strips control characters, including the CR/LF used for header injection. */
export function sanitise(value: string) {
  return value.replace(/[\x00-\x1F\x7F]/g, " ").replace(/\s{3,}/g, "  ").trim();
}

/** Escapes a value before it is interpolated into the HTML email body. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Same as sanitise, but keeps line breaks so the message body stays readable. */
export function sanitiseMultiline(value: string) {
  return value.replace(/\r\n/g, "\n").replace(/[\x00-\x09\x0B-\x1F\x7F]/g, " ").trim();
}
