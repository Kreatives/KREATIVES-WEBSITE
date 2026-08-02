"use client";

import { useState } from "react";
import { contact } from "@/lib/site";
import { submitContact } from "@/app/actions/contact";
import Button from "@/components/Button";
import SocialProof from "@/components/SocialProof";
import styles from "./Contact.module.css";

type Errors = Partial<Record<"naam" | "email" | "bericht", string>>;

export default function Contact() {
  const [type, setType] = useState(contact.projectTypes[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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
    const hp = String(f.get("hp") || "");

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
      subject: type,
      message: bericht,
      source: "Contactpagina",
      hp,
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
    <section className={`section--dark cosmos-bg ${styles.sec}`} id="contact">
      <div className="container">
        <div className={styles.head}>
          <SocialProof />

          <h1 className={`h2 ${styles.title}`} data-reveal>
            {contact.titleLead}
            <br />
            <span className="accent accent--orange">{contact.titleAccent}</span>
          </h1>

          <p className={`${styles.intro}`} data-reveal>
            {contact.body}
          </p>
        </div>

        <form className={styles.card} onSubmit={onSubmit} noValidate>
          {/* Honeypot tegen bots — laat dit veld leeg. */}
          <input
            type="text"
            name="hp"
            className="hp-field"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <fieldset className={styles.radioGroup}>
            <legend className={styles.legend}>Hoe kunnen we helpen?</legend>
            <div className={styles.radios}>
              {contact.projectTypes.map((t) => (
                <label
                  key={t}
                  className={`${styles.radio} ${
                    type === t ? styles.radioOn : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={t}
                    checked={type === t}
                    onChange={() => setType(t)}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="naam">Volledige naam</label>
              <input
                id="naam"
                name="naam"
                type="text"
                autoComplete="name"
                placeholder="Hoe heet je?"
              />
              {errors.naam && (
                <span className={styles.err}>{errors.naam}</span>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="email">E-mailadres*</label>
              <input
                id="email"
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
              <label htmlFor="bedrijf">Bedrijfsnaam</label>
              <input
                id="bedrijf"
                name="bedrijf"
                type="text"
                autoComplete="organization"
                placeholder="Naam van je bedrijf"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="whatsapp">WhatsApp-nummer</label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+31 6 12 34 56 78"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="website">Link naar website</label>
            <input
              id="website"
              name="website"
              type="url"
              autoComplete="url"
              inputMode="url"
              placeholder="https://jouwsite.nl"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="bericht">Bericht</label>
            <textarea
              id="bericht"
              name="bericht"
              rows={5}
              placeholder="Vertel kort over je project."
            />
            {errors.bericht && (
              <span className={styles.err}>{errors.bericht}</span>
            )}
          </div>

          <div className={styles.cardFoot}>
            <Button type="submit" variant="dark" disabled={sending || sent}>
              {sent
                ? "Bedankt, tot snel"
                : sending
                ? "Versturen…"
                : "Verstuur bericht"}
            </Button>
            <p className={styles.privacy}>
              {serverError ? (
                <span className={styles.err}>{serverError}</span>
              ) : (
                contact.privacy
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
