import { createClient } from "@/lib/supabase/server";
import { projecten as staticProjects } from "@/lib/projecten";
import { reviewsPage, faqHome } from "@/lib/site";

export type CmsProjectSection = {
  heading?: string;
  body: string;
  bodyExtra?: string;
  image?: string;
};

export type CmsProject = {
  id: string;
  slug: string;
  name: string;
  type: string;
  year: string;
  client: string;
  excerpt: string;
  intro: string;
  image: string;
  tags: string[];
  sections: CmsProjectSection[];
  position: number;
  featured: boolean;
};

/** Maximaal aantal projecten dat op de homepage past. */
export const HOMEPAGE_PROJECT_LIMIT = 4;

export type CmsReview = {
  id: string;
  author: string;
  role: string;
  company: string;
  title: string;
  quote: string;
  photo: string | null;
  color: string;
  position: number;
};

export type CmsFaq = {
  id: string;
  category: string;
  question: string;
  answer: string;
  position: number;
};

/* ---------- Raw DB-fetchers (voor het dashboard) ---------- */

export async function dbProjects(): Promise<CmsProject[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  return (data as CmsProject[] | null) ?? [];
}

export async function dbProject(id: string): Promise<CmsProject | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("*").eq("id", id).single();
  return (data as CmsProject | null) ?? null;
}

export async function dbReviews(): Promise<CmsReview[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  return (data as CmsReview[] | null) ?? [];
}

export async function dbReview(id: string): Promise<CmsReview | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("reviews").select("*").eq("id", id).single();
  return (data as CmsReview | null) ?? null;
}

export async function dbFaqs(): Promise<CmsFaq[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  return (data as CmsFaq[] | null) ?? [];
}

export async function dbFaq(id: string): Promise<CmsFaq | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("faqs").select("*").eq("id", id).single();
  return (data as CmsFaq | null) ?? null;
}

export async function contentCounts() {
  const supabase = await createClient();
  const [p, r, f] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
  ]);
  return {
    projects: p.count ?? 0,
    reviews: r.count ?? 0,
    faqs: f.count ?? 0,
  };
}

/* ---------- Publieke fetchers (met fallback naar statische inhoud) ---------- */

export async function getProjects(): Promise<CmsProject[]> {
  const rows = await dbProjects();
  if (rows.length) return rows;
  return staticProjects.map((p, i) => ({
    id: p.slug,
    slug: p.slug,
    name: p.name,
    type: p.type,
    year: p.year,
    client: p.client,
    excerpt: p.excerpt,
    intro: p.intro,
    image: p.image,
    tags: p.tags,
    sections: p.sections,
    position: i,
    featured: i < HOMEPAGE_PROJECT_LIMIT,
  }));
}

export async function getProjectBySlug(slug: string): Promise<CmsProject | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

/** Projecten voor de homepage: de gemarkeerde, of anders de eerste paar. */
export async function getFeaturedProjects(
  limit = HOMEPAGE_PROJECT_LIMIT
): Promise<CmsProject[]> {
  const all = await getProjects();
  const featured = all.filter((p) => p.featured);
  const list = featured.length ? featured : all;
  return list.slice(0, limit);
}

/** Aantal projecten dat nu op de homepage staat (optioneel één uitgesloten). */
export async function featuredProjectCount(excludeId?: string): Promise<number> {
  const rows = await dbProjects();
  return rows.filter((p) => p.featured && p.id !== excludeId).length;
}

export async function getReviews(): Promise<CmsReview[]> {
  const rows = await dbReviews();
  if (rows.length) return rows;
  return reviewsPage.items.map((r, i) => ({
    id: String(i),
    author: r.author,
    role: r.role,
    company: r.company,
    title: r.title,
    quote: r.quote,
    photo: null,
    color: r.color,
    position: i,
  }));
}

export async function getFaqs(): Promise<CmsFaq[]> {
  const rows = await dbFaqs();
  if (rows.length) return rows;
  return faqHome.items.map((f, i) => ({
    id: String(i),
    category: f.category,
    question: f.q,
    answer: f.a,
    position: i,
  }));
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
