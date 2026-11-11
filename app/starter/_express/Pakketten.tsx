import Link from "next/link";
import styles from "./express.module.css";

function Check({ white }: { white?: boolean }) {
  return (
    <span className={`${styles.pakCheck} ${white ? styles.pakCheckWhite : ""}`} aria-hidden>
      <svg viewBox="0 0 12 12" fill="none">
        <path d="m2.5 6.2 2.2 2.1L9.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
function Arrow() {
  return (
    <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
      <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Plan = {
  id: string;
  theme: "light" | "dark" | "orange";
  featured?: boolean;
  badge?: string;
  name: string;
  tagline: string;
  price: string;
  term: string;
  cta: string;
  meta: string;
  features: string[];
  dim?: string[];
  note?: { bold: string; rest: string };
};

const PLANS: Plan[] = [
  {
    id: "basis",
    theme: "light",
    name: "Basis",
    tagline: "Eén pagina waar je trots op bent.",
    price: "€695",
    term: "Of in twee termijnen van €347,50",
    cta: "Start met Basis",
    meta: "Live binnen 1 week · 1 revisieronde",
    features: [
      "Eén pagina, op maat ontworpen",
      "Eerste ontwerp binnen 48 uur",
      "Contactformulier en WhatsApp-knop",
      "Goed leesbaar op elke telefoon",
      "Zelf je teksten en foto's aanpassen",
      "Alles op jouw naam, geen abonnement",
    ],
    dim: ["Meerdere pagina's", "Teksten aangescherpt"],
    note: { bold: "Basis+ €895:", rest: " drie revisierondes in plaats van één en je eerste ontwerp binnen 24 uur." },
  },
  {
    id: "website",
    theme: "dark",
    featured: true,
    badge: "Meest gekozen",
    name: "Website",
    tagline: "Wat een klant wil weten voor hij belt.",
    price: "€1.295",
    term: "Of in twee termijnen van €647,50",
    cta: "Start met Website",
    meta: "Live binnen 2 weken · 2 revisierondes",
    features: [
      "Alles uit Basis",
      "Vijf pagina's in plaats van één",
      "Eerste ontwerp binnen 48 uur",
      "Aanvraag- of offertepagina",
      "Subtiele animaties",
      "Ik scherp je teksten aan",
    ],
    note: { bold: "Website+ €1.495:", rest: " drie revisierondes in plaats van twee, eerste ontwerp binnen 24 uur en metingen van je bezoekers." },
  },
  {
    id: "website-plus",
    theme: "orange",
    name: "Website Plus",
    tagline: "Een site die aanvragen oplevert zonder dat je erbij zit.",
    price: "€1.795",
    term: "Of in twee termijnen van €897,50",
    cta: "Start met Website Plus",
    meta: "Live binnen 3 weken · 3 revisierondes",
    features: [
      "Alles uit Website",
      "Tot acht pagina's naar keuze",
      "Eerste ontwerp binnen 48 uur",
      "Ik schrijf je teksten voor je",
      "Pagina met je projecten of nieuws",
      "Subtiele animaties",
      "30 dagen nazorg met voorrang",
    ],
  },
];

const CARD_CLASS = { light: styles.pakCardLight, dark: styles.pakCardDark, orange: styles.pakCardOrange };
const BTN_CLASS = { light: styles.pakBtnLight, dark: styles.pakBtnDark, orange: styles.pakBtnOrange };

export default function Pakketten() {
  return (
    <section className={styles.pak} id="pakketten">
      <div className={styles.container}>
        <div className={styles.pakHead}>
          <span className={styles.pill}>Pakketten</span>
          <h2 className={styles.pakTitle}>
            Kies wat je nodig hebt.{" "}
            <span className={styles.accent}>De prijs staat vast.</span>
          </h2>
        </div>

        <div className={styles.pakGrid}>
          {PLANS.map((p) => (
            <div className={`${styles.pakCard} ${CARD_CLASS[p.theme]}`} key={p.id}>
              {p.theme === "dark" && <div className={styles.pakGlow} aria-hidden />}
              {p.badge && <span className={styles.pakBadge}>{p.badge}</span>}
              <div>
                <div className={styles.pakName}>{p.name}</div>
                <div className={styles.pakTagline}>{p.tagline}</div>
              </div>
              <div>
                <div className={styles.pakPriceRow}>
                  <span className={styles.pakPrice}>{p.price}</span>
                  {p.theme !== "orange" && <span className={styles.pakPriceSub}>Eenmalig</span>}
                </div>
                <div className={styles.pakTerm}>{p.term}</div>
              </div>
              <div>
                <Link href={`/starter/afrekenen?pakket=${p.id}`} className={`${styles.pakBtn} ${BTN_CLASS[p.theme]}`}>
                  <span className={styles.lbl}>{p.cta}</span>
                  <span className={styles.pakBtnArrow} aria-hidden><Arrow /></span>
                </Link>
                <div className={styles.pakMeta}>{p.meta}</div>
              </div>
              <div className={styles.pakDivider} />
              <ul className={styles.pakList}>
                {p.features.map((f) => (
                  <li className={styles.pakFeat} key={f}>
                    <Check white={p.theme === "orange"} />
                    {f}
                  </li>
                ))}
                {p.dim?.map((f) => (
                  <li className={`${styles.pakFeat} ${styles.pakFeatDim}`} key={f}>
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              {p.note && (
                <>
                  <div className={styles.pakDivider} />
                  <p className={styles.pakNote}>
                    <b>{p.note.bold}</b>
                    {p.note.rest}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        <p className={styles.pakFine}>
          Alle prijzen zijn exclusief btw. Webshop, boekingssysteem of koppeling
          nodig? Dat is maatwerk vanaf €3.000.{" "}
          <Link href="/prijzen">Plan een gesprek</Link>
        </p>

        <div className={styles.pakGuarantee}>
          <h3 className={styles.pakGuaranteeTitle}>
            Niet tevreden met het ontwerp?{" "}
            <span className={styles.accent}>Dan krijg je je geld terug.</span>
          </h3>
          <div>
            <p className={styles.pakGuaranteeBody}>
              Bevalt het ontwerp niet, dan pas ik het aan binnen je revisierondes.
              Nog niet tevreden? Dan krijg je je aanbetaling terug, tot het moment
              dat je het ontwerp goedkeurt.
            </p>
            <a href="https://wa.me/31613066250" className={styles.pakGuaranteeLink}>
              Eerst een vraag? Stuur een appje
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
