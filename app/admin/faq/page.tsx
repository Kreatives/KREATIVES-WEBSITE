import styles from "../admin.module.css";

export default function AdminFaq() {
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Veelgestelde vragen</h1>
        <p className={styles.lead}>
          Hier beheer je straks de vragen en antwoorden.
        </p>
      </div>
      <p className={styles.notice}>
        De invulschermen voor vragen bouwen we in de volgende stap, zodra de
        database staat.
      </p>
    </div>
  );
}
