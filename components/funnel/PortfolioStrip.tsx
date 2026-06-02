import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import styles from "./PortfolioStrip.module.css";

type PortfolioData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  cta?: { label: string; href: string };
  items: { name: string; type: string; branche: string; image: string }[];
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
          {data.items.map((item) => (
            <li key={item.name} className={styles.item} data-reveal>
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
                <span className={styles.tags}>
                  {item.type} · {item.branche}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
