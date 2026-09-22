import "server-only";
import { randomUUID } from "node:crypto";
import { enquiryLabel } from "@/data/enquiry";
import { ensureSchema, mysqlConfigured, sql, write } from "@/lib/db";
import type { RfqInput } from "./rfq";

/**
 * The enquiry follow-up log.
 *
 * Every submitted enquiry is recorded here so an unanswered one can be chased.
 * It holds the summary fields only — never the attachments, and never the full
 * message body — because its whole purpose is to answer "has this been dealt
 * with", not to be a second copy of the lead. The lead itself is the email.
 *
 * Entirely optional. Without MySQL configured, `recordEnquiry` is a no-op and
 * the enquiry still sends exactly as it did before: the reminder layer is an
 * addition to the RFQ flow, never a dependency of it. Nothing here throws into
 * the request path — a logging failure must not cost a lead.
 */

export type EnquiryRecord = {
  reference: string;
  name: string;
  company: string;
  email: string;
  country: string;
  enquiryType: string;
  product: string;
  createdAt: Date;
  remindersSent: number;
};

type Row = {
  reference: string;
  name: string;
  company: string;
  email: string;
  country: string;
  enquiry_type: string;
  product: string;
  created_at: Date;
  reminders_sent: number;
};

const toRecord = (row: Row): EnquiryRecord => ({
  reference: row.reference,
  name: row.name,
  company: row.company,
  email: row.email,
  country: row.country,
  enquiryType: row.enquiry_type,
  product: row.product,
  createdAt: row.created_at,
  remindersSent: Number(row.reminders_sent),
});

/** Whether the follow-up layer is available at all. */
export const enquiryLogEnabled = () => mysqlConfigured();

let schemaReady: Promise<void> | null = null;

/**
 * The enquiries table, created on first use.
 *
 * Kept out of `ensureSchema` in db.ts: that one is the vehicle model admin's
 * schema and runs on the public model pages. This runs only when an enquiry is
 * actually submitted or the reminder job runs.
 */
function ensureEnquirySchema(): Promise<void> {
  schemaReady ??= (async () => {
    await ensureSchema();
    await sql(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        reference VARCHAR(32) NOT NULL,
        name VARCHAR(191) NOT NULL,
        company VARCHAR(191) NOT NULL,
        email VARCHAR(191) NOT NULL,
        country VARCHAR(191) NOT NULL,
        enquiry_type VARCHAR(64) NOT NULL,
        product VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        answered_at TIMESTAMP NULL,
        reminders_sent TINYINT UNSIGNED NOT NULL DEFAULT 0,
        last_reminder_at TIMESTAMP NULL,
        UNIQUE KEY enquiries_reference (reference),
        KEY enquiries_followup (answered_at, reminders_sent, created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
  })().catch((error) => {
    // Let the next call retry rather than caching a transient failure forever.
    schemaReady = null;
    throw error;
  });

  return schemaReady;
}

/** Short, human-quotable reference — what the acknowledgement email shows. */
export const newReference = () => `GTS-${randomUUID().slice(0, 8).toUpperCase()}`;

/**
 * Records an enquiry. Never throws: a failure is logged and swallowed, because
 * the enquiry email has already been sent by the time this runs.
 */
export async function recordEnquiry(reference: string, data: RfqInput): Promise<void> {
  if (!enquiryLogEnabled()) return;

  try {
    await ensureEnquirySchema();
    await write(
      `INSERT INTO enquiries (reference, name, company, email, country, enquiry_type, product)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        reference,
        data.name.slice(0, 191),
        data.company.slice(0, 191),
        data.email.slice(0, 191),
        data.country.slice(0, 191),
        data.enquiryType.slice(0, 64),
        data.product.slice(0, 255),
      ],
    );
  } catch (error) {
    console.error("[rfq] could not record the enquiry for follow-up", error);
  }
}

/**
 * The follow-up schedule.
 *
 * Stage 1 nudges the sales inbox a working day after an unanswered enquiry.
 * Stage 2 goes to the enquirer three days in, so they hear something even if
 * the quotation is still being put together. Two is where it stops — a third
 * unanswered reminder is a process problem, not an email problem.
 */
export const REMINDER_STAGES = [
  { stage: 1, afterHours: 24, audience: "internal" as const },
  { stage: 2, afterHours: 72, audience: "enquirer" as const },
];

export type DueReminder = { record: EnquiryRecord; stage: (typeof REMINDER_STAGES)[number] };

/**
 * Enquiries that are unanswered and past a stage's threshold.
 *
 * `reminders_sent` is both the stage counter and the guard: an enquiry that has
 * had stage 1 can only match stage 2, so a job that runs every hour cannot send
 * the same reminder twice.
 */
export async function dueReminders(limit = 50): Promise<DueReminder[]> {
  if (!enquiryLogEnabled()) return [];
  await ensureEnquirySchema();

  const due: DueReminder[] = [];

  for (const stage of REMINDER_STAGES) {
    const rows = await sql<Row>(
      `SELECT reference, name, company, email, country, enquiry_type, product,
              created_at, reminders_sent
         FROM enquiries
        WHERE answered_at IS NULL
          AND reminders_sent = ?
          AND created_at <= (NOW() - INTERVAL ? HOUR)
        ORDER BY created_at ASC
        LIMIT ?`,
      [stage.stage - 1, stage.afterHours, limit],
    );
    for (const row of rows) due.push({ record: toRecord(row), stage });
  }

  return due.slice(0, limit);
}

/** Advances the stage counter once a reminder has actually been sent. */
export async function markReminded(reference: string, stage: number): Promise<void> {
  if (!enquiryLogEnabled()) return;
  await write(
    `UPDATE enquiries SET reminders_sent = ?, last_reminder_at = NOW() WHERE reference = ?`,
    [stage, reference],
  );
}

/** Closes an enquiry so it stops being chased. Returns false if unknown. */
export async function markAnswered(reference: string): Promise<boolean> {
  if (!enquiryLogEnabled()) return false;
  await ensureEnquirySchema();
  const result = await write(
    `UPDATE enquiries SET answered_at = NOW() WHERE reference = ? AND answered_at IS NULL`,
    [reference],
  );
  return result.affectedRows > 0;
}

/** Open enquiries, newest first — the reminder job's report. */
export async function openEnquiries(limit = 100): Promise<EnquiryRecord[]> {
  if (!enquiryLogEnabled()) return [];
  await ensureEnquirySchema();
  const rows = await sql<Row>(
    `SELECT reference, name, company, email, country, enquiry_type, product,
            created_at, reminders_sent
       FROM enquiries
      WHERE answered_at IS NULL
      ORDER BY created_at DESC
      LIMIT ?`,
    [limit],
  );
  return rows.map(toRecord);
}

/** Readable description of an enquiry, shared by both reminder emails. */
export const describeEnquiry = (record: EnquiryRecord) =>
  `${enquiryLabel(record.enquiryType)} — ${record.product} — ${record.company} (${record.country})`;
