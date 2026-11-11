import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// AI-crawlers expliciet toestaan. LLM's nemen een site alleen mee in een
// antwoord als de bot er überhaupt in mag. De Content-Signal-regel (zelfde
// syntax als llms.txt-hosting-partijen gebruiken) maakt per bot leesbaar wat
// mag: gevonden worden en als invoer gebruikt worden ja, training nee.
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Admin en login hebben geen zoekwaarde; de scanresultaten zijn per
        // bezoeker uniek en staan al op noindex.
        disallow: ["/admin", "/login", "/website-scan/resultaat/"],
      },
      ...AI_AGENTS.map((agent) => ({
        userAgent: agent,
        allow: "/",
        disallow: ["/admin", "/login", "/website-scan/resultaat/"],
      })),
    ],
    sitemap: `${site.domain}/sitemap.xml`,
    host: site.domain,
  };
}
