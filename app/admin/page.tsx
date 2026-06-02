import Link from "next/link";
import { contentCounts } from "@/lib/cms";
import SeedButton from "@/components/admin/SeedButton";
import RefreshButton from "@/components/admin/RefreshButton";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const counts = await contentCounts();
  const empty =
    counts.projects + counts.reviews + counts.faqs + counts.posts === 0;

  const sections = [
    {
      href: "/admin/projecten",
      title: "Projecten",
      body: `${counts.projects} project${counts.projects === 1 ? "" : "en"}`,
    },
    {
      href: "/admin/reviews",
      title: "Reviews",
      body: `${counts.reviews} review${counts.reviews === 1 ? "" : "s"}`,
    },
    {
      href: "/admin/faq",
      title: "Veelgestelde vragen",
      body: `${counts.faqs} vraag${counts.faqs === 1 ? "" : "/vragen"}`,
    },
    {
      href: "/admin/blog",
      title: "Blog",
      body: `${counts.posts} artikel${counts.posts === 1 ? "" : "en"}`,
    },
    {
      href: "/admin/media",
      title: "Afbeeldingen",
      body: "Foto's bekijken en uploaden",
    },
  ];

  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.head} style={{ marginBottom: 0 }}>
          <h1 className={styles.title}>Welkom terug</h1>
          <p className={styles.lead}>
            Beheer hier de inhoud van je website. Kies een onderdeel om te
            beginnen.
          </p>
        </div>
        <RefreshButton />
      </div>

      <p className={styles.lead} style={{ marginTop: "-1rem", marginBottom: "2rem", maxWidth: "52ch", fontSize: "0.92rem", color: "var(--muted)" }}>
        Zie je iets niet (goed) staan op de site? Klik op
        &ldquo;Inhoud ophalen &amp; verversen&rdquo; — dat haalt ontbrekende
        inhoud op en ververst de site.
      </p>

      {empty && (
        <div className={styles.notice} style={{ marginBottom: "2rem" }}>
          <p style={{ marginBottom: "1rem" }}>
            De database is nog leeg. Klik hieronder om de inhoud die nu op de
            website staat (projecten, reviews en vragen) eenmalig te importeren.
            Daarna kun je alles aanpassen en verwijderen.
          </p>
          <SeedButton />
        </div>
      )}

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
