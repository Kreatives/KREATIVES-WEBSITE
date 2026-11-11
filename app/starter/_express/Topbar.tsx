import styles from "./express.module.css";

export default function Topbar() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const datum = new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
  }).format(d);

  return (
    <div className={styles.topbar}>
      <span className={styles.topDot} aria-hidden />
      <span>
        Start vandaag, zie je eerste ontwerp op <b>{datum}</b>
      </span>
    </div>
  );
}
