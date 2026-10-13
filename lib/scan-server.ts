import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { createServiceClient } from "@/lib/supabase/service";
import {
  berekenTotaalscore,
  type ScanAnswers,
  type ScanCategorie,
  type ScanReport,
  type Verdict,
} from "@/lib/scan";

// De brief vroeg "claude-sonnet-5-5"; dat model-ID bestaat niet. De huidige
// Sonnet is claude-sonnet-4-6. Pas hier aan als er een nieuwer model is.
export const SCAN_MODEL = "claude-sonnet-4-6";

const CANONIEKE_CATEGORIEEN = [
  "Doelgroep & boodschap",
  "Opbouw van boven naar beneden",
  "Vertrouwen & bewijs",
  "De actie",
  "Branding vs doelgroep",
  "Onderscheid",
];

const SYSTEM_PROMPT = `Je bent een senior webdesigner en merkstrateeg bij KREATIVES. Je beoordeelt de homepage van een Nederlands MKB-bedrijf vanuit één vraag: zou de doelgroep van dit bedrijf op deze website actie ondernemen? Zo niet, waarom niet?

Je kijkt NIET naar techniek: geen laadsnelheid, SEO, code of contrastwaarden. Alleen naar overtuiging.

Werkwijze:
1. Bepaal eerst wie de doelgroep is. Vergelijk wat de ondernemer opgaf als ideale klant met voor wie de website zich in werkelijkheid lijkt te richten (taal, beeld, aanbod, prijsniveau). Benoem het verschil als dat er is.
2. Kruip in het hoofd van die doelgroep. Wat zoekt deze persoon? Welke vragen, twijfels en bezwaren heeft hij? Wat moet hij zien om te vertrouwen en contact op te nemen?
3. Loop de homepage van boven naar beneden door, sectie voor sectie, als die klant. Wat denkt en voelt hij bij elke sectie? Blijft hij, twijfelt hij of haakt hij af?
4. Beoordeel daarna de categorieën.

Schrijfregels:
- Helder Nederlands, je-vorm, direct maar respectvol, zonder vakjargon. De lezer is ondernemer, geen designer. Zeg "het bovenste stuk van je website", niet "hero sectie". Zeg "de knop", niet "call to action".
- Wees altijd concreet. Citeer letterlijke teksten van de site tussen aanhalingstekens. Benoem specifieke secties en elementen.
- Alles moet controleerbaar zijn met de screenshots en data die je kreeg. Verzin niets.
- Geen generieke tips die op elke website passen. Elk punt gaat over DEZE site en DEZE doelgroep.
- Noem ook 1 of 2 dingen die goed werken, kort en specifiek.
- Geen verkooptaal, geen uitroeptekens, geen emoji.

Beoordeel deze categorieën met een score van 0 tot 10 en een onderbouwing:
1. Doelgroep & boodschap – Is direct duidelijk voor wie dit is en wat het oplevert? Herkent de ideale klant zichzelf binnen 5 seconden? Spreekt de site de taal van de doelgroep, of die van de ondernemer?
2. Opbouw van boven naar beneden – Beantwoordt de pagina de vragen van de doelgroep in de juiste volgorde? Welke elementen verwacht deze doelgroep maar ontbreken (bijv. werkwijze, prijsindicatie, resultaten, gezicht van de ondernemer, veelgestelde vragen, voor/na)? Staan er secties in die niemand nodig heeft?
3. Vertrouwen & bewijs – Is er bewijs, en is het het juiste type voor deze doelgroep? Staat het op de plek waar de twijfel ontstaat? Staat er iets van bewijs in het bovenste stuk?
4. De actie – Wat moet de bezoeker doen? Eén duidelijke actie of te veel? Is de knoptekst concreet? Past de drempel bij hoe warm de bezoeker is? Komt de actie terug op de juiste momenten? Is het op mobiel makkelijk?
5. Branding vs doelgroep – Passen kleuren, beeld, typografie en toon bij de doelgroep en het prijsniveau? Voelt het als een bedrijf waar deze klant zijn geld aan wil geven? Echte foto's of stock?
6. Onderscheid – Zou deze site net zo goed van een concurrent kunnen zijn? Komt naar voren waarom je juist voor dit bedrijf zou kiezen?

Geef tot slot een eindoordeel: zou de doelgroep actie ondernemen? Kies "ja", "twijfelachtig" of "nee" en leg in 1 tot 2 zinnen uit waarom.

Geef je antwoord als UITSLUITEND geldige JSON volgens dit schema, zonder tekst eromheen:
{
  "eindoordeel": { "zou_actie_ondernemen": "ja | twijfelachtig | nee", "uitleg": "1-2 zinnen" },
  "doelgroep": { "opgegeven": "kort samengevat", "wat_de_site_uitstraalt": "voor wie de site zich lijkt te richten", "match": "goed | deels | slecht", "toelichting": "1-2 zinnen" },
  "door_de_ogen_van_je_klant": [ { "sectie": "naam van de sectie", "wat_de_klant_denkt": "1-2 zinnen in de ik-vorm", "blijft_of_haakt_af": "blijft | twijfelt | haakt af" } ],
  "categorieen": [ { "naam": "Doelgroep & boodschap", "score": 0, "observatie": "concreet, met citaat", "waarom_het_uitmaakt": "1 zin", "verbetering": "1 concrete actie" } ],
  "ontbrekende_elementen": ["max 5"],
  "voorgestelde_opbouw": ["sectie 1", "sectie 2"],
  "top_3_pijnpunten": [ { "titel": "max 8 woorden", "uitleg": "2-3 zinnen", "zelf_oplossen": "wat de ondernemer zelf kan doen" } ],
  "wat_goed_gaat": ["1-2 korte punten"],
  "nieuwe_kop": { "huidige_kop": "letterlijk van de site", "voorgestelde_kop": "max 10 woorden", "voorgestelde_subkop": "max 25 woorden" }
}
Geef de zes categorieën in exact deze volgorde: Doelgroep & boodschap, Opbouw van boven naar beneden, Vertrouwen & bewijs, De actie, Branding vs doelgroep, Onderscheid.`;

