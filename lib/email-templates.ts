// HTML-templates voor uitgaande mail, in KREATIVES-stijl.
// Geen "server-only": puur presentatie, ook los te renderen/testen.

const INK = "#111111";
const OFF = "#F4F3EF";
const ORANGE = "#FD6D17";
const MUTED = "#6b6960";

export const CALENDLY_URL =
  "https://calendly.com/info-jtw/blueprint-sessie";
export const WHATSAPP_URL = "https://wa.me/31613066250";
export const SITE_URL = "https://www.kreatives.nl";

export type ContactMail = {
  name: string;
  email: string;
  company?: string;
  website?: string;
  subject: string;
  message: string;
  source: string;
};

export function escapeHtml(s: string): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function firstName(name: string): string {
  return (name || "").trim().split(/\s+/)[0] || "";
}

function shell(preheader: string, body: string): string {
  return `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:${OFF};">
<span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${escapeHtml(
    preheader
  )}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${OFF};padding:28px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;font-family:Arial,Helvetica,sans-serif;">
      <tr><td style="background:${INK};padding:22px 30px;border-radius:16px 16px 0 0;">
        <span style="color:#ffffff;font-size:19px;font-weight:bold;letter-spacing:0.5px;">KREATIVES</span>
      </td></tr>
      <tr><td style="height:4px;line-height:4px;font-size:0;background:${ORANGE};">&nbsp;</td></tr>
      <tr><td style="background:#ffffff;padding:34px 30px;">${body}</td></tr>
      <tr><td style="background:#ffffff;padding:0 30px 30px;border-radius:0 0 16px 16px;">
        <div style="border-top:1px solid #eceae4;padding-top:18px;color:${MUTED};font-size:12px;line-height:1.6;">
          KREATIVES &middot; <a href="mailto:info@kreatives.nl" style="color:${MUTED};text-decoration:none;">info@kreatives.nl</a> &middot; +31 6 13 06 62 50<br>
          <a href="${SITE_URL}" style="color:${ORANGE};text-decoration:none;">www.kreatives.nl</a>
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function button(href: string, label: string, primary = true): string {
  const bg = primary ? ORANGE : "#ffffff";
  const color = primary ? "#ffffff" : INK;
  const border = primary ? ORANGE : "#d8d6cf";
  return `<a href="${href}" style="display:inline-block;background:${bg};color:${color};border:1px solid ${border};text-decoration:none;font-weight:bold;font-size:14px;padding:12px 22px;border-radius:999px;margin:0 8px 8px 0;">${escapeHtml(
    label
  )}</a>`;
}

export function buildNotificationEmail(data: ContactMail) {
  const rows: [string, string, boolean][] = [
    ["Naam", data.name, false],
    ["E-mail", data.email, true],
    ["Bedrijf", data.company || "—", false],
    ["Website", data.website || "—", false],
    ["Onderwerp", data.subject, false],
    ["Via", data.source, false],
  ];

  const rowHtml = rows
    .map(([k, v, isEmail]) => {
      const val =
        isEmail && v && v !== "—"
          ? `<a href="mailto:${escapeHtml(v)}" style="color:${ORANGE};text-decoration:none;">${escapeHtml(
              v
            )}</a>`
          : `<strong style="color:${INK};">${escapeHtml(v)}</strong>`;
      return `<tr><td style="padding:7px 18px 7px 0;color:${MUTED};font-size:14px;white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:7px 0;font-size:14px;">${val}</td></tr>`;
    })
    .join("");

  const body = `
    <h1 style="margin:0 0 4px;font-size:23px;color:${INK};">Nieuwe aanvraag</h1>
    <p style="margin:0 0 22px;color:${MUTED};font-size:14px;">Binnengekomen via ${escapeHtml(
      data.source
    )}.</p>
    <table role="presentation" cellpadding="0" cellspacing="0">${rowHtml}</table>
    <p style="margin:24px 0 8px;color:${MUTED};font-size:13px;text-transform:uppercase;letter-spacing:0.04em;">Bericht</p>
    <div style="background:${OFF};border:1px solid #eceae4;border-radius:10px;padding:16px 18px;color:#2a2a2a;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(
      data.message
    )}</div>
    <div style="margin-top:24px;">${button(
      `mailto:${data.email}`,
      "Beantwoorden"
    )}</div>`;

  const text = [
    "Nieuwe aanvraag via de website",
    `Via: ${data.source}`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Bericht:",
    data.message,
  ].join("\n");

  return {
    subject: `Nieuwe aanvraag — ${data.name}${
      data.company ? ` (${data.company})` : ""
    }`,
    html: shell(`Nieuwe aanvraag van ${data.name}`, body),
    text,
  };
}

export function buildConfirmationEmail(data: ContactMail) {
  const isRedesign = /redesign/i.test(data.source);
  const fn = firstName(data.name);
  const hi = fn ? `Bedankt, ${escapeHtml(fn)}!` : "Bedankt!";

  const intro = isRedesign
    ? "We hebben je aanvraag voor een gratis hero-redesign ontvangen. We gaan ermee aan de slag en sturen je binnenkort een vers voorstel. Je hoort snel van ons."
    : "We hebben je bericht ontvangen en nemen binnen één werkdag contact met je op, met een eerste reactie en concrete vervolgstappen.";

  const body = `
    <h1 style="margin:0 0 14px;font-size:26px;color:${INK};line-height:1.15;">${hi}</h1>
    <p style="margin:0 0 22px;color:#444;font-size:15px;line-height:1.65;">${intro}</p>
    <p style="margin:0 0 18px;color:#444;font-size:15px;line-height:1.65;">Liever meteen sparren? Plan direct een gesprek of stuur ons een berichtje.</p>
    <div>
      ${button(CALENDLY_URL, "Plan een gesprek", true)}
      ${button(WHATSAPP_URL, "Stuur een WhatsApp", false)}
    </div>
    <p style="margin:26px 0 0;color:${MUTED};font-size:13px;line-height:1.6;">Tot snel,<br>Team KREATIVES</p>`;

  const text = [
    fn ? `Bedankt, ${fn}!` : "Bedankt!",
    "",
    isRedesign
      ? "We hebben je aanvraag voor een gratis hero-redesign ontvangen. We sturen je binnenkort een vers voorstel."
      : "We hebben je bericht ontvangen en nemen binnen één werkdag contact met je op.",
    "",
    `Plan een gesprek: ${CALENDLY_URL}`,
    `WhatsApp: ${WHATSAPP_URL}`,
    "",
    "Tot snel, Team KREATIVES",
  ].join("\n");

  return {
    subject: isRedesign
      ? "We hebben je aanvraag ontvangen — KREATIVES"
      : "Bedankt voor je bericht — KREATIVES",
    html: shell(
      isRedesign
        ? "We gaan met je hero-sectie aan de slag."
        : "We nemen snel contact met je op.",
      body
    ),
    text,
  };
}
