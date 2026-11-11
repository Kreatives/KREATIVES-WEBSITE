"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./express.module.css";

const CARDS = [
  { icon: "clock", title: "Eerste ontwerp binnen 48 uur", body: "Je levert je spullen aan en twee dagen later zie je hoe je site eruit komt te zien." },
  { icon: "pen", title: "Door een mens ontworpen", body: "Ik maak elk ontwerp zelf, vanaf een leeg vel. Je komt jouw site nergens anders tegen." },
  { icon: "tag", title: "Een vaste prijs", body: "Je weet vooraf wat je betaalt. Er komt achteraf niets bij." },
  { icon: "key", title: "Alles op jouw naam", body: "Je betaalt één keer en de site is van jou. Je zit niet vast aan een abonnement." },
];

export default function Beloftes() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <section className={styles.belofte}>
      <div className={styles.belofteGlowA} aria-hidden />
      <div className={styles.belofteGlowB} aria-hidden />
      <div className={styles.container}>
        <div className={styles.belofteHead}>
          <span className={styles.pill}>Beloftes</span>
          <h2 className={styles.belofteTitle}>
            Vijf beloftes van{" "}
            <span className={styles.accent}>KREATIVES Express.</span>
          </h2>
        </div>

        <div className={styles.belofteGrid} ref={ref}>
          {CARDS.map((c) => (
            <div className={styles.belofteCard} key={c.title}>
              <div className={styles.belofteImg}>
                <img className={styles.belofteImgBg} src="/starter/express-bg.webp" alt="" />
                <img className={styles.belofteIcon} src={`/starter/icons/${c.icon}.svg`} alt="" />
              </div>
              <h3 className={styles.belofteCardTitle}>{c.title}</h3>
              <p className={styles.belofteCardBody}>{c.body}</p>
            </div>
          ))}
        </div>

        <div className={styles.belofteArrows}>
          <button type="button" onClick={() => scroll(-1)} aria-label="Vorige">
            ‹
          </button>
          <button type="button" className={styles.belofteArrowNext} onClick={() => scroll(1)} aria-label="Volgende">
            ›
          </button>
        </div>

        <div className={styles.belofteCta}>
          <Link href="#pakketten" className={styles.btn}>
            Bekijk pakketten
            <span className={styles.btnArrow} aria-hidden>
              <svg viewBox="0 0 18 18" fill="none">
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <p className={styles.belofteCtaNote}>
            Bevalt het ontwerp niet? Dan krijg je je geld terug.
          </p>
        </div>
      </div>
    </section>
  );
}
