"use client";

import { useEffect, useRef } from "react";
import { tiktok } from "@/lib/site";
import { TikTok } from "@/components/icons";
import styles from "./TikTokMarquee.module.css";

export default function TikTokMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const loop = [...tiktok.videos, ...tiktok.videos];

  // Forceer muted + autoplay betrouwbaar (Safari zet het muted-attribuut niet
  // altijd via SSR, waardoor autoplay blokkeert).
  useEffect(() => {
    const vids = trackRef.current?.querySelectorAll("video") ?? [];
    vids.forEach((v) => {
      v.muted = true;
      const play = v.play();
      if (play?.catch) play.catch(() => {});
    });
  }, []);

  return (
    <section className={`section ${styles.sec}`} aria-label="Bekend van TikTok">
      <div className="container">
        <div className={styles.head} data-reveal>
          <span className="eyebrow">{tiktok.eyebrow}</span>
          <h2 className={`h2 ${styles.title}`}>
            {tiktok.titleLead}{" "}
            <span className="accent accent--orange">{tiktok.titleAccent}</span>
          </h2>
          <p className={styles.intro}>{tiktok.intro}</p>
        </div>
      </div>

      <div className="marquee">
        <div
          ref={trackRef}
          className="marquee__track"
          style={{ "--marquee-dur": "46s" } as React.CSSProperties}
        >
          {loop.map((v, i) => {
            const clone = i >= tiktok.videos.length;
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
                <video
                  className={styles.video}
                  src={v.src}
                  poster={v.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                <span className={styles.overlay} aria-hidden />
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
