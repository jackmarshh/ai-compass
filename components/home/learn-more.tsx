import { ContentCard } from "@/components/shared/content-card";
import { SectionTitle } from "@/components/shared/section-title";
import { formatMinutes } from "@/lib/utils/format";
import type { Tutorial } from "@/types/content";

type LearnMoreProps = {
  tutorials: Tutorial[];
};

export function LearnMore({ tutorials }: LearnMoreProps) {
  return (
    <section className="content-section">
      <SectionTitle
        eyebrow="Tutorials"
        title="和词条配套的教程"
        description="教程不是独立存在的，而是用来帮助你把某个词条真正学透。"
      />
      <div className="tutorial-list">
        {tutorials.map((tutorial, index) => (
          <ContentCard
            key={tutorial.slug}
            href={`/tutorials/${tutorial.slug}`}
            title={tutorial.title}
            summary={tutorial.summary}
            eyebrow={`第 ${index + 1} 篇`}
          >
            <div className="tag-row">
              <span className="tag">{tutorial.level === "beginner" ? "新手友好" : "进阶"}</span>
              <span className="tag">{formatMinutes(tutorial.estimatedMinutes)}</span>
            </div>
          </ContentCard>
        ))}
      </div>
    </section>
  );
}
