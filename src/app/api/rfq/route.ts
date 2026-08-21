import { NextResponse } from "next/server";
import { upload } from "@/data/enquiry";
import { mailerConfigured, sendRfqEmails, type RfqAttachment } from "@/lib/mailer";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import {
  flattenIssues,
  rfqSchema,
  sanitise,
  sanitiseMultiline,
  validateAttachments,
  type RfqFieldErrors,
  type RfqResponse,
} from "@/lib/rfq";

// nodemailer needs the Node.js runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Minimum time a genuine user needs to fill the form, in milliseconds. */
const MIN_FILL_MS = 3000;

const fail = (errors: RfqFieldErrors, status = 400) =>
  NextResponse.json<RfqResponse>({ ok: false, errors }, { status });

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request.headers));
  if (!limit.allowed) {
    return NextResponse.json<RfqResponse>(
      {
        ok: false,
        errors: { form: "Too many enquiries from this connection. Please try again shortly." },
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail({ form: "We could not read the submitted form. Please try again." });
  }

  // Spam trap 1: hidden field that only a bot would fill in.
  if (sanitise(String(form.get("website") ?? ""))) {
    return fail({ form: "Your enquiry could not be submitted." });
  }

  // Spam trap 2: forms completed implausibly fast are almost always scripted.
  const renderedAt = Number(form.get("renderedAt"));
  if (Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_FILL_MS) {
    return fail({ form: "Your enquiry could not be submitted. Please try again." });
  }

  const text = (key: string) => sanitise(String(form.get(key) ?? ""));

  const parsed = rfqSchema.safeParse({
    name: text("name"),
    company: text("company"),
    country: text("country"),
    email: text("email"),
    phone: text("phone"),
    whatsapp: text("whatsapp"),
    enquiryType: text("enquiryType"),
    product: text("product"),
    quantity: text("quantity"),
    application: text("application"),
    targetMarket: text("targetMarket"),
    message: sanitiseMultiline(String(form.get("message") ?? "")),
    consent: String(form.get("consent") ?? ""),
  });

  if (!parsed.success) {
    return fail(flattenIssues(parsed.error));
  }

  const files = form
    .getAll("attachments")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0)
    .slice(0, upload.maxFiles);

  const attachmentError = validateAttachments(files);
  if (attachmentError) {
    return fail({ attachments: attachmentError });
  }

  const attachments: RfqAttachment[] = await Promise.all(
    files.map(async (file) => ({
      // Never trust the client-supplied path; keep the basename only.
      filename: sanitise(file.name.replace(/[\\/]/g, "_")).slice(0, 120),
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    })),
  );

  try {
    const result = await sendRfqEmails(parsed.data, attachments);

    if (!result.delivered) {
      if (process.env.NODE_ENV === "production") {
        console.error("[rfq] SMTP is not configured — enquiry was not delivered.");
        return NextResponse.json<RfqResponse>(
          {
            ok: false,
            errors: {
              form: "We could not send your enquiry right now. Please call us or try again shortly.",
            },
          },
          { status: 503 },
        );
      }

      console.warn(
        "[rfq] SMTP not configured — logging the enquiry instead of emailing it.\n",
        JSON.stringify({ ...parsed.data, attachments: attachments.map((a) => a.filename) }, null, 2),
      );
    }
  } catch (error) {
    console.error("[rfq] failed to send enquiry", error);
    return NextResponse.json<RfqResponse>(
      {
        ok: false,
        errors: {
          form: "Something went wrong while sending your enquiry. Please try again or call us.",
        },
      },
      { status: 502 },
    );
  }

  return NextResponse.json<RfqResponse>({
    ok: true,
    message:
      "Thank you — your enquiry has been received. Our team will review the details and respond to you by email.",
  });
}

/** Small health check so the deployment can verify email configuration. */
export async function GET() {
  return NextResponse.json({ ok: true, mailerConfigured: mailerConfigured() });
}
