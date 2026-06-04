"use server";

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
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(input: ContactInput) {
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();

  if (name.length < 2) return { ok: false, error: "Vul je naam in." };
  if (!EMAIL_RE.test(email))
    return { ok: false, error: "Vul een geldig e-mailadres in." };
  if (message.length < 10)
    return { ok: false, error: "Vertel iets meer over je project." };

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
