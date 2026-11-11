import Link from "next/link";
import styles from "./express.module.css";

function ArrowBox() {
  return (
    <span className={styles.arrowBox} aria-hidden>
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 18 18 6M18 6H9M18 6v9" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const CASES = [
  { img: "/projects/mazadesign.webp", href: "/projecten/mazadesign" },
  { img: "/projects/health-champs.webp", href: "/projecten/health-champs" },
];

export default function MijnWerk() {
  return (
    <section className={styles.werk}>
      <div className={styles.werkGlowA} aria-hidden />
      <div className={styles.werkGlowB} aria-hidden />
      <div className={styles.container}>
        <div className={styles.werkHead}>
          <span className={styles.pill}>Mijn werk</span>
          <h2 className={styles.werkTitle}>Bekijk mijn laatste projecten</h2>
        </div>
        <div className={styles.werkGrid}>
          {CASES.map((c) => (
            <Link href={c.href} className={styles.werkCard} key={c.href}>
              <img src={c.img} alt="" />
              <div className={styles.werkCta}>
                <span>Lees de hele case study</span>
                <ArrowBox />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
