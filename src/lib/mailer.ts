import nodemailer, { type Transporter } from "nodemailer";
import { enquiryLabel } from "@/data/enquiry";
import { contact, site, siteUrl, teamsHref, whatsappHref } from "@/data/site";
import type { DueReminder, EnquiryRecord } from "./enquiry-log";
import { describeEnquiry } from "./enquiry-log";
import { escapeHtml, type RfqInput } from "./rfq";

export type RfqAttachment = { filename: string; content: Buffer; contentType: string };

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from: string;
  to: string;
};

function readConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const to = process.env.RFQ_TO_EMAIL;
  if (!host || !to) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);
  return {
    host,
    port,
    // Implicit TLS on 465; STARTTLS elsewhere. Override with SMTP_SECURE.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
    from: process.env.RFQ_FROM_EMAIL ?? process.env.SMTP_USER ?? `no-reply@${host}`,
    to,
  };
}

let cached: Transporter | null = null;

function getTransport(config: SmtpConfig) {
  if (!cached) {
    cached = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      ...(config.user && config.pass ? { auth: { user: config.user, pass: config.pass } } : {}),
    });
  }
  return cached;
}

export const mailerConfigured = () => readConfig() !== null;

const rows = (data: RfqInput): [string, string][] => {
  const entries: [string, string | undefined][] = [
    ["Name", data.name],
    ["Company", data.company],
    ["Country", data.country],
    ["Email", data.email],
    ["Phone", data.phone],
    ["WhatsApp", data.whatsapp],
    ["Enquiry type", enquiryLabel(data.enquiryType)],
    ["Product / service", data.product],
    ["Quantity / annual volume", data.quantity],
    ["Application / vehicle type", data.application],
    ["Target market / destination", data.targetMarket],
  ];
  return entries.filter((row): row is [string, string] => Boolean(row[1]));
};

function leadText(data: RfqInput, attachments: RfqAttachment[]) {
  const lines = rows(data).map(([label, value]) => `${label}: ${value}`);
  lines.push("", "Specification / message:", data.message);
  if (attachments.length) {
    lines.push("", `Attachments: ${attachments.map((a) => a.filename).join(", ")}`);
  }
  return lines.join("\n");
}

function leadHtml(data: RfqInput, attachments: RfqAttachment[]) {
  const cells = rows(data)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(
          label,
        )}</td><td style="padding:6px 0;color:#08192b;font-size:14px"><strong>${escapeHtml(
          value,
        )}</strong></td></tr>`,
    )
    .join("");

  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px">
  <h2 style="margin:0 0 4px;color:#08192b;font-size:19px">New RFQ — ${escapeHtml(
    enquiryLabel(data.enquiryType),
  )}</h2>
  <p style="margin:0 0 18px;color:#64748b;font-size:13px">Submitted via ${escapeHtml(siteUrl)}/contact</p>
  <table style="border-collapse:collapse;width:100%">${cells}</table>
  <h3 style="margin:22px 0 6px;color:#08192b;font-size:15px">Specification / message</h3>
  <div style="white-space:pre-wrap;color:#3c5063;font-size:14px;line-height:1.6">${escapeHtml(
    data.message,
  )}</div>
  ${
    attachments.length
      ? `<p style="margin:20px 0 0;color:#64748b;font-size:13px">Attachments: ${attachments
          .map((a) => escapeHtml(a.filename))
          .join(", ")}</p>`
      : ""
  }
</div>`;
}

function acknowledgementText(data: RfqInput, reference?: string) {
  return [
    `Dear ${data.name},`,
    "",
    `Thank you for contacting ${site.name}. We have received your enquiry regarding "${data.product}" (${enquiryLabel(
      data.enquiryType,
    )}) and our team will review it and come back to you.`,
    reference ? "" : "",
    reference ? `Your reference for this enquiry is ${reference}. Quote it on any reply.` : "",
    "",
    "Summary of what you sent us:",
    `Enquiry type: ${enquiryLabel(data.enquiryType)}`,
    `Product / service: ${data.product}`,
    data.quantity ? `Quantity / annual volume: ${data.quantity}` : "",
    data.targetMarket ? `Target market / destination: ${data.targetMarket}` : "",
    "",
    // WhatsApp and email, not the office numbers — the site publishes no call
    // action, and the acknowledgement should not be the one place that does.
    urgentLine(),
    "",
    site.name,
    contact.office.lines.join(", "),
  ]
    .filter((line) => line !== "")
    .join("\n");
}

/** The "if it is urgent" line, built from whichever channels are configured. */
function urgentLine() {
  const channels: string[] = [];
  const whatsapp = whatsappHref();
  if (whatsapp) channels.push(`WhatsApp: ${whatsapp}`);
  if (contact.email) channels.push(`Email: ${contact.email}`);
  const teams = teamsHref();
  if (teams) channels.push(`Microsoft Teams: ${teams}`);

  if (!channels.length) return "";
  return `If your requirement is urgent, you can also reach us on — ${channels.join(" · ")}`;
}

/**
 * Sends the internal lead email and the acknowledgement to the enquirer.
 * Returns `delivered: false` when SMTP is not configured, so the caller can
 * decide what to do (accept and log in development, fail loudly in production).
 */
