import "server-only";
import {
  budgetToNumber,
  leadRating,
  type ScanContact,
  type ScanRow,
} from "@/lib/scan-server";
import { site } from "@/lib/site";

const NOTION_VERSION = "2025-09-03";
const TOKEN = () => process.env.NOTION_TOKEN ?? "";
const DATA_SOURCE_ID = () => process.env.NOTION_DATA_SOURCE_ID ?? "";
const DATABASE_ID = () => process.env.NOTION_DATABASE_ID ?? "";

/* eslint-disable @typescript-eslint/no-explicit-any */

async function notion(path: string, method: string, body?: any): Promise<any> {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN()}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Notion ${method} ${path}: ${res.status} ${txt.slice(0, 300)}`);
  }
  return res.json();
}

/** Leest het type van het "E-mail"-property; dat is nu phone_number, kan later email zijn. */
async function emailPropertyType(): Promise<"email" | "phone_number"> {
  try {
    const ds = await notion(`data_sources/${DATA_SOURCE_ID()}`, "GET");
    const t = ds?.properties?.["E-mail"]?.type;
    return t === "email" ? "email" : "phone_number";
  } catch {
    return "phone_number";
  }
}

/* ---------- Rich text + blocks ---------- */

function rt(text: string): any[] {
  const s = text || "";
  const out: any[] = [];
  for (let i = 0; i < s.length; i += 1900) {
    out.push({ type: "text", text: { content: s.slice(i, i + 1900) } });
  }
  return out.length ? out : [{ type: "text", text: { content: "" } }];
}
const h2 = (t: string) => ({ object: "block", type: "heading_2", heading_2: { rich_text: rt(t) } });
const h3 = (t: string) => ({ object: "block", type: "heading_3", heading_3: { rich_text: rt(t) } });
const p = (t: string) => ({ object: "block", type: "paragraph", paragraph: { rich_text: rt(t) } });
const bullet = (t: string) => ({
  object: "block",
  type: "bulleted_list_item",
  bulleted_list_item: { rich_text: rt(t) },
});
const numbered = (t: string) => ({
  object: "block",
  type: "numbered_list_item",
  numbered_list_item: { rich_text: rt(t) },
});
const divider = () => ({ object: "block", type: "divider", divider: {} });

function buildBlocks(row: ScanRow, contact: ScanContact, resultUrl: string): any[] {
  const a = row.answers;
  const branche = a.branche === "Anders" ? a.brancheAnders : a.branche;
  const blocks: any[] = [];

  blocks.push(h2("Contact"));
  blocks.push(bullet(`Voornaam: ${contact.voornaam}`));
  blocks.push(bullet(`Bedrijf: ${contact.bedrijf}`));
  blocks.push(bullet(`E-mail: ${contact.email}`));
  blocks.push(bullet(`Telefoon: ${contact.telefoon || "-"}`));
  blocks.push(bullet(`Website: ${row.url || "nog geen website"}`));
  blocks.push(bullet(`Rapport: ${resultUrl}`));

  blocks.push(h2("Antwoorden"));
  blocks.push(bullet(`Branche: ${branche || "-"}`));
  blocks.push(bullet(`Ideale klant: ${a.idealeKlant || "-"}`));
  blocks.push(bullet(`Doel: ${a.doel || "-"}`));
  blocks.push(bullet(`Timing: ${a.timing || "-"}`));
  blocks.push(bullet(`Budget: ${a.budget || "-"}`));

  const r = row.report;
  if (r) {
    blocks.push(h2("Eindoordeel"));
    blocks.push(
      p(
        `${r.eindoordeel.zouActieOndernemen.toUpperCase()} — ${r.eindoordeel.uitleg} (Totaalscore: ${r.totaalscore}/100)`
      )
    );

    blocks.push(h2("Doelgroep"));
    blocks.push(bullet(`Opgegeven: ${r.doelgroep.opgegeven}`));
    blocks.push(bullet(`Wat de site uitstraalt: ${r.doelgroep.watDeSiteUitstraalt}`));
    blocks.push(bullet(`Match: ${r.doelgroep.match} — ${r.doelgroep.toelichting}`));

    blocks.push(h2("Door de ogen van de klant"));
    for (const s of r.doorDeOgenVanJeKlant) {
      blocks.push(bullet(`${s.sectie} – ${s.blijftOfHaaktAf}: ${s.watDeKlantDenkt}`));
    }

    blocks.push(h2("Scores per categorie"));
    for (const c of r.categorieen) {
      blocks.push(h3(`${c.naam} – ${c.score}/10`));
      blocks.push(p(`Observatie: ${c.observatie}`));
      blocks.push(p(`Waarom het uitmaakt: ${c.waaromHetUitmaakt}`));
      blocks.push(p(`Verbetering: ${c.verbetering}`));
    }

    blocks.push(h2("Top 3 pijnpunten"));
    r.topPijnpunten.forEach((pp, i) => {
      blocks.push(h3(`${i + 1}. ${pp.titel}`));
      blocks.push(p(pp.uitleg));
      blocks.push(p(`Zelf oplossen: ${pp.zelfOplossen}`));
    });

    blocks.push(h2("Wat goed gaat"));
    for (const g of r.watGoedGaat) blocks.push(bullet(g));

    blocks.push(h2("Ontbrekende elementen"));
    for (const e of r.ontbrekendeElementen) blocks.push(bullet(e));

    blocks.push(h2("Voorgestelde opbouw"));
    for (const s of r.voorgesteldeOpbouw) blocks.push(numbered(s));

    blocks.push(h2("Nieuwe kop"));
    blocks.push(p(`Nu: "${r.nieuweKop.huidigeKop}"`));
    blocks.push(p(`Voorstel: "${r.nieuweKop.voorgesteldeKop}"`));
    blocks.push(p(`Subkop: ${r.nieuweKop.voorgesteldeSubkop}`));
  } else {
    blocks.push(h2("Advies (nog geen website)"));
    blocks.push(
      p(
        "Deze ondernemer heeft nog geen website. Bespreek in het gesprek wat de doelgroep als eerste wil zien, welk bewijs het zwaarst weegt en welke actie het best past."
      )
    );
  }

  blocks.push(divider());
  blocks.push(
    p(
      `Automatisch aangemaakt door de Website Scan op ${new Date().toLocaleString("nl-NL")}`
    )
  );
  return blocks;
}

/** Maakt de LEAD TRACKER-page aan en vult de body met het rapport. Retourneert page-id. */
export async function createLeadPage(
  row: ScanRow,
  contact: ScanContact,
  resultUrl: string
): Promise<string> {
  const a = row.answers;
  const branche = (a.branche === "Anders" ? a.brancheAnders : a.branche) || "Onbekend";
  const emailType = await emailPropertyType();
  const today = new Date().toISOString().slice(0, 10);
  const score = row.report?.totaalscore ?? "-";
  const verdictTxt = row.report?.eindoordeel.zouActieOndernemen ?? "-";

  const extra = row.geen_website
    ? `Website Scan | Nog geen website | Budget: ${a.budget} | Timing: ${a.timing}`
    : `Website Scan | ${row.url} | Score ${score}/100 | Eindoordeel: ${verdictTxt} | Budget: ${a.budget} | Timing: ${a.timing} | Rapport: ${resultUrl}`;

  const properties: any = {
    "Naam lead": { title: rt(`${contact.bedrijf} (${contact.voornaam})`) },
    "Datum eerste bericht": { date: { start: today } },
    Status: { multi_select: [{ name: "Bericht" }] },
    Branche: { select: { name: branche.slice(0, 100) } },
    Tel: { phone_number: contact.telefoon || null },
    "Lead Source": { select: { name: "Website Scan" } },
    Budget: { number: budgetToNumber(a.budget) },
    "Lead rating (1-5)": { rich_text: rt(leadRating(a.budget, a.timing)) },
    EXTRA: { rich_text: rt(extra) },
  };
  properties["E-mail"] =
    emailType === "email"
      ? { email: contact.email }
      : { phone_number: contact.email };

  const blocks = buildBlocks(row, contact, resultUrl);
  const first = blocks.slice(0, 100);
  const rest = blocks.slice(100);

  let page: any;
  const payload = (parent: any) => ({ parent, properties, children: first });
  try {
    page = await notion("pages", "POST", payload({ type: "data_source_id", data_source_id: DATA_SOURCE_ID() }));
  } catch {
    // Terugvallen op database_id als de data_source-parent niet wordt geaccepteerd.
    page = await notion("pages", "POST", payload({ type: "database_id", database_id: DATABASE_ID() }));
  }

  for (let i = 0; i < rest.length; i += 100) {
    await notion(`blocks/${page.id}/children`, "PATCH", {
      children: rest.slice(i, i + 100),
    });
  }
  return page.id;
}

/** 2 retries; gooit door als het echt niet lukt zodat de caller het kan loggen. */
export async function createLeadPageWithRetry(
  row: ScanRow,
  contact: ScanContact,
  resultUrl: string
): Promise<string> {
  let lastErr: unknown;
  for (let i = 0; i < 3; i++) {
    try {
      return await createLeadPage(row, contact, resultUrl);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

/** Zet de Status van een page (bijv. ["Call ingepland"]). Best-effort. */
export async function setStatus(pageId: string, names: string[]): Promise<void> {
  await notion(`pages/${pageId}`, "PATCH", {
    properties: { Status: { multi_select: names.map((name) => ({ name })) } },
  });
}

export function resultUrlFor(id: string): string {
  return `${site.domain}/website-scan/resultaat/${id}`;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
