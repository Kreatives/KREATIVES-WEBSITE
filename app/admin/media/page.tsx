import styles from "../admin.module.css";

export default function AdminMedia() {
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Afbeeldingen</h1>
        <p className={styles.lead}>
          Hier zie je straks alle foto's en kun je ze vervangen.
        </p>
      </div>
      <p className={styles.notice}>
        Het fotobeheer bouwen we in de volgende stap, zodra de opslag in de
        database staat.
      </p>
    </div>
  );
}
