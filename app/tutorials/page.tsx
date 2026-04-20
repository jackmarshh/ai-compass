import { ContentCard } from "@/components/shared/content-card";
import { PageContainer } from "@/components/shared/page-container";
import { SectionTitle } from "@/components/shared/section-title";
import { Tag } from "@/components/shared/tag";
import { getAllTutorials } from "@/lib/content";
import { formatMinutes } from "@/lib/utils/format";

export const metadata = {
  title: "教程",
  description: "从零开始，一步步学会第一个真正可用的 AI 方法。",
};

export default function TutorialsPage() {
  const tutorials = getAllTutorials();

  return (
    <PageContainer className="listing-page">
      <section className="surface-card generic-panel">
        <p className="eyebrow">Tutorials</p>
        <h1>挑一篇教程，真正把 AI 用起来。</h1>
        <p>这里不讲复杂理论，重点是帮你走完“理解一个点并试出来”的过程。</p>
      </section>
      <section className="content-section">
        <SectionTitle eyebrow="全部教程" title="适合新手的上手清单" />
        <div className="content-grid">
          {tutorials.map((tutorial) => (
            <ContentCard
              key={tutorial.slug}
              href={`/tutorials/${tutorial.slug}`}
              title={tutorial.title}
              summary={tutorial.summary}
            >
              <div className="tag-row">
                <Tag>{tutorial.level === "beginner" ? "新手友好" : "进阶"}</Tag>
                <Tag>{formatMinutes(tutorial.estimatedMinutes)}</Tag>
              </div>
            </ContentCard>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
