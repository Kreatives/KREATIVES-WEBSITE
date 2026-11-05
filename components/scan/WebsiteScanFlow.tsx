"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { SCAN_BOOKING } from "@/lib/scan";
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

const TOTAL_STEPS = 6; // URL, lead, branche, klant, doel/timing/budget, analyse

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

// Antwoorden die te algemeen zijn voor een scherpe analyse. We blokkeren niet,
// maar vragen eerst of de ondernemer wil aanvullen of wil doorgaan.
const GENERIEKE_KLANT = new Set([
  "iedereen",
  "mensen",
  "klanten",
  "bedrijven",
  "consumenten",
  "particulieren",
  "ondernemers",
  "iedereen eigenlijk",
]);

type VaagPunt = { vraag: string; stap: number; reden: string };

function vageAntwoorden(a: ScanAnswers): VaagPunt[] {
  const punten: VaagPunt[] = [];
  const klant = a.idealeKlant.trim().toLowerCase();
  if (klant.length < 15 || GENERIEKE_KLANT.has(klant)) {
    punten.push({
      vraag: "Wie is je ideale klant?",
      stap: 3,
      reden:
        "Dit is nog vrij algemeen. Hoe specifieker (wie, waar, wat speelt er), hoe scherper de analyse wordt.",
    });
  }
  if (a.branche === "Anders" && a.brancheAnders.trim().length < 4) {
    punten.push({
      vraag: "In welke branche zit je?",
      stap: 2,
      reden: "Vertel kort iets concreter wat je doet.",
    });
  }
  return punten;
}

