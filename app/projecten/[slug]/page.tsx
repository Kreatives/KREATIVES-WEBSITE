import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RevealInit from "@/components/RevealInit";
import { getProjectBySlug, getProjects } from "@/lib/cms";
import styles from "./project.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project niet gevonden" };
  return {
    title: project.name,
    description: project.excerpt,
    alternates: { canonical: `/projecten/${project.slug}` },
    openGraph: {
      title: `${project.name} — KREATIVES`,
      description: project.excerpt,
      url: `/projecten/${project.slug}`,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const related = (await getProjects())
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <RevealInit />

      <article>
        {/* Donkere hero met alle meta + intro erin */}
        <section className={`section--dark cosmos-bg ${styles.hero}`}>
          <div className="container">
            <Link href="/projecten" className={styles.back}>
              ← Alle projecten
            </Link>

            <div className={styles.heroMeta}>
              <span className={styles.pill}>{project.type}</span>
              <span className={styles.pill}>{project.year}</span>
            </div>

            <span className={styles.client} data-reveal>
              {project.name}
            </span>
            <h1 className={styles.title} data-reveal>
              {project.headline || project.name}
            </h1>
            <p className={styles.excerpt} data-reveal>
              {project.excerpt}
            </p>

            <div className={styles.heroMedia}>
              {/* Volledige mockup, op natuurlijke verhouding (niet bijgesneden). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.name}
                className={styles.heroImg}
                loading="eager"
              />
            </div>

            <div className={styles.introGrid}>
              <aside className={styles.facts}>
                <dl>
                  <div>
                    <dt>Klant</dt>
                    <dd>{project.client}</dd>
                  </div>
                  <div>
                    <dt>Type</dt>
                    <dd>{project.type}</dd>
                  </div>
                  <div>
                    <dt>Jaar</dt>
                    <dd>{project.year}</dd>
                  </div>
                  <div>
                    <dt>Tags</dt>
                    <dd>{project.tags.join(", ")}</dd>
                  </div>
                </dl>
              </aside>
              <p className={styles.introBody} data-reveal>
                {project.intro}
              </p>
            </div>
          </div>
        </section>

        {/* Body: tekst-only secties (kop links, tekst rechts) en secties met
            beeld (tekst links, beeld rechts tegen de schermrand). */}
        <section className={`section ${styles.body}`}>
          <div className="container">
            {project.sections.map((s, i) => {
              const hasMedia = Boolean(s.video || s.image);
              const isPhone = Boolean(s.video && s.videoPortrait);

              // Staande video → in een iPhone-mockup met de video in het scherm.
              const phone = isPhone ? (
                <div className={styles.phone} data-reveal>
                  <div className={styles.phoneScreen}>
                    <video
                      className={styles.phoneVideo}
                      src={s.video}
                      poster={s.poster}
                      preload="metadata"
                      playsInline
                      controls={!s.videoLoop}
                      autoPlay={s.videoLoop}
                      muted={s.videoLoop}
                      loop={s.videoLoop}
                    />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/iphone-frame.webp"
                    alt=""
                    className={styles.phoneFrame}
                    aria-hidden
                  />
                </div>
              ) : null;

              // Liggend beeld/video → vol in beeld, tegen de rechter schermrand.
              const media =
                hasMedia && !isPhone ? (
                  <div className={styles.blockMedia} data-reveal>
                    {s.video ? (
                      <video
                        className={styles.blockVideo}
                        src={s.video}
                        poster={s.poster}
                        preload="metadata"
                        playsInline
                        controls={!s.videoLoop}
                        autoPlay={s.videoLoop}
                        muted={s.videoLoop}
                        loop={s.videoLoop}
                      />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={s.image}
                        alt=""
                        className={styles.blockImg}
                        loading="lazy"
                      />
                    )}
                  </div>
                ) : null;

              const paragraphs = (
                <>
                  <p className={styles.blockBody} data-reveal>
                    {s.body}
                  </p>
                  {s.bodyExtra && (
                    <p className={styles.blockBody} data-reveal>
                      {s.bodyExtra}
                    </p>
                  )}
                </>
              );

              // Testimonial: grote quote links, iPhone rechts.
              if (s.quote) {
                return (
                  <div key={i} className={`${styles.block} ${styles.phoneRow}`}>
                    <figure className={styles.quote}>
                      <blockquote className={styles.quoteText} data-reveal>
                        {s.quote}
                      </blockquote>
                      {s.quoteAuthor && (
                        <figcaption className={styles.quoteAuthor} data-reveal>
                          — {s.quoteAuthor}
                        </figcaption>
                      )}
                    </figure>
                    {phone}
                  </div>
                );
              }

              // Sectie met staande video: tekst links, iPhone rechts.
              if (isPhone) {
                return (
                  <div key={i} className={`${styles.block} ${styles.phoneRow}`}>
                    <div className={styles.blockCopy}>
                      {s.heading && (
                        <h2 className={styles.blockHeading} data-reveal>
                          {s.heading}
                        </h2>
                      )}
                      {paragraphs}
                    </div>
                    {phone}
                  </div>
                );
              }

              // Sectie met liggend beeld: tekst links, beeld rechts.
              if (hasMedia) {
                return (
                  <div
                    key={i}
                    className={`${styles.block} ${styles.blockMediaRow}`}
                  >
                    <div className={styles.blockCopy}>
                      {s.heading && (
                        <h2 className={styles.blockHeading} data-reveal>
                          {s.heading}
                        </h2>
                      )}
                      {paragraphs}
                    </div>
                    {media}
                  </div>
                );
              }

              // Tekst-only: altijd kop links, tekst rechts.
              return (
                <div key={i} className={`${styles.block} ${styles.blockText}`}>
                  {s.heading && (
                    <h2 className={styles.blockHeading} data-reveal>
                      {s.heading}
                    </h2>
                  )}
                  <div className={styles.blockCopyText}>{paragraphs}</div>
                </div>
              );
            })}
          </div>
        </section>

        {related.length > 0 && (
          <section className="section section--dark cosmos-bg">
            <div className="container">
              <div className={styles.relatedHead}>
                <span className="eyebrow">Verder lezen</span>
                <h2 className={`h2 ${styles.relatedTitle}`}>
                  Andere{" "}
                  <span className="accent accent--orange">projecten.</span>
                </h2>
              </div>
              <ul className={styles.relatedGrid}>
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/projecten/${r.slug}`}
                      className={styles.relatedLink}
                    >
                      <div className={styles.relatedMedia}>
                        <Image
                          src={r.image}
                          alt={r.name}
                          fill
                          sizes="(max-width: 760px) 100vw, 40vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className={styles.relatedMeta}>
                        <span className={styles.relatedName}>{r.name}</span>
                        <span className={styles.relatedType}>{r.type}</span>
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
