import { overdracht } from "./data";
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

/**
 * Het eigendomsblok. Dit is de hoop waar een abonnement op stukloopt, dus het
 * staat direct onder de hero en niet weggemoffeld in de kleine lettertjes.
 */
export default function EigenKapitaal() {
  return (
    <section className={`section section--dark cosmos-bg ${styles.eigenSec}`}>
      <div className="container">
        <div className={styles.eigenGrid}>
          <div className={styles.eigenHead} data-reveal>
            <span className="eyebrow">Wat je in handen krijgt</span>
            <h2 className={`h2 ${styles.eigenTitle}`}>
              Geen maandbedrag om{" "}
              <span className="accent accent--orange">je eigen site</span> te
              houden.
            </h2>
            <p className={styles.eigenBody}>
              Bij een abonnement betaal je door zolang je de site wil hebben. Stop
              je, dan gaat hij mee terug. Hier is het andersom: na oplevering
              staat alles op jouw naam en ben je klaar.
            </p>
          </div>

          <ul className={styles.eigenList}>
            {overdracht.map((o, i) => (
              <li key={o} data-reveal>
                <span className={styles.eigenNo} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.eigenTick} aria-hidden>
                  <Check />
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.eigenFoot} data-reveal>
          Dit staat in de overeenkomst, niet alleen op deze pagina.
        </p>
      </div>
    </section>
  );
}
