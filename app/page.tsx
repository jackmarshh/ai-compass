import { BeginnerPath } from "@/components/home/beginner-path";
import { EntryCards } from "@/components/home/entry-cards";
import { FeaturedConcepts } from "@/components/home/featured-concepts";
import { FeaturedScenarios } from "@/components/home/featured-scenarios";
import { Hero } from "@/components/home/hero";
import { LearnMore } from "@/components/home/learn-more";
import { PageContainer } from "@/components/shared/page-container";
import {
  getFeaturedConcepts,
  getFeaturedTutorials,
} from "@/lib/content";

export default function HomePage() {
  const featuredConcepts = getFeaturedConcepts().slice(0, 4);
  const featuredTutorials = getFeaturedTutorials().slice(0, 4);

  return (
    <PageContainer className="home-page">
      <Hero />
      <EntryCards />
      <BeginnerPath />
      <FeaturedScenarios />
      <LearnMore tutorials={featuredTutorials} />
      <FeaturedConcepts concepts={featuredConcepts} />
    </PageContainer>
  );
}
