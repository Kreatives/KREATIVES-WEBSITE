import Button from "@/components/Button";
import { bonussen, figmaTegels } from "./data";
import styles from "./starters.module.css";

const STAPPEN = [
  "Sitemap",
  "Wireframe",
  "Ontwerp in Figma",
  "Pagina's",
  "Build",
  "Basis-SEO",
  "Overdracht",
];

export default function FigmaBewijs() {
  return (
    <section className={`section section--dark cosmos-bg ${styles.figmaSec}`}>
      <div className="container">
        <div className={styles.figmaHead} data-reveal>
          <span className="eyebrow">Het bewijs</span>
          <h2 className={`h2 ${styles.figmaTitle}`}>
            Een ontwerp dat{" "}
            <span className="accent accent--orange">van jou is.</span>
          </h2>
          <p className={styles.figmaSub}>
            Elke site begint blanco. Ik teken de structuur, het ontwerp en de
            pagina&apos;s zelf, en jij krijgt alles mee.
          </p>
        </div>

        <div className={styles.map} data-reveal>
          <div className={styles.mapBar} aria-hidden>
            <span />
            <span />
            <span />
            <p>starters.zip</p>
          </div>
          <ul className={styles.mapFiles}>
            {STAPPEN.map((s, i) => (
              <li key={s}>
                <span className={styles.mapNo} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.mapIco} aria-hidden>
                  <svg viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 2.5h6.5L16 7v10.5H5z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    <path d="M11.5 2.5V7H16" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.figmaUitleg} data-reveal>
          Het Figma-bestand is het bewijs. Je krijgt het letterlijk mee: open
          het, klik door de lagen en bekijk de guidelines. Alles is met de hand
          getekend en opgebouwd, zonder gegenereerde laag en zonder gekocht
          thema. Wil je later een andere partij, dan werkt die gewoon verder in
          hetzelfde bestand.
        </p>

        <ul className={styles.figmaTegels}>
          {figmaTegels.map((t) => (
            <li key={t.title} data-reveal>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </li>
          ))}
        </ul>

        <div className={styles.bonus} data-reveal>
          <div className={styles.bonusHead}>
            <span className="eyebrow">Zit er gratis bij</span>
            <p className={styles.bonusWaarde}>
              Samen €{bonussen.reduce((a, b) => a + Number(b.price.slice(1)), 0)}{" "}
              aan extras, zonder dat de prijs omhoog gaat.
            </p>
          </div>
          <ul className={styles.bonusList}>
            {bonussen.map((b) => (
              <li key={b.title}>
                <div className={styles.bonusTitle}>
                  <h3>{b.title}</h3>
                  <s>{b.price}</s>
                  <span>gratis</span>
                </div>
                <p>{b.body}</p>
              </li>
            ))}
          </ul>
          <Button href="#pakketten" variant="primary" className={styles.bonusCta}>
            Bekijk de pakketten
          </Button>
        </div>
      </div>
    </section>
  );
}
