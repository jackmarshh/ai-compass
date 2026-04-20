import { Tag } from "@/components/shared/tag";
import type { Scenario } from "@/types/content";

type ScenarioHeaderProps = {
  scenario: Scenario;
};

export function ScenarioHeader({ scenario }: ScenarioHeaderProps) {
  return (
    <header className="detail-header surface-card">
      <p className="eyebrow">Scenario</p>
      <h1>{scenario.title}</h1>
      <p className="detail-summary">{scenario.summary}</p>
      <div className="tag-row">
        {scenario.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </header>
  );
}
