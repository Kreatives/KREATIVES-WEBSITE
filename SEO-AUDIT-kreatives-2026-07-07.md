# SEO / GEO / AEO Audit — kreatives.nl

**Type:** Full Audit **Datum:** 7 juli 2026 **Domein:** https://www.kreatives.nl

| Dimensie | Score (start) | Score (na fixes) | Status |
|---|---|---|---|
| **SEO** (klassieke zoekmachines) | 8/10 | **9/10** | Sterk |
| **GEO** (AI-zoekmachines: ChatGPT, Perplexity, Gemini) | 7/10 | **8/10** | Sterk |
| **AEO** (featured snippets, voice) | 8/10 | **9/10** | Sterk |
| **Totaal** | 23/30 | **26/30** | SEO-monster in wording |

> **Doorgevoerd op 7 juli 2026** (commits `43127ae`, `7e02349`, live geverifieerd):
> H1 op `/contact` + `/faq` · `nofollow` op wa.me/Calendly-CTA's · blog-auteur
> → `Person` (Ricky Kai) + zichtbare byline · `FAQPage`-schema op `/faq` ·
> `priceRange` + `founder`-Person in het bedrijfsschema · titel-limiet (≤55)
> hard afgedwongen in de blog-pipeline.

**Grootste kracht:** De blog/kennisbank is uitzonderlijk goed opgebouwd voor AEO en AI-citaties — vraag-gestuurde H2's, TL;DR-antwoordparagrafen (~55 woorden), vergelijkingstabellen, prijsdata en geldige `FAQPage`-schema. Dit maakt de artikelen zeer geschikt voor featured snippets en om geciteerd te worden door AI-zoekmachines.

---

## Gecrawlde pagina's (18)

| Pagina | Type | Bevinding |
|---|---|---|
| `/` | Homepage | 1× H1, `ProfessionalService`-schema, complete meta + OG |
| `/diensten` | Dienst-index | Meta + canonical + OG ✓ |
| `/diensten/webdesign` | Dienstpagina | ~1.200 woorden, FAQ, sterke koppenstructuur ✓ |
| `/diensten/ai` | Dienstpagina | Meta + canonical ✓ |
| `/projecten` | Portfolio-index | Meta + canonical ✓ |
| `/projecten/burgers-frites` | Case study | ~350 woorden, meetbaar resultaat (+500% conversie), geen quote |
| `/projecten/*` (5 meer) | Case studies | Beeld-zwaar; sommige mager in tekst |
| `/blog` | Kennisbank-index | Meta + canonical ✓ |
| `/blog/wat-kost-een-website-...` | Artikel | ~1.300 woorden, vraag-H2's, TL;DR, tabellen, FAQ + schema ✓ |
| `/blog/ai-website-laten-maken` | Artikel | ⚠️ Title 83 tekens (te lang) |
| `/blog/*` (6 meer) | Artikelen | Sterke AEO-structuur |
| `/over-ons` | E-E-A-T | ~850 woorden; Ricky Kai genoemd, geen bio/credentials |
| `/werkwijze` | Proces | 1× H1 ✓ |
| `/reviews` | Social proof | 1× H1 ✓, veel reviews |
| `/contact` | Contact | ❌→✅ Miste H1 (gefixt), telefoon + e-mail + formulier |
| `/faq` | AEO | ❌→✅ Miste H1 (gefixt), veel Q&A |
| `/privacy`, `/voorwaarden` | Legal | 1× H1 ✓ |
| `/blauwdruk` | Lead magnet | 1× H1 ✓ |

