"use client";

import { useState } from "react";
import { overOnsCta } from "@/lib/site";
import { submitContact } from "@/app/actions/contact";
import { Arrow } from "@/components/icons";
import SocialProof from "@/components/SocialProof";
import styles from "./StartProject.module.css";

type Errors = Partial<Record<"naam" | "email" | "bericht", string>>;

export default function StartProject() {
  const [subject, setSubject] = useState(overOnsCta.subjects[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const maand = new Date().toLocaleString("nl-NL", { month: "long" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const naam = String(f.get("naam") || "").trim();
    const email = String(f.get("email") || "").trim();
    const whatsapp = String(f.get("whatsapp") || "").trim();
    const bedrijf = String(f.get("bedrijf") || "").trim();
    const website = String(f.get("website") || "").trim();
    const bericht = String(f.get("bericht") || "").trim();

    const next: Errors = {};
    if (naam.length < 2) next.naam = "Vul je naam in.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Vul een geldig e-mailadres in.";
    if (bericht.length < 10)
      next.bericht = "Vertel iets meer over je project.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    setServerError(null);
    const res = await submitContact({
      name: naam,
      email,
      whatsapp,
      company: bedrijf,
      website,
      subject,
      message: bericht,
      source: "Over ons — start project",
    });
    setSending(false);
    if (!res.ok) {
      setServerError(res.error ?? "Er ging iets mis. Probeer het opnieuw.");
      return;
    }
    form.reset();
    setSent(true);
  }

  return (
    <section
      className={`section section--dark cosmos-bg ${styles.sec}`}
      id="start"
    >
      <div className="container">
        <div className={styles.card}>
          <div className={styles.left}>
            <span className={styles.pill}>
              <span className={styles.dot} aria-hidden />
              4 plekken beschikbaar in {maand}
            </span>

            <h2 className={`${styles.title}`}>
              {overOnsCta.titleLead}{" "}
              <span className="accent accent--orange">
                {overOnsCta.titleAccent}
              </span>
            </h2>

            <p className={styles.body}>{overOnsCta.body}</p>

            <SocialProof align="left" tone="light" />

            <a
              href={overOnsCta.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.calendly}
            >
              <span className={styles.calendlyLabel}>
                {overOnsCta.calendlyLabel}
              </span>
              <span className={styles.calendlyIco} aria-hidden>
                <Arrow />
              </span>
            </a>
          </div>

          <form className={styles.right} onSubmit={onSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="sp-naam">Naam</label>
                <input
                  id="sp-naam"
                  name="naam"
                  type="text"
                  autoComplete="name"
                  placeholder="Volledige naam"
                />
                {errors.naam && <span className={styles.err}>{errors.naam}</span>}
              </div>
              <div className={styles.field}>
                <label htmlFor="sp-email">E-mail</label>
                <input
                  id="sp-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="je@bedrijf.nl"
                />
                {errors.email && (
                  <span className={styles.err}>{errors.email}</span>
                )}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="sp-bedrijf">Bedrijfsnaam</label>
                <input
                  id="sp-bedrijf"
                  name="bedrijf"
                  type="text"
                  autoComplete="organization"
                  placeholder="Naam van je bedrijf"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="sp-whatsapp">WhatsApp-nummer</label>
                <input
                  id="sp-whatsapp"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+31 6 12 34 56 78"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="sp-website">Link naar website</label>
              <input
                id="sp-website"
                name="website"
                type="url"
                autoComplete="url"
                inputMode="url"
                placeholder="https://jouwsite.nl"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="sp-subject">Onderwerp</label>
              <div className={styles.selectWrap}>
                <select
                  id="sp-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  {overOnsCta.subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="sp-bericht">Bericht</label>
              <textarea
                id="sp-bericht"
                name="bericht"
                rows={4}
                placeholder="Hoe kunnen we helpen?"
              />
              {errors.bericht && (
                <span className={styles.err}>{errors.bericht}</span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={sending || sent}
            >
              {sent ? "Bedankt, tot snel" : sending ? "Versturen…" : "Verstuur"}
            </button>
            {serverError && <span className={styles.err}>{serverError}</span>}
          </form>
        </div>
      </div>
    </section>
  );
}
