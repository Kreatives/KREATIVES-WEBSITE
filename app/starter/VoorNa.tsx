import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import VoorNaSlider from "./VoorNaSlider";
import styles from "./starters.module.css";

const CASES = [
  {
    slug: "mazadesign",
    naam: "Mazadesign",
    branche: "Marketingbureau",
    resultaat:
      "Mahmut liet de nieuwe pagina in een verkoopgesprek zien. De deal was rond voordat het gesprek voorbij was.",
  },
  {
    slug: "health-champs",
    naam: "Health Champs",
    branche: "Gezondheid",
    resultaat:
      "Van een online visitekaartje naar een site die aanvragen binnenhaalt.",
  },
  {
    slug: "burgers-frites",
    naam: "Burgers & Frites",
    branche: "Horeca",
    resultaat:
      "Een menu dat leest op een telefoon en een zaak die er ineens uitziet als een keten.",
  },
];

export default function VoorNa() {
  return (
    <section className={`section ${styles.werkSec}`} id="werk">
      <div className="container">
        <div className={styles.werkHead} data-reveal>
          <span className="eyebrow">Werk</span>
          <h2 className={`h2 ${styles.werkTitle}`}>
            Wat er stond, en{" "}
            <span className="accent accent--orange">wat er nu staat.</span>
          </h2>
          <p className={styles.werkSub}>
            Sleep de handgreep. Dit zijn echte opleveringen, geen mockups uit een
            sjabloon.
          </p>
        </div>

        <article className={styles.werkHoofd} data-reveal>
          <div className={styles.werkMedia}>
            <VoorNaSlider
              voor="/projects/starters-mazadesign-voor.webp"
              na="/projects/starters-mazadesign-na.webp"
              alt="Mazadesign"
            />
          </div>
          <div className={styles.werkMeta}>
            <span className={styles.werkBranche}>{CASES[0].branche}</span>
            <h3 className={styles.werkNaam}>{CASES[0].naam}</h3>
            <p className={styles.werkResultaat}>{CASES[0].resultaat}</p>
            <Link href={`/projecten/${CASES[0].slug}`} className={styles.werkLink}>
              Lees de hele case
              <span aria-hidden>
                <Arrow />
              </span>
            </Link>
          </div>
        </article>

        <ul className={styles.werkRij}>
          {CASES.slice(1).map((c) => (
            <li key={c.slug} data-reveal>
              <Link href={`/projecten/${c.slug}`} className={styles.werkCard}>
                <div className={styles.werkCardMedia}>
                  <Image
                    src={`/projects/${c.slug}.webp`}
                    alt={c.naam}
                    fill
                    sizes="(max-width: 760px) 100vw, 40vw"
                    className={styles.werkCardImg}
                  />
                </div>
                <div className={styles.werkCardMeta}>
                  <span className={styles.werkBranche}>{c.branche}</span>
                  <h3 className={styles.werkNaam}>{c.naam}</h3>
                  <p className={styles.werkResultaat}>{c.resultaat}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.werkFoot} data-reveal>
          <Link href="/projecten" className={styles.werkAlles}>
            Al het werk bekijken
            <span aria-hidden>
              <Arrow />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
