import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Admin en login hebben geen zoekwaarde; de scanresultaten zijn per
      // bezoeker uniek en staan al op noindex.
      disallow: ["/admin", "/login", "/website-scan/resultaat/"],
    },
    sitemap: `${site.domain}/sitemap.xml`,
    host: site.domain,
  };
}
