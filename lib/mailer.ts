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

// ---------- Bestelbevestiging (Express-checkout) ----------

export type OrderMailData = {
  voornaam: string;
  naam: string;
  email: string;
  telefoon?: string;
  bedrijf?: string;
  adres?: string;
  kvk?: string;
  product: string; // bv. "Website+"
  total: string; // geformatteerd, bv. "€1.566,95"
  betaaldNu: string; // bedrag dat nu is betaald
  rest?: string; // tweede termijn (alleen bij split)
  split: boolean;
  addons?: string; // bv. "Extra pagina x2"
};

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function asHtml(text: string): string {
  return `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a">${esc(
    text,
  ).replace(/\n/g, "<br>")}</div>`;
}

/** Korte bevestiging naar de klant. Bewust simpel en zonder hoofdletter-geschreeuw. */
export async function sendOrderConfirmation(o: OrderMailData): Promise<void> {
  if (!mailerConfigured() || !o.email) return;
  const betaling = o.split
    ? `je hebt nu ${o.betaaldNu} betaald. de tweede termijn van ${o.rest} schrijf ik automatisch via Mollie af zodra je het ontwerp hebt goedgekeurd. het totaal is ${o.total}.`
    : `je hebt ${o.total} in één keer betaald.`;
  const text = `hoi ${o.voornaam},

bedankt voor je bestelling. hier is kort wat je hebt gekozen:

${o.product}${o.addons ? `\nextra's: ${o.addons}` : ""}

${betaling}

de volgende stap is de intake, een kort formulier zodat ik precies weet wat je nodig hebt. zodra je spullen binnen zijn, zie je het eerste ontwerp binnen 48 uur.

heb je een vraag, reageer dan gewoon op deze mail.

groet,
ricky
kreatives`;
  await transport().sendMail({
    from: `"Ricky · Kreatives" <${user}>`,
    to: o.email,
    replyTo: `"Ricky · Kreatives" <${user}>`,
    subject: `je bestelling bij kreatives — ${o.product}`,
    text,
    html: asHtml(text),
  });
}

/** Interne melding naar KREATIVES dat er een bestelling binnen is. */
export async function sendOrderNotification(o: OrderMailData): Promise<void> {
  if (!mailerConfigured()) return;
  const lines = [
    "nieuwe bestelling via /starter.",
    "",
    `klant: ${o.naam}`,
    `e-mail: ${o.email}`,
    o.telefoon ? `telefoon: ${o.telefoon}` : "",
    o.bedrijf ? `bedrijf: ${o.bedrijf}` : "",
    o.adres ? `adres: ${o.adres}` : "",
    o.kvk ? `kvk: ${o.kvk}` : "",
    "",
    `pakket: ${o.product}`,
    o.addons ? `extra's: ${o.addons}` : "",
    `totaal: ${o.total}`,
    o.split
      ? `nu betaald: ${o.betaaldNu} — rest ${o.rest} na goedkeuring`
      : `in één keer betaald: ${o.total}`,
  ].filter((l) => l !== "");
  const text = lines.join("\n");
  await transport().sendMail({
    from: `"Kreatives bestellingen" <${user}>`,
    to,
    replyTo: o.email ? `"${o.naam}" <${o.email}>` : undefined,
    subject: `nieuwe bestelling: ${o.product} (${o.total})`,
    text,
    html: asHtml(text),
  });
}
