import "server-only";
import nodemailer from "nodemailer";
import { SCAN_BOOKING } from "@/lib/scan";
import type { ScanContact, ScanRow } from "@/lib/scan-server";
import { budgetToNumber, leadRating } from "@/lib/scan-server";

// Hergebruikt dezelfde SMTP-config als het contactformulier (lib/mailer.ts).
const host = process.env.SMTP_HOST ?? "smtp.hostinger.com";
const port = Number(process.env.SMTP_PORT ?? 465);
const user = process.env.SMTP_USER ?? "";
const pass = process.env.SMTP_PASS ?? "";
const NOTIFY = () => process.env.LEAD_NOTIFY_EMAIL || process.env.CONTACT_TO || user;
const BOOKING = () => process.env.BOOKING_URL ?? SCAN_BOOKING;

let cached: nodemailer.Transporter | null = null;
function transport() {
  if (!cached) {
    cached = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return cached;
}

function esc(s: string): string {
  return (s || "").replace(
    /[&<>]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string)
  );
}

/** Notificatie naar KREATIVES bij elke lead met contactgegevens. */
export async function sendLeadNotification(
  row: ScanRow,
  contact: ScanContact,
  resultUrl: string,
  notionPageId: string | null,
  notionFailed: boolean
): Promise<void> {
  if (!user || !pass) throw new Error("SMTP niet geconfigureerd.");
  const a = row.answers;
  const branche = a.branche === "Anders" ? a.brancheAnders : a.branche;
  const rating = leadRating(a.budget, a.timing);
  const score = row.report?.totaalscore ?? "-";
  const verdict = row.report?.eindoordeel.zouActieOndernemen ?? "-";
  const notionLine = notionFailed
    ? `<p style="color:#c0392b"><strong>LET OP: niet in Notion gezet.</strong></p>`
    : notionPageId
    ? `<p>Notion: https://www.notion.so/${notionPageId.replace(/-/g, "")}</p>`
    : "";

  const rows: [string, string][] = [
    ["Naam", contact.voornaam],
    ["Bedrijf", contact.bedrijf],
    ["E-mail", contact.email],
    ["Telefoon", contact.telefoon || "-"],
    ["Website", row.url || "nog geen website"],
    ["Branche", branche || "-"],
    ["Budget", `${a.budget} (${budgetToNumber(a.budget) ?? "-"})`],
    ["Timing", a.timing || "-"],
    ["Totaalscore", `${score}/100`],
    ["Eindoordeel", String(verdict)],
  ];
  const table = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${esc(
          String(v)
        )}</strong></td></tr>`
    )
    .join("");

  await transport().sendMail({
    from: `"KREATIVES Scan" <${user}>`,
    to: NOTIFY(),
    replyTo: contact.email || undefined,
    subject: `Nieuwe scan-lead: ${contact.bedrijf} – rating ${rating}/5`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
      <h2>Nieuwe scan-lead: ${esc(contact.bedrijf)} — rating ${rating}/5</h2>
      ${notionLine}<table>${table}</table>
      <p><a href="${resultUrl}">Bekijk de resultaatpagina</a></p></div>`,
    text:
      rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nRapport: ${resultUrl}`,
  });
}

/** Volledige rapport naar de bezoeker. */
export async function sendVisitorReport(
  row: ScanRow,
  contact: ScanContact,
  resultUrl: string
): Promise<void> {
  if (!user || !pass) throw new Error("SMTP niet geconfigureerd.");
  if (!contact.email) return;
  const r = row.report;
  const pijn = r
    ? r.topPijnpunten
        .map((p) => `<li><strong>${esc(p.titel)}</strong><br>${esc(p.uitleg)}</li>`)
        .join("")
    : "";
  const body = r
    ? `<p>Je scan is klaar. Je homepage scoort <strong>${r.totaalscore}/100</strong> op overtuiging voor je ideale klant.</p>
       <p>${esc(r.eindoordeel.uitleg)}</p>
       <h3>Je grootste pijnpunten</h3><ol>${pijn}</ol>`
    : `<p>Bedankt. Je begint met een schone lei. In een gesprek maken we er een concreet plan van.</p>`;

  await transport().sendMail({
    from: `"KREATIVES" <${user}>`,
    to: contact.email,
    subject: "Je website-diagnose van KREATIVES",
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;max-width:560px">
      <h2>Je website-diagnose</h2>${body}
      <p><a href="${resultUrl}" style="display:inline-block;background:#fd6d17;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none">Bekijk je volledige rapport</a></p>
      <p>Wil je het samen doorlopen? <a href="${BOOKING()}">Plan een gratis gesprek van 30 minuten</a>.</p>
      <p style="color:#888;font-size:13px">Deze scan is een automatische eerste analyse. In een gesprek kijk ik er zelf naar.</p></div>`,
    text: `Je website-diagnose staat klaar: ${resultUrl}\n\nPlan een gesprek: ${BOOKING()}`,
  });
}
