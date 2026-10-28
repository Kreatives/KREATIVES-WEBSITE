import { NextRequest, NextResponse } from "next/server";
import { markCallBooked } from "@/lib/scan-server";
import { setStatus } from "@/lib/notion";

export const runtime = "nodejs";

// Webhook voor de boekingstool (Calendly/Cal.com). Zet de lead op
// "Call ingepland" zodra er een afspraak wordt geboekt. Best-effort; we matchen
// op e-mailadres.
//
// Beveiliging: staat BOOKING_WEBHOOK_SECRET in de omgeving, dan moet dezelfde
// waarde als `?secret=` of in de `x-webhook-secret`-header meekomen. Zonder die
// variabele blijft de route open, zodat een bestaande koppeling niet breekt.
function authorized(req: NextRequest): boolean {
  const secret = process.env.BOOKING_WEBHOOK_SECRET;
  if (!secret) return true;
  const given =
    req.nextUrl.searchParams.get("secret") ??
    req.headers.get("x-webhook-secret") ??
    "";
  return given === secret;
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

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
