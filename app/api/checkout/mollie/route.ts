import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import { findPakket, totals } from "@/app/starter/afrekenen/checkout-express-data";

// Maakt een Mollie-betaling aan. Het bedrag wordt hier SERVER-SIDE herberekend
// uit het pakket + de add-ons — nooit het door de client gestuurde bedrag vertrouwen.
export async function POST(request: NextRequest) {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Mollie is niet geconfigureerd (MOLLIE_API_KEY ontbreekt)." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  const pkg = findPakket(typeof body.pakket === "string" ? body.pakket : undefined);
  const usePlus = Boolean(body.usePlus);
  const method = body.method === "card" ? "creditcard" : "ideal";
  const plan = body.plan === "split" ? "split" : "full";
  const counts =
    body.counts && typeof body.counts === "object"
      ? (body.counts as Record<string, number>)
      : {};
  const email = typeof body.email === "string" ? body.email : "";

  const t = totals(pkg, usePlus, counts);
  const orderName = usePlus ? pkg.plus.name : pkg.name;
  // Bij "2 termijnen" wordt alleen de eerste helft nu geïnd.
  const amountNow = plan === "split" ? t.termijn : t.total;
  const rest = Math.round((t.total - t.termijn) * 100) / 100;

  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  const origin = `${proto}://${host}`;

  try {
    const mollie = createMollieClient({ apiKey });

    // Bij 2 termijnen: een Mollie-klant + mandaat aanmaken (sequenceType "first"),
    // zodat de tweede termijn later automatisch afgeschreven kan worden.
    let customerId: string | undefined;
    if (plan === "split") {
      try {
        const customer = await mollie.customers.create({
          name: email || "KREATIVES Express klant",
          email: email || undefined,
          metadata: { pakket: pkg.id },
        });
        customerId = customer.id;
      } catch {
        // Lukt het klant aanmaken niet, dan toch de eerste termijn als losse betaling.
        customerId = undefined;
      }
    }

    const description =
      plan === "split"
        ? `KREATIVES Express — ${orderName} (termijn 1 van 2)`
        : `KREATIVES Express — ${orderName}`;

    const base = {
      amount: { currency: "EUR", value: amountNow.toFixed(2) },
      description,
      redirectUrl: `${origin}/starter/afrekenen/bedankt`,
      method: method as never,
      metadata: {
        pakket: pkg.id,
        plus: usePlus,
        email,
        plan,
        total: t.total,
        nu: amountNow,
        rest: plan === "split" ? rest : 0,
      },
    };

    let payment;
    if (plan === "split" && customerId) {
      try {
        // Mét mandaat → tweede termijn kan later automatisch afgeschreven worden.
        payment = await mollie.payments.create({
          ...base,
          customerId,
          sequenceType: "first" as never,
        });
      } catch {
        // Methode accepteert geen recurring (bv. iDEAL zonder SEPA-incasso):
        // dan de eerste termijn gewoon als losse betaling innen.
        payment = await mollie.payments.create(base);
      }
    } else {
      payment = await mollie.payments.create(base);
    }

    const checkoutUrl = payment.getCheckoutUrl();

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "Geen betaallink ontvangen van Mollie." },
        { status: 502 }
      );
    }

    const res = NextResponse.json({ checkoutUrl, id: payment.id });
    // Bewaar het payment-id zodat de bedankt-pagina de status kan ophalen.
    res.cookies.set("mollie_pid", payment.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
    return res;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Betaling aanmaken mislukt.";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
