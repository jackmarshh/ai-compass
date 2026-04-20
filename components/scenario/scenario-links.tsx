import { ContentCard } from "@/components/shared/content-card";
import { SectionTitle } from "@/components/shared/section-title";
import { formatMinutes } from "@/lib/utils/format";
import type { Concept, Tutorial } from "@/types/content";

type ScenarioLinksProps = {
  concepts: Concept[];
  tutorials: Tutorial[];
};

export function ScenarioLinks({ concepts, tutorials }: ScenarioLinksProps) {
  return (
    <>
      <section className="content-section">
        <SectionTitle eyebrow="先补基础" title="先补这几个概念，再回来会更顺" />
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
      <section className="content-section">
        <SectionTitle eyebrow="接着做" title="直接去看这两类教程" />
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
    </>
  );
}
