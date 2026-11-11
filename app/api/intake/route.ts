import { NextRequest, NextResponse } from "next/server";
import {
  QUESTIONS,
  PAKKET_LABEL,
  type Pakket,
  type Question,
} from "@/app/starter/intake/questions";
import { createServiceClient } from "@/lib/supabase/service";
import {
  sendIntakeNotification,
  sendIntakeConfirmation,
  type IntakeItem,
} from "@/lib/mailer";

// Nodemailer heeft de Node-runtime nodig; zonder dit faalt het versturen.
export const runtime = "nodejs";
export const maxDuration = 30;

type Answers = Record<string, unknown>;

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

// Antwoorden omzetten naar leesbare "label → waarde"-regels voor de e-mail.
function formatAnswers(pakket: string, answers: Answers): IntakeItem[] {
  const items: IntakeItem[] = [];
  for (const q of QUESTIONS as Question[]) {
    if (q.id === "pakket") continue; // staat al bovenaan
    if (q.onlyPakket && !q.onlyPakket.includes(pakket as Pakket)) continue;
    const v = answers[q.id];
    const label = `${q.num}. ${q.title}`;
    let value = "";
    if (q.type === "choice") {
      value = q.options?.find((o) => o.value === v)?.label ?? "";
    } else if (q.type === "choiceInput") {
      const ci = (v && typeof v === "object" ? v : {}) as { choice?: string; detail?: string };
      const opt = q.options?.find((o) => o.value === ci.choice);
      value = opt ? opt.label + (ci.detail ? ` — ${ci.detail}` : "") : "";
    } else if (q.type === "websites") {
      const rows = (Array.isArray(v) ? v : []) as { link?: string; reason?: string }[];
      value = rows
        .filter((r) => str(r.link) || str(r.reason))
        .map((r, i) => `${i + 1}. ${str(r.link)} — ${str(r.reason)}`)
        .join("\n");
    } else if (q.type === "consent") {
      value = v === true ? "Akkoord" : "Niet aangevinkt";
    } else {
      value = str(v);
    }
    items.push({ label, value });
  }
  return items;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  const email = str(body.email);
  const whatsapp = str(body.whatsapp);
  const pakket = str(body.pakket);
  const answers = (body.answers && typeof body.answers === "object" ? body.answers : {}) as Answers;

  if (!email || !email.includes("@") || !whatsapp) {
    return NextResponse.json(
      { error: "Vul je e-mailadres en WhatsApp-nummer in." },
      { status: 400 }
    );
  }

  const pakketLabel = PAKKET_LABEL[pakket as Pakket] ?? (pakket || "Onbekend");
  const items = formatAnswers(pakket, answers);

  // Twee kanalen: opslaan in de database én mailen. De inzending slaagt zolang
  // minstens één kanaal lukt, zodat de klant nooit vastloopt op een foutmelding.
  let dbOk = false;
  let orderFound = false;
  let product: string | undefined;
  try {
    const sb = createServiceClient();
    const { data: order } = await sb
      .from("orders")
      .select("id, product")
      .ilike("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (order?.id) {
      orderFound = true;
      product = (order as { product?: string }).product;
    }
    const { error: insErr } = await sb.from("intakes").insert({
      order_id: order?.id ?? null,
      order_found: orderFound,
      email,
      whatsapp,
      pakket,
      answers,
    });
    dbOk = !insErr;
    if (insErr) console.error("Intake opslaan mislukt:", insErr.message);
  } catch (e) {
    // Supabase niet beschikbaar (bv. lokaal zonder service-key) → mail blijft over.
    console.error("Supabase intake mislukt:", e instanceof Error ? e.message : e);
  }

  let emailOk = false;
  try {
    await withTimeout(
      sendIntakeNotification({ email, whatsapp, pakketLabel, orderFound, product, items }),
      15000
    );
    emailOk = true;
  } catch (e) {
    console.error("Intake-notificatie mislukt:", e instanceof Error ? e.message : e);
  }
  // Bevestiging naar de klant is altijd best-effort.
  withTimeout(sendIntakeConfirmation(email), 15000).catch((e) =>
    console.error("Intake-bevestiging naar klant mislukt:", e instanceof Error ? e.message : e)
  );

  if (!dbOk && !emailOk) {
    return NextResponse.json(
      { error: "Versturen is niet gelukt. Probeer het zo nog eens." },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true, orderFound });
}
