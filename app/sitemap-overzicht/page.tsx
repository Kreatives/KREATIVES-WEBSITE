import type { Metadata } from "next";
import Link from "next/link";
import RevealInit from "@/components/RevealInit";
import { getPosts, getProjects } from "@/lib/cms";
import styles from "./sitemap-overzicht.module.css";

// Interne, visuele sitemap voor Ricky. Niet in de navigatie, niet indexeerbaar.
export const metadata: Metadata = {
  title: "Sitemap-overzicht",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Node = { href: string; label: string; children?: Node[] };

export default async function SitemapOverzichtPage() {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const sortedPosts = posts
    .slice()
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  const groups: { title: string; items: Node[] }[] = [
    {
      title: "Hoofdpagina",
      items: [{ href: "/", label: "Home" }],
    },
    {
      title: "Diensten",
      items: [
        {
          href: "/diensten",
          label: "Diensten",
          children: [
            { href: "/diensten/webdesign", label: "Webdesign" },
            { href: "/diensten/ai", label: "AI-websites" },
          ],
        },
      ],
    },
    {
      title: "Werk",
      items: [
        {
          href: "/projecten",
          label: "Projecten",
          children: projects.map((p) => ({
            href: `/projecten/${p.slug}`,
            label: p.name || p.headline,
          })),
        },
      ],
    },
    {
      title: "Kennisbank",
      items: [
        {
          href: "/blog",
          label: "Blog",
          children: sortedPosts.map((p) => ({
            href: `/blog/${p.slug}`,
            label: p.title,
          })),
        },
      ],
    },
    {
      title: "Over & contact",
      items: [
        { href: "/over-ons", label: "Over ons" },
        { href: "/werkwijze", label: "Werkwijze" },
        { href: "/reviews", label: "Reviews" },
        { href: "/faq", label: "Veelgestelde vragen" },
        { href: "/blauwdruk", label: "Blueprint-sessie" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Juridisch",
      items: [
        { href: "/privacy", label: "Privacyverklaring" },
        { href: "/voorwaarden", label: "Voorwaarden" },
      ],
    },
  ];

  const countNodes = (nodes: Node[]): number =>
    nodes.reduce((n, x) => n + 1 + (x.children ? countNodes(x.children) : 0), 0);
  const total = groups.reduce((n, g) => n + countNodes(g.items), 0);

  return (
    <>
      <RevealInit />

      <section className={`section--dark cosmos-bg ${styles.head}`}>
        <div className="container">
          <span className="eyebrow" data-reveal>
            Intern overzicht
          </span>
          <h1 className={styles.title} data-reveal>
            Sitemap
          </h1>
          <p className={styles.lead} data-reveal>
            De volledige structuur van kreatives.nl in één oogopslag. Dit is een
            interne pagina (niet in het menu, niet vindbaar in Google). {total}{" "}
            pagina&apos;s in totaal. De versie voor Google Search Console staat op{" "}
            <a className={styles.xml} href="/sitemap.xml">
              /sitemap.xml
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {groups.map((group) => (
              <div key={group.title} className={styles.group} data-reveal>
                <div className={styles.groupHead}>
                  <span className={styles.groupTitle}>{group.title}</span>
                  <span className={styles.count}>
                    {countNodes(group.items)}
                  </span>
                </div>

                <ul className={styles.tree}>
                  {group.items.map((item) => (
                    <li key={item.href} className={styles.node}>
                      <Link href={item.href} className={styles.link}>
                        <span className={styles.label}>{item.label}</span>
                        <span className={styles.path}>{item.href}</span>
                      </Link>

                      {item.children && item.children.length > 0 && (
                        <ul className={styles.children}>
                          {item.children.map((child) => (
                            <li key={child.href} className={styles.child}>
                              <Link href={child.href} className={styles.link}>
                                <span className={styles.label}>
                                  {child.label}
                                </span>
                                <span className={styles.path}>{child.href}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
