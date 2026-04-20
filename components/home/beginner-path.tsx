import Link from "next/link";

import { SectionTitle } from "@/components/shared/section-title";

const beginnerSteps = [
  {
    step: "01",
    title: "先查这个词是什么",
    description: "先用一句话定义搞清楚它到底在说哪一层技术概念。",
    href: "/terms",
  },
  {
    step: "02",
    title: "再看它为什么重要",
    description: "把它放回模型、工具、检索、协议这些系统位置里理解。",
    href: "/terms",
  },
  {
    step: "03",
    title: "最后顺着教程深入",
    description: "如果这个词值得继续学，就跳到关联教程把它真正串起来。",
    href: "/tutorials",
  },
];

export function BeginnerPath() {
  return (
    <section className="content-section">
      <SectionTitle
        eyebrow="How To Use"
        title="先从这些核心词条开始"
        description="这是一个词条库，不是资讯站。最适合的阅读路径是查词、理解、再延伸。"
      />
      <div className="path-grid">
        {beginnerSteps.map((item) => (
          <Link key={item.step} href={item.href} className="path-card surface-card">
            <span className="path-card__step">{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
