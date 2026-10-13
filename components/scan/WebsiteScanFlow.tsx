"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CALENDLY } from "@/lib/site";
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
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ScanAnswers>(emptyAnswers);
  const [urlTouched, setUrlTouched] = useState(false);

  function update<K extends keyof ScanAnswers>(key: K, value: ScanAnswers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  const urlOk = isValidUrl(answers.url);
  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  return (
    <div className={styles.flow}>
      {step !== 4 && (
        <>
          <div className={styles.progressHead}>
            <span className={styles.progressLabel}>
              Stap {step + 1}/{TOTAL_STEPS - 1}
            </span>
            <span className={styles.progressPct}>{progress}%</span>
          </div>
          <div className={styles.progressTrack} aria-hidden>
            <span
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}

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
              setAnswers((a) => ({ ...a, geenWebsite: true }));
              setStep(4);
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
          onNext={() => setStep(4)}
          nextLabel="Start de scan"
          nextDisabled={
            answers.doel.length === 0 || !answers.timing || !answers.budget
          }
        >
          <MultiGroup
            label="Wat moet je website vooral opleveren?"
            hint="Meerdere mogelijk"
            options={doelOpties}
            selected={answers.doel}
            onToggle={(v) =>
              update(
                "doel",
                answers.doel.includes(v)
                  ? answers.doel.filter((x) => x !== v)
                  : [...answers.doel, v]
              )
            }
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

      {step === 4 && <AnalyseStep answers={answers} onBack={() => setStep(0)} />}
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

function MultiGroup({
  label,
  hint,
  options,
  selected,
  onToggle,
}: {
  label: string;
  hint?: string;
  options: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.groupLabel}>
        {label}
        {hint && <span className={styles.groupHint}>{hint}</span>}
      </legend>
      <div className={styles.options}>
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              className={`${styles.option} ${on ? styles.optionActive : ""}`}
              onClick={() => onToggle(o)}
            >
              <span className={styles.optionCheck} aria-hidden>
                {on ? "✓" : ""}
              </span>
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function AnalyseStep({
  answers,
  onBack,
}: {
  answers: ScanAnswers;
  onBack: () => void;
}) {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    let finished = false;
    const fail = () => {
      if (!finished) {
        finished = true;
        setError("We konden je website niet goed bekijken.");
      }
    };
    const timeout = setTimeout(fail, 150000);

    (async () => {
      try {
        const res = await fetch("/api/website-scan/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });
        if (!res.body) throw new Error("no stream");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";
        for (;;) {
          const { value, done: rdone } = await reader.read();
          if (rdone) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            const ev = JSON.parse(line) as {
              type: string;
              step?: number;
              id?: string;
              message?: string;
            };
            if (ev.type === "step" && typeof ev.step === "number") {
              setActive((a) => Math.max(a, ev.step as number));
            } else if (ev.type === "done" && ev.id) {
              finished = true;
              clearTimeout(timeout);
              router.push(`/website-scan/resultaat/${ev.id}`);
              return;
            } else if (ev.type === "error") {
              finished = true;
              clearTimeout(timeout);
              setError(ev.message ?? "We konden je website niet goed bekijken.");
              return;
            }
          }
        }
        // Stream eindigde zonder done/error → toch een nette melding.
        fail();
      } catch {
        fail();
      } finally {
        clearTimeout(timeout);
      }
    })();

    return () => clearTimeout(timeout);
  }, [answers, router]);

  if (error) {
    return (
      <div className={styles.loading}>
        <h2 className={styles.loadingTitle}>Dat lukte niet helemaal</h2>
        <p className={styles.loadingSub}>
          {error} Plan een gesprek, dan kijk ik er zelf naar.
        </p>
        <div className={styles.stepNav}>
          <button type="button" className={styles.back} onClick={onBack}>
            Opnieuw proberen
          </button>
          <a className={styles.next} href={CALENDLY}>
            Plan een gesprek
          </a>
        </div>
      </div>
    );
  }

  const label = scanChecks[Math.min(active, scanChecks.length - 1)];
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} aria-hidden />
      <h2 className={styles.loadingTitle}>We bekijken je website</h2>
      <p key={label} className={styles.loadingText}>
        {label}…
      </p>
      <p className={styles.loadingSub}>Dit duurt ongeveer een halve minuut.</p>
    </div>
  );
}
