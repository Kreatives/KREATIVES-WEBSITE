import "server-only";
import nodemailer from "nodemailer";

// SMTP-config komt uit environment variables (nooit in de repo).
// Hostinger: host smtp.hostinger.com, poort 465 (SSL).
const host = process.env.SMTP_HOST ?? "smtp.hostinger.com";
const port = Number(process.env.SMTP_PORT ?? 465);
const user = process.env.SMTP_USER ?? "";
const pass = process.env.SMTP_PASS ?? "";
// Waar de inzendingen naartoe gestuurd worden (standaard naar het SMTP-account zelf).
const to = process.env.CONTACT_TO ?? user;

export function mailerConfigured(): boolean {
  return Boolean(host && user && pass);
}

let cached: nodemailer.Transporter | null = null;
function transport() {
  if (!cached) {
    cached = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = impliciete SSL, 587 = STARTTLS
      auth: { user, pass },
    });
  }
  return cached;
}

export type ContactMail = {
  name: string;
  email: string;
  company?: string;
  website?: string;
  subject: string;
  message: string;
  source: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Stuurt de inzending door naar de inbox. Gooit bij een SMTP-fout. */
export async function sendContactMail(data: ContactMail): Promise<void> {
  if (!mailerConfigured()) {
    throw new Error("SMTP is niet geconfigureerd.");
  }

  const rows: [string, string][] = [
    ["Naam", data.name],
    ["E-mail", data.email],
    ["Bedrijf", data.company || "—"],
    ["Website", data.website || "—"],
    ["Onderwerp", data.subject],
    ["Via", data.source],
  ];

  const textLines = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Bericht:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.5">
      <h2 style="margin:0 0 16px">Nieuwe aanvraag via de website</h2>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(
                v
              )}</strong></td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:16px 0 4px;color:#666">Bericht:</p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
    </div>`;

  await transport().sendMail({
    from: `"KREATIVES website" <${user}>`,
    to,
    replyTo: data.email ? `"${data.name}" <${data.email}>` : undefined,
    subject: `Nieuwe aanvraag — ${data.name}${
      data.company ? ` (${data.company})` : ""
    }`,
    text: textLines,
    html,
  });
}
