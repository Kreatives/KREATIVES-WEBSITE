"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { projecten as staticProjects } from "@/lib/projecten";
import { posts as staticPosts } from "@/lib/blog";
import { reviewsPage, faqHome } from "@/lib/site";
import {
  HOMEPAGE_PROJECT_LIMIT,
  HOMEPAGE_REVIEW_LIMIT,
  type CmsProjectSection,
} from "@/lib/cms";

function revalidateProjects() {
  revalidatePath("/projecten");
  revalidatePath("/projecten/[slug]", "page");
  revalidatePath("/admin/projecten");
}

/* ---------- Seed ---------- */

export async function seedDatabase() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Je bent niet ingelogd." };

  const errors: string[] = [];

  const [p, r, f, b] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }),
  ]);

  if (!p.count) {
    const { error } = await supabase.from("projects").insert(
      staticProjects.map((x, i) => ({
        position: i,
        slug: x.slug,
        name: x.name,
        type: x.type,
        year: x.year,
        client: x.client,
        excerpt: x.excerpt,
        intro: x.intro,
        image: x.image,
        tags: x.tags,
        sections: x.sections,
        featured: i < HOMEPAGE_PROJECT_LIMIT,
      }))
    );
    if (error) errors.push(`projecten: ${error.message}`);
  }
  if (!r.count) {
    const { error } = await supabase.from("reviews").insert(
      reviewsPage.items.map((x, i) => ({
        position: i,
        author: x.author,
        role: x.role,
        company: x.company,
        title: x.title,
        quote: x.quote,
        color: x.color,
        featured: i < HOMEPAGE_REVIEW_LIMIT,
      }))
    );
    if (error) errors.push(`reviews: ${error.message}`);
  }
  if (!f.count) {
    const { error } = await supabase.from("faqs").insert(
      faqHome.items.map((x, i) => ({
        position: i,
        category: x.category,
        question: x.q,
        answer: x.a,
      }))
    );
    if (error) errors.push(`vragen: ${error.message}`);
  }
  if (!b.count) {
    const { error } = await supabase.from("posts").insert(
      staticPosts.map((x, i) => ({
        position: i,
        slug: x.slug,
        title: x.title,
        excerpt: x.excerpt,
        date: x.date,
        reading_minutes: x.readingMinutes,
        image: x.image,
        body: x.body.join("\n\n"),
        tags: x.tags,
      }))
    );
    if (error) errors.push(`blog: ${error.message}`);
  }

  revalidateProjects();
  revalidatePath("/reviews");
  revalidatePath("/faq");
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin");

  if (errors.length) return { ok: false, error: errors.join(" | ") };
  return { ok: true };
}

/* ---------- Projecten ---------- */

export type ProjectInput = {
  id?: string;
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
  featured: boolean;
};

export async function saveProject(input: ProjectInput) {
  const supabase = await createClient();

  // Limiet op het aantal projecten op de homepage.
  if (input.featured) {
    const { data: others } = await supabase
      .from("projects")
      .select("id")
      .eq("featured", true);
    const count = (others ?? []).filter((o) => o.id !== input.id).length;
    if (count >= HOMEPAGE_PROJECT_LIMIT) {
      return {
        ok: false,
        error: `Er is maar plek voor ${HOMEPAGE_PROJECT_LIMIT} projecten op de homepage. Haal er eerst één van de homepage af.`,
      };
    }
  }

  const row = {
    slug: input.slug,
    name: input.name,
    type: input.type,
    year: input.year,
    client: input.client,
    excerpt: input.excerpt,
    intro: input.intro,
    image: input.image,
    tags: input.tags,
    sections: input.sections,
    featured: input.featured,
  };
  const { error } = input.id
    ? await supabase.from("projects").update(row).eq("id", input.id)
    : await supabase.from("projects").insert(row);
  if (error) return { ok: false, error: error.message };
  revalidateProjects();
  revalidatePath(`/projecten/${input.slug}`);
  revalidatePath("/");
  return { ok: true };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateProjects();
  return { ok: true };
}

/* ---------- Reviews ---------- */

export type ReviewInput = {
  id?: string;
  author: string;
  role: string;
  company: string;
  title: string;
  quote: string;
  photo: string | null;
  color: string;
  featured: boolean;
};

export async function saveReview(input: ReviewInput) {
  const supabase = await createClient();

  if (input.featured) {
    const { data: others } = await supabase
      .from("reviews")
      .select("id")
      .eq("featured", true);
    const count = (others ?? []).filter((o) => o.id !== input.id).length;
    if (count >= HOMEPAGE_REVIEW_LIMIT) {
      return {
        ok: false,
        error: `Er is maar plek voor ${HOMEPAGE_REVIEW_LIMIT} reviews op de homepage. Haal er eerst één van de homepage af.`,
      };
    }
  }

  const row = {
    author: input.author,
    role: input.role,
    company: input.company,
    title: input.title,
    quote: input.quote,
    photo: input.photo,
    color: input.color,
    featured: input.featured,
  };
  const { error } = input.id
    ? await supabase.from("reviews").update(row).eq("id", input.id)
    : await supabase.from("reviews").insert(row);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteReview(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
  return { ok: true };
}

/* ---------- FAQ ---------- */

export type FaqInput = {
  id?: string;
  category: string;
  question: string;
  answer: string;
};

export async function saveFaq(input: FaqInput) {
  const supabase = await createClient();
  const row = {
    category: input.category,
    question: input.question,
    answer: input.answer,
  };
  const { error } = input.id
    ? await supabase.from("faqs").update(row).eq("id", input.id)
    : await supabase.from("faqs").insert(row);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
  return { ok: true };
}

export async function deleteFaq(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
  return { ok: true };
}

/* ---------- Blog ---------- */

export type PostInput = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  image: string;
  body: string;
  tags: string[];
};

function revalidateBlog(slug: string) {
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blog");
}

export async function savePost(input: PostInput) {
  const supabase = await createClient();
  const row = {
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    date: input.date,
    reading_minutes: input.readingMinutes,
    image: input.image,
    body: input.body,
    tags: input.tags,
  };
  const { error } = input.id
    ? await supabase.from("posts").update(row).eq("id", input.id)
    : await supabase.from("posts").insert(row);
  if (error) return { ok: false, error: error.message };
  revalidateBlog(input.slug);
  return { ok: true };
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { ok: true };
}
