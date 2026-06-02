import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RevealInit from "@/components/RevealInit";
import { formatDate } from "@/lib/blog";
import { getPostBySlug, getPosts } from "@/lib/cms";
import styles from "./post.module.css";

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

  return (
    <>
      <RevealInit />

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
            <div className={styles.bodyInner}>
              {post.body.map((p, i) => (
                <p key={i} className={styles.p} data-reveal>
                  {p}
                </p>
              ))}
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
