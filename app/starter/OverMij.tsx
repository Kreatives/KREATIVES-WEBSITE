import Image from "next/image";
import styles from "./starters.module.css";

export default function OverMij() {
  return (
    <section className={`section section--alt ${styles.overSec}`}>
      <div className="container">
        <div className={styles.overGrid}>
          <div className={styles.overFoto} data-reveal>
            <Image
              src="/team/ricky.webp"
              alt="Ricky Kai"
              width={400}
              height={400}
              className={styles.overImg}
            />
          </div>

          <div className={styles.overCopy} data-reveal>
            <span className="eyebrow">Wie je aan de lijn hebt</span>
            <h2 className={`h2 ${styles.overTitel}`}>
              Ik ontwerp en bouw je site{" "}
              <span className="accent accent--orange">zelf.</span>
            </h2>
            <p className={styles.overBody}>
              Ik ben Ricky. Sinds 2019 bouwde ik meer dan 90 sites voor
              ondernemers door heel Nederland, van horeca tot klinieken en van
              webshops tot bureaus. Hier zit geen projectmanager tussen en er is
              geen team dat wisselt.
            </p>
            <p className={styles.overBody}>
              Deze pakketten zijn er omdat er veel ondernemers zijn die nog geen
              €2.500 kwijt willen aan een site. Het werk is hetzelfde, alleen
              kleiner en sneller. Elke site begint bij nul en jij ziet in het
              Figma-bestand precies hoe hij is opgebouwd.
            </p>

            <ul className={styles.overFeiten}>
              <li>Vast aanspreekpunt van intake tot overdracht</li>
              <li>Alles zelf ontworpen, aantoonbaar in het Figma-bestand</li>
              <li>Meer dan 90 sites opgeleverd sinds 2019</li>
            </ul>

            <p className={styles.overHand}>
              Groter dan een pakket? Dan is er{" "}
              <a href={siteUrl("/")}>mijn maatwerkwerk</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function siteUrl(path: string) {
  return path;
}
