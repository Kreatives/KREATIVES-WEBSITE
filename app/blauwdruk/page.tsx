import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import BlueprintForm from "@/components/blauwdruk/BlueprintForm";
import { getReviews, initialsOf } from "@/lib/cms";
import styles from "@/components/blauwdruk/Blueprint.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gratis blauwdruk voor jouw website",
  description:
    "Ontvang een gratis blauwdruk: een concrete structuur voor jouw website — welke pagina's je nodig hebt en wat er op elke pagina moet staan. Binnen 48 uur in je inbox.",
};

const HERKENNING = [
  "Je concurrent heeft een site die er gewoon scherper uitziet, terwijl jij het betere werk levert.",
  "Je weet niet of je vijf pagina's nodig hebt of tien, en wat er eigenlijk op elke pagina moet staan.",
  "Elke keer als je ernaar kijkt weet je: dit klopt nog niet. Maar je weet niet waar je moet beginnen.",
  "Je hebt offertes aangevraagd, maar die kwamen terug met een bedrag waar je niet blij van werd, zonder dat je wist wat je precies zou krijgen.",
];

const WAT_JE_KRIJGT = [
  {
    title: "Inspiratiebeelden op maat",
    body:
      "Stijlreferenties die passen bij jouw branche en de uitstraling die je wil uitstralen. Zodat je niet zelf uren op Pinterest hoeft te zoeken.",
  },
  {
    title: "Een homepage-structuur voor jouw type bedrijf",
    body:
      "Welke secties je nodig hebt, in welke volgorde, en waarom. Opgebouwd rond wat jouw bezoeker moet doen als hij op de site landt.",
  },
  {
    title: "Een overzicht van de pagina's die je nodig hebt",
    body:
      "Voor jouw branche en jouw doel. Zodat je weet of je vijf pagina's bouwt of tien, en wat het verschil maakt.",
  },
  {
    title: "Toelichting per sectie",
    body:
      "Wat hoort er op elke pagina, wat mag je weglaten, en wat zien we te vaak misgaan bij dit type site.",
  },
];

const BRANCHES = [
  "Kliniek of behandelcentrum",
  "Coach of trainer",
  "E-commerce merk",
  "Groothandel of leverancier",
  "Creatief bureau of studio",
  "Restaurant of horecabedrijf",
];

const STAPPEN = [
  {
    title: "Vul het korte formulier in",
    body:
      "Je geeft aan wat voor bedrijf je hebt, wat de uitstraling moet zijn en wat je met de site wil bereiken. Duurt twee minuten.",
  },
  {
    title: "Wij stellen de blauwdruk samen",
    body:
      "Op basis van jouw antwoorden bouwen we een concrete structuur voor jouw website. Geen generiek template, maar afgestemd op jouw type bedrijf.",
  },
  {
    title: "Je ontvangt het document binnen 48 uur",
    body:
      "Gratis, in je inbox, zonder verplichtingen. Je beslist daarna zelf wat je ermee doet.",
  },
];

