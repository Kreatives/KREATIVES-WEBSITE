"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { SCAN_BOOKING } from "@/lib/scan";
import type { ScanAnswers, ScanReport, Verdict } from "@/lib/scan";
import styles from "./scan.module.css";

// Fase 2: echte uitlegvideo. Leeg = het videoblok verschijnt niet.
const VIDEO_URL = "";

const VERDICT_KOP: Record<Verdict, string> = {
  nee: "Je klant haakt af voordat hij contact opneemt",
  twijfelachtig: "Je klant twijfelt, en twijfel kost je aanvragen",
  ja: "Je klant is overtuigd, nu nog sterker",
};

const AFHAAK_LABEL: Record<string, string> = {
  blijft: "Blijft",
  twijfelt: "Twijfelt",
  "haakt af": "Haakt af",
};

const MATCH_LABEL: Record<string, string> = {
  goed: "Goed",
  deels: "Deels",
  slecht: "Zwak",
};
const MATCH_FRACTION: Record<string, number> = {
  goed: 1,
  deels: 0.6,
  slecht: 0.32,
};
const MATCH_COLOR: Record<string, string> = {
  goed: "#1d7a46",
  deels: "#d07a12",
  slecht: "#c0392b",
};

function scoreColor(score: number): string {
  if (score >= 70) return "#1d7a46";
  if (score >= 45) return "var(--orange)";
  return "#c0392b";
}

export type ScanResultProps = {
  id: string;
  geenWebsite: boolean;
  answers: ScanAnswers;
  report: ScanReport | null;
};

export default function ScanResult({
  id,
  geenWebsite,
  answers,
  report,
}: ScanResultProps) {
  if (geenWebsite) return <GeenWebsite answers={answers} />;
  if (!report) return <NietGelukt />;
  return <Report id={id} report={report} answers={answers} />;
}

/* ---------- Herbruikbare bouwstenen ---------- */

function Ring({
  fraction,
  color,
  size = 160,
  children,
}: {
  fraction: number;
  color: string;
  size?: number;
  children: React.ReactNode;
}) {
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <div className={styles.ring} style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className={styles.ringSvg} aria-hidden>
        <circle className={styles.ringTrack} cx="60" cy="60" r={r} />
        <circle
          className={styles.ringArc}
          cx="60"
          cy="60"
          r={r}
          style={{
            stroke: color,
            strokeDasharray: c,
            strokeDashoffset: c * (1 - Math.max(0, Math.min(1, fraction))),
          }}
        />
      </svg>
      <div className={styles.ringCenter}>{children}</div>
    </div>
  );
}

function SectionHead({
  icon,
  eyebrow,
  title,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className={styles.secHead}>
      <span className={styles.secIcon} aria-hidden>
        {icon}
      </span>
      <div>
        <span className={styles.secEyebrow}>{eyebrow}</span>
        <h2 className={styles.secTitle}>{title}</h2>
      </div>
    </div>
  );
}

/* ---------- Icoontjes ---------- */

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}
const IconTarget = () => (
  <Svg>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </Svg>
);
const IconGauge = () => (
  <Svg>
    <path d="M4 15a8 8 0 0 1 16 0" />
    <path d="m12 15 4-4" />
    <circle cx="12" cy="15" r="1" fill="currentColor" />
  </Svg>
);
const IconAlert = () => (
  <Svg>
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 10v4" />
    <circle cx="12" cy="17" r="0.6" fill="currentColor" />
  </Svg>
);
const IconEye = () => (
  <Svg>
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
    <circle cx="12" cy="12" r="2.5" />
  </Svg>
);
const IconLayers = () => (
  <Svg>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 14 9 5 9-5" />
  </Svg>
);
const IconSpark = () => (
  <Svg>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
  </Svg>
);
const IconCheck = () => (
  <Svg>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);
const IconArrowDown = () => (
  <Svg>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Svg>
);

/* ---------- Volledig rapport ---------- */

