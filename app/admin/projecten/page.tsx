import styles from "../admin.module.css";

export default function AdminProjecten() {
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Projecten</h1>
        <p className={styles.lead}>
          Hier voeg je straks projecten toe en bewerk je ze.
        </p>
      </div>
      <p className={styles.notice}>
        De invulschermen voor projecten bouwen we in de volgende stap, zodra de
        database staat.
      </p>
    </div>
  );
}
