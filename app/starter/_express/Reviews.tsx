import { reviewsPage, type Review } from "@/lib/site";
import VideoTestimonial from "./VideoTestimonial";
import styles from "./express.module.css";

const AVATARS = [1, 2, 3, 4, 5];

const VIDEOS = [
  {
    name: "Abdu Khalil",
    role: "Eigenaar healthchamps.nl & Gember Member",
    poster: "/projects/health-champs-testimonial-poster.webp",
    src: "/projects/health-champs-testimonial.mp4",
  },
  {
    name: "Mahmut Mazlum",
    role: "Eigenaar marketingbureau",
    poster: "/projects/mazadesign-testimonial-poster.webp",
    src: "/projects/mazadesign-testimonial.mp4",
  },
  {
    name: "Dokter Tigran",
    role: "Eigenaar springlongevity.com",
    poster: "/projects/tigran-testimonial-poster.webp",
    src: "/projects/tigran-testimonial.mp4",
  },
];

const REVIEWS = reviewsPage.items as Review[];

function RevCard({ r }: { r: Review }) {
  const img = r.photo ?? r.logo;
  return (
    <div className={styles.revCard}>
      <span className={styles.revStars}>★★★★★</span>
      <span className={styles.revHeadline}>{r.title}</span>
      <p className={styles.revQuote}>{r.quote}</p>
      <div className={styles.revAuthor}>
        {img ? (
          <img className={styles.revAvatarImg} src={img} alt="" />
        ) : (
          <span className={styles.revAvatar} style={{ background: r.color }}>
            {r.initials}
          </span>
        )}
        <div>
          <div className={styles.revName}>{r.author}</div>
          {r.company && <div className={styles.revCompany}>{r.company}</div>}
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const mid = Math.ceil(REVIEWS.length / 2);
  const rowA = REVIEWS.slice(0, mid);
  const rowB = REVIEWS.slice(mid);

  return (
    <section className={styles.reviews} data-reveal>
      <div className={styles.reviewsHead}>
        <span className={styles.pill} style={{ background: "#fff", border: "1px solid #eee" }}>
          Reviews
        </span>
        <h2 className={styles.reviewsTitle}>
          Dit is wat andere ondernemers{" "}
          <span className={styles.accent}>over mij zeggen.</span>
        </h2>
        <div className={styles.proof}>
          <div className={styles.avatars}>
            {AVATARS.map((n) => (
              <img key={n} src={`/starter/hero/av${n}.webp`} alt="" width={36} height={36} />
            ))}
          </div>
          <span className={styles.proofDiv} aria-hidden />
          <div className={styles.proofText}>
            <span className={styles.stars}>★★★★★</span> <b>5/5</b>
            <br />
            100+ websites gemaakt
          </div>
        </div>
      </div>

      <div className={styles.videoRow}>
        {VIDEOS.map((v) => (
          <VideoTestimonial key={v.name} {...v} />
        ))}
      </div>

      <div className={styles.revMarquee}>
        <div className={styles.revTrack}>
          {[...rowA, ...rowA].map((r, i) => (
            <RevCard r={r} key={`a${i}`} />
          ))}
        </div>
        <div className={`${styles.revTrack} ${styles.revTrackRev}`}>
          {[...rowB, ...rowB].map((r, i) => (
            <RevCard r={r} key={`b${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