function Report({
  id,
  report,
  answers,
}: {
  id: string;
  report: ScanReport;
  answers: ScanAnswers;
}) {
  const coldLead =
    answers.timing === "Ik oriënteer me nog" || answers.budget === "Onder €1.500";

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroPill}>{report.domein}</span>
          <span className={styles.heroEyebrow}>Jouw website-diagnose</span>
          <h1 className={styles.heroKop}>
            {VERDICT_KOP[report.eindoordeel.zouActieOndernemen]}
          </h1>
          <p className={styles.heroLead}>{report.eindoordeel.uitleg}</p>
          <a href="#diagnose" className={styles.scrollDown} aria-label="Lees verder">
            <IconArrowDown />
          </a>
        </div>
      </section>

      <div className={styles.body} id="diagnose">
        {/* Doelgroep */}
        <section className={styles.block}>
          <SectionHead
            icon={<IconTarget />}
            eyebrow="Doelgroep"
            title="Spreekt je site de juiste klant aan?"
          />
          <div className={styles.doelCards}>
            <article className={`${styles.card} ${styles.cardMuted}`}>
              <span className={styles.cardTag}>Jouw input</span>
              <span className={styles.cardLabel}>Wie jij wilt aanspreken</span>
              <p>{report.doelgroep.opgegeven}</p>
            </article>
            <article className={styles.card}>
              <span className={`${styles.cardTag} ${styles.cardTagAccent}`}>
                Wat ik zie
              </span>
              <span className={styles.cardLabel}>
                Wat je huidige website uitstraalt
              </span>
              <p>{report.doelgroep.watDeSiteUitstraalt}</p>
            </article>
          </div>
          <div className={styles.matchGauge}>
            <Ring
              fraction={MATCH_FRACTION[report.doelgroep.match]}
              color={MATCH_COLOR[report.doelgroep.match]}
            >
              <span className={styles.ringSmall}>Match</span>
              <span
                className={styles.ringBig}
                style={{ color: MATCH_COLOR[report.doelgroep.match] }}
              >
                {MATCH_LABEL[report.doelgroep.match]}
              </span>
            </Ring>
            <p className={styles.matchText}>{report.doelgroep.toelichting}</p>
          </div>
        </section>

        {/* Score */}
        <section className={styles.block}>
          <SectionHead
            icon={<IconGauge />}
            eyebrow="Overtuigingsscore"
            title="Zo overtuigend is je site nu"
          />
          <div className={styles.scoreGrid}>
            <div className={styles.scoreRingWrap}>
              <Ring
                fraction={report.totaalscore / 100}
                color={scoreColor(report.totaalscore)}
                size={184}
              >
                <span className={styles.ringScore}>{report.totaalscore}</span>
                <span className={styles.ringSmall}>/ 100</span>
              </Ring>
              <p className={styles.scoreLead}>
                Verdeeld over de zes punten die bepalen of je ideale klant
                contact opneemt.
              </p>
            </div>
            <ul className={styles.bars}>
              {report.categorieen.map((c) => (
                <li key={c.naam} className={styles.bar}>
                  <div className={styles.barTop}>
                    <span className={styles.barName}>{c.naam}</span>
                    <span className={styles.barScore}>{c.score}/10</span>
                  </div>
                  <div className={styles.barTrack} aria-hidden>
                    <span
                      className={styles.barFill}
                      style={{
                        width: `${c.score * 10}%`,
                        background: scoreColor(c.score * 10),
                      }}
                    />
                  </div>
                  <p className={styles.barObs}>{c.observatie}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pijnpunten */}
        <section className={styles.block}>
          <SectionHead
            icon={<IconAlert />}
            eyebrow="Pijnpunten"
            title="Wat je nu de meeste aanvragen kost"
          />
          <div className={styles.pijnGrid}>
            {report.topPijnpunten.map((p, i) => (
              <Pijnpunt key={p.titel} p={p} index={i + 1} />
            ))}
          </div>
        </section>

        {/* Door de ogen van je klant */}
        <section className={styles.block}>
          <SectionHead
            icon={<IconEye />}
            eyebrow="Door de ogen van je klant"
            title="Wat je bezoeker denkt, sectie voor sectie"
          />
          <ol className={styles.timeline}>
            {report.doorDeOgenVanJeKlant.map((s, i) => (
              <li key={i} className={styles.tItem}>
                <span
                  className={`${styles.tDot} ${styles[`dot_${s.blijftOfHaaktAf.replace(" ", "")}`]}`}
                  aria-hidden
                />
                <div>
                  <div className={styles.tHead}>
                    <span className={styles.tSectie}>{s.sectie}</span>
                    <span
                      className={`${styles.tBadge} ${styles[`badge_${s.blijftOfHaaktAf.replace(" ", "")}`]}`}
                    >
                      {AFHAAK_LABEL[s.blijftOfHaaktAf]}
                    </span>
                  </div>
                  <p className={styles.tDenkt}>“{s.watDeKlantDenkt}”</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Mist + opbouw */}
        <section className={styles.block}>
          <SectionHead
            icon={<IconLayers />}
            eyebrow="Opbouw"
            title="Wat ontbreekt en hoe de pagina beter loopt"
          />
          <div className={styles.twoCol}>
            <div className={styles.card}>
              <span className={styles.cardLabel}>Wat deze doelgroep mist</span>
              <ul className={styles.list}>
                {report.ontbrekendeElementen.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
            <div className={styles.card}>
              <span className={styles.cardLabel}>Voorgestelde opbouw</span>
              <ol className={styles.orderedList}>
                {report.voorgesteldeOpbouw.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Nieuwe kop */}
        <section className={styles.block}>
          <SectionHead
            icon={<IconSpark />}
            eyebrow="Je nieuwe kop"
            title="Een eerste zin die wél blijft hangen"
          />
          <div className={styles.koppen}>
            <div className={styles.kopOud}>
              <span className={styles.cardLabel}>Nu</span>
              <p>“{report.nieuweKop.huidigeKop}”</p>
            </div>
            <div className={styles.kopNieuw}>
              <span className={styles.cardLabel}>Voorstel</span>
              <p className={styles.kopNieuwText}>
                “{report.nieuweKop.voorgesteldeKop}”
              </p>
              <p className={styles.kopSub}>{report.nieuweKop.voorgesteldeSubkop}</p>
            </div>
          </div>
        </section>

        {/* Wat goed gaat */}
        <section className={styles.block}>
          <SectionHead
            icon={<IconCheck />}
            eyebrow="Sterke punten"
            title="Wat al voor je werkt"
          />
          <ul className={styles.listPlus}>
            {report.watGoedGaat.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>

        <VideoBlok />
        <LeadBlok id={id} answers={answers} />
        <CallBlok coldLead={coldLead} />

        <p className={styles.disclaimer}>
          Deze scan is een automatische eerste analyse. In een gesprek loop ik
          je site live met je door en laat ik zien wat je als eerste moet
          aanpakken.
        </p>
      </div>
    </>
  );
}

function bedrijfUitUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "") || "Onbekend";
  } catch {
    return "Onbekend";
  }
}

// Niet-blokkerende lead-vorm: het resultaat is al zichtbaar. Vraagt alleen
// voornaam + e-mail; het bedrijf leiden we af uit de gescande URL. Hangt op de
// bestaande /api/website-scan/lead (bewaren + Notion + mail naar bezoeker/ons).
function LeadBlok({ id, answers }: { id: string; answers: ScanAnswers }) {
  const [voornaam, setVoornaam] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSend = voornaam.trim().length >= 2 && emailOk && status !== "sending";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/website-scan/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          voornaam: voornaam.trim(),
          email: email.trim(),
          bedrijf: bedrijfUitUrl(answers.url),
          company_url: hp,
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (data?.ok) {
        track("scan_lead");
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <section className={styles.leadBlok}>
        <h2 className={styles.leadTitle}>Je rapport is onderweg</h2>
        <p className={styles.leadBody}>
          We sturen je de volledige analyse per mail. Check ook je spam, voor de
          zekerheid.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.leadBlok}>
      <h2 className={styles.leadTitle}>Dit rapport in je mail?</h2>
      <p className={styles.leadBody}>
        Laat je naam en e-mailadres achter, dan sturen we je de volledige
        analyse na zodat je hem rustig kunt teruglezen.
      </p>
      <form className={styles.leadForm} onSubmit={submit} noValidate>
        <input
          type="text"
          className={styles.leadInput}
          placeholder="Voornaam"
          value={voornaam}
          onChange={(e) => setVoornaam(e.target.value)}
          autoComplete="given-name"
          aria-label="Voornaam"
        />
        <input
          type="email"
          className={styles.leadInput}
          placeholder="E-mailadres"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          aria-label="E-mailadres"
        />
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className={styles.leadHp}
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          aria-hidden
        />
        <button type="submit" className={styles.leadBtn} disabled={!canSend}>
          {status === "sending" ? "Versturen…" : "Stuur me het rapport"}
        </button>
      </form>
      {status === "error" && (
        <p className={styles.leadError}>
          Er ging iets mis. Probeer het zo nog eens.
        </p>
      )}
    </section>
  );
}

