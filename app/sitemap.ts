import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projecten } from "@/lib/projecten";
import { posts as staticPosts } from "@/lib/blog";

// Elk uur verversen zodat nieuw gepubliceerde blogs vanzelf in de sitemap komen.
export const revalidate = 3600;

type Freq = "weekly" | "monthly" | "yearly";

// Alle statische, publieke pagina's. Prioriteit weerspiegelt commerciële waarde.
const STATIC_PAGES: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/diensten/webdesign", priority: 0.9, changeFrequency: "monthly" },
  { path: "/diensten/ai", priority: 0.8, changeFrequency: "monthly" },
  { path: "/diensten", priority: 0.7, changeFrequency: "monthly" },
  { path: "/werkwijze", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projecten", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blauwdruk", priority: 0.8, changeFrequency: "monthly" },
  { path: "/over-ons", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/reviews", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sitemap-overzicht", priority: 0.3, changeFrequency: "yearly" },
  { path: "/voorwaarden", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

// Gepubliceerde blogs uit de database (bron van waarheid). Valt terug op de
// statische lijst als de DB even niet bereikbaar is, zodat de sitemap nooit leeg
// raakt. Leest met de publieke anon-key; RLS staat alleen gepubliceerde rijen toe.
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const base = STATIC_PAGES.map((p) => ({
    url: `${site.domain}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const projectUrls = projecten.map((p) => ({
    url: `${site.domain}/projecten/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postUrls = (await livePosts()).map((p) => ({
    url: `${site.domain}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...base, ...projectUrls, ...postUrls];
}
