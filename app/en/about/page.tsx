import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import Button from "@/components/Button";
import { aboutEn } from "@/lib/content-en";
import styles from "../en.module.css";

export const metadata: Metadata = {
  title: "About us",
  description:
    "KREATIVES builds custom websites for brands and business owners ready for an online presence that matches where they stand. Our story and who we work for.",
  alternates: { canonical: "/en/about" },
  openGraph: {
    title: "About us — KREATIVES",
    description: "Our story, values and who we work for.",
    url: "/en/about",
  },
};

export default function EnAbout() {
  const a = aboutEn;
  return (
    <>
      <RevealInit />

      <section className={`section--dark cosmos-bg ${styles.hero}`}>
        <div className="container">
          <div className={styles.heroInner}>
            <span className="eyebrow" data-reveal>
              {a.hero.eyebrow}
            </span>
            <h1 className={styles.heroTitle} data-reveal>
              {a.hero.titleLead}{" "}
              <span className="accent accent--orange">{a.hero.titleAccent}</span>
            </h1>
            <p className={styles.heroLead} data-reveal>
              {a.hero.body}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.block}>
            <span className="eyebrow" data-reveal>
              {a.verhaal.badge}
            </span>
            <h2 className={`h2`} data-reveal>
              {a.verhaal.titleLead}{" "}
              <span className="accent accent--orange">
                {a.verhaal.titleAccent}
              </span>
            </h2>
          </div>
          <div className={styles.block} style={{ marginTop: "1.5rem" }}>
            {a.verhaal.paragraphs.map((p) => (
              <p key={p} className={styles.lead} data-reveal>
                {p}
              </p>
            ))}
            <div className={styles.ctaRow} data-reveal>
              <Button href={a.verhaal.primaryCta.href} variant="primary">
                {a.verhaal.primaryCta.label}
              </Button>
              <Button href={a.verhaal.cta.href} variant="ghost">
                {a.verhaal.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <span className="eyebrow" data-reveal>
            {a.kernwaarden.eyebrow}
          </span>
          <p className={`lead ${styles.block}`} data-reveal>
            {a.kernwaarden.intro}
          </p>
          <ul className={styles.cards}>
            {a.kernwaarden.items.map((k) => (
              <li key={k.title} className={styles.card} data-reveal>
                <h3 className={styles.cardTitle}>{k.title}</h3>
                <p className={styles.cardBody}>{k.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.block}>
            <span className="eyebrow" data-reveal>
              {a.team.eyebrow}
            </span>
            <h2 className="h2" data-reveal>
              {a.team.titleLead}{" "}
              <span className="accent accent--orange">{a.team.titleAccent}</span>
            </h2>
            <p className={styles.lead} style={{ marginTop: "1.25rem" }} data-reveal>
              {a.team.body}
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <span className="eyebrow" data-reveal>
            {a.voorWie.eyebrow}
          </span>
          <h2 className="h2" data-reveal>
            {a.voorWie.titleLead}{" "}
            <span className="accent accent--orange">{a.voorWie.titleAccent}</span>
          </h2>
          <div className={styles.twoCol}>
            <div className={styles.colBox} data-reveal>
              <h3>{a.voorWie.voor.title}</h3>
              <ul className={styles.colList}>
                {a.voorWie.voor.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className={styles.colBox} data-reveal>
              <h3>{a.voorWie.niet.title}</h3>
              <ul className={styles.colList}>
                {a.voorWie.niet.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow" data-reveal>
            {a.resultaten.eyebrow}
          </span>
          <h2 className="h2" data-reveal>
            {a.resultaten.titleLead}{" "}
            <span className="accent accent--orange">
              {a.resultaten.titleAccent}
            </span>
          </h2>
          <ul className={styles.cards}>
            {a.resultaten.items.map((r) => (
              <li key={r.label} className={styles.card} data-reveal>
                <span className={styles.stat}>{r.number}</span>
                <h3 className={styles.cardTitle}>{r.label}</h3>
                <p className={styles.cardBody}>{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section--dark cosmos-bg ${styles.hero}`}>
        <div className="container">
          <div className={styles.heroInner}>
            <span className="eyebrow" data-reveal>
              {a.closing.pill}
            </span>
            <h2 className={styles.heroTitle} data-reveal>
              {a.closing.titleLead}{" "}
              <span className="accent accent--orange">
                {a.closing.titleAccent}
              </span>
            </h2>
            <p className={styles.heroLead} data-reveal>
              {a.closing.body}
            </p>
            <div className={styles.ctaRow} data-reveal>
              <Button href={a.closing.cta.href} variant="white">
                {a.closing.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
