import type { Metadata } from "next";

type MetadataInput = {
  title: string;
  description: string;
  pathname: string;
};

export function buildMetadata({ title, description, pathname }: MetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title,
      description,
      url: pathname,
      type: "article",
      locale: "zh_CN",
      siteName: "AI Compass",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
