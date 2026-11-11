"use client";

import { useEffect, useState } from "react";
import { submitContact } from "@/app/actions/contact";
import { packages } from "./data";
import { trackEvent } from "@/lib/analytics";
import Button from "@/components/Button";
import styles from "./starters.module.css";

type Fouten = Partial<Record<"naam" | "email" | "bedrijf" | "bericht", string>>;

export default function IntakeForm({ defaultPackage }: { defaultPackage?: string }) {
  const start =
    packages.find((p) => p.id === defaultPackage)?.name ?? packages[1].name;

  const [pakket, setPakket] = useState(start);
  const [fouten, setFouten] = useState<Fouten>({});
  const [verzonden, setVerzonden] = useState(false);
  const [bezig, setBezig] = useState(false);
  const [serverFout, setServerFout] = useState<string | null>(null);

  // Een pakketkaart stuurt zijn naam mee, zodat het formulier meteen goed staat.
  useEffect(() => {
    const onKies = (e: Event) => {
      const naam = (e as CustomEvent<string>).detail;
      if (naam) setPakket(naam);
    };
    window.addEventListener("starters:pakket", onKies);
    return () => window.removeEventListener("starters:pakket", onKies);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const naam = String(f.get("naam") || "").trim();
    const email = String(f.get("email") || "").trim();
    const bedrijf = String(f.get("bedrijf") || "").trim();
    const bericht = String(f.get("bericht") || "").trim();
    const hp = String(f.get("hp") || "");

    const next: Fouten = {};
    if (naam.length < 2) next.naam = "Vul je naam in.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Vul een geldig e-mailadres in.";
    if (bedrijf.length < 2) next.bedrijf = "Vul je bedrijfsnaam in.";
    if (bericht.length < 10) next.bericht = "Vertel iets meer over je zaak.";
    setFouten(next);
    if (Object.keys(next).length) return;

    setBezig(true);
    setServerFout(null);
    const res = await submitContact({
      name: naam,
      email,
      company: bedrijf,
      website: String(f.get("website") || "").trim(),
      whatsapp: String(f.get("whatsapp") || "").trim(),
      subject: `Starterspakket ${pakket}`,
      message: `[Pakket: ${pakket}]\n\n${bericht}`,
      source: "Starterspagina",
      hp,
    });
    setBezig(false);
    if (!res.ok) {
      setServerFout(res.error ?? "Er ging iets mis. Probeer het opnieuw.");
      return;
    }
    form.reset();
    setVerzonden(true);
    trackEvent("starters_intake", { pakket });
  }

  if (verzonden) {
    return (
      <div className={`${styles.intake} ${styles.intakeKlaar}`}>
        <span className={styles.intakeVink} aria-hidden>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="m4 12.5 5 5L20 6.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3>Binnen.</h3>
        <p>
          Je aanvraag voor {pakket} staat bij me. Je hoort binnen één werkdag of
          het past, met de betaallink erbij. Kijk ook even in je spamfilter.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.intake} onSubmit={onSubmit} noValidate>
      <input
        type="text"
        name="hp"
        className="hp-field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <fieldset className={styles.intakeGroep}>
        <legend className={styles.intakeLegenda}>Welk pakket</legend>
        <div className={styles.intakeKnoppen}>
          {packages.map((p) => (
            <label
              key={p.id}
              className={`${styles.intakeKnop} ${
                pakket === p.name ? styles.intakeKnopOn : ""
              }`}
            >
              <input
                type="radio"
                name="pakket"
                value={p.name}
                checked={pakket === p.name}
                onChange={() => setPakket(p.name)}
              />
              <span>{p.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.intakeRij}>
        <div className={styles.intakeVeld}>
          <label htmlFor="s-naam">Naam*</label>
          <input
            id="s-naam"
            name="naam"
            type="text"
            autoComplete="name"
            placeholder="Hoe heet je?"
            aria-invalid={Boolean(fouten.naam)}
            aria-describedby={fouten.naam ? "s-naam-err" : undefined}
          />
          {fouten.naam && (
            <span className={styles.intakeFout} id="s-naam-err">
              {fouten.naam}
            </span>
          )}
        </div>
        <div className={styles.intakeVeld}>
          <label htmlFor="s-email">E-mail*</label>
          <input
            id="s-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="je@bedrijf.nl"
            aria-invalid={Boolean(fouten.email)}
            aria-describedby={fouten.email ? "s-email-err" : undefined}
          />
          {fouten.email && (
            <span className={styles.intakeFout} id="s-email-err">
              {fouten.email}
            </span>
          )}
        </div>
      </div>

      <div className={styles.intakeRij}>
        <div className={styles.intakeVeld}>
          <label htmlFor="s-bedrijf">Bedrijf*</label>
          <input
            id="s-bedrijf"
            name="bedrijf"
            type="text"
            autoComplete="organization"
            placeholder="Naam van je zaak"
            aria-invalid={Boolean(fouten.bedrijf)}
            aria-describedby={fouten.bedrijf ? "s-bedrijf-err" : undefined}
          />
          {fouten.bedrijf && (
            <span className={styles.intakeFout} id="s-bedrijf-err">
              {fouten.bedrijf}
            </span>
          )}
        </div>
        <div className={styles.intakeVeld}>
          <label htmlFor="s-whatsapp">WhatsApp</label>
          <input
            id="s-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+31 6 12 34 56 78"
          />
        </div>
      </div>

      <div className={styles.intakeVeld}>
        <label htmlFor="s-website">Heb je al een site?</label>
        <input
          id="s-website"
          name="website"
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="https://huidige-site.nl"
        />
      </div>

      <div className={styles.intakeVeld}>
        <label htmlFor="s-bericht">Wat doe je, en voor wie?*</label>
        <textarea
          id="s-bericht"
          name="bericht"
          rows={5}
          placeholder="Twee of drie zinnen over je zaak en wat er op de site moet staan is genoeg."
          aria-invalid={Boolean(fouten.bericht)}
          aria-describedby={fouten.bericht ? "s-bericht-err" : undefined}
        />
        {fouten.bericht && (
          <span className={styles.intakeFout} id="s-bericht-err">
            {fouten.bericht}
          </span>
        )}
      </div>

      <div className={styles.intakeVoet}>
        <Button type="submit" variant="primary" disabled={bezig}>
          {bezig ? "Versturen…" : "Aanvraag versturen"}
        </Button>
        <p className={styles.intakePrivacy}>
          {serverFout ? (
            <span className={styles.intakeFout}>{serverFout}</span>
          ) : (
            "Je hoort binnen één werkdag of het past. Verplicht veld is met * gemarkeerd."
          )}
        </p>
      </div>
    </form>
  );
}
