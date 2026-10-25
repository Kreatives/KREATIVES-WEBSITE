// IndexNow-ping na een geslaagde productiebuild (via de "postbuild"-hook).
// Meldt de belangrijkste URL's aan IndexNow (Bing, Yandex, e.a.) zodat nieuwe
// en gewijzigde pagina's sneller worden opgehaald. Draait alleen in productie
// en faalt nooit de build: elke fout wordt stil gelogd.

const HOST = "www.kreatives.nl";
const ORIGIN = `https://${HOST}`;

// De pagina's die er bij een deploy het meest toe doen (commercieel + nieuw).
const PATHS = [
  "/",
  "/diensten/webdesign",
  "/diensten/ai",
  "/website-scan",
  "/reviews",
  "/blog",
  "/webdesign-arnhem",
  "/webdesign-nijmegen",
  "/webdesign-apeldoorn",
  "/webdesign-utrecht",
  "/webdesign-rotterdam",
  "/webdesign-amsterdam",
  "/blog/bedrijf-gegroeid-website-niet",
  "/blog/wat-een-klant-opzoekt",
  "/blog/website-team-groei",
];

async function pingIndexNow(urls) {
  if (process.env.VERCEL_ENV !== "production") return;
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.log("[indexnow] overgeslagen: INDEXNOW_KEY ontbreekt");
    return;
  }
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key,
        keyLocation: `${ORIGIN}/${key}.txt`,
        urlList: urls,
      }),
    });
    console.log(`[indexnow] ${urls.length} URL's gemeld, status ${res.status}`);
  } catch (err) {
    console.log("[indexnow] melden mislukt:", err?.message ?? err);
  }
}

await pingIndexNow(PATHS.map((p) => `${ORIGIN}${p}`));
