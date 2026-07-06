/* eslint-disable @typescript-eslint/no-explicit-any */
import sharp from "sharp";

// Magnific-beeldgeneratie (server-side) via het Mystic-model. Werkt op Vercel
// met een simpele API-key (env MAGNIFIC_API_KEY). Het model is asynchroon: we
// POSTen een taak, pollen tot COMPLETED, downloaden de PNG, converteren naar
// hoge-kwaliteit .webp en zetten hem in de Supabase 'media'-bucket.

const BASE_URL = "https://api.magnific.com";

// Standaardinstellingen — overschrijfbaar via env voor snelle experimenten.
const DEFAULT_MODEL = "realism";
const DEFAULT_ENGINE = "automatic";
const DEFAULT_RESOLUTION = "2k";

// Onze interne beeldverhoudingen → Magnific's aspect_ratio-enum.
const ASPECT_MAP: Record<"16:9" | "3:2" | "1:1", string> = {
  "16:9": "widescreen_16_9",
  "3:2": "standard_3_2",
  "1:1": "square_1_1",
};

export function magnificConfigured(): boolean {
  return Boolean(process.env.MAGNIFIC_API_KEY);
}

function headers(): Record<string, string> {
  return {
    "x-magnific-api-key": process.env.MAGNIFIC_API_KEY as string,
    "Content-Type": "application/json",
  };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Start een Mystic-taak en pollt tot er een afbeelding klaar is. Retourneert de
// (tijdelijk getekende) CDN-URL van de gegenereerde PNG.
async function generateRawUrl(prompt: string, aspectRatio: "16:9" | "3:2" | "1:1"): Promise<string> {
  if (!magnificConfigured()) {
    throw new Error("Magnific API-key ontbreekt. Zet MAGNIFIC_API_KEY in de env.");
  }

  const createResp = await fetch(`${BASE_URL}/v1/ai/mystic`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      prompt,
      aspect_ratio: ASPECT_MAP[aspectRatio],
      resolution: process.env.MAGNIFIC_RESOLUTION || DEFAULT_RESOLUTION,
      model: process.env.MAGNIFIC_MODEL || DEFAULT_MODEL,
      engine: process.env.MAGNIFIC_ENGINE || DEFAULT_ENGINE,
      filter_nsfw: true,
    }),
  });
  if (!createResp.ok) {
    const detail = await createResp.text().catch(() => "");
    throw new Error(`Magnific-taak starten mislukt (${createResp.status}). ${detail}`.trim());
  }
  const created: any = await createResp.json();
  const taskId = created?.data?.task_id;
  if (!taskId) throw new Error("Magnific gaf geen task_id terug.");

  // Pollen: ~2 minuten max (40 × 3s). Mystic is meestal binnen 15–30s klaar.
  for (let i = 0; i < 40; i++) {
    await sleep(3000);
    const statusResp = await fetch(`${BASE_URL}/v1/ai/mystic/${taskId}`, {
      headers: headers(),
    });
    if (!statusResp.ok) continue;
    const body: any = await statusResp.json();
    const status = body?.data?.status;
    if (status === "COMPLETED") {
      const url = body?.data?.generated?.[0];
      if (!url) throw new Error("Magnific voltooide zonder afbeelding.");
      return url as string;
    }
    if (status === "FAILED") throw new Error("Magnific-generatie is mislukt.");
  }
  throw new Error("Magnific gaf niet op tijd een afbeelding terug (time-out).");
}

// Downloadt de gegenereerde afbeelding, converteert naar webp en upload naar
// Supabase Storage. Retourneert de publieke URL.
export async function generateAndStore(opts: {
  supabase: any;
  prompt: string;
  aspectRatio?: "16:9" | "3:2" | "1:1";
  slug: string;
  kind: "hero" | "thumbnail";
}): Promise<string> {
  const rawUrl = await generateRawUrl(opts.prompt, opts.aspectRatio ?? "16:9");

  const resp = await fetch(rawUrl);
  if (!resp.ok) throw new Error(`Afbeelding downloaden mislukt (${resp.status}).`);
  const input = Buffer.from(await resp.arrayBuffer());

  const targetWidth = opts.kind === "hero" ? 1600 : 900;
  const webp = await sharp(input)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: 86, effort: 5 })
    .toBuffer();

  const stamp = Date.now();
  const path = `blog/${opts.slug || "artikel"}-${opts.kind}-${stamp}.webp`;
  const { error } = await opts.supabase.storage
    .from("media")
    .upload(path, webp, { contentType: "image/webp", upsert: true });
  if (error) throw new Error(`Upload mislukt: ${error.message}`);

  const { data } = opts.supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl as string;
}
