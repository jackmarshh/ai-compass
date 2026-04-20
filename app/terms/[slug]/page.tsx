import { notFound } from "next/navigation";

import { ConceptBody } from "@/components/concept/concept-body";
import { ConceptHeader } from "@/components/concept/concept-header";
import { RelatedConcepts } from "@/components/concept/related-concepts";
import { RelatedScenarios } from "@/components/concept/related-scenarios";
import { RelatedTutorials } from "@/components/concept/related-tutorials";
import { PageContainer } from "@/components/shared/page-container";
import {
  getAllConcepts,
  getConceptBySlug,
  getRelatedConcepts,
  getRelatedTutorials,
  getScenariosForConceptSlug,
} from "@/lib/content";
import { renderMdx } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/metadata";

type TermDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllConcepts().map((concept) => ({ slug: concept.slug }));
}

export async function generateMetadata({ params }: TermDetailPageProps) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (!concept) {
    return buildMetadata({
      title: "词条不存在",
      description: "你访问的词条页面不存在。",
      pathname: `/terms/${slug}`,
    });
  }

  return buildMetadata({
    title: concept.title,
    description: concept.summary,
    pathname: `/terms/${concept.slug}`,
  });
}

export default async function TermDetailPage({ params }: TermDetailPageProps) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (!concept) {
    notFound();
  }

  const content = await renderMdx(concept.body);
  const relatedConcepts = getRelatedConcepts(concept.relatedConceptSlugs);
  const relatedTutorials = getRelatedTutorials(concept.relatedTutorialSlugs);
  const relatedScenarios = getScenariosForConceptSlug(concept.slug);

  return (
    <PageContainer className="detail-page">
      <ConceptHeader concept={concept} />
      <div className="detail-layout">
        <ConceptBody concept={concept} scenarios={relatedScenarios} content={content} />
      </div>
      <RelatedScenarios scenarios={relatedScenarios} />
      <RelatedConcepts concepts={relatedConcepts} />
      <RelatedTutorials tutorials={relatedTutorials} />
    </PageContainer>
  );
}
