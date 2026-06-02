import ComingSoon from "@/components/ComingSoon";

// Tijdelijke "wij zijn bezig met de website"-screen.
// Terugzetten naar de echte site: hieronder <HomeContent /> renderen
// (import uit "@/components/HomeContent") in plaats van <ComingSoon />.
export default function Home() {
  return <ComingSoon />;
}
