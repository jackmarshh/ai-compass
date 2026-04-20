import { ContentCard } from "@/components/shared/content-card";
import { SectionTitle } from "@/components/shared/section-title";
import type { Scenario } from "@/types/content";

type RelatedScenariosProps = {
  scenarios: Scenario[];
};

export function RelatedScenarios({ scenarios }: RelatedScenariosProps) {
  if (scenarios.length === 0) {
    return null;
  }

  return (
    <section className="content-section">
      <SectionTitle
        eyebrow="它会出现在哪"
        title="你会在哪些真实任务里碰到这个概念"
      />
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
  );
}
