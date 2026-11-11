import styles from "./express.module.css";

const STAPPEN = [
  {
    no: "01",
    obj: "obj-intake",
    title: "Intake",
    text: "Je vult een formulier in over wat je doet en voor wie, en levert je logo, teksten en foto's aan. Een gesprek is niet nodig.",
  },
  {
    no: "02",
    obj: "obj-ontwerp",
    title: "Ik ontwerp",
    text: "Ik kijk naar je markt en je concurrenten. Binnen 48 uur zie je het eerste ontwerp van je homepage.",
  },
  {
    no: "03",
    obj: "obj-feedback",
    title: "Jij geeft feedback",
    text: "Je zegt wat er anders moet en ik pas het aan, binnen de rondes van je pakket. Na je akkoord bouw ik de site in WordPress.",
  },
  {
    no: "04",
    obj: "obj-overdracht",
    title: "Live en overdracht",
    text: "De site gaat live op jouw domein. Je krijgt het ontwerpbestand, alle inloggegevens en een uitlegvideo.",
  },
];

export default function Werkwijze() {
  return (
    <section className={styles.werkwijze}>
      <div className={styles.container}>
        <div className={styles.werkwijzeHead}>
          <span className={styles.pill}>Werkwijze</span>
          <h2 className={styles.werkwijzeTitle}>
            Jouw website online in{" "}
            <span className={styles.accent}>4 stappen.</span>
          </h2>
        </div>

        <div className={styles.stappenGrid}>
          {STAPPEN.map((s) => (
            <div className={styles.stapCard} key={s.no}>
              <div className={styles.stapImg}>
                <img className={styles.stapImgBg} src="/starter/express-bg.webp" alt="" />
                <img className={styles.stapObj} src={`/starter/${s.obj}.webp`} alt="" />
              </div>
              <div className={styles.stapBody}>
                <div className={styles.stapHd}>
                  <span className={styles.stapNo}>{s.no}</span>
                  <span className={styles.stapTitle}>{s.title}</span>
                </div>
                <p className={styles.stapText}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
