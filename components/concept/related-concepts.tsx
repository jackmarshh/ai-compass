import { ContentCard } from "@/components/shared/content-card";
import { SectionTitle } from "@/components/shared/section-title";
import type { Concept } from "@/types/content";

type RelatedConceptsProps = {
  concepts: Concept[];
};

export function RelatedConcepts({ concepts }: RelatedConceptsProps) {
  if (concepts.length === 0) {
    return null;
  }

  return (
    <section className="content-section">
      <SectionTitle eyebrow="顺手补一下" title="如果你想把这个词彻底看懂，再连着看这几个" />
      <div className="content-grid">
        {concepts.map((concept) => (
          <ContentCard
            key={concept.slug}
            href={`/terms/${concept.slug}`}
            title={concept.title}
            summary={concept.summary}
          />
        ))}
      </div>
    </section>
  );
}
