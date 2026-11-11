"use client";

import { useState } from "react";
import Link from "next/link";
import { CALENDLY } from "@/lib/site";
import styles from "./express.module.css";

type Val = boolean | string;

const EXPRESS = {
  name: "KREATIVES Express",
  tagline: "Je wilt snel een nette website voor een vaste prijs.",
  price: "€695 tot €1.795",
  priceSub: "vaste prijs",
  cta: "Bekijk de pakketten",
  href: "#pakketten",
};
const MAATWERK = {
  name: "KREATIVES Maatwerk",
  tagline: "Je bedrijf is gegroeid en je website moet meer doen.",
  price: "Vanaf €3.000",
  priceSub: "op offerte",
  cta: "Plan een gesprek",
  href: CALENDLY,
};

const ROWS: { label: string; express: Val; maatwerk: Val }[] = [
  { label: "Ontwerp op maat, door Ricky", express: true, maatwerk: true },
  { label: "Alles op jouw naam", express: true, maatwerk: true },
  { label: "Contact", express: "Vragen stel je via e-mail", maatwerk: "Bellen, appen en gesprekken inplannen" },
  { label: "Persoonlijk contact", express: false, maatwerk: true },
  { label: "Aantal pagina’s", express: "1 tot 8, vast per pakket", maatwerk: "Zoveel als je nodig hebt" },
  { label: "Aanpassingen", express: "1 tot 3 rondes, vast per pakket", maatwerk: "Tot het klopt" },
  { label: "Flexibiliteit", express: "Wat in je pakket zit, is wat je krijgt", maatwerk: "We passen het plan aan als dat nodig is" },
  { label: "3D-animaties", express: false, maatwerk: true },
  { label: "Koppelingen, webshop of boekingssysteem", express: false, maatwerk: true },
  { label: "Functies en plugins op maat", express: false, maatwerk: true },
  { label: "Merk- en marketingstrategie", express: false, maatwerk: true },
  { label: "Eerste ontwerp", express: "Binnen 48 uur", maatwerk: "1 week na de strategiefase" },
  { label: "Live binnen", express: "1 tot 3 weken", maatwerk: "4 tot 8 weken" },
];

function Check() {
  return (
    <svg className={styles.vglCheck} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="m4 10.5 4 4 8-9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Cross({ onDark }: { onDark?: boolean }) {
  return (
    <svg className={`${styles.vglCross} ${onDark ? styles.vglCrossDark : ""}`} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function Cell({ value, onDark }: { value: Val; onDark?: boolean }) {
  if (value === true) return <Check />;
  if (value === false) return <Cross onDark={onDark} />;
  return <span className={styles.vglText}>{value}</span>;
}

function Cta({ plan, orange }: { plan: typeof EXPRESS; orange?: boolean }) {
  const cls = `${styles.vglBtn} ${orange ? styles.vglBtnOrange : styles.vglBtnDark}`;
  const inner = (
    <>
      <span className={styles.vglBtnLbl}>{plan.cta}</span>
      <span className={styles.vglBtnArrow} aria-hidden>
        <svg viewBox="0 0 18 18" fill="none">
          <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );
  return plan.href.startsWith("#") ? (
    <Link href={plan.href} className={cls}>{inner}</Link>
  ) : (
    <a href={plan.href} className={cls} target="_blank" rel="noopener noreferrer">{inner}</a>
  );
}

function CardHead({ plan, orange }: { plan: typeof EXPRESS; orange?: boolean }) {
  return (
    <>
      <div className={styles.vglCardName}>{plan.name}</div>
      <p className={styles.vglCardTagline}>{plan.tagline}</p>
      <div className={styles.vglCardPrice}>
        <b>{plan.price}</b>
        <span>{plan.priceSub}</span>
      </div>
      <Cta plan={plan} orange={orange} />
    </>
  );
}

export default function Vergelijking() {
  const [active, setActive] = useState<"express" | "maatwerk">("express");
  const plan = active === "express" ? EXPRESS : MAATWERK;
  const dark = active === "express";

  return (
    <section className={styles.vgl} data-reveal>
      <div className={styles.container}>
        <div className={styles.vglHead}>
          <span className={styles.pill}>Express of maatwerk</span>
          <h2 className={styles.vglTitle}>
            Express of maatwerk: <span className={styles.accent}>wat past bij jou?</span>
          </h2>
          <p className={styles.vglSub}>
            Bij Express krijg je precies wat er in je pakket staat. Bij maatwerk
            bouwen we wat jouw bedrijf nodig heeft.
          </p>
        </div>

        {/* Desktop — volledige vergelijkingstabel */}
        <div className={styles.vglTable}>
          <div className={`${styles.vglCell} ${styles.vglIntro}`}>
            <div className={styles.vglIntroTitle}>Vergelijk</div>
            <div className={styles.vglIntroSub}>Zelfde ontwerper, twee manieren van werken.</div>
          </div>
          <div className={`${styles.vglCell} ${styles.vglCardHead} ${styles.vglExpress} ${styles.vglHeadTop}`}>
            <CardHead plan={EXPRESS} orange />
          </div>
          <div className={`${styles.vglCell} ${styles.vglCardHead} ${styles.vglMaatwerk} ${styles.vglHeadTop}`}>
            <CardHead plan={MAATWERK} />
          </div>

          {ROWS.map((r, i) => {
            const last = i === ROWS.length - 1;
            return (
              <div className={styles.vglRowContents} key={r.label}>
                <div className={`${styles.vglCell} ${styles.vglLabel}`}>{r.label}</div>
                <div className={`${styles.vglCell} ${styles.vglVal} ${styles.vglExpress} ${last ? styles.vglBottom : ""}`}>
                  <Cell value={r.express} onDark />
                </div>
                <div className={`${styles.vglCell} ${styles.vglVal} ${styles.vglMaatwerk} ${last ? styles.vglBottom : ""}`}>
                  <Cell value={r.maatwerk} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobiel — schakelaar met één kaart */}
        <div className={styles.vglMobile}>
          <div className={styles.vglToggle} role="tablist" aria-label="Express of maatwerk">
            <button
              type="button"
              role="tab"
              aria-selected={active === "express"}
              className={`${styles.vglToggleBtn} ${active === "express" ? styles.vglToggleDark : ""}`}
              onClick={() => setActive("express")}
            >
              Express
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={active === "maatwerk"}
              className={`${styles.vglToggleBtn} ${active === "maatwerk" ? styles.vglToggleLight : ""}`}
              onClick={() => setActive("maatwerk")}
            >
              Maatwerk
            </button>
          </div>

          <div className={`${styles.vglCard} ${dark ? styles.vglExpress : styles.vglMaatwerk}`}>
            <div className={styles.vglCardTop}>
              <CardHead plan={plan} orange={dark} />
            </div>
            <div className={styles.vglCardRows}>
              {ROWS.map((r) => (
                <div className={styles.vglCardRow} key={r.label}>
                  <span className={styles.vglCardRowLabel}>{r.label}</span>
                  <span className={styles.vglCardRowVal}>
                    <Cell value={dark ? r.express : r.maatwerk} onDark={dark} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
