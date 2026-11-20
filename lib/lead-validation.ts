// Gedeelde leadvalidatie voor de prijscalculator. Zowel de client (Calculator)
// als de server (api/calculator-lead) gebruiken deze functies, zodat de regels
// op beide plekken exact gelijk zijn. Doel: geen nep-namen, onzin-e-mails
// (asdfasdf@...) of telefoonnummers die niet kloppen.

export type LeadVeld = "naam" | "email" | "telefoon" | "bedrijf";
export type LeadInvoer = {
  naam: string;
  email: string;
  telefoon: string;
  bedrijf: string;
};
export type LeadFouten = Partial<Record<LeadVeld, string>>;

// Lokaal deel + @ + domein + TLD van minstens twee tekens. Vangt test@,
// @test.com en naam@bedrijf (zonder punt) af.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Toegestane tekens in een telefoonnummer: cijfers, spatie, + - ( ) en punt.
const TELEFOON_TEKENS_RE = /^[+()\d\s.\-]+$/;

// ------------------------------------------------------------------
// Onzin-detectie: herkent toetsenbord-gehamer zoals "asdf", "qwerty",
// herhaalde patronen ("abcabc") en 3x dezelfde letter ("aaa"). Alleen
// de drie letterrijen, niet de cijferrij, zodat echte e-mails met een
// jaartal (jan1990@...) niet onterecht sneuvelen.
// ------------------------------------------------------------------
const TOETSEN_RIJEN = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

function zijnToetsBuren(a: string, b: string): boolean {
  for (const rij of TOETSEN_RIJEN) {
    const ia = rij.indexOf(a);
    const ib = rij.indexOf(b);
    if (ia !== -1 && ib !== -1 && Math.abs(ia - ib) === 1) return true;
  }
  return false;
}

// Vier of meer letters die naast elkaar op het toetsenbord liggen (asdf,
// qwer, zxcv — ook achterstevoren, fdsa).
function heeftToetsenbordWalk(s: string): boolean {
  let run = 1;
  for (let i = 1; i < s.length; i++) {
    if (zijnToetsBuren(s[i - 1], s[i])) {
      run++;
      if (run >= 4) return true;
    } else {
      run = 1;
    }
  }
  return false;
}

// Een kort stuk dat de hele string vult (asdfasdf = asdf×2, abcabc = abc×2).
function isHerhaaldPatroon(s: string): boolean {
  const n = s.length;
  if (n < 6) return false;
  for (let unit = 1; unit <= n / 2; unit++) {
    if (n % unit !== 0) continue;
    if (s.slice(0, unit).repeat(n / unit) === s) return true;
  }
  return false;
}

export function lijktOpOnzin(ruw: string): boolean {
  const s = ruw.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (s.length < 3) return false;
  if (/(.)\1\1/.test(s)) return true; // aaa, 111
  if (heeftToetsenbordWalk(s)) return true; // asdf, qwerty, zxcv
  if (isHerhaaldPatroon(s)) return true; // asdfasdf, abcabc
  return false;
}

// ------------------------------------------------------------------
// Validators per veld.
// ------------------------------------------------------------------
export function valideerNaam(ruw: string): string | null {
  const naam = ruw.trim();
  if (naam.length < 2) return "Vul je volledige naam in.";
  const letters = (naam.match(/\p{L}/gu) ?? []).length;
  if (letters < 2) return "Dit lijkt geen echte naam.";
  // Een naam bevat geen cijfers, e-mailadressen of links.
  if (/\d/.test(naam) || /https?:|www\.|@/i.test(naam)) {
    return "Dit lijkt geen echte naam.";
  }
  if (lijktOpOnzin(naam)) return "Dit lijkt geen echte naam.";
  return null;
}

export function valideerEmail(ruw: string): string | null {
  const email = ruw.trim();
  if (!email) return "Vul je e-mailadres in.";
  if (!EMAIL_RE.test(email)) return "Vul een geldig e-mailadres in.";
  // Het stuk vóór de @ mag geen toetsenbord-gehamer zijn (asdfasdf@...).
  const lokaal = email.split("@")[0];
  if (lijktOpOnzin(lokaal)) return "Vul een echt e-mailadres in.";
  return null;
}

export function valideerTelefoon(ruw: string): string | null {
  const telefoon = ruw.trim();
  if (!telefoon) return "Vul je telefoonnummer in.";
  if (!TELEFOON_TEKENS_RE.test(telefoon)) {
    return "Een telefoonnummer bevat alleen cijfers.";
  }
  // Normaliseer naar nationaal formaat: +31 / 0031 worden een voorloop-0.
  let norm = telefoon.replace(/[\s.\-()]/g, "");
  if (norm.startsWith("+31")) norm = "0" + norm.slice(3);
  else if (norm.startsWith("0031")) norm = "0" + norm.slice(4);

  // Hetzelfde cijfer eindeloos herhaald (0000000000) is nep.
  const alleCijfers = norm.replace(/\D/g, "");
  if (alleCijfers.length > 0 && new Set(alleCijfers).size === 1) {
    return "Vul een geldig telefoonnummer in (bijv. 06 12345678).";
  }

  // NL-nummer (begint met 0): altijd exact 10 cijfers (06… mobiel, 0…
  // vast). 06392349234 (11 cijfers) valt hier dus terecht af.
  if (norm.startsWith("0")) {
    if (!/^0\d{9}$/.test(norm)) {
      return "Vul een geldig telefoonnummer in (10 cijfers, bijv. 06 12345678).";
    }
    return null;
  }

  // Buitenlands nummer met landcode (+32, +49…): 8 t/m 15 cijfers (E.164).
  if (norm.startsWith("+")) {
    const cijfers = norm.replace(/\D/g, "");
    if (cijfers.length < 8 || cijfers.length > 15) {
      return "Vul een geldig telefoonnummer in.";
    }
    return null;
  }

  // Geen 0 en geen +: niet herkenbaar als geldig nummer.
  return "Vul een geldig telefoonnummer in (bijv. 06 12345678).";
}

export function valideerBedrijf(ruw: string): string | null {
  if (!ruw.trim()) return "Vul je bedrijfsnaam in.";
  return null;
}

export function valideerLead(invoer: LeadInvoer): LeadFouten {
  const fouten: LeadFouten = {};
  const naam = valideerNaam(invoer.naam);
  if (naam) fouten.naam = naam;
  const email = valideerEmail(invoer.email);
  if (email) fouten.email = email;
  const telefoon = valideerTelefoon(invoer.telefoon);
  if (telefoon) fouten.telefoon = telefoon;
  const bedrijf = valideerBedrijf(invoer.bedrijf);
  if (bedrijf) fouten.bedrijf = bedrijf;
  return fouten;
}
