import Link from "next/link";
import styles from "./express.module.css";

const DEVICES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const AVATARS = [1, 2, 3, 4, 5];
const LOGOS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const CHECKS = [
  "Eerste ontwerp binnen 48 uur",
  "Geld terug garantie",
  "Door een mens ontworpen",
  "Alles op jouw naam",
];

function Check() {
  return (
    <span className={styles.checkIco} aria-hidden>
      <svg viewBox="0 0 12 12" fill="none">
        <path
          d="m2.5 6.2 2.2 2.1L9.5 3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.proof}>
          <div className={styles.avatars}>
            {AVATARS.map((n) => (
              <img key={n} src={`/starter/hero/av${n}.webp`} alt="" width={36} height={36} />
            ))}
          </div>
          <span className={styles.proofDiv} aria-hidden />
          <div className={styles.proofText}>
            <span className={styles.stars}>★★★★★</span> <b>5/5</b>
            <br />
            100+ websites gemaakt
          </div>
        </div>

        <h1 className={styles.title}>
          Een website waarmee je{" "}
          <span className={styles.accent}>serieus genomen wordt.</span>
        </h1>

        <p className={styles.sub}>
          Ik ontwerp je site zelf, op maat, en je ziet het eerste ontwerp binnen
          48 uur. Je betaalt een vaste prijs vanaf €695 en alles komt op jouw naam
          te staan.
        </p>

        <div className={styles.ctaBlock}>
          <Link href="#pakketten" className={styles.btn}>
            Bekijk pakketten
            <span className={styles.btnArrow} aria-hidden>
              <svg viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 9h10M10 5l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
          <ul className={styles.checks}>
            {CHECKS.map((c) => (
              <li key={c}>
                <Check />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.devices}>
        <div className={styles.deviceTrack}>
          {[...DEVICES, ...DEVICES].map((n, i) => (
            <div className={styles.deviceCard} key={i}>
              <img src={`/starter/hero/dev${n}.webp`} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.logoWrap}>
        <p className={styles.logoLabel}>Ik werkte voor</p>
        <div className={styles.logoRows}>
          <div className={styles.logoTrack}>
            {[...LOGOS, ...LOGOS].map((n, i) => (
              <img key={i} src={`/logos/${n}.png`} alt="" />
            ))}
          </div>
          <div className={`${styles.logoTrack} ${styles.logoTrackRev}`}>
            {[...LOGOS, ...LOGOS].map((n, i) => (
              <img key={i} src={`/logos/${n}.png`} alt="" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
