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

/** Nette, gebrande bevestiging naar de klant (licht gehouden voor de spamfilter). */
export async function sendOrderConfirmation(o: OrderMailData): Promise<void> {
  if (!mailerConfigured() || !o.email) return;

  const betaling = o.split
    ? `Je hebt nu ${o.betaaldNu} betaald. De tweede termijn van ${o.rest} schrijf ik automatisch via Mollie af zodra je het ontwerp hebt goedgekeurd. Het totaal is ${o.total}.`
    : `Je hebt ${o.total} in één keer betaald.`;

  const text = `Hoi ${o.voornaam},

Bedankt voor je bestelling. Hieronder staat kort wat je hebt gekozen.

${o.product}${o.addons ? `\nExtra's: ${o.addons}` : ""}

${betaling}

De volgende stap is de intake, een kort formulier zodat ik precies weet wat je nodig hebt. Zodra je spullen binnen zijn, zie je het eerste ontwerp binnen 48 uur.

Heb je een vraag? Reageer gewoon op deze mail.

Groet,
Ricky
KREATIVES`;

  const betalingHtml = o.split
    ? `<tr><td style="padding:4px 0;color:#555;">Nu betaald</td><td style="padding:4px 0;text-align:right;font-weight:600;color:#111;">${esc(o.betaaldNu)}</td></tr>
       <tr><td style="padding:4px 0;color:#555;">Tweede termijn</td><td style="padding:4px 0;text-align:right;color:#555;">${esc(o.rest ?? "")} na goedkeuring</td></tr>
       <tr><td style="padding:8px 0 0;border-top:1px solid #ececec;color:#111;font-weight:600;">Totaal</td><td style="padding:8px 0 0;border-top:1px solid #ececec;text-align:right;font-weight:600;color:#111;">${esc(o.total)}</td></tr>`
    : `<tr><td style="padding:4px 0;color:#555;">Betaald (in één keer)</td><td style="padding:4px 0;text-align:right;font-weight:600;color:#111;">${esc(o.total)}</td></tr>`;

  const html = `<!doctype html><html lang="nl"><body style="margin:0;padding:0;background:#f4f4f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #ececec;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
        <tr><td style="background:#111111;padding:20px 28px;">
          <span style="color:#ffffff;font-weight:700;letter-spacing:3px;font-size:16px;">KREATIVES</span>
        </td></tr>
        <tr><td style="background:#fe6d17;line-height:4px;font-size:4px;height:4px;">&nbsp;</td></tr>
        <tr><td style="padding:30px 28px 6px;color:#1a1a1a;font-size:15px;line-height:1.6;">
          <p style="margin:0 0 14px;font-size:19px;font-weight:600;color:#111;">Hoi ${esc(o.voornaam)},</p>
          <p style="margin:0 0 22px;">Bedankt voor je bestelling. Hieronder staat kort wat je hebt gekozen.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border:1px solid #ececec;border-radius:10px;">
            <tr><td style="padding:16px 18px 12px;">
              <div style="font-size:16px;font-weight:600;color:#111;">${esc(o.product)}</div>
              ${o.addons ? `<div style="font-size:13px;color:#777;margin-top:4px;">Extra's: ${esc(o.addons)}</div>` : ""}
            </td></tr>
            <tr><td style="padding:12px 18px 16px;border-top:1px solid #ececec;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">${betalingHtml}</table>
            </td></tr>
          </table>
          <p style="margin:24px 0 16px;">De volgende stap is de intake, een kort formulier zodat ik precies weet wat je nodig hebt. Zodra je spullen binnen zijn, zie je het eerste ontwerp binnen <strong>48 uur</strong>.</p>
          <p style="margin:0 0 24px;">Heb je een vraag? Reageer gewoon op deze mail.</p>
          <p style="margin:0;">Groet,<br><strong style="color:#111;">Ricky</strong><br><span style="color:#888;">KREATIVES</span></p>
        </td></tr>
        <tr><td style="padding:22px 28px;border-top:1px solid #ececec;color:#9a9a9a;font-size:12px;line-height:1.5;">
          Deze mail gaat over je bestelling op <a href="https://kreatives.nl/starter" style="color:#9a9a9a;">kreatives.nl</a>.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  await transport().sendMail({
    from: `"Ricky · KREATIVES" <${user}>`,
    to: o.email,
    replyTo: `"Ricky · KREATIVES" <${user}>`,
    subject: `Je bestelling bij KREATIVES — ${o.product}`,
    text,
    html,
  });
}

/** Interne melding naar KREATIVES dat er een bestelling binnen is. */
export async function sendOrderNotification(o: OrderMailData): Promise<void> {
  if (!mailerConfigured()) return;
  const lines = [
    "Nieuwe bestelling via /starter.",
    "",
    `Klant: ${o.naam}`,
    `E-mail: ${o.email}`,
    o.telefoon ? `Telefoon: ${o.telefoon}` : "",
    o.bedrijf ? `Bedrijf: ${o.bedrijf}` : "",
    o.adres ? `Adres: ${o.adres}` : "",
    o.kvk ? `KvK: ${o.kvk}` : "",
    "",
    `Pakket: ${o.product}`,
    o.addons ? `Extra's: ${o.addons}` : "",
    `Totaal: ${o.total}`,
    o.split
      ? `Nu betaald: ${o.betaaldNu} — rest ${o.rest} na goedkeuring`
      : `In één keer betaald: ${o.total}`,
  ].filter((l) => l !== "");
  const text = lines.join("\n");
  await transport().sendMail({
    from: `"KREATIVES bestellingen" <${user}>`,
    to,
    replyTo: o.email ? `"${o.naam}" <${o.email}>` : undefined,
    subject: `Nieuwe bestelling: ${o.product} (${o.total})`,
    text,
    html: asHtml(text),
  });
}
