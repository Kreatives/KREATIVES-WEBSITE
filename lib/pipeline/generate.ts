/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-opus-4-8";
export const CATEGORIES = [
  "Prijzen", "Webdesign", "AI", "Redesign", "Strategie", "Werkwijze", "Horeca", "Coaches",
];

// Money pages om linkautoriteit naartoe te sturen.
const MONEY_PAGES = [
  ["/diensten/webdesign", "maatwerk webdesign / redesign"],
  ["/diensten/ai", "AI-websites"],
  ["/blauwdruk", "gratis blueprint-sessie"],
  ["/projecten", "onze cases"],
  ["/contact", "contact / gesprek plannen"],
];

function readSkill(rel: string): string | null {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return null;
  }
}

function client(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY ontbreekt in de env.");
  }
  return new Anthropic();
}

function jsonFrom(res: any): any {
  const text = (res.content ?? []).find((b: any) => b.type === "text")?.text ?? "";
  return JSON.parse(text);
}

export type GeneratedPost = {
  title: string;
  slug: string;
  metaDescription: string;
  category: string[];
  tags: string[];
  readingMinutes: number;
  body: string;
  usage?: any;
};

export type GeneratedImages = {
  concept: string;
  thumbnailPrompt: string;
  heroPrompt: string;
  thumbnailAlt: string;
  heroAlt: string;
  usage?: any;
};

const WRITER_SYSTEM = `Je bent een ervaren SEO-copywriter en webdesigner die schrijft voor KREATIVES, een Nederlands webdesignbureau uit Arnhem. Je schrijft voor Nederlandse mkb-ondernemers.

STEM (verplicht):
- Nederlands, direct, concreet, menselijk. Schrijf zoals een ervaren webdesigner een klant iets uitlegt, met echte getallen en voorbeelden.
- GEEN em-dashes. GEEN AI-clichés: "in de snelle digitale wereld van vandaag", "naadloos", "cruciaal", "ontdek de kracht van", "in het huidige digitale landschap", "een must", "the sky is the limit".
- Geen "geen X maar Y"-staccato. Geen wollige marketingtaal. Korte alinea's.

STRUCTUUR (het artikel is Markdown; volg exact deze conventies):
- Begin met een TL;DR als blockquote: "> **TL;DR:** ..." (2-3 zinnen samenvatting).
- Daarna een korte intro-alinea zonder kop.
- Gebruik "## " voor H2-koppen en "### " voor H3. Eén concrete takeaway per sectie.
- Gebruik opsommingen ("- ") en waar zinvol een Markdown-tabel ("| kop | kop |" met "| --- | --- |").
- Voeg een sectie "## Veelgestelde vragen" toe met 3-4 vragen als "### Vraag?" gevolgd door een alinea-antwoord.
- Sluit af met één CTA-alinea die naar een gesprek leidt.

SEO:
- Zet het doelzoekwoord in de titel, in de eerste alinea, in minstens één H2 en in de meta-description. Natuurlijk, nooit stuffen.
- De titel is MAXIMAAL 55 tekens. Er komt automatisch " | KREATIVES" achter, dus houd het kort en zet het zoekwoord vooraan. Geen dubbele punt met lange bijzin.
- Lengte 900-1500 woorden, scanbaar.
- Interne links als Markdown. Link naar 2-3 bestaande blogartikelen (gebruik ECHTE slugs uit de lijst, als /blog/<slug>) en naar minstens 1-2 money pages. Beschrijvende ankertekst.

Antwoord uitsluitend als JSON volgens het schema. Body = de volledige Markdown. metaDescription max 155 tekens. category: 1-2 uit de toegestane lijst. slug: kort, kebab-case, zonder /blog/.`;

const POST_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    slug: { type: "string" },
    metaDescription: { type: "string" },
    category: { type: "array", items: { type: "string", enum: CATEGORIES } },
    tags: { type: "array", items: { type: "string" } },
    readingMinutes: { type: "integer" },
    body: { type: "string" },
  },
  required: ["title", "slug", "metaDescription", "category", "tags", "readingMinutes", "body"],
};

