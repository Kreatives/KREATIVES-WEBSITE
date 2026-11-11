import styles from "./express.module.css";

const TILES = [
  {
    icon: "file",
    title: "Het ontwerp is van jou",
    body: "Je krijgt het ontwerp mee. Wil je later met iemand anders verder, dan kan dat gewoon.",
  },
  {
    icon: "globe",
    title: "Live op je eigen domein",
    body: "De site draait op jouw domeinnaam en hosting. Heb je die nog niet, dan regelen we dat samen.",
  },
  {
    icon: "folder",
    title: "Zelf aan te passen",
    body: "Teksten en foto's wijzig je zelf, zonder mij te bellen. Je krijgt een korte uitlegvideo.",
  },
  {
    icon: "settings",
    title: "Alles in jouw beheer",
    body: "Je krijgt alle inloggegevens. Je zit nergens aan vast, ook niet aan mij.",
  },
];

export default function WatJeKrijgt() {
  return (
    <section className={styles.value} data-reveal>
      <div className={`${styles.container} ${styles.valueInner}`}>
        <div>
          <span className={styles.pill}>Wat je krijgt</span>
          <h2 className={styles.valueTitle}>
            Je betaalt één keer en{" "}
            <span className={styles.accent}>je site blijft van jou.</span>
          </h2>
          <p className={styles.valueBody}>
            Bij een abonnement betaal je elke maand door, en als je stopt ben je
            je site kwijt. Hier betaal je één keer. Daarna staat alles op jouw
            naam en zit je nergens aan vast.
          </p>
        </div>
        <div className={styles.valueGrid}>
          {TILES.map((t) => (
            <div className={styles.vTile} key={t.title}>
              <img className={styles.vTileIcon} src={`/starter/icons/tiles/${t.icon}.webp`} alt="" />
              <div className={styles.vTileText}>
                <h3 className={styles.vTileTitle}>{t.title}</h3>
                <p className={styles.vTileBody}>{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
