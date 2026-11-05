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
  if (!id) {
    return NextResponse.json({ ok: false, error: "incomplete" }, { status: 400 });
  }

  const row = await getScanRow(id);
  if (!row) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  // Samenvoegen met wat vooraf is opgeslagen (naam + WhatsApp). De post-result
  // vorm vult meestal alleen een e-mailadres aan.
  const prev = row.contact;
  const contact: ScanContact = {
    voornaam: String(raw?.voornaam ?? "").trim() || prev?.voornaam || "",
    // Lowercase opslaan: de boekingswebhook matcht op e-mailadres en doet dat
    // ook lowercase. Zonder dit mist een lead met hoofdletters in het adres.
    email: (String(raw?.email ?? "").trim() || prev?.email || "").toLowerCase(),
    telefoon: String(raw?.telefoon ?? "").trim() || prev?.telefoon || "",
    bedrijf: String(raw?.bedrijf ?? "").trim() || prev?.bedrijf || "",
  };
  if (!contact.voornaam || (!contact.email && !contact.telefoon)) {
    return NextResponse.json({ ok: false, error: "incomplete" }, { status: 400 });
  }

  const resultUrl = resultUrlFor(id);

  // Lead staat al in Notion (vooraf aangemaakt): alleen de contactgegevens
  // aanvullen (bijv. e-mail) en het rapport mailen. Geen dubbele entry.
  if (row.notion_page_id) {
    await attachLead(id, contact, row.notion_page_id).catch((e) =>
      console.error("[website-scan] attachLead faalde:", e)
    );
    if (contact.email) {
      try {
        await sendVisitorReport({ ...row, contact }, contact, resultUrl);
      } catch (e) {
        console.error("[website-scan] bezoekersmail faalde:", e);
      }
    }
    return NextResponse.json({ ok: true });
  }

  // Fallback: vooraf-registratie is niet gelukt → nu alsnog volledig aanmaken.
  await attachLead(id, contact, null).catch((e) =>
    console.error("[website-scan] attachLead faalde:", e)
  );

  let notionPageId: string | null = null;
  let notionFailed = false;
  try {
    notionPageId = await createLeadPageWithRetry({ ...row, contact }, contact, resultUrl);
    await attachLead(id, contact, notionPageId).catch(() => {});
  } catch (e) {
    notionFailed = true;
    console.error("[website-scan] Notion faalde:", e);
  }

  try {
    await sendLeadNotification(row, contact, resultUrl, notionPageId, notionFailed);
  } catch (e) {
    console.error("[website-scan] notificatiemail faalde:", e);
  }
  if (contact.email) {
    try {
      await sendVisitorReport(row, contact, resultUrl);
    } catch (e) {
      console.error("[website-scan] bezoekersmail faalde:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
