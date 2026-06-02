"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { projecten as staticProjects } from "@/lib/projecten";
import { reviewsPage, faqHome } from "@/lib/site";
import type { CmsProjectSection } from "@/lib/cms";

function revalidateProjects() {
  revalidatePath("/projecten");
  revalidatePath("/projecten/[slug]", "page");
  revalidatePath("/admin/projecten");
}

/* ---------- Seed ---------- */

export async function seedDatabase() {
  const supabase = await createClient();

  const [p, r, f] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
  ]);

  if (!p.count) {
    await supabase.from("projects").insert(
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
      }))
    );
  }
  if (!r.count) {
    await supabase.from("reviews").insert(
      reviewsPage.items.map((x, i) => ({
        position: i,
        author: x.author,
        role: x.role,
        company: x.company,
        title: x.title,
        quote: x.quote,
        color: x.color,
      }))
    );
  }
  if (!f.count) {
    await supabase.from("faqs").insert(
      faqHome.items.map((x, i) => ({
        position: i,
        category: x.category,
        question: x.q,
        answer: x.a,
      }))
    );
  }

  revalidateProjects();
  revalidatePath("/reviews");
  revalidatePath("/faq");
  revalidatePath("/admin");
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
};

export async function saveProject(input: ProjectInput) {
  const supabase = await createClient();
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
  };
  const { error } = input.id
    ? await supabase.from("projects").update(row).eq("id", input.id)
    : await supabase.from("projects").insert(row);
  if (error) return { ok: false, error: error.message };
  revalidateProjects();
  revalidatePath(`/projecten/${input.slug}`);
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
};

export async function saveReview(input: ReviewInput) {
  const supabase = await createClient();
  const row = {
    author: input.author,
    role: input.role,
    company: input.company,
    title: input.title,
    quote: input.quote,
    photo: input.photo,
    color: input.color,
  };
  const { error } = input.id
    ? await supabase.from("reviews").update(row).eq("id", input.id)
    : await supabase.from("reviews").insert(row);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
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
