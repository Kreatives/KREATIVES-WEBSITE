import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import styles from "./PortfolioStrip.module.css";

type PortfolioItem = {
  name: string;
  tags: string[];
  image: string;
  href?: string;
};

type PortfolioData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  cta?: { label: string; href: string };
  items: PortfolioItem[];
};

export default function PortfolioStrip({ data }: { data: PortfolioData }) {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.head} data-reveal>
          <div className={styles.headText}>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className={`h2 ${styles.title}`}>
              {data.titleLead}{" "}
              <span className="accent accent--orange">{data.titleAccent}</span>
            </h2>
          </div>
          {data.cta && (
            <Link href={data.cta.href} className={styles.headCta}>
              {data.cta.label}
              <span className={styles.headIco} aria-hidden>
                <Arrow />
              </span>
            </Link>
          )}
        </div>

        <ul className={styles.grid}>
          {data.items.map((item) => {
            const inner = (
              <>
                <div className={styles.media}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 760px) 100vw, 45vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.meta}>
                  <h3 className={styles.name}>{item.name}</h3>
                  <ul className={styles.tags}>
                    {item.tags.map((t) => (
                      <li key={t} className={styles.tag}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            );
            return (
              <li key={item.href ?? item.name} className={styles.item} data-reveal>
                {item.href ? (
                  <Link href={item.href} className={styles.link}>
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
