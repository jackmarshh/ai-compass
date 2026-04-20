import { ContentCard } from "@/components/shared/content-card";
import { SectionTitle } from "@/components/shared/section-title";
import { formatMinutes } from "@/lib/utils/format";
import type { Tutorial } from "@/types/content";

type RelatedTutorialsProps = {
  tutorials: Tutorial[];
};

export function RelatedTutorials({ tutorials }: RelatedTutorialsProps) {
  if (tutorials.length === 0) {
    return null;
  }

  return (
    <section className="content-section">
      <SectionTitle eyebrow="下一步" title="看完这个词，最适合立刻跳去这些教程" />
      <div className="content-grid">
        {tutorials.map((tutorial) => (
          <ContentCard
            key={tutorial.slug}
            href={`/tutorials/${tutorial.slug}`}
            title={tutorial.title}
            summary={tutorial.summary}
          >
            <p className="content-card__meta">{formatMinutes(tutorial.estimatedMinutes)}</p>
          </ContentCard>
        ))}
      </div>
    </section>
  );
}
