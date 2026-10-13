import { NextRequest, NextResponse } from "next/server";
import { markCallBooked } from "@/lib/scan-server";
import { setStatus } from "@/lib/notion";

export const runtime = "nodejs";

// Webhook voor de boekingstool (Calendly/Cal.com). Zet de lead op
// "Call ingepland" zodra er een afspraak wordt geboekt. Best-effort; we matchen
// op e-mailadres. (Handtekeningverificatie kan later toegevoegd worden.)
export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => ({}));
  // Calendly: payload.payload.email. Cal.com: payload.attendees[0].email.
  const email: string =
    raw?.payload?.email ||
    raw?.payload?.invitee?.email ||
    raw?.payload?.attendees?.[0]?.email ||
    raw?.email ||
    "";

  if (!email) return NextResponse.json({ ok: true });

  try {
    const pageId = await markCallBooked(email.trim().toLowerCase());
    if (pageId) await setStatus(pageId, ["Call ingepland"]);
  } catch (e) {
    console.error("[website-scan] booking-webhook faalde:", e);
  }
  return NextResponse.json({ ok: true });
}
