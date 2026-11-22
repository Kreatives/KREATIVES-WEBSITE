import { NextRequest, NextResponse } from "next/server";
import { sendStarterLeadNotification, mailerConfigured } from "@/lib/mailer";
import { valideerEmail } from "@/lib/lead-validation";
import { findPakket, euroShort } from "@/app/starter/afrekenen/checkout-express-data";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Lead vanuit de e-mail opt-in op /starter/afrekenen. Wordt aangeroepen zodra
 * iemand zijn e-mailadres invult voordat hij de opties/afrekenen ziet. Stuurt
 * één notificatie naar KREATIVES, ook als er (nog) niet betaald wordt.
 */
export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => ({}));

  // Honeypot
  if (typeof raw?.company_url === "string" && raw.company_url) {
    return NextResponse.json({ ok: true });
  }

  const email = String(raw?.email ?? "").trim();
  const pakketId = String(raw?.pakket ?? "").trim();

  const fout = valideerEmail(email);
  if (fout) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  if (!mailerConfigured()) {
    return NextResponse.json({ ok: false, error: "mailer" }, { status: 500 });
  }

  const pkg = findPakket(pakketId);

  try {
    await sendStarterLeadNotification({
      email,
      pakketName: pkg.name,
      pakketPrice: euroShort(pkg.price),
    });
  } catch (e) {
    console.error("[starter-lead] mail faalde:", e);
    return NextResponse.json({ ok: false, error: "send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
