import type { ReactNode } from "react";

import type { Tutorial } from "@/types/content";

type TutorialBodyProps = {
  tutorial: Tutorial;
  content: ReactNode;
};

export function TutorialBody({ tutorial, content }: TutorialBodyProps) {
  return (
    <article className="detail-main surface-card">
      <div className="detail-block">
        <h2>这篇能帮你学会什么</h2>
        <p>{tutorial.goal}</p>
      </div>
      <div className="detail-block">
        <h2>适合谁</h2>
        <p>{tutorial.audience}</p>
      </div>
      <div className="detail-block prose">
        <h2>开始之前先知道</h2>
        {content}
      </div>
      {tutorial.sourceName && tutorial.sourceUrl ? (
        <div className="detail-block source-note">
          <h2>来源说明</h2>
          <p>
            本文基于外部公开资料整理，来源：
            <a href={tutorial.sourceUrl} target="_blank" rel="noreferrer">
              {tutorial.sourceName}
            </a>
          </p>
        </div>
      ) : null}
    </article>
  );
}