export default function WebsiteScanFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ScanAnswers>(emptyAnswers);
  const [urlTouched, setUrlTouched] = useState(false);
  // Honeypot: voor mensen onzichtbaar, bots vullen hem in. De analyze-route
  // breekt de aanvraag af zodra dit veld gevuld binnenkomt.
  const [hp, setHp] = useState("");
  // Vaag-check: te algemene antwoorden tonen we vóór de scan ter bevestiging.
  const [vaag, setVaag] = useState<VaagPunt[] | null>(null);
  const [vaagBevestigd, setVaagBevestigd] = useState(false);

  // Eigenaar-bypass: /website-scan?vrij=<key> wordt eenmalig onthouden zodat
  // Ricky op dit apparaat onbeperkt kan scannen, los van zijn IP.
  useEffect(() => {
    try {
      const k = new URLSearchParams(window.location.search).get("vrij");
      if (k) localStorage.setItem("scan_owner_key", k);
    } catch {
      /* localStorage niet beschikbaar — negeren */
    }
  }, []);

  function update<K extends keyof ScanAnswers>(key: K, value: ScanAnswers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  const urlOk = isValidUrl(answers.url);
  const naamOk = answers.naam.trim().length >= 2;
  const whatsappDigits = answers.whatsapp.replace(/\D/g, "");
  const whatsappOk = whatsappDigits.length >= 8 && whatsappDigits.length <= 15;
  const progress = Math.round(((step + 1) / (TOTAL_STEPS - 1)) * 100);

  return (
    <div className={styles.flow}>
      {step !== 5 && (
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
            // Wie eerder "nog geen website" koos en terugkwam, mag zonder URL door.
            if (urlOk || answers.geenWebsite) {
              if (urlOk) update("url", normalizeUrl(answers.url));
              trackEvent("scan_start");
              setStep(1);
            }
          }}
          nextDisabled={!urlOk && !answers.geenWebsite}
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
            onChange={(e) => {
              update("url", e.target.value);
              if (e.target.value) update("geenWebsite", false);
            }}
            onBlur={() => setUrlTouched(true)}
          />
          {urlTouched && !urlOk && answers.url !== "" && (
            <p className={styles.error}>Vul een geldig webadres in.</p>
          )}
          <input
            type="text"
            className={styles.srOnly}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
          <button
            type="button"
            className={styles.textLink}
            onClick={() => {
              update("geenWebsite", true);
              setStep(1);
            }}
          >
            Ik heb nog geen website
          </button>
        </Step>
      )}

      {step === 1 && (
        <Step
          title="Waar mag ik je uitkomsten naartoe sturen?"
          onBack={() => setStep(0)}
          onNext={() => {
            if (naamOk && whatsappOk) setStep(2);
          }}
          nextDisabled={!naamOk || !whatsappOk}
        >
          <label className={styles.srOnly} htmlFor="scan-naam">
            Je naam
          </label>
          <input
            id="scan-naam"
            type="text"
            className={styles.input}
            placeholder="Je naam"
            value={answers.naam}
            autoFocus
            autoComplete="name"
            onChange={(e) => update("naam", e.target.value)}
          />
          <label className={styles.srOnly} htmlFor="scan-wa">
            WhatsApp-nummer
          </label>
          <input
            id="scan-wa"
            type="tel"
            inputMode="tel"
            className={styles.input}
            placeholder="WhatsApp-nummer"
            value={answers.whatsapp}
            autoComplete="tel"
            onChange={(e) => update("whatsapp", e.target.value)}
          />
          {answers.whatsapp !== "" && !whatsappOk && (
            <p className={styles.error}>Vul een geldig WhatsApp-nummer in.</p>
          )}
          <p className={styles.fieldHint}>
            Je diagnose verschijnt zo op je scherm. Ik gebruik dit alleen om je
            de uitkomsten te sturen en met je mee te denken.
          </p>
        </Step>
      )}

      {step === 2 && (
        <Step
          title="In welke branche zit je?"
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
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
                aria-pressed={answers.branche === o.value}
                className={`${styles.option} ${
                  answers.branche === o.value ? styles.optionActive : ""
                }`}
                onClick={() => update("branche", o.value as Branche)}
              >
                <span className={styles.optionMain}>{o.label}</span>
                <span className={styles.radio} aria-hidden />
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

      {step === 3 && (
        <Step
          title="Wie is je ideale klant?"
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
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

      {step === 4 && vaag && (
        <VaagCheck
          punten={vaag}
          onAanpassen={() => {
            const terug = Math.min(...vaag.map((p) => p.stap));
            setVaag(null);
            setStep(terug);
          }}
          onDoorgaan={() => {
            setVaag(null);
            setVaagBevestigd(true);
            setStep(5);
          }}
        />
      )}

      {step === 4 && !vaag && (
        <Step
          title="Doel, timing en budget"
          onBack={() => setStep(3)}
          onNext={() => {
            const punten = vageAntwoorden(answers);
            if (punten.length && !vaagBevestigd) {
              setVaag(punten);
              return;
            }
            setStep(5);
          }}
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

      {step === 5 && (
        <AnalyseStep answers={answers} hp={hp} onBack={() => setStep(0)} />
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
            aria-pressed={value === o}
            className={`${styles.option} ${
              value === o ? styles.optionActive : ""
            }`}
            onClick={() => onSelect(o)}
          >
            <span className={styles.optionMain}>{o}</span>
            <span className={styles.radio} aria-hidden />
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
              <span className={styles.optionMain}>
                <span className={styles.optionCheck} aria-hidden>
                  {on ? "✓" : ""}
                </span>
                {o}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function VaagCheck({
  punten,
  onAanpassen,
  onDoorgaan,
}: {
  punten: VaagPunt[];
  onAanpassen: () => void;
  onDoorgaan: () => void;
}) {
  return (
    <div className={styles.step}>
      <h2 className={styles.stepTitle}>Even checken voor ik begin</h2>
      <div className={styles.stepBody}>
        <p className={styles.loadingSub}>
          Een paar antwoorden zijn nog wat algemeen. Je kunt ze aanvullen voor
          een scherpere analyse, of doorgaan met wat je nu hebt ingevuld.
        </p>
        <ul className={styles.list}>
          {punten.map((p) => (
            <li key={p.vraag}>
              <strong>{p.vraag}</strong> — {p.reden}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.stepNav}>
        <button type="button" className={styles.back} onClick={onAanpassen}>
          Antwoorden aanpassen
        </button>
        <button type="button" className={styles.next} onClick={onDoorgaan}>
          Ga verder met deze antwoorden
        </button>
      </div>
    </div>
  );
}

function AnalyseStep({
  answers,
  hp,
  onBack,
}: {
  answers: ScanAnswers;
  hp: string;
  onBack: () => void;
}) {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [error, setError] = useState<string | null>(null);
  // Ophogen laat het effect hieronder opnieuw lopen, zodat "Opnieuw proberen"
  // echt een nieuwe analyse start in plaats van terug te springen naar stap 1.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let finished = false;
    const fail = () => {
      if (!finished) {
        finished = true;
        setError("We konden je website niet goed bekijken.");
      }
    };
    const timeout = setTimeout(fail, 180000);

    (async () => {
      try {
        let ownerKey = "";
        try {
          ownerKey = localStorage.getItem("scan_owner_key") ?? "";
        } catch {
          /* negeren */
        }
        const res = await fetch("/api/website-scan/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...answers,
            company_url: hp,
            bypass_key: ownerKey,
          }),
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
              trackEvent("scan_complete");
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
  }, [answers, router, attempt, hp]);

  if (error) {
    return (
      <div className={styles.loading}>
        <h2 className={styles.loadingTitle}>Dat lukte niet helemaal</h2>
        <p className={styles.loadingSub}>
          {error} Plan een gesprek, dan kijk ik er zelf naar.
        </p>
        <div className={styles.stepNav}>
          <button
            type="button"
            className={styles.back}
            onClick={() => {
              setError(null);
              setActive(0);
              setAttempt((a) => a + 1);
            }}
          >
            Opnieuw proberen
          </button>
          <a className={styles.next} href={SCAN_BOOKING}>
            Plan een gesprek
          </a>
        </div>
        <button
          type="button"
          className={styles.textLink}
          style={{ marginTop: "1rem" }}
          onClick={onBack}
        >
          Antwoorden aanpassen
        </button>
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
