import { PageContainer } from "@/components/shared/page-container";

export const metadata = {
  title: "关于我们",
  description: "了解 AI Compass 想解决什么问题，以及它适合哪些 AI 新手。",
};

export default function AboutPage() {
  return (
    <PageContainer className="generic-page">
      <section className="surface-card generic-panel">
        <p className="eyebrow">About AI Compass</p>
        <h1>这是一个给 AI 完全小白准备的学习入口站。</h1>
        <p>
          我们希望把“AI 到底是什么”“我能拿它做什么”“第一步该学什么”这些问题拆开讲清楚，
          让你不用一上来就被术语、产品名和复杂教程淹没。
        </p>
      </section>
    </PageContainer>
  );
}
