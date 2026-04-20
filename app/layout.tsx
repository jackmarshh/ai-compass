import type { Metadata } from "next";
import "./globals.css";

import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-compass.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Compass | 给 AI 小白的认知地图",
    template: "%s | AI Compass",
  },
  description:
    "AI Compass 用中文帮 AI 新手建立概念地图、理解使用场景，并一步步进入可执行教程。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main className="site-main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
