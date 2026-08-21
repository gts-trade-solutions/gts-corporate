import nodemailer, { type Transporter } from "nodemailer";
import { enquiryLabel } from "@/data/enquiry";
import { contact, site, siteUrl } from "@/data/site";
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

function acknowledgementText(data: RfqInput) {
  return [
    `Dear ${data.name},`,
    "",
    `Thank you for contacting ${site.name}. We have received your enquiry regarding "${data.product}" (${enquiryLabel(
      data.enquiryType,
    )}) and our team will review it and come back to you.`,
    "",
    "Summary of what you sent us:",
    `Enquiry type: ${enquiryLabel(data.enquiryType)}`,
    `Product / service: ${data.product}`,
    data.quantity ? `Quantity / annual volume: ${data.quantity}` : "",
    data.targetMarket ? `Target market / destination: ${data.targetMarket}` : "",
    "",
    "If your requirement is urgent, you can also reach us on:",
    ...contact.phones,
    "",
    site.name,
    contact.office.lines.join(", "),
  ]
    .filter((line) => line !== "")
    .join("\n");
}

/**
 * Sends the internal lead email and the acknowledgement to the enquirer.
 * Returns `delivered: false` when SMTP is not configured, so the caller can
 * decide what to do (accept and log in development, fail loudly in production).
 */
export async function sendRfqEmails(data: RfqInput, attachments: RfqAttachment[]) {
  const config = readConfig();
  if (!config) return { delivered: false as const };

  const transport = getTransport(config);
  const subject = `RFQ — ${enquiryLabel(data.enquiryType)} — ${data.company} (${data.country})`;

  await transport.sendMail({
    from: { name: `${site.name} Website`, address: config.from },
    to: config.to,
    replyTo: { name: data.name, address: data.email },
    subject,
    text: leadText(data, attachments),
    html: leadHtml(data, attachments),
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
      subject: `We have received your enquiry — ${site.name}`,
      text: acknowledgementText(data),
    });
  } catch (error) {
    console.error("[rfq] acknowledgement email failed", error);
  }

  return { delivered: true as const };
}
