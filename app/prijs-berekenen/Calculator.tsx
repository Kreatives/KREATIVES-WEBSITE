"use client";

import { useEffect, useRef, useState } from "react";
import SocialProof from "@/components/SocialProof";
import { CALENDLY } from "@/lib/site";
import styles from "./calculator.module.css";

/* ------------------------------------------------------------------
   Prijslogica. Alle bedragen staan hier bij elkaar zodat ze makkelijk
   aan te passen zijn. De add-ons stapelen bovenop de basisprijs.
------------------------------------------------------------------ */
const PRIJZEN = {
  landing: 1499, // landingspagina
  website: 2995, // website (basis)
  webshopExtra: 500, // webshop = website + 500
  brandbook: 2500, // add-on: logo, huisstijl en brandbook
  fotodag: 1000, // add-on: fotodag op locatie
  aiBeelden: 1000, // add-on: beelden met AI
  hostingPerMaand: 49, // per maand, eerste jaar inbegrepen
  croPerMaand: 500, // per maand: maandelijkse CRO-update
};

type Keuze = "website" | "landing" | "shopify" | "woo";

const TYPE_OPTIES: { value: Keuze; title: string; desc: string }[] = [
  { value: "website", title: "Website", desc: "Bedrijfssite in WordPress" },
  { value: "landing", title: "Landingspagina", desc: "Eén pagina voor je campagne" },
  { value: "shopify", title: "Webshop in Shopify", desc: "Verkopen met Shopify" },
  { value: "woo", title: "Webshop in WooCommerce", desc: "Verkopen vanuit WordPress" },
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
const jaNeeVal = (b: boolean | null) => (b === null ? "" : b ? "ja" : "nee");

const euro = (n: number) => "€" + n.toLocaleString("nl-NL");

type Result = {
  state: "leeg" | "ok";
  bouw: number;
  perMaand: number;
  startVanaf: number;
  reden: string;
};

function bereken(
  type: Keuze | null,
  brandbook: boolean | null,
  fotodag: boolean | null,
  ai: boolean | null,
  cro: boolean | null,
  hosting: boolean | null
): Result {
  const perMaand =
    (hosting === true ? PRIJZEN.hostingPerMaand : 0) +
    (cro === true ? PRIJZEN.croPerMaand : 0);

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
  let bouw = type === "landing" ? PRIJZEN.landing : PRIJZEN.website;
  if (isShop) bouw += PRIJZEN.webshopExtra;
  if (brandbook === true) bouw += PRIJZEN.brandbook;
  if (fotodag === true) bouw += PRIJZEN.fotodag;
  if (ai === true) bouw += PRIJZEN.aiBeelden;

  const typeLabel = {
    website: "Website",
    landing: "Landingspagina",
    shopify: "Webshop in Shopify",
    woo: "Webshop in WooCommerce",
  }[type];
  const extras = [
    brandbook === true && "brandbook",
    fotodag === true && "fotodag",
    ai === true && "AI-beelden",
  ].filter(Boolean) as string[];
  const reden = extras.length
    ? `${typeLabel}, met ${extras.join(", ")}.`
    : `${typeLabel}.`;

  const termijnen = type === "landing" ? 2 : 3;

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

export default function Calculator() {
  const [stap, setStap] = useState(0);
  const [lead, setLead] = useState({ naam: "", email: "", bedrijf: "", telefoon: "" });
  const [type, setType] = useState<Keuze | null>(null);
  const [brandbook, setBrandbook] = useState<boolean | null>(null);
  const [fotodag, setFotodag] = useState<boolean | null>(null);
  const [ai, setAi] = useState<boolean | null>(null);
  const [cro, setCro] = useState<boolean | null>(null);
  const [hosting, setHosting] = useState<boolean | null>(null);

  const leadCompleet = Boolean(
    lead.naam.trim() &&
      lead.email.includes("@") &&
      lead.bedrijf.trim() &&
      lead.telefoon.trim()
  );

  const r = bereken(type, brandbook, fotodag, ai, cro, hosting);

  const samenvatting = [
    type && TYPE_OPTIES.find((o) => o.value === type)?.title,
    brandbook === true && "brandbook",
    fotodag === true && "fotodag",
    ai === true && "AI-beelden",
    cro === true && "maandelijkse CRO",
    hosting === true && "hosting bij KREATIVES",
  ]
    .filter(Boolean)
    .join(", ");

  // Lead-mail: één notificatie naar KREATIVES, 30s na stap 1 of bij offerte.
  const [bezig, setBezig] = useState(false);
  const [verzonden, setVerzonden] = useState(false);
  const sentRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dataRef = useRef({ lead, samenvatting, indicatie: "" });
  dataRef.current = {
    lead,
    samenvatting,
    indicatie: r.state === "ok" ? euro(r.bouw) : "op aanvraag",
  };

  const stuurLead = async (fase: string) => {
    if (sentRef.current) return;
    sentRef.current = true;
    const d = dataRef.current;
    try {
      await fetch("/api/calculator-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naam: d.lead.naam,
          email: d.lead.email,
          bedrijf: d.lead.bedrijf,
          telefoon: d.lead.telefoon,
          project: d.samenvatting,
          indicatie: d.indicatie,
          fase,
        }),
      });
    } catch {
      // stil falen
    }
  };

  useEffect(() => {
    if (!leadCompleet) return;
    timerRef.current = setTimeout(() => {
      stuurLead("Stap 1 ingevuld, geen offerte binnen 30s");
    }, 30000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadCompleet]);

  const offerteAanvragen = async () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setBezig(true);
    await stuurLead("Offerte aangevraagd");
    setBezig(false);
    setVerzonden(true);
  };

  const gaNaarStap = (i: number) => {
    if (i === 0 || leadCompleet) setStap(i);
  };

  return (
    <div className={styles.shell}>
      <div className={`cosmos-bg ${styles.shellBg}`} aria-hidden />
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
                {type && (
                  <Group
                    title="Wil je een nieuw merk?"
                    name="brandbook"
                    value={jaNeeVal(brandbook)}
                    onChange={(v) => setBrandbook(v === "ja")}
                    options={jaNee(
                      "Nee, mijn merk staat al",
                      "Ik heb logo en huisstijl",
                      "Ja, logo, huisstijl en brandbook",
                      "+ €2.500"
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
                      "+ €1.000"
                    )}
                  />
                )}
                {type && (
                  <Group
                    title="Beelden met AI?"
                    name="ai"
                    value={jaNeeVal(ai)}
                    onChange={(v) => setAi(v === "ja")}
                    options={jaNee(
                      "Nee",
                      "Geen AI-beelden nodig",
                      "Ja, beelden met AI",
                      "+ €1.000"
                    )}
                  />
                )}
                {type && (
                  <Group
                    title="Maandelijkse CRO-update?"
                    name="cro"
                    value={jaNeeVal(cro)}
                    onChange={(v) => setCro(v === "ja")}
                    options={jaNee(
                      "Nee",
                      "Zelf optimaliseren",
                      "Ja, elke maand verbeteren",
                      "+ €500 per maand"
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
                      "Eerste jaar gratis, daarna € 49 p/m"
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
              <p className={styles.panelPriceCustom}>—</p>
            )}
            <p className={styles.panelReden}>{r.reden}</p>

            <div className={styles.panelRows}>
              <div className={styles.panelRow}>
                <span>Per maand</span>
                <span>{euro(r.perMaand)}</span>
              </div>
              <div className={styles.panelRow}>
                <span>Eenmalige kosten</span>
                <span>{r.state === "ok" ? euro(r.bouw) : "—"}</span>
              </div>
              <div className={styles.panelRow}>
                <span>Daarna per jaar</span>
                <span>{euro(0)}</span>
              </div>
            </div>

            {verzonden ? (
              <p className={styles.panelDank}>
                Bedankt, we hebben je aanvraag ontvangen en nemen snel contact
                op.
              </p>
            ) : (
              <>
                <button
                  type="button"
                  className={`btn btn-primary ${styles.panelCta}`}
                  onClick={offerteAanvragen}
                  disabled={bezig || !leadCompleet}
                >
                  <span className="btn-label">
                    {bezig ? "Versturen…" : "Ontvang een offerte"}
                  </span>
                </button>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className={styles.panelCall}
                >
                  Of plan direct een call in
                </a>
              </>
            )}
          </div>

          <SocialProof align="left" tone="dark" />
        </div>
      </div>
    </div>
  );
}
