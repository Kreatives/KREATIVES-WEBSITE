"use client";

import { useState } from "react";
import { CALENDLY } from "@/lib/site";
import styles from "./express.module.css";

const FAQS = [
  {
    q: "Is dit echt geen AI?",
    a: "Het ontwerp maak ik zelf. Ik bedenk de opbouw, ontwerp de pagina's en bouw ze daarna in WordPress. AI gebruik ik als hulpmiddel om sneller te bouwen en teksten voor te bereiden, en jij keurt alles goed voordat het live gaat. In het ontwerpbestand dat je meekrijgt, zie je elke stap die ik heb gezet.",
  },
  {
    q: "Wat is het ontwerpbestand en waarom krijg ik het?",
    a: "Het ontwerpbestand is de bron van je site, gemaakt in Figma. Je krijgt het mee zodat je altijd kunt zien hoe je site is opgebouwd en er later iemand anders mee verder kan. Zo zit je nooit aan mij vast.",
  },
  {
    q: "Ben ik echt eigenaar?",
    a: "Ja, volledig. Domein, hosting, code, het ontwerpbestand en het copyright staan op jouw naam. Je betaalt één keer en daarna is alles van jou, zonder abonnement.",
  },
  {
    q: "Is dit wel te vertrouwen?",
    a: "Ik heb meer dan honderd sites gemaakt en sta op vijf sterren. Je betaalt veilig, krijgt een factuur, en de helft reken je pas af bij oplevering.",
  },
  {
    q: "Kan ik eerst een vraag stellen?",
    a: "Zeker. Stuur me een appje en ik antwoord meestal binnen een werkdag. Je zit nergens aan vast voordat je bestelt.",
  },
  {
    q: "Wat als ik het niet mooi vind?",
    a: "Dan pas ik het aan binnen de revisierondes van je pakket. Ben je daarna nog niet tevreden, dan krijg je je aanbetaling terug.",
  },
  {
    q: "Waarom ben je zo veel goedkoper dan een bureau?",
    a: "Omdat er geen pitchtraject, accountmanager of meetingslaag tussen zit. Je betaalt voor het werk, niet voor de overhead.",
  },
];

export default function FaqExpress() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.faq} data-reveal>
      <div className={styles.container}>
        <div className={styles.faqHead}>
          <span className={styles.pill}>Veelgestelde vragen</span>
          <h2 className={styles.faqTitle}>Antwoorden op je vragen.</h2>
          <p className={styles.faqSub}>Staat je vraag er niet bij? Stuur een appje.</p>
          <div className={styles.faqBtns}>
            <a className={styles.faqWa} href="https://wa.me/31613066250">
              WhatsApp
            </a>
            <a className={styles.faqCall} href={CALENDLY} target="_blank" rel="noopener noreferrer">
              Boek een call
            </a>
          </div>
        </div>

        <div className={styles.faqList}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ""}`} key={f.q}>
                <button
                  type="button"
                  className={styles.faqQ}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className={styles.faqToggle} aria-hidden>
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {isOpen && <p className={styles.faqA}>{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
