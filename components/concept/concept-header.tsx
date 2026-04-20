import { Tag } from "@/components/shared/tag";
import type { Concept } from "@/types/content";

type ConceptHeaderProps = {
  concept: Concept;
};

export function ConceptHeader({ concept }: ConceptHeaderProps) {
  return (
    <header className="detail-header surface-card">
      <p className="eyebrow">Concept</p>
      <h1>{concept.title}</h1>
      <p className="detail-summary">{concept.summary}</p>
      <div className="tag-row">
        {concept.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </header>
  );
}
