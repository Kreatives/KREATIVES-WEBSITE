// Blogslugs die een 301 hebben (zie next.config.mjs). Ze staan nog in de
// database, maar horen niet meer in de sitemap of het blogoverzicht: een link
// naar een redirect is een omweg die je bezoeker en Google onnodig maken.
export const REDIRECTED_SLUGS = new Set([
  "drie-redenen-om-je-site-opnieuw-te-laten-bouwen",
]);
