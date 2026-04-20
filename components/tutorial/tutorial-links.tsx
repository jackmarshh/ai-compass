import { ContentCard } from "@/components/shared/content-card";
import { SectionTitle } from "@/components/shared/section-title";
import type { Concept, Scenario } from "@/types/content";

type TutorialLinksProps = {
  concepts: Concept[];
  scenarios: Scenario[];
};

export function TutorialLinks({ concepts, scenarios }: TutorialLinksProps) {
  return (
    <>
      <section className="content-section">
        <SectionTitle eyebrow="回头补基础" title="如果中间有词没吃透，就回查这几个概念" />
        <div className="content-grid">
          {concepts.map((concept) => (
            <ContentCard
              key={concept.slug}
              href={`/terms/${concept.slug}`}
              title={concept.title}
              summary={concept.summary}
            />
          ))}
        </div>
      </section>
      <section className="content-section">
        <SectionTitle eyebrow="学完后继续走" title="你可以去这些场景里把刚学的东西用起来" />
        <div className="content-grid">
          {scenarios.map((scenario) => (
            <ContentCard
              key={scenario.slug}
              href={`/scenarios/${scenario.slug}`}
              title={scenario.title}
              summary={scenario.summary}
            />
          ))}
        </div>
      </section>
    </>
  );
}
