import { createClient } from "@/lib/supabase/server";
import { projecten as staticProjects } from "@/lib/projecten";
import { posts as staticPosts } from "@/lib/blog";
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
  headline: string;
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
  featured: boolean;
  quoteFeatured: boolean;
};

/** Maximaal aantal reviews dat op de homepage past. */
export const HOMEPAGE_REVIEW_LIMIT = 6;

/** Maximaal aantal reviews in de "In hun eigen woorden"-kaarten. */
export const QUOTE_REVIEW_LIMIT = 4;

function toReview(row: {
  id: string;
  author: string;
  role: string | null;
  company: string | null;
  title: string | null;
  quote: string;
  photo: string | null;
  color: string | null;
  position: number | null;
  featured: boolean | null;
  quote_featured: boolean | null;
}): CmsReview {
  return {
    id: row.id,
    author: row.author,
    role: row.role ?? "",
    company: row.company ?? "",
    title: row.title ?? "",
    quote: row.quote,
    photo: row.photo ?? null,
    color: row.color ?? "#FD6D17",
    position: row.position ?? 0,
    featured: !!row.featured,
    quoteFeatured: !!row.quote_featured,
  };
}

export type CmsFaq = {
  id: string;
  category: string;
  question: string;
  answer: string;
  position: number;
};

export type CmsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  image: string;
  body: string[];
  tags: string[];
  position: number;
};

export function splitParagraphs(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);
}

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
  return (data ?? []).map(toReview);
}

export async function dbReview(id: string): Promise<CmsReview | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("reviews").select("*").eq("id", id).single();
  return data ? toReview(data) : null;
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
  const [p, r, f, b] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }),
  ]);
  return {
    projects: p.count ?? 0,
    reviews: r.count ?? 0,
    faqs: f.count ?? 0,
    posts: b.count ?? 0,
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
    headline: p.headline,
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
    featured: i < HOMEPAGE_REVIEW_LIMIT,
    quoteFeatured: false,
  }));
}

/** Reviews voor de homepage: de gemarkeerde, of anders de eerste paar. */
export async function getFeaturedReviews(
  limit = HOMEPAGE_REVIEW_LIMIT
): Promise<CmsReview[]> {
  const all = await getReviews();
  const featured = all.filter((r) => r.featured);
  const list = featured.length ? featured : all;
  return list.slice(0, limit);
}

export async function featuredReviewCount(excludeId?: string): Promise<number> {
  const rows = await dbReviews();
  return rows.filter((r) => r.featured && r.id !== excludeId).length;
}

/** Reviews voor de "In hun eigen woorden"-kaarten (alleen de gemarkeerde). */
export async function getQuoteReviews(
  limit = QUOTE_REVIEW_LIMIT
): Promise<CmsReview[]> {
  const rows = await dbReviews();
  return rows.filter((r) => r.quoteFeatured).slice(0, limit);
}

export async function quoteReviewCount(excludeId?: string): Promise<number> {
  const rows = await dbReviews();
  return rows.filter((r) => r.quoteFeatured && r.id !== excludeId).length;
}

/** Quote-reviews in de vorm die de "In hun eigen woorden"-kaarten gebruiken. */
export async function getQuoteReviewItems(limit = QUOTE_REVIEW_LIMIT) {
  const reviews = await getQuoteReviews(limit);
  return reviews.map((r) => ({
    quote: r.quote,
    author: r.author,
    role: r.role,
    company: r.company,
    initials: initialsOf(r.author),
    color: r.color,
    photo: r.photo ?? undefined,
  }));
}

/* ---------- Blog ---------- */

export async function dbPosts(): Promise<CmsPost[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });
  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    date: row.date ?? "",
    readingMinutes: row.reading_minutes ?? 4,
    image: row.image ?? "",
    body: splitParagraphs(row.body),
    tags: row.tags ?? [],
    position: row.position ?? 0,
  }));
}

export async function dbPost(id: string): Promise<CmsPost | null> {
  const supabase = await createClient();
  const { data: row } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    date: row.date ?? "",
    readingMinutes: row.reading_minutes ?? 4,
    image: row.image ?? "",
    body: splitParagraphs(row.body),
    tags: row.tags ?? [],
    position: row.position ?? 0,
  };
}

export async function getPosts(): Promise<CmsPost[]> {
  const rows = await dbPosts();
  if (rows.length) return rows;
  return staticPosts.map((p, i) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    readingMinutes: p.readingMinutes,
    image: p.image,
    body: p.body,
    tags: p.tags,
    position: i,
  }));
}

export async function getPostBySlug(slug: string): Promise<CmsPost | null> {
  const all = await getPosts();
  return all.find((p) => p.slug === slug) ?? null;
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

/** Huidige preview-wachtwoord (alleen leesbaar voor ingelogde beheerders). */
export async function getPreviewPassword(): Promise<string> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "preview_password")
    .single();
  return data?.value ?? "";
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
