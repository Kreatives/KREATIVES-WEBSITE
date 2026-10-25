import HomeContent from "@/components/HomeContent";
import { reviewsSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      <HomeContent />
    </>
  );
}
