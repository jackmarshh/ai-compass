import Link from "next/link";

import { SectionTitle } from "@/components/shared/section-title";

const termCategories = [
  {
    title: "Prompt 与上下文",
    description: "Prompt、Context、Token 这些输入层概念。",
    href: "/terms",
  },
  {
    title: "Agent 与工作流",
    description: "Agent、Workflow、Tool、Skill 这些执行层概念。",
    href: "/terms",
  },
  {
    title: "检索与知识增强",
    description: "RAG、Embedding、Vector Database、Memory 等知识增强概念。",
    href: "/terms",
  },
  {
    title: "协议与集成",
    description: "MCP、Function Calling、API 等连接外部能力的概念。",
    href: "/terms",
  },
];

export function FeaturedScenarios() {
  return (
    <section className="content-section">
      <SectionTitle
        eyebrow="Categories"
        title="按技术分类浏览"
        description="如果你已经大概知道自己想查哪一类概念，可以直接从这里进去。"
      />
      <div className="scenario-grid">
        {termCategories.map((category) => (
          <Link key={category.title} href={category.href} className="content-card surface-card">
            <p className="eyebrow">分类</p>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
