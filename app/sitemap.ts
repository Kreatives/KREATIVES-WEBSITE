import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projecten } from "@/lib/projecten";
import { posts as staticPosts } from "@/lib/blog";

// Elk uur verversen zodat nieuw gepubliceerde blogs vanzelf in de sitemap komen.
export const revalidate = 3600;

type Freq = "weekly" | "monthly" | "yearly";

// URL's met een 301 horen niet in de sitemap. De pillar vangt het oude adres op.
const REDIRECTED_SLUGS = new Set([
  "drie-redenen-om-je-site-opnieuw-te-laten-bouwen",
]);

// Alle statische, publieke pagina's. `lastmod` is de laatste écht inhoudelijke
// wijziging per pagina (ISO-datum), niet de requesttijd. Een betekenisloze,
// voor elke URL gelijke `lastmod` wordt door Google genegeerd.
const STATIC_PAGES: {
  path: string;
  priority: number;
  changeFrequency: Freq;
  lastmod: string;
}[] = [
  { path: "", priority: 1, changeFrequency: "monthly", lastmod: "2026-10-25" },
  { path: "/diensten/webdesign", priority: 0.9, changeFrequency: "monthly", lastmod: "2026-10-25" },
  { path: "/diensten/ai", priority: 0.8, changeFrequency: "monthly", lastmod: "2026-07-16" },
  { path: "/diensten", priority: 0.7, changeFrequency: "monthly", lastmod: "2026-07-16" },
  // Commerciële stadspagina's (webdesign per stad).
  { path: "/webdesign-arnhem", priority: 0.9, changeFrequency: "monthly", lastmod: "2026-10-25" },
  { path: "/webdesign-nijmegen", priority: 0.8, changeFrequency: "monthly", lastmod: "2026-10-25" },
  { path: "/webdesign-apeldoorn", priority: 0.8, changeFrequency: "monthly", lastmod: "2026-10-25" },
  { path: "/webdesign-utrecht", priority: 0.8, changeFrequency: "monthly", lastmod: "2026-10-25" },
  { path: "/webdesign-rotterdam", priority: 0.8, changeFrequency: "monthly", lastmod: "2026-10-25" },
  { path: "/webdesign-amsterdam", priority: 0.8, changeFrequency: "monthly", lastmod: "2026-10-25" },
  { path: "/werkwijze", priority: 0.8, changeFrequency: "monthly", lastmod: "2026-07-07" },
  { path: "/projecten", priority: 0.8, changeFrequency: "monthly", lastmod: "2026-07-16" },
  { path: "/website-scan", priority: 0.9, changeFrequency: "monthly", lastmod: "2026-10-25" },
  { path: "/blauwdruk", priority: 0.8, changeFrequency: "monthly", lastmod: "2026-07-07" },
  { path: "/over-ons", priority: 0.7, changeFrequency: "monthly", lastmod: "2026-07-16" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly", lastmod: "2026-10-25" },
  { path: "/reviews", priority: 0.6, changeFrequency: "monthly", lastmod: "2026-10-25" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly", lastmod: "2026-07-07" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly", lastmod: "2026-07-07" },
  { path: "/sitemap-overzicht", priority: 0.3, changeFrequency: "yearly", lastmod: "2026-06-06" },
  { path: "/voorwaarden", priority: 0.3, changeFrequency: "yearly", lastmod: "2026-06-06" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastmod: "2026-06-06" },
];

// Projectcases wijzigen zelden; de laatste CMS-opzet als vaste datum.
const PROJECTS_LASTMOD = "2026-06-02";

// Gepubliceerde blogs uit de database (bron van waarheid). Valt terug op de
// statische lijst als de DB even niet bereikbaar is, zodat de sitemap nooit leeg
// raakt. Leest met de publieke anon-key; RLS staat alleen gepubliceerde rijen toe.
// De `date` is per post de wijzigingsdatum die we tonen als `lastmod`.
async function livePosts(): Promise<{ slug: string; date: string }[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let dbRows: { slug: string; date: string }[] = [];
  if (url && key) {
    try {
      const res = await fetch(
        `${url}/rest/v1/posts?select=slug,date&status=eq.published`,
        {
          headers: { apikey: key, Authorization: `Bearer ${key}` },
          next: { revalidate: 3600 },
        }
      );
      if (res.ok) {
        const rows = (await res.json()) as { slug: string; date: string }[];
        if (Array.isArray(rows)) dbRows = rows;
      }
    } catch {
      // Stil terugvallen op de statische lijst hieronder.
    }
  }
  // Union: DB is leidend, statische posts die er niet in staan vullen we aan.
  const known = new Set(dbRows.map((r) => r.slug));
  const extra = staticPosts
    .filter((p) => !known.has(p.slug))
    .map((p) => ({ slug: p.slug, date: p.date }));
  return [...dbRows, ...extra];
}

function iso(date: string): string {
  return new Date(date).toISOString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = STATIC_PAGES.map((p) => ({
    url: `${site.domain}${p.path}`,
    lastModified: iso(p.lastmod),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const projectUrls = projecten.map((p) => ({
    url: `${site.domain}/projecten/${p.slug}`,
    lastModified: iso(PROJECTS_LASTMOD),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postUrls = (await livePosts())
    // URL's met een 301 uitsluiten (bijv. 'drie-redenen' → pillar).
    .filter((p) => !REDIRECTED_SLUGS.has(p.slug))
    .map((p) => ({
      url: `${site.domain}/blog/${p.slug}`,
      lastModified: iso(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...base, ...projectUrls, ...postUrls];
}
