import { ContentCard } from "@/components/shared/content-card";
import { SectionTitle } from "@/components/shared/section-title";
import { Tag } from "@/components/shared/tag";
import type { Concept } from "@/types/content";

type FeaturedConceptsProps = {
  concepts: Concept[];
};

export function FeaturedConcepts({ concepts }: FeaturedConceptsProps) {
  return (
    <section className="content-section">
      <SectionTitle
        eyebrow="Concepts"
        title="热门技术词条"
        description="先从这些最常被反复提到的技术术语开始，看清它们之间的关系。"
      />
      <div className="concept-grid">
        {concepts.map((concept) => (
          <ContentCard
            key={concept.slug}
            href={`/terms/${concept.slug}`}
            title={concept.title}
            summary={concept.summary}
            eyebrow="词条"
          >
            <div className="tag-row">
              {concept.tags.slice(0, 2).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </ContentCard>
        ))}
      </div>
    </section>
  );
}
