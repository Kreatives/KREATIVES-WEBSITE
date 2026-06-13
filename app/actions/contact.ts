"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  sendContactMail,
  sendConfirmationMail,
  mailerConfigured,
} from "@/lib/mailer";

export type ContactInput = {
  name: string;
  email: string;
  company?: string;
  website?: string;
  subject: string;
  message: string;
  source: string;
  /** Honeypot: een verborgen veld dat mensen leeg laten en bots invullen. */
  hp?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Eenvoudige rate-limiter in het geheugen (per warme server-instantie).
// Verhindert bursts/bots; geen vervanging voor een echte store, maar
// houdt formulier-spam effectief tegen.
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000; // 10 minuten
const MAX_PER_WINDOW = 4;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(key, hits);
    return true;
  }
  hits.push(now);
  recent.set(key, hits);
  // Houd de map klein.
  if (recent.size > 5000) recent.clear();
  return false;
}

export async function submitContact(input: ContactInput) {
  // 0) Honeypot: bots vullen verborgen velden in. Doe alsof het lukte,
  // zonder iets op te slaan of te mailen.
  if ((input.hp ?? "").trim() !== "") return { ok: true };

  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();

  if (name.length < 2) return { ok: false, error: "Vul je naam in." };
  if (!EMAIL_RE.test(email))
    return { ok: false, error: "Vul een geldig e-mailadres in." };
  if (message.length < 10)
    return { ok: false, error: "Vertel iets meer over je project." };

  // Rate-limiting per IP én per e-mailadres: voorkomt dat het formulier als
  // spam-/backscatter-doorgeefluik wordt misbruikt.
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "onbekend";
  if (rateLimited(`ip:${ip}`) || rateLimited(`email:${email.toLowerCase()}`)) {
    return {
      ok: false,
      error:
        "Je hebt net al een aanvraag verstuurd. Wacht een paar minuten en probeer het dan opnieuw.",
    };
  }

  const row = {
    name,
    email,
    company: (input.company ?? "").trim(),
    website: (input.website ?? "").trim(),
    subject: (input.subject ?? "").trim() || "Aanvraag",
    message,
    source: (input.source ?? "").trim() || "website",
    read: false,
  };

  // 1) Opslaan in de database (zichtbaar in /admin/inzendingen).
  const supabase = await createClient();
  const { error: dbError } = await supabase
    .from("contact_submissions")
    .insert(row);

  // 2) Doorsturen naar de inbox + bevestiging naar de aanvrager via SMTP.
  let emailed = false;
  if (mailerConfigured()) {
    try {
      await sendContactMail(row);
      emailed = true;
    } catch {
      emailed = false;
    }
    // Bevestigingsmail mag falen zonder de inzending te laten klappen.
    try {
      await sendConfirmationMail(row);
    } catch {
      /* stil falen */
    }
  }

  // Alleen falen als zowel opslaan als mailen mislukte.
  if (dbError && !emailed) {
    return {
      ok: false,
      error:
        "Er ging iets mis bij het versturen. Probeer het later opnieuw of mail ons direct.",
    };
  }
  return { ok: true };
}
