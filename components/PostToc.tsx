import type { Heading } from "./PostContent";
import styles from "./PostToc.module.css";

export default function PostToc({ headings }: { headings: Heading[] }) {
  if (headings.length < 2) return null;
  return (
    <nav className={styles.toc} aria-label="Inhoudsopgave">
      <span className={styles.title}>In dit artikel</span>
      <ol className={styles.list}>
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? styles.sub : undefined}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
