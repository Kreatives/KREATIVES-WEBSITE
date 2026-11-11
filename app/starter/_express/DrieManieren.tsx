import Link from "next/link";
import styles from "./express.module.css";

function X() {
  return (
    <svg className={styles.compX} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function Check() {
  return (
    <span className={styles.compCheck} aria-hidden>
      <svg viewBox="0 0 12 12" fill="none">
        <path d="m2.5 6.2 2.2 2.1L9.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
function Arrow() {
  return (
    <span className={styles.btnArrow} aria-hidden>
      <svg viewBox="0 0 18 18" fill="none">
        <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const LEFT = {
  name: "AI-site of bouwtool",
  price: "<€200",
  desc: "Je staat snel online, maar je site lijkt op honderd andere.",
  points: ["Ontwerp uit een generator", "Vaak met een abonnement", "Niemand die meedenkt", "Na een jaar opnieuw beginnen"],
};
const RIGHT = {
  name: "Groot bureau",
  price: "€10.000+",
  desc: "Sterk werk voor grote projecten, met een doorlooptijd van drie tot zes maanden.",
  points: ["Weken overleg en offertes", "Prijs voor grote bedrijven", "Wachten op hun planning", "Extra rondes kosten extra"],
};
const MID = [
  "Op maat ontworpen door Ricky",
  "Vaste prijs, vooraf bekend",
  "Revisierondes inbegrepen",
  "Alles op jouw naam",
  "Aanbetaling terug als het ontwerp niet bevalt",
];

function Side({ data }: { data: typeof LEFT }) {
  return (
    <div className={styles.compCol}>
      <div className={styles.compName}>{data.name}</div>
      <div className={styles.compPrice}>{data.price}</div>
      <p className={styles.compDesc}>{data.desc}</p>
      <hr className={styles.compLine} />
      <ul className={styles.compList}>
        {data.points.map((p) => (
          <li key={p}>
            <X />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DrieManieren() {
  return (
    <section className={styles.compare} data-reveal>
      <div className={styles.container}>
        <div className={styles.compareHead}>
          <span className={styles.pill}>Website laten maken</span>
          <h2 className={styles.compareTitle}>
            Drie manieren om aan een website te komen.{" "}
            <span className={styles.accent}>Ik zit er tussenin</span>
          </h2>
        </div>

        <div className={styles.compareGrid}>
          <Side data={LEFT} />

          <div className={styles.compCard}>
            <div className={styles.compGlow} aria-hidden />
            <div className={styles.compBrand}>KREATIVES</div>
            <div className={styles.compCardPrice}>
              <span>Vanaf</span>
              <b>€695</b>
            </div>
            <p className={styles.compCardDesc}>
              Eerste ontwerp binnen 48 uur. Betalen kan in twee termijnen.
            </p>
            <Link href="#pakketten" className={styles.cardBtn}>
              <span className={styles.lbl}>Bekijk pakketten</span>
              <Arrow />
            </Link>
            <hr className={styles.compLineDark} style={{ border: 0, borderTop: "1px solid rgba(255,255,255,0.15)", width: "100%", margin: 0 }} />
            <ul className={styles.compListDark}>
              {MID.map((p) => (
                <li key={p}>
                  <Check />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <Side data={RIGHT} />
        </div>
      </div>
    </section>
  );
}
