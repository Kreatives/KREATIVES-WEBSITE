import { NextRequest, NextResponse } from "next/server";
import { sendContactMail, mailerConfigured } from "@/lib/mailer";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Lead vanuit de prijscalculator. Wordt aangeroepen zodra iemand stap 1
 * (gegevens) heeft ingevuld en 30s niet verder is gegaan, of wanneer iemand
 * de offerte aanvraagt. Stuurt één notificatie naar KREATIVES.
 */
export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => ({}));

  // Honeypot
  if (typeof raw?.company_url === "string" && raw.company_url) {
    return NextResponse.json({ ok: true });
  }

  const naam = String(raw?.naam ?? "").trim();
  const email = String(raw?.email ?? "").trim();
  const bedrijf = String(raw?.bedrijf ?? "").trim();
  const telefoon = String(raw?.telefoon ?? "").trim();
  const project = String(raw?.project ?? "").trim();
  const indicatie = String(raw?.indicatie ?? "").trim();
  const fase = String(raw?.fase ?? "").trim();

  if (!naam || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "incomplete" }, { status: 400 });
  }
  if (!mailerConfigured()) {
    return NextResponse.json({ ok: false, error: "mailer" }, { status: 500 });
  }

  const message = [
    `Telefoon: ${telefoon || "—"}`,
    `Bedrijf: ${bedrijf || "—"}`,
    "",
    `Project: ${project || "nog niet ingevuld"}`,
    `Indicatie bouw: ${indicatie || "—"}`,
    "",
    `Status: ${fase || "—"}`,
  ].join("\n");

  try {
    await sendContactMail({
      name: naam,
      email,
      company: bedrijf || undefined,
      subject: "Nieuwe aanvraag via de prijscalculator",
      message,
      source: "prijscalculator",
    });
  } catch (e) {
    console.error("[calculator-lead] mail faalde:", e);
    return NextResponse.json({ ok: false, error: "send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
