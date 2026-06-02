import Image from "next/image";
import { Arrow } from "@/components/icons";
import styles from "./Statement.module.css";

type StatementData = {
  heading: string;
  accent?: string;
  body: string[];
  cta: { label: string; href: string };
  image: string;
};

export default function Statement({ data }: { data: StatementData }) {
  const parts =
    data.accent && data.heading.includes(data.accent)
      ? data.heading.split(data.accent)
      : null;

  return (
    <section className="section">
      <div className="container">
        <h2 className={styles.heading} data-reveal>
          {parts ? (
            <>
              {parts[0]}
              <span className="accent accent--orange">{data.accent}</span>
              {parts[1]}
            </>
          ) : (
            data.heading
          )}
        </h2>

        <div className={styles.row}>
          <div className={styles.media} data-reveal>
            <Image
              src={data.image}
              alt=""
              fill
              sizes="(max-width: 760px) 60vw, 18rem"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.copy} data-reveal>
            {data.body.map((line, i) => (
              <p key={i} className={styles.body}>
                {line}
              </p>
            ))}
            <a href={data.cta.href} className={styles.cta}>
              <span className={styles.ctaLabel}>{data.cta.label}</span>
              <span className={styles.ctaIco} aria-hidden>
                <Arrow />
              </span>
            </a>
          </div>

          <span className={styles.scroll} aria-hidden>
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3v10M3.5 8.5 8 13l4.5-4.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