function Pijnpunt({
  p,
  index,
}: {
  p: { titel: string; uitleg: string; zelfOplossen: string };
  index: number;
}) {
  return (
    <article className={styles.pijnpunt}>
      <span className={styles.pijnNum}>{String(index).padStart(2, "0")}</span>
      <h3 className={styles.pijnTitel}>{p.titel}</h3>
      <p className={styles.pijnUitleg}>{p.uitleg}</p>
      <p className={styles.pijnZelf}>
        <strong>Zelf oplossen:</strong> {p.zelfOplossen}
      </p>
    </article>
  );
}

function VideoBlok() {
  const [open, setOpen] = useState(false);
  if (!VIDEO_URL) return null;
  return (
    <section className={styles.videoBlok}>
      <button
        type="button"
        className={styles.videoTrigger}
        onClick={() => setOpen(true)}
      >
        <span className={styles.videoThumb} aria-hidden>
          <span className={styles.playIco}>▶</span>
        </span>
        <span>
          <strong>Twijfel je nog? Bekijk mijn korte uitleg</strong>
          <span className={styles.videoSub}>Ricky, oprichter van KREATIVES</span>
        </span>
      </button>
      {open && (
        <div className={styles.modal} role="dialog" aria-modal onClick={() => setOpen(false)}>
          <div className={styles.modalInner} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setOpen(false)}
              aria-label="Sluiten"
            >
              ✕
            </button>
            <video src={VIDEO_URL} controls autoPlay className={styles.modalVideo} />
          </div>
        </div>
      )}
    </section>
  );
}

