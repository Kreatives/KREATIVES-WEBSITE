import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./PostContent.module.css";

/*
 * Lichtgewicht Markdown-renderer voor blogartikelen.
 * Body is een array van "blokken" (gesplitst op lege regels). Elk blok wordt
 * herkend als kop, lijst, tabel, citaat, redactienotitie of alinea. Inline
 * ondersteunt links [tekst](/url), **vet**, *cursief* en `code`.
 * Interne links (beginnend met /) worden Next <Link> zodat linkautoriteit
 * naar de money pages doorstroomt.
 */

export type Heading = { id: string; text: string; level: 2 | 3 };

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripInline(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

export function extractHeadings(blocks: string[]): Heading[] {
  const out: Heading[] = [];
  for (const b of blocks) {
    const m = b.match(/^(#{2,3})\s+(.*)$/);
    if (m) {
      const level = m[1].length as 2 | 3;
      const text = stripInline(m[2]);
      out.push({ id: slugifyHeading(text), text, level });
    }
  }
  return out;
}

const INLINE =
  /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;

function parseInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  INLINE.lastIndex = 0;
  while ((m = INLINE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const key = `${keyPrefix}-${i++}`;
    const [full, linkText, href, bold, italic, code] = m;
    if (linkText !== undefined && href !== undefined) {
      if (href.startsWith("/")) {
        nodes.push(
          <Link key={key} href={href} className={styles.link}>
            {linkText}
          </Link>
        );
      } else {
        nodes.push(
          <a
            key={key}
            href={href}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        );
      }
    } else if (bold !== undefined) {
      nodes.push(<strong key={key}>{bold}</strong>);
    } else if (italic !== undefined) {
      nodes.push(<em key={key}>{italic}</em>);
    } else if (code !== undefined) {
      nodes.push(<code key={key} className={styles.code}>{code}</code>);
    }
    last = m.index + full.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function cells(line: string): string[] {
  const parts = line.split("|").map((s) => s.trim());
  if (parts[0] === "") parts.shift();
  if (parts.length && parts[parts.length - 1] === "") parts.pop();
  return parts;
}

function renderBlock(block: string, idx: number): ReactNode {
  const key = `b-${idx}`;
  const lines = block.split("\n");

  // Koppen
  const h = block.match(/^(#{2,3})\s+(.*)$/);
  if (h) {
    const text = h[2].trim();
    const id = slugifyHeading(stripInline(text));
    if (h[1].length === 2) {
      return (
        <h2 key={key} id={id} className={styles.h2} data-reveal>
          {parseInline(text, key)}
        </h2>
      );
    }
    return (
      <h3 key={key} id={id} className={styles.h3} data-reveal>
        {parseInline(text, key)}
      </h3>
    );
  }

  // Redactienotitie / E-E-A-T-placeholder: [[NOTE: ...]]
  if (block.startsWith("[[NOTE:") && block.endsWith("]]")) {
    const text = block.slice("[[NOTE:".length, -2).trim();
    return (
      <aside key={key} className={styles.note} data-reveal>
        <span className={styles.noteLabel}>Nog toe te voegen</span>
        <span>{parseInline(text, key)}</span>
      </aside>
    );
  }

  // Tabel
  if (
    lines.length >= 2 &&
    lines[0].includes("|") &&
    /^[\s:|-]+$/.test(lines[1]) &&
    lines[1].includes("-")
  ) {
    const head = cells(lines[0]);
    const rows = lines.slice(2).filter((l) => l.includes("|")).map(cells);
    return (
      <div key={key} className={styles.tableWrap} data-reveal>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((c, i) => (
                <th key={i}>{parseInline(c, `${key}-h-${i}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((c, ci) => (
                  <td key={ci}>{parseInline(c, `${key}-${ri}-${ci}`)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Citaat / TL;DR-callout
  if (lines.every((l) => l.startsWith(">"))) {
    const inner = lines.map((l) => l.replace(/^>\s?/, "")).join(" ").trim();
    const isTldr = /^\*\*(tl;dr|samengevat)/i.test(inner);
    return (
      <blockquote
        key={key}
        className={`${styles.quote} ${isTldr ? styles.tldr : ""}`}
        data-reveal
      >
        {parseInline(inner, key)}
      </blockquote>
    );
  }

  // Genummerde lijst
  if (lines.every((l) => /^\d+\.\s+/.test(l))) {
    return (
      <ol key={key} className={styles.ol} data-reveal>
        {lines.map((l, li) => (
          <li key={li}>{parseInline(l.replace(/^\d+\.\s+/, ""), `${key}-${li}`)}</li>
        ))}
      </ol>
    );
  }

  // Opsommingslijst
  if (lines.every((l) => /^[-*]\s+/.test(l))) {
    return (
      <ul key={key} className={styles.ul} data-reveal>
        {lines.map((l, li) => (
          <li key={li}>{parseInline(l.replace(/^[-*]\s+/, ""), `${key}-${li}`)}</li>
        ))}
      </ul>
    );
  }

  // Gewone alinea
  return (
    <p key={key} className={styles.p} data-reveal>
      {parseInline(block, key)}
    </p>
  );
}

export default function PostContent({ blocks }: { blocks: string[] }) {
  const headings = extractHeadings(blocks);
  const showToc = headings.length >= 3;

  return (
    <div className={styles.body}>
      {showToc && (
        <nav className={styles.toc} aria-label="Inhoudsopgave" data-reveal>
          <span className={styles.tocTitle}>In dit artikel</span>
          <ol className={styles.tocList}>
            {headings.map((hd) => (
              <li
                key={hd.id}
                className={hd.level === 3 ? styles.tocSub : undefined}
              >
                <a href={`#${hd.id}`}>{hd.text}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      {blocks.map((b, i) => renderBlock(b, i))}
    </div>
  );
}