/* ---------- SSRF / URL-validatie ---------- */

export function assertSafeUrl(raw: string): URL {
  const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
  if (u.protocol !== "http:" && u.protocol !== "https:") {
    throw new Error("Alleen http(s) is toegestaan.");
  }
  const host = u.hostname.toLowerCase();
  const blocked =
    host === "localhost" ||
    host.endsWith(".local") ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host === "::1" ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^169\.254\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host) ||
    !host.includes(".");
  if (blocked) throw new Error("Dit adres kunnen we niet analyseren.");
  return u;
}

/* ---------- ScreenshotOne ---------- */

function screenshotUrl(target: string, viewportWidth: number): string {
  const key = process.env.SCREENSHOTONE_ACCESS_KEY ?? "";
  const params = new URLSearchParams({
    access_key: key,
    url: target,
    viewport_width: String(viewportWidth),
    full_page: "true",
    format: "jpg",
    image_quality: "70",
    block_cookie_banners: "true",
    block_ads: "true",
    block_chats: "true",
    cache: "true",
    cache_ttl: "86400",
  });
  return `https://api.screenshotone.com/take?${params.toString()}`;
}

/* ---------- HTML ophalen + inhoud per sectie extraheren ---------- */

type SiteData = {
  title: string;
  headings: string[];
  text: string;
  buttons: { tekst: string; href: string }[];
  nav: string[];
  contact: string[];
  proof: string[];
};

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchSiteData(target: string): Promise<SiteData> {
  const res = await fetch(target, {
    redirect: "follow",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; KreativesScan/1.0; +https://www.kreatives.nl)",
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Website gaf status ${res.status}.`);
  const html = await res.text();

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "")
    .trim()
    .slice(0, 200);

  const headings = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)]
    .map((m) => stripTags(m[1]))
    .filter(Boolean)
    .slice(0, 40);

  const buttons = [
    ...html.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi),
  ]
    .map((m) => ({ href: m[1], tekst: stripTags(m[2]) }))
    .filter((b) => b.tekst && b.tekst.length < 60)
    .slice(0, 50);

  const lower = html.toLowerCase();
  const contact: string[] = [];
  if (/href=["']tel:/.test(lower)) contact.push("telefoonnummer");
  if (/wa\.me|whatsapp/.test(lower)) contact.push("WhatsApp");
  if (/href=["']mailto:/.test(lower)) contact.push("e-mailadres");
  if (/<form/.test(lower)) contact.push("contactformulier");
  if (/calendly|cal\.com|appointlet|youcanbook/.test(lower))
    contact.push("boekingstool");

  const proof: string[] = [];
  if (/review|beoordel|google|trustpilot|kiyoh/.test(lower))
    proof.push("reviews/beoordelingen");
  if (/\b\d[\d.,]*\s*(\+|klanten|projecten|jaar|sterren)/.test(lower))
    proof.push("cijfers");
  if (/keurmerk|garant|gecertificeerd|lid van/.test(lower))
    proof.push("keurmerken");

  const nav = buttons
    .filter((b) => b.href.startsWith("/") || b.href.startsWith("#"))
    .map((b) => b.tekst)
    .slice(0, 15);

  return {
    title,
    headings,
    text: stripTags(html).slice(0, 9000),
    buttons: buttons.slice(0, 25),
    nav,
    contact,
    proof,
  };
}

/* ---------- Claude-analyse ---------- */

/* eslint-disable @typescript-eslint/no-explicit-any */
function toReport(raw: any, domein: string): ScanReport {
  const catRaw: any[] = Array.isArray(raw.categorieen) ? raw.categorieen : [];
  // Zet de categorieën in de canonieke volgorde zodat de weging klopt.
  const geordend = CANONIEKE_CATEGORIEEN.map((naam, i) => {
    const found =
      catRaw.find((c) => (c?.naam ?? "").toLowerCase().includes(naam.split(" ")[0].toLowerCase())) ??
      catRaw[i] ??
      {};
    const cat: ScanCategorie = {
      naam,
      score: clampScore(found.score),
      observatie: str(found.observatie),
      waaromHetUitmaakt: str(found.waarom_het_uitmaakt),
      verbetering: str(found.verbetering),
    };
    return cat;
  });

  return {
    domein,
    eindoordeel: {
      zouActieOndernemen: verdict(raw.eindoordeel?.zou_actie_ondernemen),
      uitleg: str(raw.eindoordeel?.uitleg),
    },
    doelgroep: {
      opgegeven: str(raw.doelgroep?.opgegeven),
      watDeSiteUitstraalt: str(raw.doelgroep?.wat_de_site_uitstraalt),
      match: match(raw.doelgroep?.match),
      toelichting: str(raw.doelgroep?.toelichting),
    },
    doorDeOgenVanJeKlant: (Array.isArray(raw.door_de_ogen_van_je_klant)
      ? raw.door_de_ogen_van_je_klant
      : []
    )
      .slice(0, 8)
      .map((s: any) => ({
        sectie: str(s?.sectie),
        watDeKlantDenkt: str(s?.wat_de_klant_denkt),
        blijftOfHaaktAf: afhaak(s?.blijft_of_haakt_af),
      })),
    categorieen: geordend,
    ontbrekendeElementen: strArray(raw.ontbrekende_elementen).slice(0, 5),
    voorgesteldeOpbouw: strArray(raw.voorgestelde_opbouw).slice(0, 10),
    topPijnpunten: (Array.isArray(raw.top_3_pijnpunten) ? raw.top_3_pijnpunten : [])
      .slice(0, 3)
      .map((p: any) => ({
        titel: str(p?.titel),
        uitleg: str(p?.uitleg),
        zelfOplossen: str(p?.zelf_oplossen),
      })),
    watGoedGaat: strArray(raw.wat_goed_gaat).slice(0, 3),
    nieuweKop: {
      huidigeKop: str(raw.nieuwe_kop?.huidige_kop),
      voorgesteldeKop: str(raw.nieuwe_kop?.voorgestelde_kop),
      voorgesteldeSubkop: str(raw.nieuwe_kop?.voorgestelde_subkop),
    },
    totaalscore: berekenTotaalscore(geordend),
  };
}

function str(v: any): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}
function strArray(v: any): string[] {
  return Array.isArray(v) ? v.map(str).filter(Boolean) : [];
}
function clampScore(v: any): number {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(10, Math.max(0, n)) : 0;
}
function verdict(v: any): Verdict {
  return v === "ja" || v === "nee" ? v : "twijfelachtig";
}
function match(v: any): "goed" | "deels" | "slecht" {
  return v === "goed" || v === "slecht" ? v : "deels";
}
function afhaak(v: any): "blijft" | "twijfelt" | "haakt af" {
  return v === "blijft" || v === "haakt af" ? v : "twijfelt";
}

function extractJson(text: string): any {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Geen JSON in antwoord.");
  return JSON.parse(text.slice(start, end + 1));
}

async function callClaude(
  userBlocks: Anthropic.MessageParam["content"]
): Promise<any> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const run = async () => {
    const msg = await client.messages.create({
      model: SCAN_MODEL,
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userBlocks }],
    });
    const text = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n");
    return extractJson(text);
  };
  try {
    return await run();
  } catch {
    // Eén keer opnieuw proberen bij ongeldige JSON.
    return await run();
  }
}

/** Volledige analyse. onStep(i) wordt na elke backend-stap aangeroepen (0-based). */
export async function analyzeSite(
  answers: ScanAnswers,
  onStep?: (step: number) => void
): Promise<ScanReport> {
  const u = assertSafeUrl(answers.url);
  const target = u.toString();
  const domein = u.hostname.replace(/^www\./, "");

  // Stap 0: screenshots klaarzetten (ScreenshotOne rendert on-demand via URL)
  const shotDesktop = screenshotUrl(target, 1440);
  const shotMobile = screenshotUrl(target, 390);
  onStep?.(0);

  // Stap 1: doelgroep (uit de antwoorden) — markeer verwerkt
  onStep?.(1);

  // Stap 2: HTML + opbouw lezen
  const site = await fetchSiteData(target);
  onStep?.(2);

  const branche =
    answers.branche === "Anders" ? answers.brancheAnders : answers.branche;

  const context = [
    `BRANCHE: ${branche || "onbekend"}`,
    `IDEALE KLANT (opgegeven door de ondernemer): ${answers.idealeKlant || "onbekend"}`,
    `DOEL VAN DE WEBSITE: ${answers.doel || "onbekend"}`,
    "",
    `WEBSITE: ${target}`,
    `PAGINATITEL: ${site.title}`,
    `NAVIGATIE: ${site.nav.join(", ") || "onbekend"}`,
    `KOPPEN (volgorde van boven naar beneden): ${site.headings.join(" | ")}`,
    `KNOPPEN EN LINKS: ${site.buttons.map((b) => `"${b.tekst}" → ${b.href}`).join(" ; ")}`,
    `CONTACTMOGELIJKHEDEN: ${site.contact.join(", ") || "geen gevonden"}`,
    `BEWIJS/SOCIAL PROOF: ${site.proof.join(", ") || "geen gevonden"}`,
    "",
    `TEKST VAN DE PAGINA (ingekort):`,
    site.text,
  ].join("\n");

  // Stap 3-5: bewijs, actie, branding — dit beoordeelt het model in één call.
  onStep?.(3);
  const raw = await callClaude([
    {
      type: "image",
      source: { type: "url", url: shotDesktop },
    },
    {
      type: "image",
      source: { type: "url", url: shotMobile },
    },
    {
      type: "text",
      text:
        "Hierboven staan twee screenshots van de homepage: eerst desktop (1440px breed), dan mobiel (390px breed). Hieronder de data en de antwoorden van de ondernemer. Beoordeel de homepage volgens je instructies en geef alleen de JSON terug.\n\n" +
        context,
    },
  ]);
  onStep?.(4);
  const report = toReport(raw, domein);
  onStep?.(5);
  return report;
}

/* ---------- Database ---------- */

function makeId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  for (const b of bytes) id += chars[b % chars.length];
  return id;
}

export async function rateLimited(ip: string | null): Promise<boolean> {
  if (!ip) return false;
  const supabase = createServiceClient();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("website_scans")
    .select("*", { count: "exact", head: true })
    .eq("ip", ip)
    .gte("created_at", since);
  return (count ?? 0) >= 3;
}

export async function findCachedScan(
  url: string,
  answers: ScanAnswers
): Promise<string | null> {
  const supabase = createServiceClient();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data } = await supabase
    .from("website_scans")
    .select("id, answers")
    .eq("url", url)
    .eq("status", "done")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(5);
  const key = JSON.stringify([answers.branche, answers.brancheAnders, answers.idealeKlant, answers.doel]);
  const hit = (data ?? []).find((r) => {
    const a = r.answers as ScanAnswers;
    return JSON.stringify([a.branche, a.brancheAnders, a.idealeKlant, a.doel]) === key;
  });
  return hit?.id ?? null;
}

export async function saveScan(input: {
  answers: ScanAnswers;
  report: ScanReport | null;
  ip: string | null;
  status: "done" | "failed";
  error?: string;
}): Promise<string> {
  const supabase = createServiceClient();
  const id = makeId();
  let url: string | null = null;
  if (!input.answers.geenWebsite) {
    try {
      url = assertSafeUrl(input.answers.url).toString();
    } catch {
      url = input.answers.url || null;
    }
  }
  await supabase.from("website_scans").insert({
    id,
    url,
    geen_website: input.answers.geenWebsite,
    answers: input.answers,
    report: input.report,
    total_score: input.report?.totaalscore ?? null,
    verdict: input.report?.eindoordeel.zouActieOndernemen ?? null,
    status: input.status,
    ip: input.ip,
    error: input.error ?? null,
  });
  return id;
}

export type ScanRow = {
  id: string;
  created_at: string;
  url: string | null;
  geen_website: boolean;
  answers: ScanAnswers;
  report: ScanReport | null;
  status: string;
  contact: ScanContact | null;
  notion_page_id: string | null;
};

export async function getScanRow(id: string): Promise<ScanRow | null> {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("website_scans")
    .select("*")
    .eq("id", id)
    .single();
  return (data as ScanRow | null) ?? null;
}

export type ScanContact = {
  voornaam: string;
  email: string;
  telefoon: string;
  bedrijf: string;
};

export async function attachLead(
  id: string,
  contact: ScanContact,
  notionPageId: string | null
): Promise<void> {
  const supabase = createServiceClient();
  await supabase
    .from("website_scans")
    .update({ contact, notion_page_id: notionPageId })
    .eq("id", id);
}

export async function markCallBooked(email: string): Promise<string | null> {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("website_scans")
    .select("id, notion_page_id")
    .filter("contact->>email", "eq", email)
    .order("created_at", { ascending: false })
    .limit(1);
  const row = data?.[0];
  if (row) {
    await supabase
      .from("website_scans")
      .update({ call_booked: true })
      .eq("id", row.id);
  }
  return row?.notion_page_id ?? null;
}

/* ---------- Budget + lead rating ---------- */

export function budgetToNumber(budget: string): number | null {
  switch (budget) {
    case "Onder €1.500":
      return 1000;
    case "€1.500 – €3.500":
      return 2500;
    case "€3.500 – €7.500":
      return 5500;
    case "€7.500 of meer":
      return 7500;
    default:
      return null;
  }
}

export function leadRating(budget: string, timing: string): string {
  const hoog = budget === "€3.500 – €7.500" || budget === "€7.500 of meer";
  const mid = budget === "€1.500 – €3.500";
  const laag = budget === "Onder €1.500";
  if (hoog && timing === "Zo snel mogelijk") return "5";
  if ((hoog && timing === "Binnen 3 maanden") || (mid && timing === "Zo snel mogelijk"))
    return "4";
  if ((mid && timing === "Binnen 3 maanden") || (hoog && timing === "Ik oriënteer me nog"))
    return "3";
  if ((mid && timing === "Ik oriënteer me nog") || (laag && timing !== "Ik oriënteer me nog"))
    return "2";
  return "1";
}
/* eslint-enable @typescript-eslint/no-explicit-any */
