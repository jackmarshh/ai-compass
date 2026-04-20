import { ContentCard } from "@/components/shared/content-card";
import { PageContainer } from "@/components/shared/page-container";
import { SectionTitle } from "@/components/shared/section-title";
import { Tag } from "@/components/shared/tag";
import { getAllScenarios } from "@/lib/content";

export const metadata = {
  title: "场景",
  description: "从写作、学习、办公等真实任务理解 AI 能帮你做什么。",
};

export default function ScenariosPage() {
  const scenarios = getAllScenarios();
  const groups = new Map<string, typeof scenarios>();

  for (const scenario of scenarios) {
    const groupKey = scenario.tags[0] ?? "其他";
    const existing = groups.get(groupKey) ?? [];
    groups.set(groupKey, [...existing, scenario]);
  }

  return (
    <PageContainer className="listing-page">
      <section className="surface-card generic-panel">
        <p className="eyebrow">Scenarios</p>
        <h1>先从需求出发，看 AI 在具体任务里能帮你做什么。</h1>
        <p>如果你不想先学一堆术语，那就从最接近自己的真实任务开始看。</p>
      </section>
      {[...groups.entries()].map(([group, items]) => (
        <section key={group} className="content-section">
          <SectionTitle eyebrow={group} title={`${group}类场景`} />
          <div className="content-grid">
            {items.map((scenario) => (
              <ContentCard
                key={scenario.slug}
                href={`/scenarios/${scenario.slug}`}
                title={scenario.title}
                summary={scenario.summary}
              >
                <div className="tag-row">
                  {scenario.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </ContentCard>
            ))}
          </div>
        </section>
      ))}
    </PageContainer>
  );
}
