/* eslint-disable @typescript-eslint/no-explicit-any */
import sharp from "sharp";

// Higgsfield-beeldgeneratie (server-side). Gebruikt de v2 SDK met een
// KEY_ID:KEY_SECRET API-key (env HF_CREDENTIALS) — werkt op Vercel, i.t.t. de
// lokale CLI-login. Output wordt naar hoge-kwaliteit .webp geconverteerd en in
// de Supabase 'media'-bucket gezet.

const DEFAULT_ENDPOINT = "flux-pro/kontext/max/text-to-image";

function endpoint(): string {
  return process.env.HIGGSFIELD_IMAGE_ENDPOINT || DEFAULT_ENDPOINT;
}

export function higgsfieldConfigured(): boolean {
  return Boolean(
    process.env.HF_CREDENTIALS || (process.env.HF_API_KEY && process.env.HF_API_SECRET)
  );
}

async function generateRawUrl(prompt: string, aspectRatio: "16:9" | "3:2" | "1:1"): Promise<string> {
  if (!higgsfieldConfigured()) {
    throw new Error(
      "Higgsfield API-key ontbreekt. Zet HF_CREDENTIALS (KEY_ID:KEY_SECRET) in de env."
    );
  }
  // Dynamische import zodat de SDK niet in andere bundles belandt.
  const mod: any = await import("@higgsfield/client/v2");
  const create = mod.createHiggsfieldClient ?? mod.default?.createHiggsfieldClient;
  const client = create
    ? create({ credentials: process.env.HF_CREDENTIALS })
    : mod.higgsfield;

  const jobSet: any = await client.subscribe(endpoint(), {
    input: { prompt, aspect_ratio: aspectRatio, safety_tolerance: 2 },
    withPolling: true,
  });

  const url = jobSet?.jobs?.[0]?.results?.raw?.url;
  if (!url) throw new Error("Higgsfield gaf geen afbeelding terug.");
  return url;
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
