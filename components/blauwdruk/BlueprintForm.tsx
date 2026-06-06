"use client";

import { useState } from "react";
import { submitContact } from "@/app/actions/contact";
import Button from "@/components/Button";
import styles from "./Blueprint.module.css";

const BRANCHES = [
  "Kliniek of behandelcentrum",
  "Coach of trainer",
  "E-commerce merk",
  "Groothandel of leverancier",
  "Creatief bureau of studio",
  "Restaurant of horecabedrijf",
  "Anders",
];

const UITSTRALINGEN = [
  "Zakelijk",
  "Warm",
  "Minimalistisch",
  "Luxe",
  "Speels",
  "Anders / weet ik nog niet",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BlueprintForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branche, setBranche] = useState("");
  const [doel, setDoel] = useState("");
  const [uitstraling, setUitstraling] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) return setError("Vul je naam in.");
    if (!EMAIL_RE.test(email.trim()))
      return setError("Vul een geldig e-mailadres in.");
    if (!branche) return setError("Kies je type bedrijf.");
    if (doel.trim().length < 3)
      return setError("Vertel kort wat bezoekers op je site moeten doen.");
    if (!uitstraling) return setError("Kies welke uitstraling bij je past.");

    setSending(true);
    const res = await submitContact({
      name: name.trim(),
      email: email.trim(),
      subject: "Gratis blauwdruk",
      message:
        `Aanvraag gratis blauwdruk.\n\n` +
        `Type bedrijf / branche: ${branche}\n` +
        `Bezoekers moeten op de site: ${doel.trim()}\n` +
        `Gewenste uitstraling: ${uitstraling}`,
      source: "Gratis blauwdruk",
    });
    setSending(false);
    if (!res.ok) {
      setError(res.error ?? "Er ging iets mis. Probeer het opnieuw.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className={styles.formCard}>
        <div className={styles.done}>
          <svg className={styles.check} viewBox="0 0 48 48" fill="none" aria-hidden>
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            <path
              d="M15 24.5 21.5 31 34 18"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className={styles.doneTitle}>
            Bedankt{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}!
          </h3>
          <p className={styles.doneBody}>
            We stellen je blauwdruk samen en sturen die binnen 48 uur naar{" "}
            <strong>{email.trim()}</strong>. Gratis, zonder verplichtingen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      <p className={styles.formCardLabel}>Vul het in — het duurt twee minuten.</p>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="bp-name">
              Naam
            </label>
            <input
              id="bp-name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Je naam"
              autoComplete="name"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="bp-email">
              E-mailadres
            </label>
            <input
              id="bp-email"
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="je@bedrijf.nl"
              autoComplete="email"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="bp-branche">
            Type bedrijf / branche
          </label>
          <select
            id="bp-branche"
            className={styles.select}
            value={branche}
            onChange={(e) => setBranche(e.target.value)}
          >
            <option value="" disabled>
              Kies je branche…
            </option>
            {BRANCHES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="bp-doel">
            Wat wil je dat bezoekers doen op je site?
          </label>
          <input
            id="bp-doel"
            className={styles.input}
            value={doel}
            onChange={(e) => setDoel(e.target.value)}
            placeholder="Bijv. contact opnemen, bestellen, een afspraak boeken"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="bp-uitstraling">
            Welke uitstraling past bij jouw merk?
          </label>
          <select
            id="bp-uitstraling"
            className={styles.select}
            value={uitstraling}
            onChange={(e) => setUitstraling(e.target.value)}
          >
            <option value="" disabled>
              Kies een uitstraling…
            </option>
            {UITSTRALINGEN.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        {error && <span className={styles.error}>{error}</span>}

        <div className={styles.submitRow}>
          <Button variant="primary" type="submit" disabled={sending}>
            {sending ? "Versturen…" : "Ontvang jouw blauwdruk gratis"}
          </Button>
        </div>
        <p className={styles.micro2}>Binnen 48 uur in je inbox.</p>
      </form>
    </div>
  );
}
