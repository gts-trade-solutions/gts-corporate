import { z } from "zod";
import {
  componentSetIds,
  vehicleModelGroupIds,
  type VehicleModel,
} from "@/data/vehicle-models";
import type { VehicleModelInput } from "@/lib/vehicle-models-store";

/**
 * Turning the admin form into a `VehicleModelInput`.
 *
 * Kept apart from the server actions so the same parsing and the same error
 * shape can be reused by the spec-sheet import.
 */

export type FieldErrors = Record<string, string>;

/** URL segment from a name: "Tata Motors Ultra T.7 — Export" → "tata-motors-ultra-t-7-export". */
export function slugify(value: string) {
  return value
    .normalize("NFKD")
    // Strip the combining marks NFKD just split off, so é folds to e, not e-.
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

/** Textareas collect list fields one entry per line. Blank lines are dropped. */
export const linesToList = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

export const listToLines = (value: string[]) => value.join("\n");

const required = (label: string) => z.string().trim().min(1, `${label} is required.`).max(191);
const optional = z.string().trim().max(255).optional();

const schema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "The web address is required.")
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lower-case letters, numbers and hyphens only."),
  oem: required("The OEM"),
  model: required("The model name"),
  segment: required("The vehicle type"),
  group: z.enum(vehicleModelGroupIds),
  exportedFrom: required("Exported from"),
  markets: z.array(z.string().trim().min(1)).min(1, "List at least one destination market."),
  parts: z.array(z.string().trim().min(1)).min(1, "List at least one priority part."),
  partsNote: z.string().trim().max(600).optional(),
  components: z.enum(componentSetIds),
  specs: z.object({
    engine: optional,
    maxPower: optional,
    maxTorque: optional,
    transmission: optional,
    weights: optional,
  }),
});

const value = (form: FormData, key: string) => String(form.get(key) ?? "").trim();

/** Parse the model form. Returns either the input or a field-keyed error map. */
export function parseModelForm(
  form: FormData,
): { ok: true; input: VehicleModelInput } | { ok: false; errors: FieldErrors } {
  const candidate = {
    // An empty slug field is derived from the name, so adding a model needs no
    // thought about URLs — but an explicit slug is always respected.
    slug: value(form, "slug") || slugify(`${value(form, "oem")} ${value(form, "model")}`),
    oem: value(form, "oem"),
    model: value(form, "model"),
    segment: value(form, "segment"),
    group: value(form, "group"),
    exportedFrom: value(form, "exportedFrom"),
    markets: linesToList(value(form, "markets")),
    parts: linesToList(value(form, "parts")),
    partsNote: value(form, "partsNote") || undefined,
    components: value(form, "components"),
    specs: {
      engine: value(form, "engine") || undefined,
      maxPower: value(form, "maxPower") || undefined,
      maxTorque: value(form, "maxTorque") || undefined,
      transmission: value(form, "transmission") || undefined,
      weights: value(form, "weights") || undefined,
    },
  };

  const parsed = schema.safeParse(candidate);
  if (parsed.success) return { ok: true, input: parsed.data };

  const errors: FieldErrors = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path.join(".") || "form";
    errors[key] ??= issue.message;
  }
  return { ok: false, errors };
}

/** The form's starting values, for both the edit and the new-model page. */
export const emptyModel = (): VehicleModel => ({
  slug: "",
  oem: "",
  model: "",
  segment: "",
  group: "commercial-vehicles",
  exportedFrom: "India",
  markets: [],
  parts: [],
  components: "commercial",
});

/* --------------------------------------------------------------- photographs */

export const PHOTO_MAX_BYTES = 3 * 1024 * 1024;

export const PHOTO_TYPES = ["image/webp", "image/jpeg", "image/png", "image/avif"] as const;

/** Validate an uploaded photograph. Returns an error message, or null when fine. */
export function checkPhoto(file: File): string | null {
  if (!(PHOTO_TYPES as readonly string[]).includes(file.type)) {
    return "The photograph must be a WebP, JPEG, PNG or AVIF image.";
  }
  if (file.size > PHOTO_MAX_BYTES) {
    return `The photograph must be under ${Math.round(PHOTO_MAX_BYTES / 1024 / 1024)} MB.`;
  }
  return null;
}
