import Image from "next/image";
import Link from "next/link";
import { cases } from "@/lib/site";
import { Arrow } from "@/components/icons";
import Button from "@/components/Button";
import styles from "./Cases.module.css";

export type CaseItem = {
  slug: string;
  name: string;
  excerpt: string;
  image: string;
  tags: string[];
};

export default function Cases({ items, meta = cases, allHref = "/projecten", allLabel = "Bekijk alle cases", basePath = "/projecten" }: { items: CaseItem[]; meta?: { eyebrow: string; titleLead: string; titleAccent: string }; allHref?: string; allLabel?: string; basePath?: string }) {
  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  return (
    <section className="section section--dark" id="cases">
      <div className="container">
        <div className={styles.head}>
          <div className={styles.headTop} data-reveal>
            <span className="eyebrow">{meta.eyebrow}</span>
            <Button href={allHref} variant="ghost" className={styles.allBtn}>{allLabel}</Button>
          </div>
          <h2 className={`h2 ${styles.title}`} data-reveal>
            {meta.titleLead}{" "}
            <span className="accent accent--orange">{meta.titleAccent}</span>
          </h2>
        </div>

        <div className={styles.cols}>
          <ul className={styles.col}>
            {left.map((c) => (
              <Card key={c.slug} c={c} basePath={basePath} />
            ))}
          </ul>
          <ul className={`${styles.col} ${styles.colOffset}`}>
            {right.map((c) => (
              <Card key={c.slug} c={c} basePath={basePath} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Card({ c, basePath }: { c: CaseItem; basePath: string }) {
  return (
    <li className={styles.card} data-reveal>
      <Link href={`${basePath}/${c.slug}`} className={styles.link}>
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
