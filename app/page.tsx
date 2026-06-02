import { cookies } from "next/headers";
import ComingSoon from "@/components/ComingSoon";
import HomeContent from "@/components/HomeContent";
import { createClient } from "@/lib/supabase/server";

// Tijdelijke "binnenkort live"-screen met preview-wachtwoord.
// Wie het juiste site-wachtwoord invult (cookie gezet) ziet de echte site.
// Helemaal live zetten: hieronder altijd <HomeContent /> renderen.
export const dynamic = "force-dynamic";

export default async function Home() {
  const hasCookie = (await cookies()).get("preview_access")?.value === "1";
  if (hasCookie) return <HomeContent />;

  // Ingelogde beheerders zien altijd de echte site.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) return <HomeContent />;

  return <ComingSoon />;
}
