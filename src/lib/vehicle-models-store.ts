import "server-only";
import { cache } from "react";
import {
  componentSetIds,
  vehicleModels as catalogueModels,
  vehicleModelGroupIds,
  vehicleSpecFields,
  type ComponentSetId,
  type VehicleModel,
  type VehicleModelGroupId,
  type VehicleSpecs,
} from "@/data/vehicle-models";
import { ensureSchema, mysqlConfigured, sql, write } from "@/lib/db";

/**
 * Read/write access to the vehicle model schedule.
 *
 * Reads never throw: without MySQL configured, or if the database is
 * unreachable, every reader falls back to the static catalogue that ships in
 * `src/data/vehicle-models.ts`. A database outage therefore degrades the site
 * to its pre-admin behaviour rather than taking the public pages down.
 *
 * Writes are admin-only and do throw — the admin has to see the failure.
 */

type Row = {
  slug: string;
  oem: string;
  model: string;
  segment: string;
  group_id: string;
  exported_from: string;
  markets: string | string[];
  parts: string | string[];
  parts_note: string | null;
  components: string;
  engine: string | null;
  max_power: string | null;
  max_torque: string | null;
  transmission: string | null;
  weights: string | null;
  updated_at: Date;
  photo_updated_at: Date | null;
};

function safeParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

/** MariaDB hands JSON columns back as strings; MySQL parses them for us. */
function jsonArray(value: string | string[] | null): string[] {
  const list: unknown = Array.isArray(value) ? value : value ? safeParse(value) : [];
  if (!Array.isArray(list)) return [];
  return list.filter((entry): entry is string => typeof entry === "string");
}

const asGroup = (value: string): VehicleModelGroupId =>
  (vehicleModelGroupIds as readonly string[]).includes(value)
    ? (value as VehicleModelGroupId)
    : "commercial-vehicles";

const asComponentSet = (value: string): ComponentSetId =>
  (componentSetIds as readonly string[]).includes(value) ? (value as ComponentSetId) : "commercial";

const text = (value: string | null) => (value?.trim() ? value.trim() : undefined);

/** Drop the spec object entirely when every field is blank. */
function toSpecs(row: Row): VehicleSpecs | undefined {
  const specs: VehicleSpecs = {
    engine: text(row.engine),
    maxPower: text(row.max_power),
    maxTorque: text(row.max_torque),
    transmission: text(row.transmission),
    weights: text(row.weights),
  };
  return vehicleSpecFields.some((field) => specs[field.key]) ? specs : undefined;
}

const toModel = (row: Row): VehicleModel => ({
  slug: row.slug,
  oem: row.oem,
  model: row.model,
  segment: row.segment,
  group: asGroup(row.group_id),
  exportedFrom: row.exported_from,
  markets: jsonArray(row.markets),
  parts: jsonArray(row.parts),
  partsNote: text(row.parts_note),
  components: asComponentSet(row.components),
  specs: toSpecs(row),
  updatedAt: row.updated_at ? new Date(row.updated_at).getTime() : undefined,
  photoUpdatedAt: row.photo_updated_at ? new Date(row.photo_updated_at).getTime() : undefined,
});

const SELECT = `
  SELECT m.slug, m.oem, m.model, m.segment, m.group_id, m.exported_from, m.markets, m.parts,
         m.parts_note, m.components, m.engine, m.max_power, m.max_torque, m.transmission,
         m.weights, m.updated_at, p.updated_at AS photo_updated_at
  FROM vehicle_models m
  LEFT JOIN vehicle_model_photos p ON p.slug = m.slug
`;

/**
 * The first run against an empty database copies the shipped catalogue in, so
 * the admin opens on the models the site already publishes rather than on
 * nothing. It only ever runs while the table is empty.
 */
async function seedIfEmpty() {
  const [count] = await sql<{ n: number }>("SELECT COUNT(*) AS n FROM vehicle_models");
  if (Number(count?.n ?? 0) > 0) return;

  const values = catalogueModels.map((item, index) => [
    item.slug,
    item.oem,
    item.model,
    item.segment,
    item.group,
    item.exportedFrom,
    JSON.stringify(item.markets),
    JSON.stringify(item.parts),
    item.partsNote ?? null,
    item.components,
    item.specs?.engine ?? null,
    item.specs?.maxPower ?? null,
    item.specs?.maxTorque ?? null,
    item.specs?.transmission ?? null,
    item.specs?.weights ?? null,
    index,
  ]);
  if (!values.length) return;

  await write(
    `INSERT IGNORE INTO vehicle_models
       (slug, oem, model, segment, group_id, exported_from, markets, parts, parts_note,
        components, engine, max_power, max_torque, transmission, weights, sort_order)
     VALUES ?`,
    [values],
  );
}

async function ready() {
  await ensureSchema();
  await seedIfEmpty();
}

