import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container site-footer__inner">
        <div>
          <p className="site-footer__title">AI Compass | AI 技术词条库</p>
          <p className="site-footer__text">
            用清楚、结构化的方式，帮你快速查清 AI 系统里的关键技术词条。
          </p>
        </div>
        <div className="site-footer__links">
          <Link href="/terms">词条</Link>
          <Link href="/tutorials">教程</Link>
          <Link href="/about">关于</Link>
        </div>
      </div>
    </footer>
  );
}