export async function sendRfqEmails(
  data: RfqInput,
  attachments: RfqAttachment[],
  reference?: string,
) {
  const config = readConfig();
  if (!config) return { delivered: false as const };

  const transport = getTransport(config);
  const ref = reference ? ` [${reference}]` : "";
  const subject = `RFQ — ${enquiryLabel(data.enquiryType)} — ${data.company} (${data.country})${ref}`;

  await transport.sendMail({
    from: { name: `${site.name} Website`, address: config.from },
    to: config.to,
    replyTo: { name: data.name, address: data.email },
    subject,
    text: `${reference ? `Reference: ${reference}\n\n` : ""}${leadText(data, attachments)}`,
    html: `${
      reference
        ? `<p style="margin:0 0 12px;color:#64748b;font-size:13px">Reference <strong>${escapeHtml(reference)}</strong></p>`
        : ""
    }${leadHtml(data, attachments)}`,
    attachments: attachments.map((file) => ({
      filename: file.filename,
      content: file.content,
      contentType: file.contentType,
    })),
  });

  // The acknowledgement is best-effort: a bounce here must not lose the lead.
  try {
    await transport.sendMail({
      from: { name: site.name, address: config.from },
      to: { name: data.name, address: data.email },
      subject: reference
        ? `We have received your enquiry — ${reference}`
        : `We have received your enquiry — ${site.name}`,
      text: acknowledgementText(data, reference),
    });
  } catch (error) {
    console.error("[rfq] acknowledgement email failed", error);
  }

  return { delivered: true as const };
}

/* --------------------------------------------------------- Follow-up mail */

/**
 * The "mark as answered" link put at the foot of every internal reminder.
 *
 * One click closes the enquiry so it stops being chased. The token is the
 * shared reminder secret — the same one the cron job presents — so the link is
 * only usable by someone who already has it. It is a low-value action behind a
 * shared secret rather than a per-enquiry signature, which is proportionate:
 * the worst a leaked link does is stop a reminder.
 */
const answeredLink = (reference: string) => {
  const secret = process.env.REMINDER_SECRET;
  if (!secret) return "";
  return `${siteUrl}/api/reminders?token=${encodeURIComponent(secret)}&answered=${encodeURIComponent(reference)}`;
};

/** Stage 1 — nudges the sales inbox about an enquiry nobody has closed. */
async function sendInternalReminder(transport: Transporter, config: SmtpConfig, record: EnquiryRecord) {
  const age = Math.round((Date.now() - record.createdAt.getTime()) / 3_600_000);
  const close = answeredLink(record.reference);

  const lines = [
    `Enquiry ${record.reference} has been open for ${age} hours.`,
    "",
    describeEnquiry(record),
    `From: ${record.name} <${record.email}>`,
    `Received: ${record.createdAt.toISOString()}`,
    "",
    "Reply to the original enquiry email to answer it — replies go straight to the enquirer.",
    close ? `Mark it as answered so it stops being chased: ${close}` : "",
  ].filter(Boolean);

  await transport.sendMail({
    from: { name: `${site.name} Website`, address: config.from },
    to: config.to,
    replyTo: { name: record.name, address: record.email },
    subject: `Reminder — enquiry ${record.reference} still open (${record.company})`,
    text: lines.join("\n"),
  });
}

/**
 * Stage 2 — tells the enquirer their enquiry is still live.
 *
 * Careful about what it promises: it does not say a quotation is coming on any
 * particular day, because nothing here knows that.
 */
async function sendEnquirerReminder(transport: Transporter, config: SmtpConfig, record: EnquiryRecord) {
  const lines = [
    `Dear ${record.name},`,
    "",
    `We are following up on the enquiry you sent ${site.name} (reference ${record.reference}):`,
    "",
    describeEnquiry(record),
    "",
    "It is still with our team. If anything has changed — the quantity, the specification, the destination market — reply to this email and we will work to the latest version.",
    "",
    urgentLine(),
    "",
    site.name,
    contact.office.lines.join(", "),
  ].filter((line) => line !== "");

  await transport.sendMail({
    from: { name: site.name, address: config.from },
    to: { name: record.name, address: record.email },
    replyTo: config.to,
    subject: `Following up on your enquiry — ${record.reference}`,
    text: lines.join("\n"),
  });
}

/**
 * Sends one batch of due reminders.
 *
 * Each is sent and marked individually, so one bad address cannot block the
 * rest of the batch. `markReminded` is passed in rather than imported here to
 * keep this module free of database access — the mailer sends, the caller
 * records.
 */
export async function sendReminders(
  due: DueReminder[],
  markReminded: (reference: string, stage: number) => Promise<void>,
) {
  const config = readConfig();
  if (!config) return { delivered: false as const, sent: 0, failed: 0 };

  const transport = getTransport(config);
  let sent = 0;
  let failed = 0;

  for (const { record, stage } of due) {
    try {
      if (stage.audience === "internal") {
        await sendInternalReminder(transport, config, record);
      } else {
        await sendEnquirerReminder(transport, config, record);
      }
      await markReminded(record.reference, stage.stage);
      sent += 1;
    } catch (error) {
      console.error(`[reminders] stage ${stage.stage} failed for ${record.reference}`, error);
      failed += 1;
    }
  }

  return { delivered: true as const, sent, failed };
}
