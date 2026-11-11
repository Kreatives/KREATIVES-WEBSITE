"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  QUESTIONS,
  PAKKET_LABEL,
  type Pakket,
  type Question,
} from "./questions";
import styles from "./intake.module.css";

const STORAGE_KEY = "kreatives-intake-v1";

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RE_URL = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;
function cleanPhone(v: string) {
  return v.replace(/[\s\-().]/g, "");
}
function isPhone(v: string) {
  const c = cleanPhone(v);
  return /^06\d{8}$/.test(c) || /^\+31\d{9}$/.test(c);
}

type Website = { link: string; reason: string };
type ChoiceInput = { choice: string; detail: string };
type AnswerValue = string | boolean | Website[] | ChoiceInput;
type Answers = Record<string, AnswerValue>;

function emptyWebsites(n: number): Website[] {
  return Array.from({ length: n }, () => ({ link: "", reason: "" }));
}

export default function IntakeForm({
  pakket: pakketProp,
  email: emailProp,
}: {
  pakket?: Pakket;
  email?: string;
}) {
  const [answers, setAnswers] = useState<Answers>({});
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState("");
  const fieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Antwoorden terughalen uit de browser + voorinvullen vanuit de URL.
  useEffect(() => {
    let stored: Answers = {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) stored = JSON.parse(raw) as Answers;
    } catch {
      stored = {};
    }
    const next: Answers = { ...stored };
    if (emailProp && !next.email) next.email = emailProp;
    if (pakketProp) next.pakket = pakketProp;
    setAnswers(next);
  }, [emailProp, pakketProp]);

  // Tussentijds opslaan.
  useEffect(() => {
    if (Object.keys(answers).length === 0) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* opslag kan vol/geblokkeerd zijn — niet erg */
    }
  }, [answers]);

  const pakket = (pakketProp || (answers.pakket as string) || "") as Pakket | "";

  const visible: Question[] = useMemo(() => {
    return QUESTIONS.filter((q) => {
      if (q.askIfNoPakket && pakketProp) return false;
      if (q.onlyPakket && !q.onlyPakket.includes(pakket as Pakket)) return false;
      return true;
    });
  }, [pakket, pakketProp]);

  const total = visible.length;
  const current = visible[Math.min(step, total - 1)];

  // Focus het veld bij elke stap.
  useEffect(() => {
    if (!started || submitted) return;
    const t = setTimeout(() => fieldRef.current?.focus(), 90);
    return () => clearTimeout(t);
  }, [step, started, submitted]);

  const set = useCallback((id: string, value: AnswerValue) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setError("");
  }, []);

  function validate(q: Question): string {
    const v = answers[q.id];
    if (q.type === "consent") {
      return v === true ? "" : "Zet een vinkje om te versturen.";
    }
    if (q.type === "websites") {
      const rows = (Array.isArray(v) ? v : []) as Website[];
      const filled = rows.filter((r) => r.link.trim() || r.reason.trim());
      const min = q.minRows ?? 5;
      if (filled.length < min)
        return `Vul minimaal ${min} websites in, met per website een link en een uitleg.`;
      for (const r of filled) {
        if (!RE_URL.test(r.link.trim())) return "Eén van de links klopt niet. Gebruik een adres zoals naam.nl.";
        if (!r.reason.trim()) return "Schrijf bij elke website kort waarom.";
      }
      return "";
    }
    if (q.type === "choice") {
      return typeof v === "string" && v ? "" : "Kies een optie.";
    }
    if (q.type === "choiceInput") {
      const ci = (v && typeof v === "object" ? v : { choice: "", detail: "" }) as ChoiceInput;
      if (!ci.choice) return "Kies een optie.";
      const opt = q.options?.find((o) => o.value === ci.choice);
      if (opt?.withInput && !ci.detail.trim()) return "Vul ook het veld in.";
      return "";
    }
    // tekstvelden
    const s = typeof v === "string" ? v.trim() : "";
    if (!s) {
      if (q.optional) return "";
      return "Vul dit in om verder te gaan.";
    }
    if (q.type === "email" && !RE_EMAIL.test(s)) return "Dit lijkt geen geldig e-mailadres.";
    if (q.type === "tel" && !isPhone(s))
      return "Dit lijkt geen geldig telefoonnummer. Begin met 06 of +31.";
    if (q.type === "url" && !RE_URL.test(s))
      return "Dit lijkt geen geldige link. Gebruik een adres zoals naam.nl.";
    return "";
  }

  const next = useCallback(() => {
    const q = current;
    const err = validate(q);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      void submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, step, total, answers]);

  const back = useCallback(() => {
    setError("");
    if (step > 0) setStep((s) => s - 1);
    else setStarted(false);
  }, [step]);

  async function submit() {
    setSubmitting(true);
    setSendError("");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: (answers.email as string) || "",
          whatsapp: (answers.whatsapp as string) || "",
          pakket: pakket || "",
          answers,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Versturen is niet gelukt.");
      }
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* niet erg */
      }
      setSubmitted(true);
    } catch (e) {
      setSendError(e instanceof Error ? e.message : "Versturen is niet gelukt.");
    } finally {
      setSubmitting(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (!current) return;
    // Cijfertoets kiest een optie bij keuzevragen.
    if (
      (current.type === "choice" || current.type === "choiceInput") &&
      /^[1-9]$/.test(e.key) &&
      (e.target as HTMLElement).tagName !== "INPUT"
    ) {
      const idx = Number(e.key) - 1;
      const opt = current.options?.[idx];
      if (opt) {
        e.preventDefault();
        if (current.type === "choice") set(current.id, opt.value);
        else {
          const prev = (answers[current.id] as ChoiceInput) || { choice: "", detail: "" };
          set(current.id, { choice: opt.value, detail: opt.value === prev.choice ? prev.detail : "" });
        }
        return;
      }
    }
    if (e.key !== "Enter") return;
    const tag = (e.target as HTMLElement).tagName;
    if (current.type === "websites") {
      if (tag !== "TEXTAREA") e.preventDefault();
      return;
    }
    if (tag === "TEXTAREA" && e.shiftKey) return; // Shift+Enter = nieuwe regel
    e.preventDefault();
    next();
  }

  // ---------- Startscherm ----------
  if (!started) {
    return (
      <div className={styles.screen}>
        <div className={styles.center}>
          <div className={styles.intro}>
            <span className={styles.kicker}>Intake</span>
            <h1 className={styles.introTitle}>Intake KREATIVES Express</h1>
            <p className={styles.introText}>
              Met dit formulier ontwerp ik je website. Ik bel je niet om door te
              vragen, dus alles wat ik moet weten, moet hier staan. Hoe
              duidelijker je antwoorden, hoe beter het ontwerp. Schrijf liever te
              veel dan te weinig. De 48 uur gaan in zodra dit formulier compleet
              is. Reken op 15 tot 20 minuten.
            </p>
            <button type="button" className={styles.primary} onClick={() => setStarted(true)}>
              <span>Start</span>
              <Arrow />
            </button>
            <p className={styles.resumeNote}>
              Je antwoorden worden automatisch bewaard op dit apparaat, dus je kunt
              later verder.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Eindscherm ----------
  if (submitted) {
    return (
      <div className={styles.screen}>
        <div className={styles.center}>
          <div className={`${styles.intro} ${styles.introCenter}`}>
            <span className={styles.checkBig} aria-hidden>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m4 12.5 5 5 11-12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h1 className={styles.introTitle}>Bedankt, ik heb alles binnen.</h1>
            <p className={styles.introText}>
              Je ziet je eerste ontwerp binnen 48 uur in je mail.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Vraagscherm ----------
  const q = current;
  const help = q.helpByPakket?.[pakket as Pakket] ?? q.help;
  const extra = q.extraByPakket?.[pakket as Pakket];
  const isLast = step === total - 1;
  const pct = Math.round(((step + 1) / total) * 100);

  return (
    <div className={styles.screen}>
      <div className={styles.progress} aria-hidden>
        <div className={styles.progressBar} style={{ width: `${pct}%` }} />
      </div>

      <button type="button" className={styles.backBtn} onClick={back}>
        <svg viewBox="0 0 18 18" fill="none"><path d="M14 9H4M8 5L4 9l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Terug
      </button>

      <form className={styles.center} onKeyDown={onKeyDown} onSubmit={(e) => { e.preventDefault(); next(); }}>
        <div className={styles.qWrap} key={step}>
          <div className={styles.qNum}>
            {q.num} <span aria-hidden>→</span>
            {q.optional && <span className={styles.optional}> (optioneel)</span>}
          </div>
          <h2 className={styles.qTitle}>{q.type === "consent" ? "Nog één ding." : q.title}</h2>
          {help && <p className={styles.qHelp}>{help}</p>}
          {extra && <p className={styles.qExtra}>{extra}</p>}

          <div className={styles.field}>{renderField(q)}</div>

          {error && <p className={styles.error}>{error}</p>}
          {isLast && sendError && <p className={styles.error}>{sendError}</p>}

          <div className={styles.actions}>
            <button type="submit" className={styles.primary} disabled={submitting}>
              <span>{isLast ? (submitting ? "Versturen…" : "Verstuur") : "Verder"}</span>
              {!isLast && <Arrow />}
            </button>
            {!isLast && (
              <span className={styles.hint}>
                of druk op <b>Enter ↵</b>
                {q.type === "longtext" && <> · Shift+Enter voor een nieuwe regel</>}
              </span>
            )}
          </div>
        </div>
      </form>

      <div className={styles.counter}>
        {step + 1} / {total}
      </div>
    </div>
  );

  function renderField(q: Question) {
    const v = answers[q.id];
    switch (q.type) {
      case "email":
      case "tel":
      case "text":
      case "url":
        return (
          <input
            ref={fieldRef as React.RefObject<HTMLInputElement>}
            className={styles.input}
            type={q.type === "email" ? "email" : q.type === "tel" ? "tel" : "text"}
            inputMode={q.type === "tel" ? "tel" : q.type === "email" ? "email" : "text"}
            placeholder={q.placeholder}
            value={(v as string) || ""}
            onChange={(e) => set(q.id, e.target.value)}
            autoComplete="off"
          />
        );
      case "longtext":
        return (
          <textarea
            ref={fieldRef as React.RefObject<HTMLTextAreaElement>}
            className={styles.textarea}
            rows={4}
            placeholder="Typ hier je antwoord…"
            value={(v as string) || ""}
            onChange={(e) => set(q.id, e.target.value)}
          />
        );
      case "choice":
        return (
          <div className={styles.choices}>
            {q.options?.map((o, i) => {
              const on = v === o.value;
              return (
                <button
                  type="button"
                  key={o.value}
                  className={`${styles.choice} ${on ? styles.choiceOn : ""}`}
                  onClick={() => set(q.id, o.value)}
                >
                  <span className={styles.choiceKey}>{i + 1}</span>
                  {o.label}
                </button>
              );
            })}
          </div>
        );
      case "choiceInput": {
        const ci = (v && typeof v === "object" ? v : { choice: "", detail: "" }) as ChoiceInput;
        return (
          <div className={styles.choices}>
            {q.options?.map((o, i) => {
              const on = ci.choice === o.value;
              return (
                <div key={o.value}>
                  <button
                    type="button"
                    className={`${styles.choice} ${on ? styles.choiceOn : ""}`}
                    onClick={() => set(q.id, { choice: o.value, detail: on ? ci.detail : "" })}
                  >
                    <span className={styles.choiceKey}>{i + 1}</span>
                    {o.label}
                  </button>
                  {on && o.withInput && (
                    <input
                      className={styles.input}
                      style={{ marginTop: "0.6rem" }}
                      placeholder={o.inputPlaceholder}
                      value={ci.detail}
                      onChange={(e) => set(q.id, { choice: o.value, detail: e.target.value })}
                      autoFocus
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      }
      case "websites": {
        const rows = (Array.isArray(v) ? v : emptyWebsites(q.minRows ?? 5)) as Website[];
        const update = (i: number, patch: Partial<Website>) => {
          const nextRows = rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r));
          set(q.id, nextRows);
        };
        return (
          <div className={styles.websites}>
            {rows.map((r, i) => (
              <div className={styles.webRow} key={i}>
                <div className={styles.webIdx}>{i + 1}</div>
                <div className={styles.webFields}>
                  <input
                    ref={i === 0 ? (fieldRef as React.RefObject<HTMLInputElement>) : undefined}
                    className={styles.input}
                    placeholder="Link, bv. naam.nl"
                    value={r.link}
                    onChange={(e) => update(i, { link: e.target.value })}
                  />
                  <textarea
                    className={styles.textarea}
                    rows={2}
                    placeholder={q.reasonLabel}
                    value={r.reason}
                    onChange={(e) => update(i, { reason: e.target.value })}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => set(q.id, [...rows, { link: "", reason: "" }])}
            >
              + Nog een website toevoegen
            </button>
          </div>
        );
      }
      case "consent":
        return (
          <label className={styles.consent}>
            <input
              type="checkbox"
              checked={v === true}
              onChange={(e) => set(q.id, e.target.checked)}
            />
            <span>{q.title}</span>
          </label>
        );
      default:
        return null;
    }
  }
}

function Arrow() {
  return (
    <span className={styles.arrow} aria-hidden>
      <svg viewBox="0 0 18 18" fill="none">
        <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