const IMAGE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    concept: { type: "string" },
    thumbnailPrompt: { type: "string" },
    heroPrompt: { type: "string" },
    thumbnailAlt: { type: "string" },
    heroAlt: { type: "string" },
  },
  required: ["concept", "thumbnailPrompt", "heroPrompt", "thumbnailAlt", "heroAlt"],
};

export async function writePost(input: {
  keyword: string;
  rationale: string;
  category: string | null;
  existingPosts: { slug: string; title: string; tags: string[] }[];
}): Promise<GeneratedPost> {
  const tone = readSkill("skills/kreatives-tone-of-voice.md");
  const system = tone ? `${WRITER_SYSTEM}\n\n--- Extra tone-of-voice richtlijnen ---\n${tone}` : WRITER_SYSTEM;

  const postList = input.existingPosts
    .map((p) => `- /blog/${p.slug} — ${p.title}${p.tags?.length ? ` (${p.tags.join(", ")})` : ""}`)
    .join("\n");
  const moneyList = MONEY_PAGES.map(([href, d]) => `- ${href} — ${d}`).join("\n");

  const user = `Doelzoekwoord: "${input.keyword}"
Waarom dit onderwerp: ${input.rationale}
Voorkeurscategorie: ${input.category ?? "(kies zelf uit de lijst)"}
Toegestane categorieën: ${CATEGORIES.join(", ")}

Bestaande blogartikelen (voor interne links, gebruik echte slugs):
${postList || "(nog geen)"}

Money pages (link hier ook naartoe):
${moneyList}

Schrijf nu één volledig artikel dat "${input.keyword}" target. Vermijd overlap met bestaande artikelen.`;

  const res = await (client().messages.create as any)({
    model: MODEL,
    max_tokens: 8000,
    thinking: { type: "adaptive" },
    system,
    messages: [{ role: "user", content: user }],
    output_config: { format: { type: "json_schema", schema: POST_SCHEMA } },
  });

  const data = jsonFrom(res);
  // Vangnet: de gerenderde <title> is `${title} | KREATIVES`. Houd de titel
  // onder ~55 tekens zodat de volledige title-tag ≤ ~67 blijft (SEO-limiet).
  if (typeof data.title === "string" && data.title.length > 55) {
    console.warn(
      `[blog-pipeline] Titel is ${data.title.length} tekens (>55): "${data.title}". Kort in via /admin.`
    );
  }
  return { ...data, usage: res.usage };
}

export async function makeImagePrompts(input: {
  title: string;
  category: string[];
  summary: string;
}): Promise<GeneratedImages> {
  const skill = readSkill("skills/kreatives-blog-visuals/SKILL.md");
  const system =
    (skill ?? "Genereer twee Higgsfield-prompts (thumbnail 3:2, hero 16:9) voor een blogbeeld, zonder gezichten en zonder zichtbaar designwerk, in een warme editorial stijl.") +
    `\n\n--- Extra output-eis ---\nNaast de twee prompts lever je voor beide beelden een Nederlandse, SEO-vriendelijke alt-tekst (beschrijvend, met het onderwerp/branche, zonder "afbeelding van"). Antwoord uitsluitend als JSON volgens het schema.`;

  const user = `Blogtitel: ${input.title}
Categorie(ën): ${input.category.join(", ")}
Korte samenvatting: ${input.summary}

Volg de skill exact en lever de twee prompts (thumbnail 3:2, hero 16:9) plus de twee alt-teksten.`;

  const res = await (client().messages.create as any)({
    model: MODEL,
    max_tokens: 2000,
    thinking: { type: "adaptive" },
    system,
    messages: [{ role: "user", content: user }],
    output_config: { format: { type: "json_schema", schema: IMAGE_SCHEMA } },
  });

  const data = jsonFrom(res);
  return { ...data, usage: res.usage };
}
