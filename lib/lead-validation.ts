// Gedeelde leadvalidatie voor de prijscalculator. Zowel de client (Calculator)
// als de server (api/calculator-lead) gebruiken deze functies, zodat de regels
// op beide plekken exact gelijk zijn. Doel: geen nep-namen, ongeldige e-mails
// of telefoonnummers die niet kloppen.

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

export function valideerNaam(ruw: string): string | null {
  const naam = ruw.trim();
  if (naam.length < 2) return "Vul je volledige naam in.";
  const letters = (naam.match(/\p{L}/gu) ?? []).length;
  if (letters < 2) return "Dit lijkt geen echte naam.";
  // Een naam bevat geen cijfers, e-mailadressen of links.
  if (/\d/.test(naam) || /https?:|www\.|@/i.test(naam)) {
    return "Dit lijkt geen echte naam.";
  }
  // Één letter die zich eindeloos herhaalt (aaaa, xxxx) is geen naam.
  const alleenLetters = naam.replace(/[^\p{L}]/gu, "").toLowerCase();
  if (alleenLetters.length > 1 && new Set(alleenLetters).size === 1) {
    return "Dit lijkt geen echte naam.";
  }
  return null;
}

export function valideerEmail(ruw: string): string | null {
  const email = ruw.trim();
  if (!email) return "Vul je e-mailadres in.";
  if (!EMAIL_RE.test(email)) return "Vul een geldig e-mailadres in.";
  return null;
}

export function valideerTelefoon(ruw: string): string | null {
  const telefoon = ruw.trim();
  if (!telefoon) return "Vul je telefoonnummer in.";
  if (!TELEFOON_TEKENS_RE.test(telefoon)) {
    return "Een telefoonnummer bevat alleen cijfers.";
  }
  const cijfers = telefoon.replace(/\D/g, "");
  // NL-nummers hebben 10 cijfers (06 12345678); met landcode wat meer. We laten
  // 9 t/m 15 cijfers toe (9 = NL zonder voorloop-0, 15 = max E.164).
  if (cijfers.length < 9 || cijfers.length > 15) {
    return "Vul een geldig telefoonnummer in (bijv. 06 12345678).";
  }
  // Hetzelfde cijfer eindeloos herhaald (0000000000) is nep.
  if (new Set(cijfers).size === 1) {
    return "Vul een geldig telefoonnummer in (bijv. 06 12345678).";
  }
  return null;
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
