import styles from "./starters.module.css";

/**
 * Smalle balk bovenaan met de eerstvolgende startdatum. De datum wordt op de
 * server berekend, dus hij is altijd actueel zonder client-JS.
 */
export default function DeliveryBar({
  startDatum,
  eersteOntwerp,
}: {
  startDatum: Date;
  eersteOntwerp: string;
}) {
  const kort = new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
  }).format(startDatum);

  return (
    <div className={styles.bar}>
      <div className={`container ${styles.barInner}`}>
        <p className={styles.barText}>
          <span className={styles.barDot} aria-hidden />
          Bestel vandaag, start {kort}. Eerste ontwerp {eersteOntwerp}.
        </p>
        <p className={styles.barMeta}>
          Nog 4 plekken deze week · 2 termijnen · geld terug als het niet live komt
        </p>
      </div>
    </div>
  );
}
