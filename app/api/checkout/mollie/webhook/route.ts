import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import { euro } from "@/app/starter/afrekenen/checkout-express-data";
import { sendOrderConfirmation, sendOrderNotification } from "@/lib/mailer";
import { createServiceClient } from "@/lib/supabase/service";

// Nodemailer + Supabase hebben de Node-runtime nodig.
export const runtime = "nodejs";
export const maxDuration = 30;

// Mollie roept deze webhook aan zodra de betaalstatus wijzigt. Bij een geslaagde
// (eerste) betaling sturen we de klant een korte bevestiging en KREATIVES een
// melding. We geven altijd 200 terug, anders blijft Mollie het herhalen.
export async function POST(request: NextRequest) {
  const apiKey = process.env.MOLLIE_API_KEY;

  let id = "";
  try {
    const form = await request.formData();
    id = String(form.get("id") || "");
  } catch {
    try {
      const body = (await request.json()) as Record<string, unknown>;
      id = typeof body.id === "string" ? body.id : "";
    } catch {
      id = "";
    }
  }

  if (!apiKey || !id) return NextResponse.json({ ok: true });

  try {
    const mollie = createMollieClient({ apiKey });
    const payment = await mollie.payments.get(id);

    // Alleen de eerste/eenmalige betaling bevestigen, niet de automatische
    // tweede termijn (die komt als "recurring" binnen).
    if (payment.status === "paid" && payment.sequenceType !== "recurring") {
      const m = (payment.metadata || {}) as Record<string, unknown>;
      const str = (k: string) => (typeof m[k] === "string" ? (m[k] as string) : "");
      const num = (k: string) =>
        typeof m[k] === "number" ? (m[k] as number) : Number(m[k]) || 0;

      const naam = str("naam") || str("email");
      const split = str("plan") === "split";
      const data = {
        voornaam: naam.split(" ")[0] || naam,
        naam,
        email: str("email"),
        telefoon: str("telefoon"),
        bedrijf: str("bedrijf"),
        adres: str("adres"),
        kvk: str("kvk"),
        pakket: str("pakket"),
        product: str("product") || "KREATIVES Express",
        total: euro(num("total")),
        betaaldNu: euro(num("nu")),
        rest: split ? euro(num("rest")) : undefined,
        split,
        addons: str("addons"),
      };

      // Bestelling vastleggen zodat de intake eraan gekoppeld kan worden.
      try {
        const sb = createServiceClient();
        await sb.from("orders").upsert(
          {
            mollie_payment_id: payment.id,
            email: str("email"),
            naam,
            telefoon: str("telefoon"),
            bedrijf: str("bedrijf"),
            pakket: str("pakket"),
            product: str("product"),
            plan: str("plan"),
            total: num("total"),
            betaald_nu: num("nu"),
            rest: num("rest"),
            addons: str("addons"),
            status: "paid",
          },
          { onConflict: "mollie_payment_id" }
        );
      } catch (e) {
        console.error("Order opslaan mislukt:", e instanceof Error ? e.message : e);
      }

      await sendOrderConfirmation(data).catch(() => {});
      await sendOrderNotification(data).catch(() => {});
    }
  } catch {
    // Stil falen: nooit een fout teruggeven aan Mollie.
  }

  return NextResponse.json({ ok: true });
}
