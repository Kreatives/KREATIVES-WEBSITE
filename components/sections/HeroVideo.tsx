"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

/**
 * Achtergrondvideo voor de hero. Alleen op desktop: op mobiel (of bij
 * prefers-reduced-motion) laden we de video niet en blijft de achtergrondfoto
 * staan, zodat de site snel blijft.
 */
export default function HeroVideo({ poster }: { poster: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 721px)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setShow(desktop && !reduce);
  }, []);

  if (!show) return null;

  return (
    <video
      className={styles.video}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden
    >
      <source src="/brand/hero.webm" type="video/webm" />
      <source src="/brand/hero.mp4" type="video/mp4" />
    </video>
  );
}
