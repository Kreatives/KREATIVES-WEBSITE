"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { CALENDLY } from "@/lib/site";
import styles from "./calculator.module.css";

/* ------------------------------------------------------------------
   Prijslogica. Alle bedragen staan hier bij elkaar zodat ze makkelijk
   aan te passen zijn. fotodag en hostingPerMaand zijn placeholders.
------------------------------------------------------------------ */
const PRIJZEN = {
  landing: 1499,
  herbouw: 3995,
  signatuur: 8945,
  fotodag: 750, // placeholder — zit al in Signatuur
  hostingPerMaand: 49, // placeholder — na het eerste jaar
};

type TypeKeuze = "website" | "webshop-shopify" | "webshop-woo" | "webapp";
type PaginaKeuze = "1" | "2-10" | "11-15" | "15plus";

const TYPE_OPTIES: { value: TypeKeuze; title: string; desc: string }[] = [
  { value: "website", title: "Website", desc: "Bedrijfssite of onepager in WordPress" },
  { value: "webshop-shopify", title: "Webshop in Shopify", desc: "Verkopen met Shopify als platform" },
  { value: "webshop-woo", title: "Webshop in WooCommerce", desc: "Verkopen vanuit WordPress" },
  { value: "webapp", title: "Maatwerk web app", desc: "Portaal, systeem of SaaS" },
];

const PAGINA_OPTIES: { value: PaginaKeuze; title: string; desc: string }[] = [
  { value: "1", title: "Eén pagina", desc: "Een onepager" },
  { value: "2-10", title: "2 tot 10 pagina's", desc: "Home, diensten, over, contact" },
  { value: "11-15", title: "11 tot 15 pagina's", desc: "Een pagina per dienst of locatie" },
  { value: "15plus", title: "Meer dan 15 pagina's", desc: "Veel diensten, locaties of content" },
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
  type: TypeKeuze,
  paginas: PaginaKeuze,
  merk: boolean,
  fotodag: boolean,
  hosting: boolean
): Result {
  const perMaand = hosting ? PRIJZEN.hostingPerMaand : 0;

  if (type !== "website") {
    return {
      custom: true,
      bouw: 0,
      perMaand,
      startVanaf: 0,
      reden:
        "Een webshop of maatwerk web app maken we op maat, buiten de drie vaste trajecten.",
    };
  }
  if (paginas === "15plus") {
    return {
      custom: true,
      bouw: 0,
      perMaand,
      startVanaf: 0,
      reden: "Meer dan vijftien pagina's maken we op maat.",
    };
  }

  let pakket: "landing" | "herbouw" | "signatuur";
  if (merk || paginas === "11-15") pakket = "signatuur";
  else if (paginas === "1") pakket = "landing";
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
            className={`${styles.tile} ${
              value === o.value ? styles.tileSel : ""
            }`}
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

const STAPPEN = ["Je website", "Merk en beeld", "Hosting"];

export default function Calculator() {
  const [stap, setStap] = useState(0);
  const [type, setType] = useState<TypeKeuze>("website");
  const [paginas, setPaginas] = useState<PaginaKeuze>("2-10");
  const [merk, setMerk] = useState(false);
  const [fotodag, setFotodag] = useState(false);
  const [hosting, setHosting] = useState(false);

  const r = bereken(type, paginas, merk, fotodag, hosting);

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
              <>
                <Group
                  title="Wat wil je laten maken?"
                  name="type"
                  value={type}
                  onChange={setType}
                  options={TYPE_OPTIES}
                />
                <Group
                  title="Hoeveel pagina's?"
                  name="paginas"
                  value={paginas}
                  onChange={setPaginas}
                  options={PAGINA_OPTIES}
                />
              </>
            )}
            {stap === 1 && (
              <>
                <Group
                  title="Merk en uitstraling"
                  name="merk"
                  value={merk ? "ja" : "nee"}
                  onChange={(v) => setMerk(v === "ja")}
                  options={jaNee(
                    "Alleen de site",
                    "Mijn merk staat al",
                    "Ook logo, huisstijl en brandbook",
                    "Een nieuw of verfijnd merk erbij"
                  )}
                />
                <Group
                  title="Fotografie"
                  name="fotodag"
                  value={fotodag ? "ja" : "nee"}
                  onChange={(v) => setFotodag(v === "ja")}
                  options={jaNee(
                    "Ik lever beeld zelf aan",
                    "Foto's zijn er al",
                    "Fotodag op locatie",
                    "Fotograaf voor team, werk en portretten"
                  )}
                />
              </>
            )}
            {stap === 2 && (
              <Group
                title="Hosting en onderhoud"
                name="hosting"
                value={hosting ? "ja" : "nee"}
                onChange={(v) => setHosting(v === "ja")}
                options={jaNee(
                  "Regel ik zelf",
                  "Eigen hosting of eigen beheer",
                  "Hosting en onderhoud bij mij",
                  "Het eerste jaar zit er gratis bij"
                )}
              />
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

            <Button
              href={CALENDLY}
              variant="primary"
              className={styles.panelCta}
            >
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

          <div className={styles.trust}>
            <div className={styles.avatars} aria-hidden>
              <span />
              <span />
              <span />
              <span />
            </div>
            <span className={styles.trustText}>Vertrouwd door 100+ ondernemers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
