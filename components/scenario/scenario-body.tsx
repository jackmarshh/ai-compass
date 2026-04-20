import type { ReactNode } from "react";

import type { Scenario } from "@/types/content";

type ScenarioBodyProps = {
  scenario: Scenario;
  content: ReactNode;
};

export function ScenarioBody({ scenario, content }: ScenarioBodyProps) {
  return (
    <article className="detail-main surface-card">
      <div className="detail-block">
        <h2>这个场景里，AI 真能帮你什么</h2>
        <p>{scenario.whatAiCanDo}</p>
      </div>
      <div className="detail-block">
        <h2>最适合哪些人</h2>
        <p>{scenario.whoIsItFor}</p>
      </div>
      <div className="detail-block">
        <h2>你可以先做的 3 件事</h2>
        <ul className="detail-list">
          {scenario.commonTasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </div>
      <div className="detail-block prose">
        <h2>继续理解这个场景</h2>
        {content}
      </div>
    </article>
  );
}
