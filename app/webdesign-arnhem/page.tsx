import type { Metadata } from "next";
import StadPage from "@/components/stad/StadPage";
import { getStad } from "@/lib/steden";
import { OG_IMAGE } from "@/lib/site";

const SLUG = "webdesign-arnhem";

export function generateMetadata(): Metadata {
  const stad = getStad(SLUG)!;
  return {
    title: stad.title,
    description: stad.meta,
    alternates: { canonical: `/${stad.slug}` },
    openGraph: {
      title: stad.title,
      description: stad.meta,
      url: `/${stad.slug}`,
      images: [OG_IMAGE],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: stad.title,
      description: stad.meta,
      images: [OG_IMAGE],
    },
  };
}

export default function Page() {
  return <StadPage slug={SLUG} />;
}
