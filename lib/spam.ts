/**
 * Spam-detectie voor contactformulier-inzendingen.
 *
 * De bot-spam die binnenkomt heeft een heel herkenbaar patroon: ieder veld is
 * één willekeurige reeks tekens met chaotische hoofdletters
 * (bv. "NxEeUROLgDCTDLTsXCQPglF") en berichten zonder spaties of echte woorden.
 * Echte mensen schrijven woorden mét spaties en normale hoofdletters. We scoren
 * elk veld los en bestempelen een inzending pas als spam wanneer méérdere velden
 * willekeurig ogen — zo blijft de kans op een vals positief verwaarloosbaar.
 *
 * Dezelfde functie draait op twee plekken:
 *  - bij binnenkomst (app/actions/contact.ts) om spam stil te weigeren;
 *  - in het CMS (app/admin) om bestaande spam op te ruimen.
 */

export type SpamFields = {
  name?: string | null;
  company?: string | null;
  website?: string | null;
  message?: string | null;
  email?: string | null;
};

/** Aantal keer dat een woord midden in een letterreeks van kast wisselt. */
function caseSwitches(token: string): number {
  let switches = 0;
  let prev: "upper" | "lower" | null = null;
  for (const ch of token) {
    if (ch >= "A" && ch <= "Z") {
      if (prev === "lower") switches++;
      prev = "upper";
    } else if (ch >= "a" && ch <= "z") {
      if (prev === "upper") switches++;
      prev = "lower";
    }
  }
  return switches;
}

/** Aandeel klinkers — onuitspreekbare reeksen hebben er nauwelijks. */
function vowelRatio(token: string): number {
  const letters = token.replace(/[^a-z]/gi, "");
  if (!letters.length) return 1;
  const vowels = (letters.match(/[aeiouy]/gi) ?? []).length;
  return vowels / letters.length;
}

/** Eén woord dat eruitziet als door een bot gegenereerde ruis. */
function tokenLooksRandom(token: string): boolean {
  const t = token.replace(/[^A-Za-z]/g, "");
  if (t.length < 8) return false;
  // Veel hoofdletter-wisselingen binnen één woord = nep ("NxEeUROLgDCT…").
  if (caseSwitches(t) >= 4) return true;
  // Lang woord met bijna geen klinkers = onuitspreekbaar = nep.
  if (t.length >= 14 && vowelRatio(t) < 0.22) return true;
  return false;
}

/** Een heel veld (naam, bedrijf, bericht …) dat willekeurig oogt. */
export function fieldLooksRandom(value: string | null | undefined): boolean {
  const v = (value ?? "").trim();
  if (!v) return false;
  const tokens = v.split(/\s+/);
  const randomTokens = tokens.filter(tokenLooksRandom).length;
  // Eén los woord is al verdacht; bij meerdere woorden moet het merendeel ruis zijn.
  if (tokens.length === 1) return randomTokens === 1;
  return randomTokens >= Math.ceil(tokens.length / 2);
}

/** Aantal verdachte signalen. 0 = schoon, >= 2 = vrijwel zeker spam. */
export function spamScore(f: SpamFields): number {
  let score = 0;
  if (fieldLooksRandom(f.name)) score++;
  if (fieldLooksRandom(f.company)) score++;
  if (fieldLooksRandom(f.website)) score++;
  if (fieldLooksRandom(f.message)) score++;
  return score;
}

/** True wanneer een inzending vrijwel zeker bot-spam is. */
export function isSpam(f: SpamFields): boolean {
  return spamScore(f) >= 2;
}
