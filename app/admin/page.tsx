import Link from "next/link";
import styles from "./admin.module.css";

const sections = [
  {
    href: "/admin/projecten",
    title: "Projecten",
    body: "Voeg projecten toe met de uitdaging, teksten en foto's.",
  },
  {
    href: "/admin/reviews",
    title: "Reviews",
    body: "Beheer klantreviews: naam, titel, tekst en profielfoto.",
  },
  {
    href: "/admin/faq",
    title: "Veelgestelde vragen",
    body: "Voeg vragen en antwoorden toe, ingedeeld op onderwerp.",
  },
  {
    href: "/admin/media",
    title: "Afbeeldingen",
    body: "Bekijk alle foto's en vervang ze.",
  },
];

export default function AdminHome() {
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Welkom terug</h1>
        <p className={styles.lead}>
          Beheer hier de inhoud van je website. Kies een onderdeel om te
          beginnen.
        </p>
      </div>

      <div className={styles.cards}>
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className={styles.card}>
            <span className={styles.cardTitle}>{s.title}</span>
            <span className={styles.cardBody}>{s.body}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
