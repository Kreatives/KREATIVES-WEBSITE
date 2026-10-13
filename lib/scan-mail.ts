import "server-only";
import { CALENDLY } from "@/lib/site";
import type { ScanContact, ScanRow } from "@/lib/scan-server";
import { budgetToNumber, leadRating } from "@/lib/scan-server";

const FROM = () => process.env.RESEND_FROM ?? "KREATIVES <scan@kreatives.nl>";
const NOTIFY = () => process.env.LEAD_NOTIFY_EMAIL ?? "info@kreatives.nl";
const BOOKING = () => process.env.BOOKING_URL ?? CALENDLY;

async function resend(payload: {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  reply_to?: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY ontbreekt.");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Resend: ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
}

function esc(s: string): string {
  return (s || "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));
}

/** Notificatie naar KREATIVES bij elke lead met contactgegevens. */
export async function sendLeadNotification(
  row: ScanRow,
  contact: ScanContact,
  resultUrl: string,
  notionPageId: string | null,
  notionFailed: boolean
): Promise<void> {
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

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
    <h2>Nieuwe scan-lead: ${esc(contact.bedrijf)} — rating ${rating}/5</h2>
    ${notionLine}
    <table>${table}</table>
    <p><a href="${resultUrl}">Bekijk de resultaatpagina</a></p>
  </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nRapport: ${resultUrl}`;

  await resend({
    from: FROM(),
    to: NOTIFY(),
    reply_to: contact.email,
    subject: `Nieuwe scan-lead: ${contact.bedrijf} – rating ${rating}/5`,
    html,
    text,
  });
}

/** Volledige rapport naar de bezoeker. */
export async function sendVisitorReport(
  row: ScanRow,
  contact: ScanContact,
  resultUrl: string
): Promise<void> {
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

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;max-width:560px">
    <h2>Je website-diagnose</h2>
    ${body}
    <p><a href="${resultUrl}" style="display:inline-block;background:#fd6d17;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none">Bekijk je volledige rapport</a></p>
    <p>Wil je het samen doorlopen? <a href="${BOOKING()}">Plan een gratis gesprek van 30 minuten</a>.</p>
    <p style="color:#888;font-size:13px">Deze scan is een automatische eerste analyse. In een gesprek kijk ik er zelf naar.</p>
  </div>`;
  const text = `Je website-diagnose staat klaar: ${resultUrl}\n\nPlan een gesprek: ${BOOKING()}`;

  await resend({
    from: FROM(),
    to: contact.email,
    subject: "Je website-diagnose van KREATIVES",
    html,
    text,
  });
}
