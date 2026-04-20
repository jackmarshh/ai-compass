import type { ReactNode } from "react";

import type { Concept, Scenario } from "@/types/content";

type ConceptBodyProps = {
  concept: Concept;
  scenarios: Scenario[];
  content: ReactNode;
};

export function ConceptBody({ concept, scenarios, content }: ConceptBodyProps) {
  return (
    <article className="detail-main surface-card">
      <div className="detail-block">
        <h2>一句话解释</h2>
        <p>{concept.plainExplanation}</p>
      </div>
      <div className="detail-block">
        <h2>为什么它重要</h2>
        <p>{concept.summary}</p>
      </div>
      <div className="detail-block">
        <h2>你会在哪些场景碰到它</h2>
        <p>{scenarios.length > 0 ? scenarios.map((scenario) => scenario.title).join("、") : "它会在很多入门教程和使用场景中反复出现。"}</p>
      </div>
      <div className="detail-block">
        <h2>它能帮你理解什么</h2>
        <p>{concept.whatItDoes}</p>
      </div>
      <div className="detail-block">
        <h2>一个生活化例子</h2>
        <p>{concept.example}</p>
      </div>
      <div className="detail-block prose">
        <h2>继续理解</h2>
        {content}
      </div>
    </article>
  );
}
