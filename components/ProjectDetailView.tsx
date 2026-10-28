import Image from "next/image";
import Link from "next/link";
import PlayableVideo from "@/components/PlayableVideo";
import ClosingCta from "@/components/funnel/ClosingCta";
import { CALENDLY } from "@/lib/site";
import styles from "@/app/projecten/[slug]/project.module.css";

type Section = {
  heading?: string;
  body: string;
  bodyExtra?: string;
  image?: string;
  video?: string;
  poster?: string;
  videoPortrait?: boolean;
  videoLoop?: boolean;
  quote?: string;
  quoteAuthor?: string;
};

export type ProjectLike = {
  slug: string;
  name: string;
  headline: string;
  type: string;
  excerpt: string;
  intro: string;
  image: string;
  tags: string[];
  client: string;
  year: string;
  sections: Section[];
};

type Labels = {
  back: string;
  client: string;
  type: string;
  year: string;
  tags: string;
  relatedEyebrow: string;
  relatedLead: string;
  relatedAccent: string;
  cta: { title: string; accent: string; body: string; label: string };
};

const LABELS: Record<"nl" | "en", Labels> = {
  nl: {
    back: "← Alle projecten",
    client: "Klant",
    type: "Type",
    year: "Jaar",
    tags: "Tags",
    relatedEyebrow: "Verder lezen",
    relatedLead: "Andere",
    relatedAccent: "projecten.",
    cta: {
      title: "Hetzelfde resultaat voor jouw bedrijf?",
      accent: "jouw bedrijf?",
      body: "Plan een gesprek van dertig minuten. We kijken waar jouw site aanvragen laat liggen en wat er nodig is om dat te veranderen. Geen offerte, geen verplichtingen.",
      label: "Plan een strategiegesprek",
    },
  },
  en: {
    back: "← All projects",
    client: "Client",
    type: "Type",
    year: "Year",
    tags: "Tags",
    relatedEyebrow: "Keep reading",
    relatedLead: "Other",
    relatedAccent: "projects.",
    cta: {
      title: "The same result for your business?",
      accent: "your business?",
      body: "Book a thirty-minute call. We look at where your site leaves requests on the table and what it takes to change that. No quote, no obligations.",
      label: "Book a strategy call",
    },
  },
};

export default function ProjectDetailView({
  project,
  related,
  locale = "nl",
  basePath = "/projecten",
}: {
  project: ProjectLike;
  related: { slug: string; name: string; type: string; image: string }[];
  locale?: "nl" | "en";
  basePath?: string;
}) {
  const t = LABELS[locale];

  return (
    <article>
      <section className={`section--dark cosmos-bg ${styles.hero}`}>
        <div className="container">
          <Link href={basePath} className={styles.back}>
            {t.back}
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
                  <dt>{t.client}</dt>
                  <dd>{project.client}</dd>
                </div>
                <div>
                  <dt>{t.type}</dt>
                  <dd>{project.type}</dd>
                </div>
                <div>
                  <dt>{t.year}</dt>
                  <dd>{project.year}</dd>
                </div>
                <div>
                  <dt>{t.tags}</dt>
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

      <section className={`section ${styles.body}`}>
        <div className="container">
          {project.sections.map((s, i) => {
            const hasMedia = Boolean(s.video || s.image);
            const isPhone = Boolean(s.video && s.videoPortrait);

            const phone = isPhone ? (
              <div className={styles.phone} data-reveal>
                <div className={styles.phoneScreen}>
                  <PlayableVideo src={s.video ?? ""} poster={s.poster} />
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

            if (s.quote) {
              return (
                <div key={i} className={`${styles.block} ${styles.phoneRow}`}>
                  <figure className={styles.quote}>
                    <blockquote className={styles.quoteText} data-reveal>
                      {s.quote}
                    </blockquote>
                    {s.quoteAuthor && (
                      <figcaption className={styles.quoteAuthor} data-reveal>
                        {s.quoteAuthor}
                      </figcaption>
                    )}
                  </figure>
                  {phone}
                </div>
              );
            }

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

      <ClosingCta
        data={{
          title: t.cta.title,
          accent: t.cta.accent,
          body: t.cta.body,
          cta: { label: t.cta.label, href: CALENDLY },
        }}
      />

      {related.length > 0 && (
        <section className="section section--dark cosmos-bg">
          <div className="container">
            <div className={styles.relatedHead}>
              <span className="eyebrow">{t.relatedEyebrow}</span>
              <h2 className={`h2 ${styles.relatedTitle}`}>
                {t.relatedLead}{" "}
                <span className="accent accent--orange">{t.relatedAccent}</span>
              </h2>
            </div>
            <ul className={styles.relatedGrid}>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`${basePath}/${r.slug}`}
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
  );
}
