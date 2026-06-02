import Image from "next/image";
import styles from "./FounderWords.module.css";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  color: string;
  photo?: string;
  logo?: string;
};

type FounderData = {
  eyebrow: string;
  title: string;
  accent?: string;
  items: Testimonial[];
};

export default function FounderWords({ data }: { data: FounderData }) {
  const parts =
    data.accent && data.title.includes(data.accent)
      ? data.title.split(data.accent)
      : null;

  return (
    <section className="section section--alt">
      <div className="container">
        <div className={styles.head} data-reveal>
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className={styles.title}>
            {parts ? (
              <>
                {parts[0]}
                <span className="accent accent--orange">{data.accent}</span>
                {parts[1]}
              </>
            ) : (
              data.title
            )}
          </h2>
        </div>

        <ul className={styles.grid}>
          {data.items.map((t) => (
            <li key={t.author} className={styles.card} data-reveal>
              <div className={styles.photo} style={{ background: t.color }}>
                {t.photo ? (
                  <Image
                    src={t.photo}
                    alt={t.author}
                    fill
                    sizes="160px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span className={styles.initials} aria-hidden>
                    {t.initials}
                  </span>
                )}
              </div>

              <div className={styles.body}>
                <p className={styles.quote}>{t.quote}</p>
                <div className={styles.foot}>
                  <div className={styles.author}>
                    <span className={styles.name}>{t.author}</span>
                    <span className={styles.role}>
                      {t.role}, {t.company}
                    </span>
                  </div>
                  <span className={styles.logo}>
                    {t.logo ? (
                      <Image
                        src={t.logo}
                        alt={t.company}
                        width={120}
                        height={32}
                        style={{
                          objectFit: "contain",
                          height: "1.5rem",
                          width: "auto",
                        }}
                      />
                    ) : (
                      t.company
                    )}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