export default async function BlauwdrukPage() {
  const reviews = (await getReviews()).slice(0, 3);

  return (
    <main>
      {/* 01 — Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <span className={styles.micro}>
              <span className={styles.dot} aria-hidden />
              Gratis blauwdruk · binnen 2 minuten aangevraagd
            </span>
            <h1 className={styles.heroTitle}>
              Je weet dat je website beter kan.{" "}
              <span className="accent accent--orange">
                Je weet alleen niet precies hoe.
              </span>
            </h1>
            <p className={styles.heroSub}>
              Vul het korte formulier in en ontvang een gratis blauwdruk: een
              concrete structuur voor jouw website, inclusief welke pagina&apos;s
              je nodig hebt en wat er op elke pagina moet staan.
            </p>
            <Button variant="primary" href="#aanvragen">
              Ontvang jouw blauwdruk gratis
            </Button>
            <span className={styles.micro}>
              Binnen 48 uur in je inbox. Gratis, geen verplichtingen.
            </span>
          </div>
        </div>
      </section>

      {/* 02 — Herkenning */}
      <section className="section section--alt">
        <div className="container">
          <div className={styles.head}>
            <span className="eyebrow">Herkenbaar?</span>
            <h2 className={styles.kop}>
              Dit hoor je <span className="accent accent--orange">vaker</span> dan
              je denkt.
            </h2>
          </div>
          <div className={styles.recoGrid}>
            {HERKENNING.map((t) => (
              <div key={t} className={styles.recoItem}>
                {t}
              </div>
            ))}
          </div>
          <p className={styles.closer}>
            De blauwdruk geeft je duidelijkheid, zodat je weet wat je nodig hebt
            — <strong>of je nu met ons verder gaat of niet.</strong>
          </p>
        </div>
      </section>

      {/* 03 — Wat je krijgt */}
      <section className="section">
        <div className="container">
          <div className={styles.head}>
            <span className="eyebrow">Wat je krijgt</span>
            <h2 className={styles.kop}>Wat er in de blauwdruk zit.</h2>
          </div>
          <div className={styles.getGrid}>
            {WAT_JE_KRIJGT.map((item, i) => (
              <div key={item.title} className={styles.getItem}>
                <span className={styles.getNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.getTitle}>{item.title}</h3>
                <p className={styles.getBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Voor wie */}
      <section className="section section--alt">
        <div className="container">
          <div className={styles.whoGrid}>
            <div>
              <div className={styles.head} style={{ marginBottom: "1.25rem" }}>
                <span className="eyebrow">Voor wie</span>
                <h2 className={styles.kop}>Voor wie dit is.</h2>
              </div>
              <p className={styles.whoBody}>
                Dit is voor de ondernemer die serieus is over zijn uitstraling,
                maar nog niet precies weet hoe zijn website eruit moet zien. Je
                hoeft geen technische kennis te hebben. Je hoeft nog geen budget
                vastgesteld te hebben. Je hebt alleen een bedrijf dat beter
                verdient dan de site die er nu staat.
              </p>
            </div>
            <div className={styles.pills}>
              {BRANCHES.map((b) => (
                <span key={b} className={styles.pill}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Zo werkt het */}
      <section className="section">
        <div className="container">
          <div className={styles.head}>
            <span className="eyebrow">Zo werkt het</span>
            <h2 className={styles.kop}>Hoe het werkt.</h2>
          </div>
          <div className={styles.steps}>
            {STAPPEN.map((s, i) => (
              <div key={s.title} className={styles.step}>
                <span className={styles.stepNum}>{i + 1}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Social proof */}
      <section className="section section--dark cosmos-bg">
        <div className="container">
          <div className={`${styles.head} ${styles.headCenter}`}>
            <span className="eyebrow">Wat ondernemers zeggen</span>
            <h2 className={styles.kop} style={{ color: "var(--on-dark)" }}>
              Ondernemers die ons{" "}
              <span className="accent accent--orange">aanraden.</span>
            </h2>
          </div>
          <div className={styles.proofGrid}>
            {reviews.map((r) => (
              <article key={r.id} className={styles.proofCard}>
                <p className={styles.proofQuote}>&ldquo;{r.quote}&rdquo;</p>
                <div className={styles.proofAuthor}>
                  <span
                    className={styles.proofAvatar}
                    style={
                      r.photo
                        ? { backgroundImage: `url(${r.photo})` }
                        : { background: r.color }
                    }
                    aria-hidden
                  >
                    {!r.photo && initialsOf(r.author)}
                  </span>
                  <span>
                    <span className={styles.proofName}>{r.author}</span>
                    {r.company && (
                      <span className={styles.proofRole}> · {r.company}</span>
                    )}
                  </span>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.stat}>
            <strong>100+</strong> websites gebouwd voor ondernemers door heel
            Nederland.
          </p>
        </div>
      </section>

      {/* 07 — Over KREATIVES */}
      <section className="section">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutPhoto}>
              <Image
                src="/team/ricky.webp"
                alt="Ricky van KREATIVES"
                fill
                sizes="(max-width: 860px) 22rem, 30vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.aboutText}>
              <div className={styles.head} style={{ marginBottom: 0 }}>
                <span className="eyebrow">Over KREATIVES</span>
                <h2 className={styles.kop}>Wie dit samenstelt.</h2>
              </div>
              <p className={styles.aboutBody}>
                Ik ben Ricky van KREATIVES. We hebben meer dan 100 websites
                gebouwd voor ondernemers in Nederland, van klinieken tot
                e-commerce merken. Ik zie te vaak dat ondernemers niet weten waar
                ze moeten beginnen als het over hun website gaat. De blauwdruk is
                mijn manier om dat te veranderen, ook als we uiteindelijk niet
                samenwerken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 + 09 — Finale CTA + formulier */}
      <section
        id="aanvragen"
        className={`section--dark cosmos-bg ${styles.formSec}`}
      >
        <div className="container">
          <div className={styles.formGrid}>
            <div className={styles.formCopy}>
              <span className="eyebrow">Aanvragen</span>
              <h2 className={styles.formTitle}>
                Weet binnen 48 uur hoe jouw website{" "}
                <span className="accent accent--orange">eruit moet zien.</span>
              </h2>
              <p className={styles.formSub}>
                Gratis, zonder verplichtingen. Vul het formulier in en ontvang
                een concrete structuur voor jouw website, afgestemd op jouw type
                bedrijf en doel.
              </p>
            </div>
            <BlueprintForm />
          </div>
        </div>
      </section>
    </main>
  );
}
