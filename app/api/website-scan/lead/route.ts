import { NextRequest, NextResponse } from "next/server";
import {
  attachLead,
  getScanRow,
  type ScanContact,
} from "@/lib/scan-server";
import { createLeadPageWithRetry, resultUrlFor } from "@/lib/notion";
import { sendLeadNotification, sendVisitorReport } from "@/lib/scan-mail";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => ({}));

  // Honeypot: stilletjes ok teruggeven, niets verwerken.
  if (typeof raw?.company_url === "string" && raw.company_url) {
    return NextResponse.json({ ok: true });
  }

  const id = String(raw?.id ?? "");
  const contact: ScanContact = {
    voornaam: String(raw?.voornaam ?? "").trim(),
    // Lowercase opslaan: de boekingswebhook matcht op e-mailadres en doet dat
    // ook lowercase. Zonder dit mist een lead met hoofdletters in het adres.
    email: String(raw?.email ?? "").trim().toLowerCase(),
    telefoon: String(raw?.telefoon ?? "").trim(),
    bedrijf: String(raw?.bedrijf ?? "").trim(),
  };
  if (!id || !contact.email || !contact.voornaam || !contact.bedrijf) {
    return NextResponse.json({ ok: false, error: "incomplete" }, { status: 400 });
  }

  const row = await getScanRow(id);
  if (!row) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  const resultUrl = resultUrlFor(id);

  // 1. Contactgegevens meteen bewaren (los van Notion/mail).
  await attachLead(id, contact, null).catch((e) =>
    console.error("[website-scan] attachLead faalde:", e)
  );

  // 2. Notion — met retries; faalt het, dan merkt de bezoeker er niets van.
  let notionPageId: string | null = null;
  let notionFailed = false;
  try {
    notionPageId = await createLeadPageWithRetry({ ...row, contact }, contact, resultUrl);
    await attachLead(id, contact, notionPageId).catch(() => {});
  } catch (e) {
    notionFailed = true;
    console.error("[website-scan] Notion faalde:", e);
  }

  // 3. Mail naar KREATIVES + naar de bezoeker (best-effort).
  try {
    await sendLeadNotification(row, contact, resultUrl, notionPageId, notionFailed);
  } catch (e) {
    console.error("[website-scan] notificatiemail faalde:", e);
  }
  try {
    await sendVisitorReport(row, contact, resultUrl);
  } catch (e) {
    console.error("[website-scan] bezoekersmail faalde:", e);
  }

  return NextResponse.json({ ok: true });
}