`robots.txt` ✓ (Allow: /, sitemap-pointer) · `sitemap.xml` ✓ (18 URL's, lastmod) · HTTPS ✓ · OG-image ✓ (`/opengraph-image.png`, 200).

---

## SEO-analyse — 8/10

**Technisch on-page (sterk):**
- Elke pagina heeft een unieke `title` (template `%s | KREATIVES`), `meta description`, self-referencing `canonical`, en `robots: index, follow`.
- `metadataBase` correct gezet, OG + Twitter Card site-breed + per pagina.
- Schone, Nederlandstalige keyword-slugs (`/blog/wat-kost-een-website-laten-maken-in-2026`).
- `ProfessionalService` JSON-LD in de layout: naam, telefoon, e-mail, adres (Arnhem), openingstijden, `areaServed`, `sameAs` (social + Google).

**Openstaande SEO-punten:**
1. ✅ **2 pagina's zonder H1** (`/contact`, `/faq`) — hero-titel stond als `<h2>`. **Gefixt** (nu `<h1>`, zelfde styling).
2. ⚠️ **1 title te lang** — `/blog/ai-website-laten-maken` = 83 tekens. Doel: ≤ ~60. Kort in `/admin` in, bv. `AI-website laten maken: wat het kost en oplevert` (template voegt zelf ` | KREATIVES` toe).
3. ⚠️ **2 pagina's lage woordcount** — waarschijnlijk beeld-zware case studies (`/projecten/*`). Voeg 150–250 woorden context toe per project (uitdaging → aanpak → resultaat) — helpt óók GEO.
4. ⚠️ **30 pagina's lage text-HTML-ratio** — normaal voor een design-rijke site met veel markup/inline SVG. Lage prioriteit; geen actie nodig tenzij je content per pagina wilt verdiepen.
5. ⚠️ **Structured-data-waarschuwing** (zie GEO hieronder).

## GEO-analyse — 7/10

**Entiteit & vindbaarheid (sterk):** Merk consistent benoemd (KREATIVES, Arnhem, Gelderland), `ProfessionalService` + `sameAs` bouwen een duidelijke entiteitsgraaf. SSR (Next.js) = volledig crawlbaar voor AI-bots, geen JS-only content. Feitelijke dichtheid in blogs (concrete prijzen, %'s, doorlooptijden) is precies wat AI-engines citeren.

**Zwakke plekken voor AI-citatie (E-E-A-T):**
1. **Auteur = Organisatie, geen persoon.** `BlogPosting.author` is `Organization`. Google/AI-engines geven de voorkeur aan een benoemde `Person` met expertise. → Zet auteur op `Person` (Ricky Kai), met bio en `sameAs` naar zijn LinkedIn.
2. **Geen zichtbare auteur-byline + credentials** op artikelen en `/over-ons`. Er staat een foto "Ricky van KREATIVES" maar geen "geschreven door … / X jaar ervaring in …". Voeg een korte auteur-bio toe.
3. **Onvolledig adres-schema** — `PostalAddress` heeft alleen `addressLocality/region/country`, geen `streetAddress` of `postalCode`, en er is geen `priceRange`. Dit is de meest waarschijnlijke oorzaak van de "structured data doet niet aan Google-richtlijnen"-waarschuwing. → Vul een echt bedrijfsadres + postcode aan, of voeg minimaal `priceRange` toe. Valideer met de [Rich Results Test](https://search.google.com/test/rich-results).

## AEO-analyse — 8/10

**Featured-snippet-geschiktheid (sterk):** Blogartikelen openen met een TL;DR-directe-antwoordparagraaf (~55 woorden), gebruiken vraag-geformuleerde H2's ("Wat kost een website per maand?"), vergelijkingstabellen en genummerde lijsten — allemaal snippet-vriendelijk.

**Gestructureerde antwoorden:** Blogposts met een FAQ-sectie hebben geldige `FAQPage`-schema. 👍

**Openstaande AEO-punten:**
1. **`FAQPage`-schema alleen op blog, niet op dienst-/FAQ-pagina's.** De `/faq`-pagina en de FAQ-secties op `/diensten/webdesign` renderen wél Q&A maar zonder `FAQPage`-schema. → Voeg `FAQPage` JSON-LD toe aan `/faq` en de dienstpagina-FAQ's.
2. **Geen `HowTo`-schema** op procesinhoud (`/werkwijze` "Strategiegesprek → Design → Development → Livegang" is een perfecte `HowTo`-kandidaat).
3. **Geen `Speakable`-schema** (voice) — optioneel, lage prioriteit.

---

## Prioriteitenmatrix

| Prioriteit | Actie | Dimensie | Effort | Impact |
|---|---|---|---|---|
| 🟢 Quick win (gedaan) | H1 op `/contact` + `/faq` | SEO | Laag | Middel |
| 🟢 Quick win (gedaan) | `nofollow` op wa.me/Calendly-CTA's (429-warning weg) | SEO | Laag | Laag |
| 🟠 Hoog | Title `/blog/ai-website-laten-maken` inkorten naar ≤60 tekens | SEO | Laag | Middel |
| 🟠 Hoog | Adres-schema completeren of `priceRange` toevoegen → structured-data-warning weg | GEO/SEO | Laag | Middel |
| 🟠 Hoog | `BlogPosting.author` → `Person` (Ricky Kai) + zichtbare auteur-bio | GEO | Middel | Hoog |
| 🟡 Middel | `FAQPage`-schema op `/faq` + dienstpagina-FAQ's | AEO | Middel | Middel |
| 🟡 Middel | 150–250 woorden context per case study (`/projecten/*`) | SEO/GEO | Middel | Middel |
| 🟢 Quick win | `HowTo`-schema op `/werkwijze` | AEO | Laag | Laag |

## Wat werkt al goed
- **Volledige, unieke meta + canonicals** op elke pagina — geen duplicatie, geen per-ongeluk-noindex.
- **`ProfessionalService`-schema** met NAP, openingstijden, `areaServed` en `sameAs` — sterke lokale + entiteitssignalen voor Arnhem.
- **Kennisbank-architectuur**: vraag-H2's, TL;DR-antwoorden, tabellen, prijsdata en `FAQPage`-schema — modelvoorbeeld voor AEO en AI-citatie.
- **Schone techniek**: SSR, HTTPS, correcte `robots.txt` + `sitemap.xml` met `lastmod`, keyword-slugs, werkende OG-image.
- **Sterke trust-signalen**: 95+ projecten, 5/5 Google, doorlooptijd, echte reviews.

---

## Wat ik niet vanuit HTML kan meten
Voor deze signalen heb je aparte tools nodig:
- **Core Web Vitals / laadsnelheid / mobiel renderen** → [PageSpeed Insights](https://pagespeed.web.dev)
- **Backlink-profiel / domain authority** → Ahrefs / Semrush
- **Echte ranking-posities & impressies** → Google Search Console (GSC-integratie zit al deels in de codebase via `GSC_*`)

---

## Begrippen
- **SEO** — Search Engine Optimization: vindbaarheid in klassieke zoekmachines (Google, Bing).
- **GEO** — Generative Engine Optimization: geciteerd worden door AI-zoekmachines (ChatGPT Search, Perplexity, Google AI Overviews, Gemini). Beloont autoriteit, feitelijke rijkdom en duidelijke entiteiten.
- **AEO** — Answer Engine Optimization: featured snippets, "People Also Ask" en voice search. Vraagt om beknopte, direct-extraheerbare antwoorden.
