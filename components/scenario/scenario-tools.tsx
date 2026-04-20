import { Tag } from "@/components/shared/tag";

type ScenarioToolsProps = {
  tools: string[];
};

export function ScenarioTools({ tools }: ScenarioToolsProps) {
  if (tools.length === 0) {
    return null;
  }

  return (
    <aside className="detail-side surface-card">
      <h2>这类任务常用工具</h2>
      <div className="tag-row">
        {tools.map((tool) => (
          <Tag key={tool}>{tool}</Tag>
        ))}
      </div>
    </aside>
  );
}
