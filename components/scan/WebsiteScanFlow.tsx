"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  brancheOpties,
  budgetOpties,
  doelOpties,
  emptyAnswers,
  scanChecks,
  timingOpties,
  type Branche,
  type ScanAnswers,
} from "@/lib/scan";
import styles from "./scan.module.css";

const STORAGE_KEY = "kreatives-scan";
const TOTAL_STEPS = 5; // URL, branche, klant, doel/timing/budget, analyse

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isValidUrl(raw: string): boolean {
  try {
    const u = new URL(normalizeUrl(raw));
    return Boolean(u.hostname) && u.hostname.includes(".");
  } catch {
    return false;
  }
}

export default function WebsiteScanFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ScanAnswers>(emptyAnswers);
  const [urlTouched, setUrlTouched] = useState(false);

  function update<K extends keyof ScanAnswers>(key: K, value: ScanAnswers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  function persistAndGo(next: ScanAnswers) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    router.push("/website-scan/resultaat/demo");
  }

  function startAnalyse() {
    setStep(4);
  }

  const urlOk = isValidUrl(answers.url);
  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  return (
    <div className={styles.flow}>
      <div className={styles.progressHead}>
        <span className={styles.progressLabel}>
          Stap {Math.min(step + 1, TOTAL_STEPS)}/{TOTAL_STEPS}
        </span>
        <span className={styles.progressPct}>{progress}%</span>
      </div>
      <div className={styles.progressTrack} aria-hidden>
        <span className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      {step === 0 && (
        <Step
          title="Wat is de URL van je website?"
          onBack={null}
          onNext={() => {
            setUrlTouched(true);
            if (urlOk) {
              update("url", normalizeUrl(answers.url));
              setStep(1);
            }
          }}
          nextDisabled={!urlOk}
        >
          <label className={styles.srOnly} htmlFor="scan-url">
            Website-URL
          </label>
          <input
            id="scan-url"
            type="url"
            inputMode="url"
            className={styles.input}
            placeholder="jouwbedrijf.nl"
            value={answers.url}
            autoFocus
            onChange={(e) => update("url", e.target.value)}
            onBlur={() => setUrlTouched(true)}
          />
          {urlTouched && !urlOk && answers.url !== "" && (
            <p className={styles.error}>Vul een geldig webadres in.</p>
          )}
          <button
            type="button"
            className={styles.textLink}
            onClick={() => {
              const next = { ...answers, geenWebsite: true };
              setAnswers(next);
              persistAndGo(next);
            }}
          >
            Ik heb nog geen website
          </button>
        </Step>
      )}

      {step === 1 && (
        <Step
          title="In welke branche zit je?"
          onBack={() => setStep(0)}
          onNext={() => setStep(2)}
          nextDisabled={
            !answers.branche ||
            (answers.branche === "Anders" && !answers.brancheAnders.trim())
          }
        >
          <div className={styles.options}>
            {brancheOpties.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`${styles.option} ${
                  answers.branche === o.value ? styles.optionActive : ""
                }`}
                onClick={() => update("branche", o.value as Branche)}
              >
                {o.label}
              </button>
            ))}
          </div>
          {answers.branche === "Anders" && (
            <input
              type="text"
              className={styles.input}
              placeholder="Vertel kort wat je doet"
              value={answers.brancheAnders}
              onChange={(e) => update("brancheAnders", e.target.value)}
            />
          )}
        </Step>
      )}

      {step === 2 && (
        <Step
          title="Wie is je ideale klant?"
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
          nextDisabled={!answers.idealeKlant.trim()}
        >
          <textarea
            className={styles.textarea}
            maxLength={200}
            rows={3}
            autoFocus
            placeholder="Bijv. drukke moeders van 30–45 in Rotterdam die thuis willen sporten"
            value={answers.idealeKlant}
            onChange={(e) => update("idealeKlant", e.target.value)}
          />
          <span className={styles.counter}>{answers.idealeKlant.length}/200</span>
        </Step>
      )}

      {step === 3 && (
        <Step
          title="Doel, timing en budget"
          onBack={() => setStep(2)}
          onNext={startAnalyse}
          nextLabel="Start de scan"
          nextDisabled={!answers.doel || !answers.timing || !answers.budget}
        >
          <Group
            label="Wat moet je website vooral opleveren?"
            options={doelOpties}
            value={answers.doel}
            onSelect={(v) => update("doel", v)}
          />
          <Group
            label="Wanneer wil je hiermee aan de slag?"
            options={timingOpties}
            value={answers.timing}
            onSelect={(v) => update("timing", v)}
          />
          <Group
            label="Welk budget heb je ongeveer voor je website?"
            options={budgetOpties}
            value={answers.budget}
            onSelect={(v) => update("budget", v)}
          />
        </Step>
      )}

      {step === 4 && (
        <AnalyseStep onDone={() => persistAndGo(answers)} />
      )}
    </div>
  );
}

function Step({
  title,
  children,
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Volgende",
}: {
  title: string;
  children: React.ReactNode;
  onBack: (() => void) | null;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className={styles.step}>
      <h2 className={styles.stepTitle}>{title}</h2>
      <div className={styles.stepBody}>{children}</div>
      <div className={styles.stepNav}>
        {onBack ? (
          <button type="button" className={styles.back} onClick={onBack}>
            Terug
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          className={styles.next}
          onClick={onNext}
          disabled={nextDisabled}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

function Group({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.groupLabel}>{label}</legend>
      <div className={styles.options}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className={`${styles.option} ${
              value === o ? styles.optionActive : ""
            }`}
            onClick={() => onSelect(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function AnalyseStep({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(0);
  const calledRef = useRef(false);

  useEffect(() => {
    // Fase 1: gesimuleerde voortgang. In fase 2 wordt elke check gekoppeld aan
    // een echte backend-stap (screenshot, data verzamelen, AI-analyse).
    const timers: ReturnType<typeof setTimeout>[] = [];
    scanChecks.forEach((_, i) => {
      timers.push(setTimeout(() => setDone(i + 1), 650 * (i + 1)));
    });
    timers.push(
      setTimeout(() => {
        if (!calledRef.current) {
          calledRef.current = true;
          onDone();
        }
      }, 650 * scanChecks.length + 800)
    );
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className={styles.analyse}>
      <h2 className={styles.stepTitle}>We bekijken je website</h2>
      <p className={styles.analyseLead}>
        Dit duurt een halve minuut. We lopen je homepage door als je klant.
      </p>
      <ul className={styles.checks}>
        {scanChecks.map((c, i) => {
          const state = i < done ? "done" : i === done ? "active" : "todo";
          return (
            <li
              key={c}
              className={`${styles.check} ${
                state === "done"
                  ? styles.checkDone
                  : state === "active"
                  ? styles.checkActive
                  : ""
              }`}
            >
              <span className={styles.checkMark} aria-hidden>
                {state === "done" ? "✓" : ""}
              </span>
              {c}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
