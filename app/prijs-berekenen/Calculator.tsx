"use client";

import { useState } from "react";
import Button from "@/components/Button";
import SocialProof from "@/components/SocialProof";
import { CALENDLY, site } from "@/lib/site";
import styles from "./calculator.module.css";

/* ------------------------------------------------------------------
   Prijslogica, afgeleid van de drie pakketten. Alle bedragen staan hier
   bij elkaar. fotodag en hostingPerMaand zijn placeholders.
------------------------------------------------------------------ */
const PRIJZEN = {
  landing: 1499, // landingspagina
  websiteTot5: 2495, // compacte website tot 5 pagina's
  herbouw: 3995, // website tot 10 pagina's
  signatuur: 8945, // meer dan 10 pagina's of met merk/brandbook
  webshopExtra: 500, // webshop = dezelfde opzet + 500
  fotodag: 750, // placeholder — zit al in Signatuur
  hostingPerMaand: 49, // placeholder — eerste jaar inbegrepen
};

type Keuze = "website" | "landing" | "shopify" | "woo";
type Pagina = "tot5" | "tot10" | "meer";

const TYPE_OPTIES: { value: Keuze; title: string; desc: string }[] = [
  { value: "website", title: "Website", desc: "Bedrijfssite met meerdere pagina's" },
  { value: "landing", title: "Landingspagina", desc: "Eén pagina voor je campagne" },
  { value: "shopify", title: "Webshop in Shopify", desc: "Verkopen met Shopify" },
  { value: "woo", title: "Webshop in WooCommerce", desc: "Verkopen vanuit WordPress" },
];

const PAGINA_OPTIES: { value: Pagina; title: string; desc: string }[] = [
  { value: "tot5", title: "Tot 5 pagina's", desc: "Een compacte site" },
  { value: "tot10", title: "Tot 10 pagina's", desc: "Home, diensten, over, contact en meer" },
  { value: "meer", title: "Meer dan 10 pagina's", desc: "Veel diensten of locaties" },
];

const jaNee = (
  neeTitle: string,
  neeDesc: string,
  jaTitle: string,
  jaDesc: string
) => [
  { value: "nee" as const, title: neeTitle, desc: neeDesc },
  { value: "ja" as const, title: jaTitle, desc: jaDesc },
];

const euro = (n: number) => "€" + n.toLocaleString("nl-NL");

type Result = {
  state: "leeg" | "custom" | "ok";
  bouw: number;
  perMaand: number;
  startVanaf: number;
  reden: string;
};

function bereken(
  type: Keuze | null,
  pagina: Pagina | null,
  brandbook: boolean | null,
  fotodag: boolean | null,
  hosting: boolean | null
): Result {
  const perMaand = hosting === true ? PRIJZEN.hostingPerMaand : 0;

  if (!type) {
    return {
      state: "leeg",
      bouw: 0,
      perMaand,
      startVanaf: 0,
      reden: "Kies je opties hieronder voor een indicatie.",
    };
  }

  const isShop = type === "shopify" || type === "woo";
  const heeftPaginas = type === "website" || isShop;
  if (heeftPaginas && !pagina) {
    return {
      state: "leeg",
      bouw: 0,
      perMaand,
      startVanaf: 0,
      reden: "Kies het aantal pagina's voor een indicatie.",
    };
  }

  let base: number;
  let signatuurNiveau = false;
  if (type === "landing") base = PRIJZEN.landing;
  else if (brandbook === true || pagina === "meer") {
    base = PRIJZEN.signatuur;
    signatuurNiveau = true;
  } else if (pagina === "tot5") base = PRIJZEN.websiteTot5;
  else base = PRIJZEN.herbouw;

  if (isShop) base += PRIJZEN.webshopExtra;

  let bouw = base;
  if (fotodag === true && !signatuurNiveau) bouw += PRIJZEN.fotodag;

  const typeLabel = {
    website: "Website",
    landing: "Landingspagina",
    shopify: "Webshop in Shopify",
    woo: "Webshop in WooCommerce",
  }[type];
  const paginaLabel = pagina
    ? { tot5: "tot 5 pagina's", tot10: "tot 10 pagina's", meer: "meer dan 10 pagina's" }[pagina]
    : "";
  const reden =
    type === "landing"
      ? "Een landingspagina, klaar om te adverteren."
      : `${typeLabel}, ${paginaLabel}.`;

  const termijnen = bouw < 3000 ? 2 : 3;

  return {
    state: "ok",
    bouw,
    perMaand,
    startVanaf: Math.round(bouw / termijnen),
    reden,
  };
}

