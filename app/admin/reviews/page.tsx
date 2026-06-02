import styles from "../admin.module.css";

export default function AdminReviews() {
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Reviews</h1>
        <p className={styles.lead}>
          Hier beheer je straks klantreviews.
        </p>
      </div>
      <p className={styles.notice}>
        De invulschermen voor reviews bouwen we in de volgende stap, zodra de
        database staat.
      </p>
    </div>
  );
}
