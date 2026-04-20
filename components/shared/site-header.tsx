import Link from "next/link";

import { siteNavigation } from "@/lib/utils/routes";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-container site-header__inner">
        <Link href="/" className="site-brand">
          <span className="site-brand__mark">AI</span>
          <span className="site-brand__text">
            <strong>Compass</strong>
            <small>AI 技术词条库</small>
          </span>
        </Link>
        <nav aria-label="主导航" className="site-nav">
          {siteNavigation.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} className="site-nav__link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
