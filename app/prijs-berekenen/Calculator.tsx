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
  landing: 1499,
  herbouw: 3995,
  signatuur: 8945,
  fotodag: 750, // placeholder — zit al in Signatuur
  hostingPerMaand: 49, // placeholder — na het eerste jaar
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
  custom: boolean;
  bouw: number;
  perMaand: number;
  startVanaf: number;
  reden: string;
};

function bereken(
  type: Keuze,
  pagina: Pagina,
  brandbook: boolean,
  fotodag: boolean,
  hosting: boolean
): Result {
  const perMaand = hosting ? PRIJZEN.hostingPerMaand : 0;

  if (type === "shopify" || type === "woo") {
    return {
      custom: true,
      bouw: 0,
      perMaand,
      startVanaf: 0,
      reden: "Een webshop stellen we op maat samen. Plan een gesprek voor een vaste prijs.",
    };
  }

  let pakket: "landing" | "herbouw" | "signatuur";
  if (type === "landing") pakket = "landing";
  else if (brandbook || pagina === "meer") pakket = "signatuur";
  else pakket = "herbouw";

  const fotoInbegrepen = pakket === "signatuur";
  let bouw = PRIJZEN[pakket];
  if (fotodag && !fotoInbegrepen) bouw += PRIJZEN.fotodag;

  const namen = { landing: "Landing", herbouw: "Herbouw", signatuur: "Signatuur" };
  const termijnen = pakket === "landing" ? 2 : 3;

  return {
    custom: false,
    bouw,
    perMaand,
    startVanaf: Math.round(bouw / termijnen),
    reden: `Komt overeen met ${namen[pakket]} (${euro(PRIJZEN[pakket])}).`,
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
  value: T;
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
  const [type, setType] = useState<Keuze>("website");
  const [pagina, setPagina] = useState<Pagina>("tot10");
  const [brandbook, setBrandbook] = useState(false);
  const [fotodag, setFotodag] = useState(false);
  const [hosting, setHosting] = useState(false);

  const isWebsite = type === "website";
  const isLanding = type === "landing";
  const isShop = type === "shopify" || type === "woo";

  const r = bereken(type, pagina, brandbook, fotodag, hosting);

  const samenvatting = [
    TYPE_OPTIES.find((o) => o.value === type)?.title,
    isWebsite && PAGINA_OPTIES.find((o) => o.value === pagina)?.title,
    isWebsite && (brandbook ? "met brandbook" : "zonder brandbook"),
    (isWebsite || isLanding) && (fotodag ? "met fotodag" : "zonder fotodag"),
    !isShop && (hosting ? "hosting bij KREATIVES" : "eigen hosting"),
  ]
    .filter(Boolean)
    .join(", ");

  const mailBody = [
    `Naam: ${lead.naam}`,
    `E-mail: ${lead.email}`,
    lead.bedrijf && `Bedrijf: ${lead.bedrijf}`,
    lead.telefoon && `Telefoon: ${lead.telefoon}`,
    "",
    `Project: ${samenvatting}`,
    r.custom ? "Indicatie bouw: op aanvraag" : `Indicatie bouw: ${euro(r.bouw)}`,
  ]
    .filter(Boolean)
    .join("\n");
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Offerteaanvraag via de calculator"
  )}&body=${encodeURIComponent(mailBody)}`;

  return (
    <div className={styles.shell}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.stepper} role="tablist">
            {STAPPEN.map((naam, i) => (
              <button
                key={naam}
                type="button"
                role="tab"
                aria-selected={stap === i}
                className={`${styles.step} ${stap === i ? styles.stepActive : ""}`}
                onClick={() => setStap(i)}
              >
                <span className={styles.stepNo}>{i + 1}</span>
                <span className={styles.stepNaam}>{naam}</span>
              </button>
            ))}
          </div>

          <div className={styles.stepBody}>
            {stap === 0 && (
              <div className={styles.leadForm}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Naam</span>
                  <input
                    className={styles.input}
                    type="text"
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
                    value={lead.bedrijf}
                    onChange={(e) => setLead({ ...lead, bedrijf: e.target.value })}
                    placeholder="Optioneel"
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Telefoon</span>
                  <input
                    className={styles.input}
                    type="tel"
                    value={lead.telefoon}
                    onChange={(e) => setLead({ ...lead, telefoon: e.target.value })}
                    placeholder="Optioneel"
                  />
                </label>
              </div>
            )}

            {stap === 1 && (
              <>
                <Group
                  title="Wat wil je laten maken?"
                  name="type"
                  value={type}
                  onChange={setType}
                  options={TYPE_OPTIES}
                />
                {isWebsite && (
                  <Group
                    title="Hoeveel pagina's?"
                    name="pagina"
                    value={pagina}
                    onChange={setPagina}
                    options={PAGINA_OPTIES}
                  />
                )}
                {isWebsite && (
                  <Group
                    title="Wil je een nieuw merk?"
                    name="brandbook"
                    value={brandbook ? "ja" : "nee"}
                    onChange={(v) => setBrandbook(v === "ja")}
                    options={jaNee(
                      "Nee, mijn merk staat al",
                      "Ik heb logo en huisstijl",
                      "Ja, met logo, huisstijl en brandbook",
                      "Signatuur-traject"
                    )}
                  />
                )}
                {(isWebsite || isLanding) && (
                  <Group
                    title="Fotografie"
                    name="fotodag"
                    value={fotodag ? "ja" : "nee"}
                    onChange={(v) => setFotodag(v === "ja")}
                    options={jaNee(
                      "Ik lever beeld zelf aan",
                      "Foto's zijn er al",
                      "Fotodag op locatie",
                      "Fotograaf voor team en werk"
                    )}
                  />
                )}
                {!isShop && (
                  <Group
                    title="Hosting en onderhoud"
                    name="hosting"
                    value={hosting ? "ja" : "nee"}
                    onChange={(v) => setHosting(v === "ja")}
                    options={jaNee(
                      "Regel ik zelf",
                      "Eigen hosting of beheer",
                      "Bij KREATIVES",
                      "Eerste jaar zit erbij"
                    )}
                  />
                )}
                {isShop && (
                  <p className={styles.shopNote}>
                    Een webshop stellen we op maat samen, afhankelijk van je
                    producten en koppelingen. Vraag een offerte aan, dan krijg je
                    één vaste prijs.
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.panel}>
            <span className={styles.panelEyebrow}>
              Indicatie van de bouw (excl. btw)
            </span>
            {r.custom ? (
              <p className={styles.panelPriceCustom}>Op aanvraag</p>
            ) : (
              <>
                <p className={styles.panelPrice}>{euro(r.bouw)}</p>
                <p className={styles.panelStart}>
                  Start al vanaf {euro(r.startVanaf)} per termijn
                </p>
              </>
            )}
            <p className={styles.panelReden}>{r.reden}</p>

            <div className={styles.panelRows}>
              <div className={styles.panelRow}>
                <span>Per maand</span>
                <span>{euro(r.perMaand)}</span>
              </div>
              <div className={styles.panelRow}>
                <span>Eenmalige kosten</span>
                <span>{r.custom ? "Op aanvraag" : euro(r.bouw)}</span>
              </div>
              <div className={styles.panelRow}>
                <span>Daarna per jaar</span>
                <span>{euro(r.perMaand * 12)}</span>
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

          <SocialProof align="left" tone="light" />
        </div>
      </div>
    </div>
  );
}
