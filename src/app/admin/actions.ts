"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { VehicleSpecs } from "@/data/vehicle-models";
import {
  authenticate,
  adminConfigured,
  createAdminSession,
  destroyAdminSession,
  requireAdmin,
} from "@/lib/admin-auth";
import { checkPhoto, parseModelForm, type FieldErrors } from "@/lib/admin-models";
import type { ActionState } from "@/lib/admin-state";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { matchSpecRow, parseSpecSheet, specsEqual } from "@/lib/spec-sheet";
import {
  createVehicleModel,
  deleteVehicleModel,
  deleteVehicleModelPhoto,
  listVehicleModels,
  saveVehicleModelPhoto,
  slugExists,
  updateVehicleModel,
  updateVehicleSpecs,
} from "@/lib/vehicle-models-store";


const fail = (message: string, errors?: FieldErrors): ActionState => ({
  status: "error",
  message,
  errors,
});

/**
 * Every page the schedule feeds. Called after each write so an edit is live
 * immediately instead of waiting for the next scheduled revalidation.
 */
function revalidateSchedule() {
  revalidatePath("/");
  revalidatePath("/automotive-parts");
  revalidatePath("/vehicle-models");
  revalidatePath("/vehicle-models/[slug]", "page");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
}

/* ------------------------------------------------------------------ sign in */

export async function signIn(_state: ActionState, form: FormData): Promise<ActionState> {
  if (!adminConfigured()) {
    return fail(
      "The admin is not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD in the environment.",
    );
  }

  // Same limiter as the enquiry form, on its own key space: five attempts
  // per IP per ten minutes.
  const limit = rateLimit(`admin:${clientKey(await headers())}`);
  if (!limit.allowed) {
    return fail(`Too many sign-in attempts. Try again in ${limit.retryAfterSeconds} seconds.`);
  }

  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return fail("Enter the admin email address and password.");

  const account = authenticate(email, password);
  // One message for both a wrong address and a wrong password, so the form
  // never confirms which addresses exist.
  if (!account) return fail("That email address and password were not recognised.");

  await createAdminSession(account.email);
  redirect("/admin");
}

export async function signOut() {
  await destroyAdminSession();
  redirect("/admin/login");
}

/* ------------------------------------------------------------- model writes */

export async function saveModel(_state: ActionState, form: FormData): Promise<ActionState> {
  await requireAdmin();

  const originalSlug = String(form.get("originalSlug") ?? "").trim();
  const parsed = parseModelForm(form);
  if (!parsed.ok) return fail("Some fields need attention.", parsed.errors);

  const { input } = parsed;
  const photo = form.get("photo");
  const removePhoto = form.get("removePhoto") === "on";

  if (photo instanceof File && photo.size > 0) {
    const problem = checkPhoto(photo);
    if (problem) return fail(problem, { photo: problem });
  }

  try {
    if (await slugExists(input.slug, originalSlug || undefined)) {
      const message = `Another model already uses the address /${input.slug}.`;
      return fail(message, { slug: message });
    }

    if (originalSlug) {
      await updateVehicleModel(originalSlug, input);
    } else {
      await createVehicleModel(input);
    }

    if (removePhoto) {
      await deleteVehicleModelPhoto(input.slug);
    }
    if (photo instanceof File && photo.size > 0) {
      const bytes = Buffer.from(await photo.arrayBuffer());
      await saveVehicleModelPhoto(input.slug, bytes, photo.type);
    }
  } catch (error) {
    console.error("[gts] saving a vehicle model failed:", error);
    return fail("The database rejected the change. The server log has the detail.");
  }

  revalidateSchedule();

  // A new model, or a renamed one, lives at a different admin address.
  if (input.slug !== originalSlug) redirect(`/admin/models/${input.slug}?saved=1`);

  return { status: "success", message: "Saved. The public pages have been refreshed." };
}

export async function deleteModel(form: FormData) {
  await requireAdmin();

  const slug = String(form.get("slug") ?? "").trim();
  if (!slug) return;

  await deleteVehicleModel(slug);
  revalidateSchedule();
  redirect("/admin?deleted=1");
}

/* -------------------------------------------------------- spec sheet import */

export async function importSpecSheet(
  _state: ActionState,
  form: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const text = String(form.get("sheet") ?? "");
  const apply = form.get("apply") === "1";
  if (!text.trim()) return fail("Paste the specification sheet first.");

  const parsed = parseSpecSheet(text);
  if (!parsed.rows.length) {
    return fail(
      "No rows could be read. Copy the sheet including its header row, or keep the columns in the order Vehicle Type, OEM, Model, Engine, Max Power, Max Torque, Transmission, GVW.",
      undefined,
    );
  }

  const models = await listVehicleModels();
  const report: string[] = [...parsed.errors];
  let changed = 0;
  let unchanged = 0;
  let missing = 0;

  for (const row of parsed.rows) {
    const match = matchSpecRow(models, row);

    if (!match) {
      missing += 1;
      report.push(
        `Line ${row.line}: no match for ${row.oem} ${row.model}. Add the model first, then re-import.`,
      );
      continue;
    }

    const { model } = match;
    // An approximate match is always spelled out, so a variant name in the
    // sheet cannot quietly overwrite the wrong model's specification.
    const via = match.approximate ? ` (matched from "${row.model}")` : "";

    if (specsEqual(model.specs, row.specs)) {
      unchanged += 1;
      report.push(`Line ${row.line}: unchanged — ${model.oem} ${model.model}${via}.`);
      continue;
    }

    changed += 1;
    report.push(
      `Line ${row.line}: ${apply ? "updated" : "will update"} — ${model.oem} ${model.model}` +
        `${via}${describe(row.specs)}`,
    );

    if (apply) await updateVehicleSpecs(model.slug, row.specs);
  }

  if (apply && changed > 0) revalidateSchedule();

  const summary = [
    `${parsed.rows.length} row${parsed.rows.length === 1 ? "" : "s"} read`,
    `${changed} ${apply ? "updated" : "to update"}`,
    `${unchanged} already current`,
    missing ? `${missing} unmatched` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return {
    status: missing && !changed ? "error" : "success",
    message: apply ? `Import complete. ${summary}.` : `Preview only — nothing saved yet. ${summary}.`,
    report,
  };
}

/** One-line summary of what a spec row carries, for the import report. */
function describe(specs: VehicleSpecs) {
  const filled = Object.values(specs).filter(Boolean).length;
  return filled ? ` (${filled} field${filled === 1 ? "" : "s"})` : "";
}

