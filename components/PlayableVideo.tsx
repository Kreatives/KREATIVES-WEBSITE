"use client";

import { useRef, useState } from "react";
import styles from "./PlayableVideo.module.css";

type Props = {
  src: string;
  poster?: string;
};

/**
 * Video met een duidelijke play-knop over het posterframe. Na de eerste keer
 * afspelen nemen de normale video-controls het over (pauze, scrubben, volume).
 * Speelt mét geluid (niet gedempt).
 */
export default function PlayableVideo({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function play() {
    const video = videoRef.current;
    if (!video) return;
    video.play();
    setStarted(true);
  }

  return (
    <div className={styles.wrap}>
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        controls={started}
      />
      {!started && (
        <button
          type="button"
          className={styles.play}
          onClick={play}
          aria-label="Video afspelen"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5.5v13l11-6.5-11-6.5z" />
          </svg>
        </button>
      )}
    </div>
  );
}
