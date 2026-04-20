import { Tag } from "@/components/shared/tag";
import { formatMinutes } from "@/lib/utils/format";
import type { Tutorial } from "@/types/content";

type TutorialHeaderProps = {
  tutorial: Tutorial;
};

export function TutorialHeader({ tutorial }: TutorialHeaderProps) {
  return (
    <header className="detail-header surface-card">
      <p className="eyebrow">Tutorial</p>
      <h1>{tutorial.title}</h1>
      <p className="detail-summary">{tutorial.summary}</p>
      <div className="tag-row">
        <Tag>{tutorial.level === "beginner" ? "新手友好" : "进阶"}</Tag>
        <Tag>{formatMinutes(tutorial.estimatedMinutes)}</Tag>
      </div>
    </header>
  );
}
