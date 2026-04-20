import Link from "next/link";
import type { PropsWithChildren } from "react";

type ContentCardProps = PropsWithChildren<{
  href: string;
  title: string;
  summary: string;
  eyebrow?: string;
}>;

export function ContentCard({
  href,
  title,
  summary,
  eyebrow,
  children,
}: ContentCardProps) {
  return (
    <Link href={href} className="content-card surface-card">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h3>{title}</h3>
      <p>{summary}</p>
      {children}
    </Link>
  );
}
