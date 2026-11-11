import Button from "@/components/Button";
import styles from "./starters.module.css";

export default function ExitBlok() {
  return (
    <section className={`section section--dark cosmos-bg ${styles.exitSec}`}>
      <div className="container">
        <div className={styles.exitInner} data-reveal>
          <span className="eyebrow">Groter dan dit</span>
          <h2 className={`h2 ${styles.exitTitel}`}>
            Een pakket past niet bij elke zaak.{" "}
            <span className="accent accent--orange">Dat is prima.</span>
          </h2>
          <p className={styles.exitBody}>
            Zoek je een webshop, een boekingssysteem, koppelingen met je
            software, meertaligheid of 3D-werk, dan past maatwerk beter. Dat
            loopt via mijn hoofdsite, met een eigen traject en een eigen prijs.
          </p>
          <div className={styles.exitCta}>
            <Button href="/prijzen" variant="primary">
              Bekijk het maatwerkwerk
            </Button>
            <Button href="/projecten" variant="ghost">
              Eerst het werk zien
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
