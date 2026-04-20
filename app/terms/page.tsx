import { ContentCard } from "@/components/shared/content-card";
import { PageContainer } from "@/components/shared/page-container";
import { SectionTitle } from "@/components/shared/section-title";
import { Tag } from "@/components/shared/tag";
import { getAllConcepts, getFeaturedConcepts } from "@/lib/content";

export const metadata = {
  title: "词条",
  description: "快速查清 AI 技术词条，包括 Prompt、Agent、RAG、MCP 等核心概念。",
};

export default function TermsPage() {
  const concepts = getAllConcepts();
  const featuredConcepts = getFeaturedConcepts();

  return (
    <PageContainer className="listing-page">
      <section className="surface-card generic-panel">
        <p className="eyebrow">Terms</p>
        <h1>把 AI 技术词条讲清楚，再顺着教程往下学。</h1>
        <p>
          这里不是泛泛聊趋势，而是专门收录 AI 系统里的关键术语，帮你快速理解定义、作用和关联概念。
        </p>
      </section>
      <section className="content-section">
        <SectionTitle eyebrow="热门词条" title="先看这些高频核心术语" />
        <div className="content-grid">
          {featuredConcepts.map((concept) => (
            <ContentCard
              key={concept.slug}
              href={`/terms/${concept.slug}`}
              title={concept.title}
              summary={concept.summary}
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
      <section className="content-section">
        <SectionTitle eyebrow="全部词条" title="完整技术词条列表" />
        <div className="content-grid">
          {concepts.map((concept) => (
            <ContentCard
              key={concept.slug}
              href={`/terms/${concept.slug}`}
              title={concept.title}
              summary={concept.summary}
            >
              <div className="tag-row">
                {concept.tags.slice(0, 3).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </ContentCard>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