/** Every model, in schedule order. Deduplicated per request. */
export const listVehicleModels = cache(async (): Promise<VehicleModel[]> => {
  if (!mysqlConfigured()) return catalogueModels;
  try {
    await ready();
    const rows = await sql<Row>(`${SELECT} ORDER BY m.sort_order ASC, m.id ASC`);
    return rows.length ? rows.map(toModel) : catalogueModels;
  } catch (error) {
    console.error("[gts] vehicle model read failed, serving the static catalogue:", error);
    return catalogueModels;
  }
});

export async function findVehicleModelBySlug(slug: string): Promise<VehicleModel | undefined> {
  const models = await listVehicleModels();
  return models.find((item) => item.slug === slug);
}

/* --------------------------------------------------------------- admin writes */

export type VehicleModelInput = {
  slug: string;
  oem: string;
  model: string;
  segment: string;
  group: VehicleModelGroupId;
  exportedFrom: string;
  markets: string[];
  parts: string[];
  partsNote?: string;
  components: ComponentSetId;
  specs: VehicleSpecs;
};

/** Column values in the order every write statement below lists them. */
const columnValues = (input: VehicleModelInput) => [
  input.slug,
  input.oem,
  input.model,
  input.segment,
  input.group,
  input.exportedFrom,
  JSON.stringify(input.markets),
  JSON.stringify(input.parts),
  input.partsNote?.trim() || null,
  input.components,
  input.specs.engine?.trim() || null,
  input.specs.maxPower?.trim() || null,
  input.specs.maxTorque?.trim() || null,
  input.specs.transmission?.trim() || null,
  input.specs.weights?.trim() || null,
];

export async function slugExists(slug: string, excluding?: string) {
  await ensureSchema();
  const rows = await sql<{ slug: string }>(
    "SELECT slug FROM vehicle_models WHERE slug = ? AND slug <> ? LIMIT 1",
    [slug, excluding ?? ""],
  );
  return rows.length > 0;
}

export async function createVehicleModel(input: VehicleModelInput) {
  await ready();
  const [last] = await sql<{ n: number | null }>("SELECT MAX(sort_order) AS n FROM vehicle_models");
  await write(
    `INSERT INTO vehicle_models
       (slug, oem, model, segment, group_id, exported_from, markets, parts, parts_note,
        components, engine, max_power, max_torque, transmission, weights, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [...columnValues(input), Number(last?.n ?? 0) + 1],
  );
}

export async function updateVehicleModel(originalSlug: string, input: VehicleModelInput) {
  await ready();
  await write(
    `UPDATE vehicle_models
        SET slug = ?, oem = ?, model = ?, segment = ?, group_id = ?, exported_from = ?,
            markets = ?, parts = ?, parts_note = ?, components = ?, engine = ?, max_power = ?,
            max_torque = ?, transmission = ?, weights = ?
      WHERE slug = ?`,
    [...columnValues(input), originalSlug],
  );

  // The photograph is keyed by slug, so a rename has to carry it across.
  if (input.slug !== originalSlug) {
    await write("UPDATE vehicle_model_photos SET slug = ? WHERE slug = ?", [
      input.slug,
      originalSlug,
    ]);
  }
}

export async function deleteVehicleModel(slug: string) {
  await ready();
  await write("DELETE FROM vehicle_model_photos WHERE slug = ?", [slug]);
  await write("DELETE FROM vehicle_models WHERE slug = ?", [slug]);
}

/** Overwrite only the spec columns — what the bulk spec-sheet import touches. */
export async function updateVehicleSpecs(slug: string, specs: VehicleSpecs) {
  await ready();
  const result = await write(
    `UPDATE vehicle_models
        SET engine = ?, max_power = ?, max_torque = ?, transmission = ?, weights = ?
      WHERE slug = ?`,
    [
      specs.engine?.trim() || null,
      specs.maxPower?.trim() || null,
      specs.maxTorque?.trim() || null,
      specs.transmission?.trim() || null,
      specs.weights?.trim() || null,
      slug,
    ],
  );
  return result.affectedRows > 0;
}

/* ---------------------------------------------------------------- photographs */

export async function saveVehicleModelPhoto(slug: string, bytes: Buffer, mimeType: string) {
  await ready();
  await write(
    `INSERT INTO vehicle_model_photos (slug, mime_type, byte_size, bytes)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE mime_type = VALUES(mime_type), byte_size = VALUES(byte_size),
                             bytes = VALUES(bytes), updated_at = CURRENT_TIMESTAMP`,
    [slug, mimeType, bytes.byteLength, bytes],
  );
}

export async function deleteVehicleModelPhoto(slug: string) {
  await ready();
  await write("DELETE FROM vehicle_model_photos WHERE slug = ?", [slug]);
}

export async function getVehicleModelPhoto(slug: string) {
  if (!mysqlConfigured()) return null;
  try {
    await ensureSchema();
    const rows = await sql<{ mime_type: string; bytes: Buffer; updated_at: Date }>(
      "SELECT mime_type, bytes, updated_at FROM vehicle_model_photos WHERE slug = ? LIMIT 1",
      [slug],
    );
    return rows[0] ?? null;
  } catch (error) {
    console.error("[gts] vehicle photo read failed:", error);
    return null;
  }
}
