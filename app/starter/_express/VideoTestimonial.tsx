"use client";

import { useRef, useState } from "react";
import styles from "./express.module.css";

export default function VideoTestimonial({
  name,
  role,
  poster,
  src,
}: {
  name: string;
  role: string;
  poster: string;
  src: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    const v = ref.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  }

  return (
    <div className={`${styles.videoCard} ${playing ? styles.videoCardPlaying : ""}`}>
      <video
        ref={ref}
        className={styles.videoEl}
        poster={poster}
        src={src}
        preload="none"
        playsInline
        controls={playing}
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <>
          <button
            type="button"
            className={styles.videoPlayBtn}
            onClick={play}
            aria-label={`Speel de review van ${name}`}
          >
            <span className={styles.videoPlay} aria-hidden>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 5v14l12-7z" />
              </svg>
            </span>
          </button>
          <div className={styles.videoMeta}>
            <div className={styles.videoName}>{name}</div>
            <div className={styles.videoRole}>{role}</div>
          </div>
        </>
      )}
    </div>
  );
}
