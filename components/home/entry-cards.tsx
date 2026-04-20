import Link from "next/link";

const entryCards = [
  { href: "/terms", label: "我想先查一个词", description: "直接进入词条列表，按技术词汇快速浏览。" },
  { href: "/tutorials", label: "我想连着学一个主题", description: "从词条出发，再进入关联教程继续深入。" },
  { href: "/terms", label: "我想按分类找概念", description: "看模型、Agent、检索增强、协议等分类入口。" },
];

export function EntryCards() {
  return (
    <section className="content-section entry-cards">
      <div className="entry-grid">
        {entryCards.map((item) => (
          <Link key={`${item.label}-${item.href}`} href={item.href} className="entry-card">
            <span>{item.label}</span>
            <small>{item.description}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
