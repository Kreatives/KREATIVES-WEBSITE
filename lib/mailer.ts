import "server-only";
import nodemailer from "nodemailer";
import {
  buildNotificationEmail,
  buildConfirmationEmail,
  type ContactMail,
} from "@/lib/email-templates";

export type { ContactMail };

// SMTP-config komt uit environment variables (nooit in de repo).
// Hostinger: host smtp.hostinger.com, poort 465 (SSL).
const host = process.env.SMTP_HOST ?? "smtp.hostinger.com";
const port = Number(process.env.SMTP_PORT ?? 465);
const user = process.env.SMTP_USER ?? "";
const pass = process.env.SMTP_PASS ?? "";
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

/** Notificatie naar KREATIVES dat er een nieuwe aanvraag binnen is. */
export async function sendContactMail(data: ContactMail): Promise<void> {
  if (!mailerConfigured()) throw new Error("SMTP is niet geconfigureerd.");
  const mail = buildNotificationEmail(data);
  await transport().sendMail({
    from: `"KREATIVES website" <${user}>`,
    to,
    replyTo: data.email ? `"${data.name}" <${data.email}>` : undefined,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
}

/** Bevestigingsmail naar de aanvrager zelf. */
export async function sendConfirmationMail(data: ContactMail): Promise<void> {
  if (!mailerConfigured()) throw new Error("SMTP is niet geconfigureerd.");
  if (!data.email) return;
  const mail = buildConfirmationEmail(data);
  await transport().sendMail({
    from: `"KREATIVES" <${user}>`,
    to: data.email,
    replyTo: `"KREATIVES" <${user}>`,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
}
