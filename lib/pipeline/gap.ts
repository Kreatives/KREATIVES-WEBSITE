/* eslint-disable @typescript-eslint/no-explicit-any */
// Stap 1 — zoekwoord-gap-analyse.
// Leest de doelzoekwoorden + bestaande posts en kiest één zoekwoord dat nog
// niet (goed) gedekt is. GSC-integratie is optioneel: als GSC_* ontbreekt,
// vallen we terug op dekking t.o.v. bestaande titels/slugs/tags.

const STOPWORDS = new Set([
  "voor", "een", "de", "het", "laten", "maken", "je", "en", "van", "met",
  "hoe", "wat", "is", "in", "op", "te", "bij", "aan", "of", "dat",
]);

export type KeywordChoice = {
  id: string;
  keyword: string;
  category: string | null;
  rationale: string;
};

function tokens(s: string): string[] {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function distinctive(keyword: string): string[] {
  return tokens(keyword).filter((t) => t.length >= 4 && !STOPWORDS.has(t));
}

// Een zoekwoord is "gedekt" als alle onderscheidende tokens voorkomen in de
// titel/slug/tags van een bestaand artikel.
function isCovered(keyword: string, haystacks: string[]): boolean {
  const need = distinctive(keyword);
  if (!need.length) return false;
  return haystacks.some((h) => {
    const hay = tokens(h).join(" ");
    return need.every((t) => hay.includes(t));
  });
}

export async function chooseKeyword(supabase: any): Promise<KeywordChoice | null> {
  const now = new Date().toISOString();

  const [{ data: kwRows }, { data: postRows }] = await Promise.all([
    supabase
      .from("target_keywords")
      .select("*")
      .eq("active", true)
      .order("priority", { ascending: true })
      .order("created_at", { ascending: true }),
    supabase.from("posts").select("title, slug, tags"),
  ]);

  const keywords = (kwRows ?? []).filter(
    (k: any) => !k.cooldown_until || k.cooldown_until < now
  );
  if (!keywords.length) return null;

  const haystacks: string[] = (postRows ?? []).map(
    (p: any) => `${p.title ?? ""} ${p.slug ?? ""} ${(p.tags ?? []).join(" ")}`
  );

  // 1) Eerste zoekwoord (op prioriteit) dat nog niet gedekt is.
  for (const k of keywords) {
    if (!isCovered(k.keyword, haystacks)) {
      return {
        id: k.id,
        keyword: k.keyword,
        category: k.category ?? null,
        rationale: `Nog geen bestaand artikel dekt "${k.keyword}". Dit is het hoogst geprioriteerde niet-gedekte zoekwoord (prioriteit ${k.priority}).`,
      };
    }
  }

  // 2) Alles gedekt: pak het hoogst geprioriteerde zoekwoord als nieuwe invalshoek.
  const k = keywords[0];
  return {
    id: k.id,
    keyword: k.keyword,
    category: k.category ?? null,
    rationale: `Alle doelzoekwoorden hebben al dekking. "${k.keyword}" heeft de hoogste prioriteit (${k.priority}); een nieuw artikel met een frisse invalshoek versterkt de dekking.`,
  };
}
