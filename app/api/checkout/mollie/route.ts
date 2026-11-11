import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import { findPakket, totals } from "@/app/starter/afrekenen/checkout-express-data";

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

// Maakt een Mollie-betaling aan. Het bedrag wordt hier SERVER-SIDE herberekend
// uit het pakket + de add-ons — nooit het door de client gestuurde bedrag vertrouwen.
// De klantgegevens worden als billingAddress + Mollie-klant meegestuurd, zodat ze
// in het Mollie-dashboard zichtbaar zijn.
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

  // Klantgegevens
  const d =
    body.details && typeof body.details === "object"
      ? (body.details as Record<string, unknown>)
      : {};
  const voornaam = str(d.voornaam);
  const achternaam = str(d.achternaam);
  const email = str(d.email) || str(body.email);
  const telefoon = str(d.telefoon);
  const bedrijf = str(d.bedrijf);
  const straat = str(d.straat);
  const postcode = str(d.postcode);
  const plaats = str(d.plaats);
  const land = (str(d.land) || "NL").toUpperCase().slice(0, 2);
  const kvk = str(d.kvk);
  const naam = `${voornaam} ${achternaam}`.trim();

  // Minimaal nodig voor een echte factuur/betaling
  if (!voornaam || !achternaam || !email || !straat || !postcode || !plaats) {
    return NextResponse.json(
      { error: "Vul je naam, e-mail en adres in." },
      { status: 400 }
    );
  }

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

    // Altijd een Mollie-klant aanmaken met de echte gegevens, zodat de contact-
    // info in Mollie staat. Bij 2 termijnen zet dit ook het mandaat op.
    let customerId: string | undefined;
    try {
      const customer = await mollie.customers.create({
        name: naam || email,
        email,
        metadata: { pakket: pkg.id, bedrijf, telefoon, kvk },
      });
      customerId = customer.id;
    } catch {
      customerId = undefined;
    }

    const description =
      plan === "split"
        ? `KREATIVES Express — ${orderName} (termijn 1 van 2)`
        : `KREATIVES Express — ${orderName}`;

    const billingAddress = {
      givenName: voornaam,
      familyName: achternaam,
      ...(bedrijf ? { organizationName: bedrijf } : {}),
      streetAndNumber: straat,
      postalCode: postcode,
      city: plaats,
      country: land,
      email,
    };

    const base = {
      amount: { currency: "EUR", value: amountNow.toFixed(2) },
      description,
      redirectUrl: `${origin}/starter/afrekenen/bedankt`,
      method: method as never,
      billingAddress: billingAddress as never,
      ...(customerId ? { customerId } : {}),
      metadata: {
        pakket: pkg.id,
        plus: usePlus,
        plan,
        naam,
        email,
        telefoon,
        bedrijf,
        kvk,
        adres: `${straat}, ${postcode} ${plaats} (${land})`,
        total: t.total,
        nu: amountNow,
        rest: plan === "split" ? rest : 0,
        addons: pkg.addons
          .filter((a) => counts[a.id])
          .map((a) => `${a.label} x${counts[a.id]}`)
          .join(", "),
      },
    };

    let payment;
    if (plan === "split" && customerId) {
      try {
        // Mét mandaat → tweede termijn kan later automatisch afgeschreven worden.
        payment = await mollie.payments.create({
          ...base,
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
