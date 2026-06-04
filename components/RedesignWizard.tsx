"use client";

import { useEffect, useRef, useState } from "react";
import { submitContact } from "@/app/actions/contact";
import { Arrow } from "@/components/icons";
import styles from "./RedesignWizard.module.css";

const CALENDLY_URL = "https://calendly.com/info-jtw/gratis-adviesgesprek-v2";
const WHATSAPP_URL = "https://wa.me/31613066250";
const SITE_URL = "https://www.kreatives.nl";

type FieldType = "text" | "email" | "tel" | "url" | "textarea";
type Field = {
  key: "name" | "email" | "phone" | "website" | "problem";
  label: string;
  question: string;
  placeholder: string;
  type: FieldType;
  optional?: boolean;
  help?: string;
};

const FIELDS: Field[] = [
  {
    key: "name",
    label: "Naam",
    question: "Met wie hebben we het genoegen?",
    placeholder: "Je volledige naam",
    type: "text",
  },
  {
    key: "email",
    label: "E-mail",
    question: "Waar mogen we het ontwerp naartoe sturen?",
    placeholder: "je@bedrijf.nl",
    type: "email",
  },
  {
    key: "phone",
    label: "Telefoon",
    question: "Je telefoonnummer?",
    placeholder: "+31 6 12 34 56 78",
    type: "tel",
    optional: true,
    help: "Optioneel, handig als we je even willen bellen.",
  },
  {
    key: "website",
    label: "Website",
    question: "Wat is je huidige website?",
    placeholder: "https://jouwsite.nl",
    type: "url",
  },
  {
    key: "problem",
    label: "Knelpunt",
    question: "Waar loop je nu tegenaan?",
    placeholder: "Vertel kort wat er beter kan aan je site…",
    type: "textarea",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RedesignWizard() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<"intro" | "fields" | "done">("intro");
  const [idx, setIdx] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("open-redesign", onOpen);
    return () => window.removeEventListener("open-redesign", onOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Focus het veld bij elke stap.
  useEffect(() => {
    if (open && stage === "fields") {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open, stage, idx]);

  function close() {
    setOpen(false);
    setTimeout(() => {
      setStage("intro");
      setIdx(0);
      setValues({});
      setError(null);
    }, 350);
  }

  function validate(field: Field, raw: string): string | null {
    const v = (raw || "").trim();
    if (field.optional && !v) return null;
    if (!v) return "Vul dit veld nog even in.";
    if (field.type === "email" && !EMAIL_RE.test(v))
      return "Vul een geldig e-mailadres in.";
    if (field.type === "textarea" && v.length < 8)
      return "Vertel net iets meer, dan kunnen we beter helpen.";
    if (field.key === "name" && v.length < 2) return "Vul je naam in.";
    return null;
  }

  async function advance() {
    if (stage === "intro") {
      setStage("fields");
      setIdx(0);
      return;
    }
    const field = FIELDS[idx];
    const err = validate(field, values[field.key] ?? "");
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    if (idx < FIELDS.length - 1) {
      setIdx((i) => i + 1);
      return;
    }
    // Laatste stap: versturen.
    setSending(true);
    const res = await submitContact({
      name: values.name ?? "",
      email: values.email ?? "",
      website: values.website ?? "",
      company: "",
      subject: "Gratis redesign",
      message: `Aanvraag gratis hero-redesign.\n\nWaar loopt tegenaan:\n${
        values.problem ?? ""
      }\n\nTelefoon: ${values.phone || "—"}`,
      source: "Gratis redesign",
    });
    setSending(false);
    if (!res.ok) {
      setError(res.error ?? "Er ging iets mis. Probeer het opnieuw.");
      return;
    }
    setStage("done");
  }

  function back() {
    setError(null);
    if (stage !== "fields") return;
    if (idx === 0) setStage("intro");
    else setIdx((i) => i - 1);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !(e.shiftKey)) {
      const field = FIELDS[idx];
      if (field?.type === "textarea" && !e.metaKey && !e.ctrlKey) return;
      e.preventDefault();
      advance();
    }
  }

  if (!open) return null;

  const field = FIELDS[idx];
  const total = FIELDS.length;

  return (
    <div
      className={`cosmos-bg ${styles.overlay}`}
      role="dialog"
      aria-modal="true"
      aria-label="Gratis redesign aanvragen"
    >
      <header className={styles.bar}>
        <span className={styles.brand}>KREATIVES</span>
        {stage === "fields" && (
          <span className={styles.count}>
            {idx + 1} / {total}
          </span>
        )}
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label="Sluiten"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      {stage === "fields" && (
        <div className={styles.progress} aria-hidden>
          <span
            className={styles.progressBar}
            style={{ width: `${((idx + 1) / total) * 100}%` }}
          />
        </div>
      )}

      <div className={styles.stageWrap}>
        {stage === "intro" && (
          <div className={styles.step} key="intro">
            <span className={styles.badge}>
              <span className={styles.dot} aria-hidden />
              Binnen 2 minuten aangevraagd
            </span>
            <h2 className={styles.introTitle}>
              Wij ontwerpen je hero-sectie{" "}
              <span className="accent accent--orange">volledig gratis.</span>
            </h2>
            <p className={styles.introBody}>
              Je hero-sectie is het eerste wat bezoekers zien. Wij ontwerpen die
              opnieuw, zodat je met eigen ogen ziet hoe het sterker kan. Je zit
              nergens aan vast, en het kost je niets.
            </p>
            <button
              type="button"
              className={styles.primary}
              onClick={advance}
            >
              <span>Start je gratis re-design</span>
              <span className={styles.primaryIco} aria-hidden>
                <Arrow />
              </span>
            </button>
          </div>
        )}

        {stage === "fields" && (
          <div className={styles.step} key={field.key}>
            <span className={styles.stepLabel}>
              {String(idx + 1).padStart(2, "0")} — {field.label}
            </span>
            <label className={styles.question} htmlFor={`f-${field.key}`}>
              {field.question}
              {field.optional && (
                <span className={styles.optional}> (optioneel)</span>
              )}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={`f-${field.key}`}
                ref={(el) => {
                  inputRef.current = el;
                }}
                className={styles.input}
                rows={3}
                placeholder={field.placeholder}
                value={values[field.key] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [field.key]: e.target.value }))
                }
                onKeyDown={onKeyDown}
              />
            ) : (
              <input
                id={`f-${field.key}`}
                ref={(el) => {
                  inputRef.current = el;
                }}
                className={styles.input}
                type={field.type === "url" ? "text" : field.type}
                inputMode={
                  field.type === "tel"
                    ? "tel"
                    : field.type === "url"
                    ? "url"
                    : undefined
                }
                placeholder={field.placeholder}
                value={values[field.key] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [field.key]: e.target.value }))
                }
                onKeyDown={onKeyDown}
              />
            )}

            {field.help && !error && (
              <span className={styles.help}>{field.help}</span>
            )}
            {error && <span className={styles.error}>{error}</span>}

            <div className={styles.nav}>
              <button
                type="button"
                className={styles.primary}
                onClick={advance}
                disabled={sending}
              >
                <span>
                  {idx === total - 1
                    ? sending
                      ? "Versturen…"
                      : "Versturen"
                    : "Volgende"}
                </span>
                <span className={styles.primaryIco} aria-hidden>
                  <Arrow />
                </span>
              </button>
              <button type="button" className={styles.ghost} onClick={back}>
                Terug
              </button>
            </div>
          </div>
        )}

        {stage === "done" && (
          <div className={styles.step} key="done">
            <span className={styles.checkmark} aria-hidden>
              <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <path
                  d="M15 24.5 21.5 31 34 18"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 className={styles.introTitle}>
              Bedankt{values.name ? `, ${values.name.split(" ")[0]}` : ""}!
            </h2>
            <p className={styles.introBody}>
              We gaan met je hero-sectie aan de slag en nemen zo snel mogelijk
              contact met je op. Liever meteen sparren? Plan direct een gesprek
              of stuur ons een berichtje.
            </p>
            <div className={styles.doneActions}>
              <a
                className={styles.primary}
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Plan direct een gesprek</span>
                <span className={styles.primaryIco} aria-hidden>
                  <Arrow />
                </span>
              </a>
              <a
                className={styles.secondary}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Stuur een WhatsApp
              </a>
              <a className={styles.ghost} href={SITE_URL} onClick={close}>
                Terug naar de website
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
