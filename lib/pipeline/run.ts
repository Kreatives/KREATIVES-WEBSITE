/* eslint-disable @typescript-eslint/no-explicit-any */
import { chooseKeyword } from "./gap";
import { writePost, makeImagePrompts } from "./generate";

// Veiligheidsnet: prompts mogen geen gezichten/schermen bevatten (de skill dwingt
// dit al af; dit is de extra check uit de brief).
const FORBIDDEN = /\b(face|portrait|head(?!\s*out)|screen showing|ui mockup|wireframe)\b/i;

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

async function uniqueSlug(supabase: any, base: string): Promise<string> {
  const clean =
    (base || "artikel")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "artikel";
  let slug = clean;
  for (let i = 2; i < 50; i++) {
    const { data } = await supabase.from("posts").select("id").eq("slug", slug).maybeSingle();
    if (!data) return slug;
    slug = `${clean}-${i}`;
  }
  return `${clean}-${Date.now()}`;
}

export type PipelineResult = {
  ok: boolean;
  skipped?: boolean;
  reason?: string;
  postId?: string;
  keyword?: string;
  error?: string;
};

export async function runBlogPipeline(
  supabase: any,
  opts: { force?: boolean } = {}
): Promise<PipelineResult> {
  const steps: any[] = [];
  const stamp = (step: string, extra: any = {}) =>
    steps.push({ step, at: new Date().toISOString(), ...extra });

  // Harde limiet: max 1 auto-draft per dag.
  if (!opts.force) {
    const { data: existing } = await supabase
      .from("posts")
      .select("id")
      .eq("status", "pending_review")
      .gte("date", today());
    if (existing && existing.length) {
      return { ok: true, skipped: true, reason: "Er staat vandaag al een concept klaar." };
    }
  }

  let runId: string | null = null;
  try {
    stamp("start");

    // Stap 1 — zoekwoord kiezen
    const choice = await chooseKeyword(supabase);
    if (!choice) throw new Error("Geen (actief) doelzoekwoord beschikbaar.");
    stamp("keyword_chosen", { keyword: choice.keyword });

    const { data: run } = await supabase
      .from("blog_pipeline_runs")
      .insert({ chosen_keyword: choice.keyword, rationale: choice.rationale, status: "running", steps })
      .select("id")
      .single();
    runId = run?.id ?? null;

    // Bestaande posts voor interne links + dedup
    const { data: existingPosts } = await supabase.from("posts").select("slug, title, tags");

    // Stap 2 — artikel schrijven
    const post = await writePost({
      keyword: choice.keyword,
      rationale: choice.rationale,
      category: choice.category,
      existingPosts: existingPosts ?? [],
    });
    stamp("post_written", { title: post.title, usage: post.usage });

    // Stap 3 — beeldprompts + alt-teksten
    let images = await makeImagePrompts({
      title: post.title,
      category: post.category,
      summary: post.metaDescription,
    });
    if (FORBIDDEN.test(images.thumbnailPrompt) || FORBIDDEN.test(images.heroPrompt)) {
      stamp("image_prompts_rejected");
      images = await makeImagePrompts({
        title: post.title,
        category: post.category,
        summary: `${post.metaDescription} (Belangrijk: geen mensen, geen gezichten, geen schermen in beeld.)`,
      });
    }
    stamp("image_prompts_ready", { usage: images.usage });

    // Draft opslaan (status pending_review — NOOIT auto-publiceren)
    const slug = await uniqueSlug(supabase, post.slug);
    const tags = post.tags?.length ? post.tags : post.category;
    const { data: inserted, error } = await supabase
      .from("posts")
      .insert({
        slug,
        title: post.title,
        excerpt: post.metaDescription,
        date: today(),
        reading_minutes: post.readingMinutes || 6,
        image: "",
        body: post.body,
        tags,
        status: "pending_review",
        target_keyword: choice.keyword,
        keyword_rationale: choice.rationale,
        thumbnail_prompt: images.thumbnailPrompt,
        hero_prompt: images.heroPrompt,
        thumbnail_alt: images.thumbnailAlt,
        hero_alt: images.heroAlt,
        image_status: "pending",
        model: "claude-opus-4-8",
        generation_log: steps,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    stamp("draft_saved", { postId: inserted.id, slug });

    // Cooldown op het zoekwoord (30 dagen) zodat de bot varieert
    const cooldown = new Date();
    cooldown.setDate(cooldown.getDate() + 30);
    await supabase
      .from("target_keywords")
      .update({ cooldown_until: cooldown.toISOString() })
      .eq("id", choice.id);

    if (runId) {
      await supabase
        .from("blog_pipeline_runs")
        .update({ status: "success", steps, post_id: inserted.id })
        .eq("id", runId);
    }

    return { ok: true, postId: inserted.id, keyword: choice.keyword };
  } catch (e: any) {
    stamp("error", { message: e.message });
    if (runId) {
      await supabase.from("blog_pipeline_runs").update({ status: "failed", steps, error: e.message }).eq("id", runId);
    }
    return { ok: false, error: e.message };
  }
}