function Group<T extends string>({
  title,
  name,
  value,
  onChange,
  options,
}: {
  title: string;
  name: string;
  value: string;
  onChange: (v: T) => void;
  options: { value: T; title: string; desc: string }[];
}) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.groupTitle}>{title}</legend>
      <div className={styles.options}>
        {options.map((o) => (
          <label
            key={o.value}
            className={`${styles.tile} ${value === o.value ? styles.tileSel : ""}`}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className={styles.srOnly}
            />
            <span className={styles.radio} aria-hidden />
            <span className={styles.tileText}>
              <span className={styles.tileTitle}>{o.title}</span>
              <span className={styles.tileDesc}>{o.desc}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const STAPPEN = ["Jouw gegevens", "Jouw project"];
const jaNeeVal = (b: boolean | null) => (b === null ? "" : b ? "ja" : "nee");

export default function Calculator() {
  const [stap, setStap] = useState(0);
  const [lead, setLead] = useState({ naam: "", email: "", bedrijf: "", telefoon: "" });
  const [type, setType] = useState<Keuze | null>(null);
  const [pagina, setPagina] = useState<Pagina | null>(null);
  const [brandbook, setBrandbook] = useState<boolean | null>(null);
  const [fotodag, setFotodag] = useState<boolean | null>(null);
  const [hosting, setHosting] = useState<boolean | null>(null);

  const isWebsite = type === "website";
  const isShop = type === "shopify" || type === "woo";

  const leadCompleet = Boolean(
    lead.naam.trim() &&
      lead.email.includes("@") &&
      lead.bedrijf.trim() &&
      lead.telefoon.trim()
  );

  const r = bereken(type, pagina, brandbook, fotodag, hosting);

  const samenvatting = [
    type && TYPE_OPTIES.find((o) => o.value === type)?.title,
    (isWebsite || isShop) && pagina && PAGINA_OPTIES.find((o) => o.value === pagina)?.title,
    (isWebsite || isShop) && brandbook !== null && (brandbook ? "met brandbook" : "zonder brandbook"),
    fotodag !== null && (fotodag ? "met fotodag" : "zonder fotodag"),
    hosting !== null && (hosting ? "hosting bij KREATIVES" : "eigen hosting"),
  ]
    .filter(Boolean)
    .join(", ");

  const mailBody = [
    `Naam: ${lead.naam}`,
    `E-mail: ${lead.email}`,
    `Bedrijf: ${lead.bedrijf}`,
    `Telefoon: ${lead.telefoon}`,
    "",
    `Project: ${samenvatting || "nog niet ingevuld"}`,
    r.state === "ok" ? `Indicatie bouw: ${euro(r.bouw)}` : "Indicatie bouw: op aanvraag",
  ].join("\n");
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Offerteaanvraag via de calculator"
  )}&body=${encodeURIComponent(mailBody)}`;

  const gaNaarStap = (i: number) => {
    if (i === 0 || leadCompleet) setStap(i);
  };

  return (
    <div className={`cosmos-bg ${styles.shell}`}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.stepper} role="tablist">
            {STAPPEN.map((naam, i) => {
              const gated = i > 0 && !leadCompleet;
              return (
                <button
                  key={naam}
                  type="button"
                  role="tab"
                  aria-selected={stap === i}
                  disabled={gated}
                  className={`${styles.step} ${stap === i ? styles.stepActive : ""}`}
                  onClick={() => gaNaarStap(i)}
                >
                  <span className={styles.stepNo}>{i + 1}</span>
                  <span className={styles.stepNaam}>{naam}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.stepBody}>
            {stap === 0 && (
              <div className={styles.leadForm}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Naam</span>
                  <input
                    className={styles.input}
                    type="text"
                    required
                    value={lead.naam}
                    onChange={(e) => setLead({ ...lead, naam: e.target.value })}
                    placeholder="Je naam"
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>E-mailadres</span>
                  <input
                    className={styles.input}
                    type="email"
                    required
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                    placeholder="naam@bedrijf.nl"
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Bedrijf</span>
                  <input
                    className={styles.input}
                    type="text"
                    required
                    value={lead.bedrijf}
                    onChange={(e) => setLead({ ...lead, bedrijf: e.target.value })}
                    placeholder="Je bedrijfsnaam"
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Telefoon</span>
                  <input
                    className={styles.input}
                    type="tel"
                    required
                    value={lead.telefoon}
                    onChange={(e) => setLead({ ...lead, telefoon: e.target.value })}
                    placeholder="Je telefoonnummer"
                  />
                </label>
              </div>
            )}

            {stap === 1 && (
              <>
                <Group
                  title="Wat wil je laten maken?"
                  name="type"
                  value={type ?? ""}
                  onChange={setType}
                  options={TYPE_OPTIES}
                />
                {(isWebsite || isShop) && (
                  <Group
                    title="Hoeveel pagina's?"
                    name="pagina"
                    value={pagina ?? ""}
                    onChange={setPagina}
                    options={PAGINA_OPTIES}
                  />
                )}
                {(isWebsite || isShop) && (
                  <Group
                    title="Wil je een nieuw merk?"
                    name="brandbook"
                    value={jaNeeVal(brandbook)}
                    onChange={(v) => setBrandbook(v === "ja")}
                    options={jaNee(
                      "Nee, mijn merk staat al",
                      "Ik heb logo en huisstijl",
                      "Ja, met logo, huisstijl en brandbook",
                      "Signatuur-traject"
                    )}
                  />
                )}
                {type && (
                  <Group
                    title="Fotografie"
                    name="fotodag"
                    value={jaNeeVal(fotodag)}
                    onChange={(v) => setFotodag(v === "ja")}
                    options={jaNee(
                      "Ik lever beeld zelf aan",
                      "Foto's zijn er al",
                      "Fotodag op locatie",
                      "Fotograaf voor team en werk"
                    )}
                  />
                )}
                {type && (
                  <Group
                    title="Hosting en onderhoud"
                    name="hosting"
                    value={jaNeeVal(hosting)}
                    onChange={(v) => setHosting(v === "ja")}
                    options={jaNee(
                      "Regel ik zelf",
                      "Eigen hosting of beheer",
                      "Bij KREATIVES",
                      "Eerste jaar zit erbij"
                    )}
                  />
                )}
              </>
            )}
          </div>

          <div className={styles.nav}>
            {stap > 0 && (
              <button
                type="button"
                className={styles.navPrev}
                onClick={() => setStap(stap - 1)}
              >
                Vorige
              </button>
            )}
            {stap < STAPPEN.length - 1 && (
              <button
                type="button"
                className={styles.navNext}
                disabled={!leadCompleet}
                onClick={() => setStap(stap + 1)}
              >
                Volgende
              </button>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.panel}>
            <span className={styles.panelEyebrow}>
              Indicatie van de bouw (excl. btw)
            </span>
            {r.state === "ok" ? (
              <>
                <p className={styles.panelPrice}>{euro(r.bouw)}</p>
                <p className={styles.panelStart}>
                  Start al vanaf {euro(r.startVanaf)} per termijn
                </p>
              </>
            ) : (
              <p className={styles.panelPriceCustom}>
                {r.state === "custom" ? "Op aanvraag" : "—"}
              </p>
            )}
            <p className={styles.panelReden}>{r.reden}</p>

            <div className={styles.panelRows}>
              <div className={styles.panelRow}>
                <span>Per maand</span>
                <span>{euro(r.perMaand)}</span>
              </div>
              <div className={styles.panelRow}>
                <span>Eenmalige kosten</span>
                <span>
                  {r.state === "ok"
                    ? euro(r.bouw)
                    : r.state === "custom"
                      ? "Op aanvraag"
                      : "—"}
                </span>
              </div>
              <div className={styles.panelRow}>
                <span>Daarna per jaar</span>
                <span>{euro(0)}</span>
              </div>
            </div>

            <Button href={mailto} variant="primary" className={styles.panelCta}>
              Ontvang een offerte
            </Button>
            <a
              href={CALENDLY}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className={styles.panelCall}
            >
              Of plan direct een call in
            </a>
          </div>

          <SocialProof align="left" tone="dark" />
        </div>
      </div>
    </div>
  );
}
