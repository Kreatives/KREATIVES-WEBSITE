import { NextRequest, NextResponse } from "next/server";
import { assertSafeUrl, type ScanContact } from "@/lib/scan-server";
import { sendEarlyLeadNotification } from "@/lib/scan-mail";

export const runtime = "nodejs";
export const maxDuration = 30;

// Vroege lead-capture: wordt aangeroepen zodra de bezoeker naam + WhatsApp heeft
// ingevuld (stap 2), nog vóór de scan af is. Zo is de lead binnen, ook als de
// bezoeker halverwege afhaakt. De tweede, volledige verzending (Notion + mail
// met rapport) gebeurt daarna in /analyze zodra de scan klaar is.
export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => ({}));

  // Honeypot: stilletjes ok teruggeven.
  if (typeof raw?.company_url === "string" && raw.company_url) {
    return NextResponse.json({ ok: true });
  }

  const naam = String(raw?.naam ?? "").trim();
  const whatsapp = String(raw?.whatsapp ?? "").trim();
  if (naam.length < 2 || whatsapp.replace(/\D/g, "").length < 8) {
    return NextResponse.json({ ok: false, error: "incomplete" }, { status: 400 });
  }

  const geenWebsite = raw?.geenWebsite === true;
  const rawUrl = String(raw?.url ?? "").trim();
  let url: string | null = null;
  if (!geenWebsite && rawUrl) {
    try {
      url = assertSafeUrl(rawUrl).toString();
    } catch {
      url = rawUrl;
    }
  }

  let bedrijf = "Onbekend";
  if (url) {
    try {
      bedrijf = new URL(url).hostname.replace(/^www\./, "");
    } catch {
      /* laat bedrijf "Onbekend" */
    }
  }

  const contact: ScanContact = {
    voornaam: naam,
    email: "",
    telefoon: whatsapp,
    bedrijf,
  };

  try {
    await sendEarlyLeadNotification(contact, url);
  } catch (e) {
    console.error("[website-scan] vroege lead-mail faalde:", e);
  }

  return NextResponse.json({ ok: true });
}
