"use client";

import { useEffect, useMemo, useState } from "react";
import { CALENDLY } from "@/lib/site";
import {
  emptyAnswers,
  getMockReport,
  type ScanAnswers,
  type ScanReport,
  type Verdict,
} from "@/lib/scan";
import styles from "./scan.module.css";

const STORAGE_KEY = "kreatives-scan";
// Fase 2: echte uitlegvideo. Leeg = knop toont een nette melding.
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

export default function ScanResult() {
  const [answers, setAnswers] = useState<ScanAnswers>(emptyAnswers);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers({ ...emptyAnswers, ...JSON.parse(raw) });
    } catch {
      // geen opgeslagen antwoorden → mock met standaardwaarden
    }
    setLoaded(true);
  }, []);

  const report = useMemo(() => getMockReport(answers), [answers]);

  if (!loaded) return null;
  if (answers.geenWebsite) return <GeenWebsite answers={answers} />;
  return <Report report={report} answers={answers} />;
}

function Report({
  report,
  answers,
}: {
  report: ScanReport;
  answers: ScanAnswers;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const coldLead =
    answers.timing === "Ik oriënteer me nog" || answers.budget === "Onder €1.500";

  return (
    <div className={styles.result}>
      <header className={styles.resultHead}>
        <span className="eyebrow">Jouw website-diagnose</span>
        <span className={styles.domein}>{report.domein}</span>
        <h1 className={styles.verdictKop}>
          {VERDICT_KOP[report.eindoordeel.zouActieOndernemen]}
        </h1>
        <p className={styles.verdictUitleg}>{report.eindoordeel.uitleg}</p>
      </header>

      {/* Doelgroep */}
      <section className={styles.block}>
        <div className={styles.doelgroep}>
          <div className={styles.doelgroepCol}>
            <span className={styles.miniLabel}>Voor wie jij het maakt</span>
            <p>{report.doelgroep.opgegeven}</p>
          </div>
          <div className={styles.doelgroepCol}>
            <span className={styles.miniLabel}>
              Voor wie je website lijkt te maken
            </span>
            <p>{report.doelgroep.watDeSiteUitstraalt}</p>
          </div>
        </div>
        <p className={styles.matchLine}>
          <span className={`${styles.matchBadge} ${styles[`match_${report.doelgroep.match}`]}`}>
            Match: {report.doelgroep.match}
          </span>
          {report.doelgroep.toelichting}
        </p>
      </section>

      {/* Totaalscore + categorieën */}
      <section className={styles.block}>
        <div className={styles.scoreHead}>
          <div className={styles.scoreNum}>
            {report.totaalscore}
            <span>/100</span>
          </div>
          <p className={styles.scoreLead}>
            Zo overtuigend is je homepage nu voor je ideale klant, verdeeld over
            zes punten.
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
                  style={{ width: `${c.score * 10}%` }}
                />
              </div>
              <p className={styles.barObs}>{c.observatie}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Pijnpunt 1 (altijd zichtbaar) */}
      <section className={styles.block}>
        <span className="eyebrow">Je grootste pijnpunt</span>
        <Pijnpunt p={report.topPijnpunten[0]} index={1} />
      </section>

      {/* Gate */}
      {!unlocked ? (
        <GateForm onUnlock={() => setUnlocked(true)} />
      ) : (
        <>
          <section className={styles.block}>
            <span className="eyebrow">Nog twee pijnpunten</span>
            {report.topPijnpunten.slice(1).map((p, i) => (
              <Pijnpunt key={p.titel} p={p} index={i + 2} />
            ))}
          </section>

          <section className={styles.block}>
            <span className="eyebrow">Door de ogen van je klant</span>
            <h2 className={styles.blockTitle}>
              Wat je klant denkt, sectie voor sectie
            </h2>
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

          <section className={styles.block}>
            <div className={styles.twoCol}>
              <div>
                <span className="eyebrow">Wat deze doelgroep mist</span>
                <ul className={styles.list}>
                  {report.ontbrekendeElementen.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="eyebrow">Voorgestelde opbouw</span>
                <ol className={styles.orderedList}>
                  {report.voorgesteldeOpbouw.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section className={styles.block}>
            <span className="eyebrow">Een sterkere kop</span>
            <div className={styles.koppen}>
              <div className={styles.kopOud}>
                <span className={styles.miniLabel}>Nu</span>
                <p>“{report.nieuweKop.huidigeKop}”</p>
              </div>
              <div className={styles.kopNieuw}>
                <span className={styles.miniLabel}>Voorstel</span>
                <p className={styles.kopNieuwText}>
                  “{report.nieuweKop.voorgesteldeKop}”
                </p>
                <p className={styles.kopSub}>
                  {report.nieuweKop.voorgesteldeSubkop}
                </p>
              </div>
            </div>
          </section>

          <section className={styles.block}>
            <span className="eyebrow">Wat al goed werkt</span>
            <ul className={styles.listPlus}>
              {report.watGoedGaat.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      <VideoBlok />
      <CallBlok coldLead={coldLead} />

      <p className={styles.disclaimer}>
        Deze scan is een automatische eerste analyse. In een gesprek kijk ik er
        zelf naar.
      </p>
    </div>
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
      <span className={styles.pijnNum}>{index}</span>
      <div>
        <h3 className={styles.pijnTitel}>{p.titel}</h3>
        <p className={styles.pijnUitleg}>{p.uitleg}</p>
        <p className={styles.pijnZelf}>
          <strong>Zelf oplossen:</strong> {p.zelfOplossen}
        </p>
      </div>
    </article>
  );
}

function GateForm({ onUnlock }: { onUnlock: () => void }) {
  const [sending, setSending] = useState(false);
  return (
    <section className={styles.gate}>
      <div className={styles.gatePreview} aria-hidden>
        <div className={styles.gateBlur} />
      </div>
      <form
        className={styles.gateCard}
        onSubmit={(e) => {
          e.preventDefault();
          setSending(true);
          // Fase 2: lead opslaan + rapport mailen. Fase 1: direct ontgrendelen.
          setTimeout(onUnlock, 300);
        }}
      >
        <h2 className={styles.gateTitle}>Ontvang je volledige rapport</h2>
        <p className={styles.gateLead}>
          De overige pijnpunten, de walkthrough per sectie en je nieuwe kop.
          Direct op deze pagina en in je mail.
        </p>
        {/* Honeypot tegen bots */}
        <input
          type="text"
          name="company_url"
          tabIndex={-1}
          autoComplete="off"
          className={styles.hp}
          aria-hidden
        />
        <div className={styles.gateFields}>
          <input className={styles.input} placeholder="Voornaam" required />
          <input
            className={styles.input}
            type="email"
            placeholder="E-mailadres"
            required
          />
          <input
            className={styles.input}
            placeholder="Bedrijfsnaam"
            required
          />
          <input
            className={styles.input}
            type="tel"
            placeholder="Telefoon (optioneel)"
          />
        </div>
        <button className={styles.next} type="submit" disabled={sending}>
          {sending ? "Moment…" : "Toon mijn volledige rapport"}
        </button>
      </form>
    </section>
  );
}

function VideoBlok() {
  const [open, setOpen] = useState(false);
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
        <div
          className={styles.modal}
          role="dialog"
          aria-modal
          onClick={() => setOpen(false)}
        >
          <div className={styles.modalInner} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setOpen(false)}
              aria-label="Sluiten"
            >
              ✕
            </button>
            {VIDEO_URL ? (
              <video src={VIDEO_URL} controls autoPlay className={styles.modalVideo} />
            ) : (
              <p className={styles.modalNote}>De uitlegvideo volgt binnenkort.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function CallBlok({ coldLead }: { coldLead: boolean }) {
  return (
    <section className={`${styles.callBlok} ${coldLead ? styles.callCold : ""}`}>
      <h2 className={styles.callTitle}>
        Plan een gratis gesprek van 30 minuten
      </h2>
      <p className={styles.callLead}>
        We lopen je scan samen door en ik laat zien wat je als eerste moet
        aanpakken.
      </p>
      <div className={styles.calendly}>
        <iframe
          src={CALENDLY}
          title="Plan een gesprek"
          className={styles.calendlyFrame}
          loading="lazy"
        />
      </div>
    </section>
  );
}

function GeenWebsite({ answers }: { answers: ScanAnswers }) {
  return (
    <div className={styles.result}>
      <header className={styles.resultHead}>
        <span className="eyebrow">Jouw startpunt</span>
        <h1 className={styles.verdictKop}>Je begint met een schone lei</h1>
        <p className={styles.verdictUitleg}>
          Geen oude site om rekening mee te houden. Dat is een voordeel: je kunt
          het meteen goed opbouwen voor{" "}
          {answers.idealeKlant.trim() || "je ideale klant"}.
        </p>
      </header>

      <section className={styles.block}>
        <div className={styles.twoCol}>
          <div>
            <span className="eyebrow">Wat je klant als eerste wil zien</span>
            <ul className={styles.list}>
              <li>Direct voor wie je het doet en welk resultaat je levert</li>
              <li>Herkenning van het probleem waar hij mee zit</li>
              <li>Eén duidelijke volgende stap</li>
            </ul>
          </div>
          <div>
            <span className="eyebrow">Welk bewijs het zwaarst weegt</span>
            <ul className={styles.list}>
              <li>Echte reviews van klanten zoals hij</li>
              <li>Een gezicht: wie krijgt hij aan de lijn</li>
              <li>Concreet werk of resultaten uit de praktijk</li>
            </ul>
          </div>
        </div>
      </section>

      <VideoBlok />
      <CallBlok coldLead={false} />

      <p className={styles.disclaimer}>
        Dit is een eerste richting. In een gesprek maken we er een concreet plan
        van.
      </p>
    </div>
  );
}
