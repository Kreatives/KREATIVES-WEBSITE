import Image from "next/image";
import Link from "next/link";
import { cases } from "@/lib/site";
import { projecten, type Project } from "@/lib/projecten";
import { Arrow } from "@/components/icons";
import styles from "./Cases.module.css";

export default function Cases() {
  // Bron is nu de centrale projecten-store, zodat de homepage en
  // /projecten dezelfde set tonen en altijd doorlinken naar de juiste slug.
  const items = projecten;
  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  return (
    <section className="section section--dark" id="cases">
      <div className="container">
        <div className={styles.head}>
          <span className="eyebrow" data-reveal>
            {cases.eyebrow}
          </span>
          <h2 className={`h2 ${styles.title}`} data-reveal>
            {cases.titleLead}{" "}
            <span className="accent accent--orange">{cases.titleAccent}</span>
          </h2>
        </div>

        <div className={styles.cols}>
          <ul className={styles.col}>
            {left.map((c) => (
              <Card key={c.slug} c={c} />
            ))}
          </ul>
          <ul className={`${styles.col} ${styles.colOffset}`}>
            {right.map((c) => (
              <Card key={c.slug} c={c} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Card({ c }: { c: Project }) {
  return (
    <li className={styles.card} data-reveal>
      <Link href={`/projecten/${c.slug}`} className={styles.link}>
        <div className={styles.media}>
          <Image
            src={c.image}
            alt={c.name}
            fill
            sizes="(max-width: 760px) 100vw, 42vw"
            style={{ objectFit: "cover" }}
          />
          <span className={styles.see} aria-hidden>
            Bekijk case
            <Arrow />
          </span>
        </div>
        <div className={styles.meta}>
          <h3 className={styles.name}>{c.name}</h3>
          <p className={styles.line}>{c.excerpt}</p>
          <ul className={styles.tags}>
            {c.tags.map((t) => (
              <li key={t} className={styles.tag}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </li>
  );
}
