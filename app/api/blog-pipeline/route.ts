import { createServiceClient } from "@/lib/supabase/service";
import { runBlogPipeline } from "@/lib/pipeline/run";

// Dagelijkse cron + handmatige trigger. Draait met de service-role client zodat
// het ook zonder ingelogde gebruiker werkt (Vercel cron). Beveiligd met CRON_SECRET.
export const dynamic = "force-dynamic";
export const maxDuration = 300;

async function handle(req: Request) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const supabase = createServiceClient();
    const result = await runBlogPipeline(supabase);
    return Response.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Onbekende fout";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}

export const GET = handle;
export const POST = handle;
