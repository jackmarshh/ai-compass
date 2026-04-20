import Link from "next/link";

import type { Concept, Tutorial } from "@/types/content";

type TutorialStepsProps = {
  tutorial: Tutorial;
  concepts: Concept[];
};

export function TutorialSteps({ tutorial, concepts }: TutorialStepsProps) {
  return (
    <aside className="detail-side surface-card">
      <h2>前置概念</h2>
      <div className="link-pile">
        {concepts.map((concept) => (
          <Link key={concept.slug} href={`/terms/${concept.slug}`} className="link-pile__item">
            {concept.title}
          </Link>
        ))}
      </div>
      <h2>步骤拆解</h2>
      <ol className="step-list">
        {tutorial.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <h2>注意事项</h2>
      <ul className="detail-list">
        {tutorial.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </aside>
  );
}
