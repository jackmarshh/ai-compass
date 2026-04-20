import Link from "next/link";

export function Hero() {
  return (
    <section className="hero surface-card">
      <div className="hero-editorial">
        <div className="hero-editorial__main">
          <p className="hero-kicker">AI Compass | AI Glossary</p>
          <h1>一个帮你查清 AI 技术词条的资料库。</h1>
          <p className="hero-summary">
            这里的重点不是泛泛聊 AI，而是把 Prompt、Agent、RAG、Skill、MCP
            这些关键术语讲清楚，并在需要的时候接上对应教程。
          </p>
          <div className="hero-actions">
            <Link href="/terms" className="hero-link hero-link--primary">
              <span>浏览全部词条</span>
              <small>按词条、分类和关联概念进入，快速找到你想查的技术概念。</small>
            </Link>
            <Link href="/tutorials" className="hero-link">
              <span>看精选教程</span>
              <small>当某个词条值得进一步理解时，直接跳到相关教程继续深入。</small>
            </Link>
          </div>
        </div>
        <aside className="hero-note">
          <p className="hero-note__label">阅读方式</p>
          <h2>先用这三步查词</h2>
          <ol className="hero-note__list">
            <li>先看一句话定义，确认这个词在系统里属于哪一层。</li>
            <li>再看为什么重要、怎么工作和一个简单例子。</li>
            <li>如果要继续深入，就顺着相关词条和教程往下读。</li>
          </ol>
        </aside>
      </div>
    </section>
  );
}
