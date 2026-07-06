import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RevealInit from "@/components/RevealInit";
import PostContent, {
  splitPostBlocks,
  extractHeadings,
  stripInline,
} from "@/components/PostContent";
import PostToc from "@/components/PostToc";
import PostCta from "@/components/PostCta";
import PostFaq from "@/components/PostFaq";
import { formatDate } from "@/lib/blog";
import { getPostBySlug, getPosts } from "@/lib/cms";
import styles from "./post.module.css";

const SITE_URL = "https://www.kreatives.nl";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artikel niet gevonden" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} — KREATIVES blog`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const others = (await getPosts())
    .slice()
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const { mainBlocks, faqItems, afterBlocks } = splitPostBlocks(post.body);
  const FAQ_ID = "veelgestelde-vragen";
  const headings = extractHeadings(mainBlocks);
  const tocHeadings = faqItems.length
    ? [...headings, { id: FAQ_ID, text: "Veelgestelde vragen", level: 2 as const }]
    : headings;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "KREATIVES", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "KREATIVES",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/KREATIVES%20LOGO.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: stripInline(f.answer),
            },
          })),
        }
      : null;

  return (
    <>
      <RevealInit />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article>
        <section className={`section--dark cosmos-bg ${styles.head}`}>
          <div className="container">
            <Link href="/blog" className={styles.back}>
              ← Alle artikelen
            </Link>

            <div className={styles.meta}>
              <span>{formatDate(post.date)}</span>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min lezen</span>
            </div>

            <h1 className={styles.title} data-reveal>
              {post.title}
            </h1>

            <p className={styles.excerpt} data-reveal>
              {post.excerpt}
            </p>

            <ul className={styles.tags}>
              {post.tags.map((t) => (
                <li key={t} className={styles.tag}>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className={`container ${styles.mediaWrap}`}>
            <div className={styles.media}>
              <Image
                src={post.image}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        <section className={`section ${styles.bodySec}`}>
          <div className="container">
            <div className={styles.layout}>
              <aside className={styles.sidebar}>
                <PostToc headings={tocHeadings} />
                <PostCta />
              </aside>
              <div className={styles.main}>
                <PostContent blocks={mainBlocks} />
                <PostFaq id={FAQ_ID} items={faqItems} />
                {afterBlocks.length > 0 && <PostContent blocks={afterBlocks} />}
              </div>
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section className="section section--alt">
            <div className="container">
              <div className={styles.morehead}>
                <span className="eyebrow">Meer artikelen</span>
                <h2 className={`h2 ${styles.moreTitle}`}>
                  Lees ook{" "}
                  <span className="accent accent--orange">eens.</span>
                </h2>
              </div>
              <ul className={styles.moreGrid}>
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className={styles.moreLink}>
                      <div className={styles.moreMedia}>
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="(max-width: 760px) 100vw, 30vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className={styles.moreMeta}>
                        <span className={styles.moreLine}>
                          {formatDate(p.date)} · {p.readingMinutes} min
                        </span>
                        <span className={styles.moreName}>{p.title}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
