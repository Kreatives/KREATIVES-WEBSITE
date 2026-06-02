import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealInit from "@/components/RevealInit";
import { Arrow } from "@/components/icons";
import { getProjects } from "@/lib/cms";
import styles from "./projecten.module.css";

export const metadata: Metadata = {
  title: "Projecten",
  description:
    "Maatwerk websites en webshops die we de afgelopen periode hebben opgeleverd voor merken en ondernemers door heel Nederland.",
  alternates: { canonical: "/projecten" },
};

export const dynamic = "force-dynamic";

export default async function ProjectenIndexPage() {
  const projecten = await getProjects();
  return (
    <>
      <RevealInit />

      {/* Eén cosmos-wrap zodat de gradient/sterren als één doek doorlopen
          over zowel de head als de grid (geen naad meer tussen secties). */}
      <div className="cosmos-bg cosmos-wrap">
        <section className={`section--dark ${styles.head}`}>
          <div className="container">
            <div className={styles.headInner}>
              <span className="eyebrow" data-reveal>
                Geselecteerd werk
              </span>
              <h1 className={`${styles.title}`} data-reveal>
                Projecten die we{" "}
                <span className="accent accent--orange">leverden.</span>
              </h1>
              <p className={styles.body} data-reveal>
                Een doorsnede van het werk dat we recent hebben opgeleverd. Klik
                door op een project voor de aanpak, het resultaat en de
                gebruikte elementen.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--dark">
          <div className="container">
            <ul className={styles.grid}>
              {projecten.map((p, i) => (
                <li
                  key={p.slug}
                  className={`${styles.card} ${
                    i % 2 === 1 ? styles.cardOffset : ""
                  }`}
                  data-reveal
                >
                  <Link href={`/projecten/${p.slug}`} className={styles.link}>
                    <div className={styles.media}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 760px) 100vw, 42vw"
                        style={{ objectFit: "cover" }}
                      />
                      <span className={styles.see} aria-hidden>
                        Bekijk case
                        <Arrow />
                      </span>
                    </div>
                    <div className={styles.meta}>
                      <h2 className={styles.name}>{p.name}</h2>
                      <p className={styles.line}>{p.excerpt}</p>
                      <ul className={styles.tags}>
                        {p.tags.map((t) => (
                          <li key={t} className={styles.tag}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
