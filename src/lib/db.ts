import "server-only";
import mysql from "mysql2/promise";

/**
 * MySQL connection for the admin-editable content.
 *
 * The site works without a database: every reader falls back to the static
 * catalogue in `src/data/`, which is what shipped before the admin existed.
 * Set the MYSQL_* variables and the schedule becomes editable at /admin; leave
 * them unset and the site behaves exactly as it did as a static build.
 */

export const mysqlConfigured = () =>
  Boolean(process.env.MYSQL_HOST?.trim() && process.env.MYSQL_DATABASE?.trim());

/*
  `next dev` re-evaluates modules on every edit. Parking the pool on globalThis
  keeps a single pool across reloads instead of leaking one per recompile.
*/
const globalForDb = globalThis as unknown as {
  gtsPool?: mysql.Pool;
  gtsSchemaReady?: Promise<void>;
};

export function getPool(): mysql.Pool {
  if (!mysqlConfigured()) {
    throw new Error(
      "MySQL is not configured. Set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE.",
    );
  }

  globalForDb.gtsPool ??= mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Photographs are stored as blobs; keep them as Buffers, not strings.
    charset: "utf8mb4_general_ci",
    dateStrings: false,
  });

  return globalForDb.gtsPool;
}

/** Run a statement and get typed rows back. */
export async function sql<T = mysql.RowDataPacket>(
  text: string,
  values: unknown[] = [],
): Promise<T[]> {
  const [rows] = await getPool().query(text, values);
  return rows as T[];
}

/** Run a write and get the result header (insertId, affectedRows). */
export async function write(text: string, values: unknown[] = []): Promise<mysql.ResultSetHeader> {
  const [result] = await getPool().query(text, values);
  return result as mysql.ResultSetHeader;
}

/**
 * Create the tables if they are missing. Runs at most once per process.
 *
 * `markets` and `parts` are declared JSON. MariaDB aliases JSON to LONGTEXT and
 * hands the value back as a string, so every reader parses defensively.
 */
export function ensureSchema(): Promise<void> {
  globalForDb.gtsSchemaReady ??= (async () => {
    await sql(`
      CREATE TABLE IF NOT EXISTS vehicle_models (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(191) NOT NULL,
        oem VARCHAR(191) NOT NULL,
        model VARCHAR(191) NOT NULL,
        segment VARCHAR(191) NOT NULL,
        group_id VARCHAR(64) NOT NULL,
        exported_from VARCHAR(191) NOT NULL,
        markets JSON NOT NULL,
        parts JSON NOT NULL,
        parts_note TEXT NULL,
        components VARCHAR(32) NOT NULL,
        engine VARCHAR(255) NULL,
        max_power VARCHAR(255) NULL,
        max_torque VARCHAR(255) NULL,
        transmission VARCHAR(255) NULL,
        weights VARCHAR(255) NULL,
        sort_order INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY vehicle_models_slug (slug),
        KEY vehicle_models_order (sort_order, id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await sql(`
      CREATE TABLE IF NOT EXISTS vehicle_model_photos (
        slug VARCHAR(191) NOT NULL PRIMARY KEY,
        mime_type VARCHAR(64) NOT NULL,
        byte_size INT UNSIGNED NOT NULL,
        bytes LONGBLOB NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // Databases created before the spec sheet existed get the columns added.
    await addMissingColumns("vehicle_models", {
      engine: "VARCHAR(255) NULL",
      max_power: "VARCHAR(255) NULL",
      max_torque: "VARCHAR(255) NULL",
      transmission: "VARCHAR(255) NULL",
      weights: "VARCHAR(255) NULL",
    });
  })().catch((error) => {
    // Let the next call retry rather than caching a transient failure forever.
    globalForDb.gtsSchemaReady = undefined;
    throw error;
  });

  return globalForDb.gtsSchemaReady;
}

/**
 * Idempotent `ALTER TABLE ... ADD COLUMN`. MySQL 8 has no
 * `ADD COLUMN IF NOT EXISTS`, so the columns are looked up first.
 */
async function addMissingColumns(table: string, columns: Record<string, string>) {
  const existing = await sql<{ COLUMN_NAME: string }>(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
    [table],
  );
  const have = new Set(existing.map((row) => row.COLUMN_NAME.toLowerCase()));

  for (const [name, definition] of Object.entries(columns)) {
    if (have.has(name.toLowerCase())) continue;
    // Identifiers here are compile-time constants, never user input.
    await sql(`ALTER TABLE ${table} ADD COLUMN ${name} ${definition}`);
  }
}
