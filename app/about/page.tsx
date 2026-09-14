import AboutHero from "@/components/about/about-hero";
import FounderStory from "@/components/about/founder-story";
import HistoryTimeline from "@/components/about/history-timeline";
import ExpressionGrid from "@/components/about/expression-grid";
import LeadershipGrid from "@/components/about/leadership-grid";

export const metadata = {
  title: "About",
  description:
    "Discover the story, heritage, expressions and leadership of MIV Word House.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FounderStory />
      <HistoryTimeline />
      <ExpressionGrid />
      <LeadershipGrid />
    </>
  );
}
