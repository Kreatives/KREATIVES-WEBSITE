import Image from "next/image";
import { tiktok } from "@/lib/site";
import { TikTok } from "@/components/icons";
import styles from "./TikTokMarquee.module.css";

function Play() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function TikTokMarquee() {
  // Zolang er nog geen echte video's zijn: nette placeholder-tegels die naar
  // het TikTok-profiel linken. Vul tiktok.videos in lib/site.ts om ze te tonen.
  const items = tiktok.videos.length
    ? tiktok.videos
    : Array.from({ length: 6 }, () => ({
        poster: "",
        href: tiktok.profile,
        caption: "",
      }));
  const loop = [...items, ...items];

  return (
    <section className={`section ${styles.sec}`} aria-label="Bekend van TikTok">
      <div className="container">
        <p className={`eyebrow ${styles.label}`}>{tiktok.label}</p>
      </div>

      <div className="marquee">
        <div
          className="marquee__track"
          style={{ "--marquee-dur": "42s" } as React.CSSProperties}
        >
          {loop.map((v, i) => {
            const clone = i >= items.length;
            return (
              <a
                key={i}
                href={v.href}
                target="_blank"
                rel="noreferrer"
                className={styles.card}
                aria-hidden={clone}
                tabIndex={clone ? -1 : undefined}
              >
                {v.poster ? (
                  <Image
                    src={v.poster}
                    alt={v.caption || ""}
                    fill
                    sizes="210px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span className={styles.placeholder} aria-hidden />
                )}
                <span className={styles.overlay} aria-hidden />
                <span className={styles.play} aria-hidden>
                  <Play />
                </span>
                <span className={styles.handle}>
                  <TikTok className={styles.ico} />
                  {tiktok.handle}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
