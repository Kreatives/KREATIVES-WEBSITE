"use client";

import { useState } from "react";
import Link from "next/link";
import { packages, upsells, type Pakket } from "./data";
import styles from "./starters.module.css";

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="m3 8.5 3.2 3 6.8-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Kaart({ p }: { p: Pakket }) {
  return (
    <article className={`${styles.pak} ${p.featured ? styles.pakOn : ""}`}>
      <div className={styles.pakTop}>
        <span className={styles.pakNo} aria-hidden>
          {p.no}
        </span>
        <span className={styles.pakTag}>{p.tagline}</span>
        {p.featured && <span className={styles.pakSter}>Meest gekozen</span>}
      </div>

      <h3 className={styles.pakNaam}>{p.name}</h3>
      <p className={styles.pakDroom}>{p.droom}</p>

      <p className={styles.pakPrijs}>
        {p.price}
        <span> eenmalig</span>
      </p>
      <p className={styles.pakTermijn}>{p.termijn}</p>

      <Link href={`/starter/afrekenen?pakket=${p.id}`} className={styles.pakCta}>
        <span>Dit pakket afrekenen</span>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M4 12 12 4m0 0H6m6 0v6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <p className={styles.pakMeta}>
        {p.doorlooptijd} · {p.revisies}
      </p>

      <ul className={styles.pakList}>
        {p.krijgt.map((k) => (
          <li key={k}>
            <span className={styles.pakTick} aria-hidden>
              <Check />
            </span>
            {k}
          </li>
        ))}
      </ul>

      <div className={styles.pakBump}>
        <span className={styles.pakBumpLabel}>
          Bij te bestellen · {p.bump.price}
        </span>
        <strong>{p.bump.label}</strong>
        <p>{p.bump.body}</p>
      </div>
    </article>
  );
}

export default function Pakketten({ upsells: extra }: { upsells: string[] }) {
  const [actief, setActief] = useState(1);

  return (
    <section className={`section ${styles.pakSec}`} id="pakketten">
      <div className="container">
        <div className={styles.pakHead} data-reveal>
          <span className="eyebrow">Pakketten</span>
          <h2 className={`h2 ${styles.pakTitel}`}>
            Kies wat je nodig hebt.{" "}
            <span className="accent accent--orange">De prijs staat vast.</span>
          </h2>
          <p className={styles.pakSub}>
            Alles is eenmalig, in twee termijnen te betalen en na oplevering van
            jou. Geen abonnement en geen onderhandeling over de scope.
          </p>
        </div>

        <div className={styles.pakTabs} role="tablist" aria-label="Pakketten">
          {packages.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === actief}
              className={`${styles.pakTab} ${i === actief ? styles.pakTabOn : ""}`}
              onClick={() => setActief(i)}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className={styles.pakGrid}>
          {packages.map((p, i) => (
            <div
              key={p.id}
              className={`${styles.pakWrap} ${
                i === actief ? styles.pakWrapOn : ""
              }`}
            >
              <Kaart p={p} />
            </div>
          ))}
        </div>

        <ul className={styles.pakExtra}>
          {extra.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>

        <p className={styles.pakVoorwaarden} data-reveal>
          Prijzen zijn exclusief 21% btw. Je bestelt zakelijk met een KvK-nummer,
          dus er geldt geen herroepingsrecht van veertien dagen. De eerste
          termijn vervalt bij de start, de tweede bij oplevering.
        </p>
      </div>
    </section>
  );
}
