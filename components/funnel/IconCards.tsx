import Button from "@/components/Button";
import styles from "./IconCards.module.css";

type IconCardsData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  intro?: string;
  cta?: { label: string; href: string };
  items: { title: string; body: string }[];
};

export default function IconCards({
  data,
  variant = "light",
}: {
  data: IconCardsData;
  variant?: "light" | "alt" | "dark" | "cosmos";
}) {
  const onDark = variant === "dark" || variant === "cosmos";
  const sectionClass =
    variant === "cosmos"
      ? `section section--dark cosmos-bg ${styles.dark} ${styles.cosmos}`
      : variant === "dark"
        ? `section section--dark cosmos-bg ${styles.dark}`
        : variant === "alt"
          ? "section section--alt"
          : "section";

  return (
    <section className={sectionClass}>
      <div className="container">
        <div className={styles.head}>
          <div className={styles.headLeft} data-reveal>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className={styles.title}>
              {data.titleLead}{" "}
              <span className="accent accent--orange">{data.titleAccent}</span>
            </h2>
          </div>
          {(data.intro || data.cta) && (
            <div className={styles.headRight} data-reveal>
              {data.intro && <p className={styles.intro}>{data.intro}</p>}
              {data.cta && (
                <Button href={data.cta.href} variant={onDark ? "white" : "dark"}>
                  {data.cta.label}
                </Button>
              )}
            </div>
          )}
        </div>

        <ul className={`${styles.grid} ${variant === "cosmos" ? styles.gridFour : ""}`}>
          {data.items.map((item, i) => (
            <li
              key={item.title}
              className={`${styles.card} ${variant === "cosmos" ? styles.cardResult : ""}`}
              data-reveal
            >
              <span
                className={variant === "cosmos" ? styles.resultNo : styles.badge}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={styles.cardMeta}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
