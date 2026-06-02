import Button from "@/components/Button";
import styles from "./ClosingCta.module.css";

type ClosingData = {
  title: string;
  accent?: string;
  body: string;
  cta: { label: string; href: string };
  micro: string;
};

export default function ClosingCta({ data }: { data: ClosingData }) {
  const parts =
    data.accent && data.title.includes(data.accent)
      ? data.title.split(data.accent)
      : null;

  return (
    <section className={`section section--dark cosmos-bg ${styles.sec}`}>
      <div className="container">
        <div className={styles.inner}>
          <h2 className={styles.title} data-reveal>
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
          <p className={styles.body} data-reveal>
            {data.body}
          </p>
          <div className={styles.cta} data-reveal>
            <Button href={data.cta.href} variant="primary">
              {data.cta.label}
            </Button>
          </div>
          <p className={styles.micro} data-reveal>
            {data.micro}
          </p>
        </div>
      </div>
    </section>
  );
}
