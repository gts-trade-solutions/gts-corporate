import { timingSafeEqual } from "node:crypto";
import {
  dueReminders,
  enquiryLogEnabled,
  markAnswered,
  markReminded,
  openEnquiries,
} from "@/lib/enquiry-log";
import { mailerConfigured, sendReminders } from "@/lib/mailer";

/**
 * The enquiry follow-up job.
 *
 * Two jobs behind one token:
 *
 *   GET /api/reminders?token=…                  send every due reminder
 *   GET /api/reminders?token=…&answered=GTS-XX  close one enquiry
 *   GET /api/reminders?token=…&report=1         list what is still open
 *
 * Point a scheduler at the first form — Vercel Cron, a hosting panel cron, or
 * anything that can fetch a URL — hourly is plenty, since the stages are 24 and
 * 72 hours. Running it more often is harmless: `reminders_sent` is the guard,
 * so nothing is ever sent twice.
 *
 * The second form is the link at the foot of each internal reminder, so
 * whoever answers an enquiry can stop the chase with one click.
 *
 * Unset `REMINDER_SECRET` and the whole endpoint is closed — it returns 404,
 * not 401, so an unconfigured deployment does not advertise that it exists.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Constant-time compare, so the token cannot be guessed a character at a time. */
function tokenMatches(supplied: string, expected: string): boolean {
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

const notFound = () => new Response("Not found", { status: 404 });

export async function GET(request: Request) {
  const secret = process.env.REMINDER_SECRET?.trim();
  if (!secret) return notFound();

  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  if (!tokenMatches(token, secret)) return notFound();

  if (!enquiryLogEnabled()) {
    return Response.json(
      {
        ok: false,
        error:
          "Follow-up reminders need MySQL. Set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE.",
      },
      { status: 503 },
    );
  }

  // Closing one enquiry, from the link in an internal reminder.
  const answered = url.searchParams.get("answered");
  if (answered) {
    try {
      const closed = await markAnswered(answered);
      return new Response(
        closed
          ? `Enquiry ${answered} is marked as answered. It will not be chased again.`
          : `Enquiry ${answered} was already closed, or the reference is not recognised.`,
        { status: closed ? 200 : 404, headers: { "Content-Type": "text/plain; charset=utf-8" } },
      );
    } catch (error) {
      console.error("[reminders] could not close the enquiry", error);
      return Response.json({ ok: false, error: "Database error." }, { status: 502 });
    }
  }

  // What is still open, for a quick look without running the job.
  if (url.searchParams.get("report") === "1") {
    try {
      const open = await openEnquiries();
      return Response.json({
        ok: true,
        open: open.length,
        enquiries: open.map((record) => ({
          reference: record.reference,
          company: record.company,
          country: record.country,
          product: record.product,
          receivedAt: record.createdAt.toISOString(),
          remindersSent: record.remindersSent,
        })),
      });
    } catch (error) {
      console.error("[reminders] report failed", error);
      return Response.json({ ok: false, error: "Database error." }, { status: 502 });
    }
  }

  if (!mailerConfigured()) {
    return Response.json(
      { ok: false, error: "SMTP is not configured, so no reminder could be sent." },
      { status: 503 },
    );
  }

  try {
    const due = await dueReminders();
    if (!due.length) return Response.json({ ok: true, due: 0, sent: 0, failed: 0 });

    const result = await sendReminders(due, markReminded);
    return Response.json({
      ok: true,
      due: due.length,
      sent: result.sent,
      failed: result.failed,
    });
  } catch (error) {
    console.error("[reminders] job failed", error);
    return Response.json({ ok: false, error: "The reminder job failed." }, { status: 502 });
  }
}
