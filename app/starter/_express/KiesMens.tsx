import Link from "next/link";
import styles from "./express.module.css";

const CARDS = [
  {
    theme: "orange" as const,
    obj: null,
    title: "100% maatwerk, door een mens ontworpen.",
    body: "Elk ontwerp komt uit mijn handen, in Figma. Geen thema en geen generator.",
  },
  {
    theme: "dark" as const,
    obj: "mens-sphere",
    title: "Alles op jouw naam, en aanpasbaar",
    body: "Domein, hosting, code en copyright. Je houdt je site ook als je nooit meer iets met mij doet.",
  },
  {
    theme: "dark" as const,
    obj: "mens-ring",
    title: "Revisies zonder verrassingen",
    body: "De rondes uit je pakket zijn inbegrepen. Een extra ronde kost €75 en dat weet je vooraf.",
  },
];

export default function KiesMens() {
  return (
    <section className={styles.mens}>
      <div className={styles.mensGlowA} aria-hidden />
      <div className={styles.mensGlowB} aria-hidden />
      <div className={styles.container}>
        <div className={styles.mensTop}>
          <h2 className={styles.mensTitle}>
            Kies <span className={styles.accent}>voor een mens</span> die je
            website maakt.
          </h2>
          <div>
            <p className={styles.mensRightText}>
              AI maakt in tien seconden een website, en dat zie je eraan af.
              Klanten merken of er iemand over heeft nagedacht.
            </p>
            <Link href="#pakketten" className={`${styles.btn} ${styles.mensBtn}`}>
              Bekijk pakketten
              <span className={styles.btnArrow} aria-hidden>
                <svg viewBox="0 0 18 18" fill="none">
                  <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.mensCards}>
          {CARDS.map((c) => (
            <div
              className={`${styles.mensCard} ${c.theme === "orange" ? styles.mensCardOrange : styles.mensCardDark}`}
              key={c.title}
            >
              {c.obj && <img className={styles.mensObj} src={`/starter/${c.obj}.webp`} alt="" />}
              <h3 className={styles.mensCardTitle}>{c.title}</h3>
              <p className={styles.mensCardBody}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
