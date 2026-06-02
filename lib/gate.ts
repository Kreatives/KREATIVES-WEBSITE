"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

/** Controleer het site-wachtwoord en zet bij succes een toegangscookie. */
export async function unlockPreview(password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("check_preview_password", {
    input: password,
  });
  if (error) return { ok: false, error: "Er ging iets mis. Probeer opnieuw." };
  if (data !== true) return { ok: false, error: "Onjuist wachtwoord." };

  const store = await cookies();
  store.set("preview_access", "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });
  return { ok: true };
}
