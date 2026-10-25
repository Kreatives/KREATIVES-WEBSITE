import type { Metadata } from "next";
import StadPage from "@/components/stad/StadPage";
import { getStad } from "@/lib/steden";

const SLUG = "webdesign-utrecht";

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
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: stad.title,
      description: stad.meta,
    },
  };
}

export default function Page() {
  return <StadPage slug={SLUG} />;
}