function CallBlok({ coldLead }: { coldLead: boolean }) {
  return (
    <section className={`${styles.callBlok} ${coldLead ? styles.callCold : ""}`}>
      <div className={styles.callText}>
        <span className={styles.callEyebrow}>Volgende stap</span>
        <h2 className={styles.callTitle}>
          We lopen je site samen door in 30 minuten
        </h2>
        <p className={styles.callLead}>
          Geen verkooppraatje. Ik deel mijn scherm, loop je pagina langs en
          benoem per sectie wat je bezoeker laat afhaken, en wat je als eerste
          aanpakt.
        </p>
      </div>
      <div className={styles.calendly}>
        <iframe
          src={SCAN_BOOKING}
          title="Plan een website-analyse"
          className={styles.calendlyFrame}
          loading="lazy"
        />
      </div>
    </section>
  );
}

function NietGelukt() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>Jouw website-diagnose</span>
          <h1 className={styles.heroKop}>We konden je website niet goed bekijken</h1>
          <p className={styles.heroLead}>
            Soms lukt het automatisch bekijken niet. Plan een gesprek, dan loop
            ik er zelf met je doorheen.
          </p>
        </div>
      </section>
      <div className={styles.body}>
        <CallBlok coldLead={false} />
      </div>
    </>
  );
}

function GeenWebsite({ answers }: { answers: ScanAnswers }) {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroPill}>Nieuw startpunt</span>
          <span className={styles.heroEyebrow}>Jouw website-diagnose</span>
          <h1 className={styles.heroKop}>Je begint met een schone lei</h1>
          <p className={styles.heroLead}>
            Geen oude site om rekening mee te houden. Dat is een voordeel: je
            kunt het meteen goed opbouwen voor{" "}
            {answers.idealeKlant.trim() || "je ideale klant"}.
          </p>
          <a href="#diagnose" className={styles.scrollDown} aria-label="Lees verder">
            <IconArrowDown />
          </a>
        </div>
      </section>

      <div className={styles.body} id="diagnose">
        <section className={styles.block}>
          <SectionHead
            icon={<IconLayers />}
            eyebrow="Fundament"
            title="Waar je straks mee begint"
          />
          <div className={styles.twoCol}>
            <div className={styles.card}>
              <span className={styles.cardLabel}>Wat je klant als eerste wil zien</span>
              <ul className={styles.list}>
                <li>Direct voor wie je het doet en welk resultaat je levert</li>
                <li>Herkenning van het probleem waar hij mee zit</li>
                <li>Eén duidelijke volgende stap</li>
              </ul>
            </div>
            <div className={styles.card}>
              <span className={styles.cardLabel}>Welk bewijs het zwaarst weegt</span>
              <ul className={styles.list}>
                <li>Echte reviews van klanten zoals hij</li>
                <li>Een gezicht: wie krijgt hij aan de lijn</li>
                <li>Concreet werk of resultaten uit de praktijk</li>
              </ul>
            </div>
          </div>
        </section>

        <CallBlok coldLead={false} />

        <p className={styles.disclaimer}>
          Dit is een eerste richting. In een gesprek maken we er samen een
          concreet plan van.
        </p>
      </div>
    </>
  );
}
