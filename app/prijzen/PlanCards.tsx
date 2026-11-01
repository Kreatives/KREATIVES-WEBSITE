"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import styles from "./prijzen.module.css";

type Plan = {
  name: string;
  icon: string;
  price: string;
  featured?: boolean;
  intro: string;
  krijgt: string[];
  termijnen: string;
  doorlooptijd: string;
};

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m3 8.5 3.2 3 6.8-7" />
    </svg>
  );
}

export default function PlanCards({
  plans,
  calendly,
}: {
  plans: Plan[];
  calendly: string;
}) {
  // Op mobiel wisselt deze state welke kaart zichtbaar is (tabs).
  // Op desktop staan alle kaarten naast elkaar en doet de state niets.
  const [active, setActive] = useState(0);

  return (
    <>
      <div className={styles.planTabs} role="tablist" aria-label="Pakketten">
        {plans.map((p, i) => (
          <button
            key={p.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`${styles.planTab} ${
              i === active ? styles.planTabActive : ""
            }`}
            onClick={() => setActive(i)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className={styles.grid} data-reveal>
        {plans.map((p, i) => (
          <article
            key={p.name}
            className={`${styles.card} ${
              p.featured ? styles.cardFeatured : ""
            } ${i === active ? styles.cardActive : styles.cardInactive}`}
          >
            <Image
              src={p.icon}
              alt=""
              width={44}
              height={44}
              className={styles.cardIcon}
            />

            <div className={styles.cardHead}>
              <h3 className={styles.cardName}>{p.name}</h3>
              <p className={styles.cardIntro}>{p.intro}</p>
              <p className={styles.cardPrice}>
                {p.price}{" "}
                <span className={styles.cardPriceUnit}>Eenmalig</span>
              </p>
              <p className={styles.cardTermijnen}>
                {p.termijnen}
                <span className={styles.tip} tabIndex={0}>
                  *
                  <span className={styles.tipBox} role="tooltip">
                    Je kunt bij ons in meerdere termijnen betalen.
                  </span>
                </span>
              </p>
            </div>

            <hr className={styles.cardDivider} />

            <ul className={styles.listKrijgt}>
              {p.krijgt.map((f) => (
                <li key={f}>
                  <span
                    className={p.featured ? styles.tickOrange : styles.tick}
                    aria-hidden
                  >
                    <Check />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className={styles.cardFoot}>
              <Button
                href={calendly}
                variant={p.featured ? "primary" : "dark"}
                className={styles.cardCta}
              >
                Plan een gesprek
              </Button>
              <p className={styles.cardGarantie}>
                100% tevredenheids &amp; deadline garantie
              </p>
              <p className={styles.cardDoorlooptijd}>
                Doorlooptijd: {p.doorlooptijd}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
