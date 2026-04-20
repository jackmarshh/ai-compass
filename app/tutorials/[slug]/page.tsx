import { notFound } from "next/navigation";

import { PageContainer } from "@/components/shared/page-container";
import { TutorialBody } from "@/components/tutorial/tutorial-body";
import { TutorialHeader } from "@/components/tutorial/tutorial-header";
import { TutorialLinks } from "@/components/tutorial/tutorial-links";
import { TutorialSteps } from "@/components/tutorial/tutorial-steps";
import {
  getAllTutorials,
  getRelatedConcepts,
  getRelatedScenarios,
  getTutorialBySlug,
} from "@/lib/content";
import { renderMdx } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/metadata";

type TutorialDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllTutorials().map((tutorial) => ({ slug: tutorial.slug }));
}

export async function generateMetadata({ params }: TutorialDetailPageProps) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) {
    return buildMetadata({
      title: "教程不存在",
      description: "你访问的教程页面不存在。",
      pathname: `/tutorials/${slug}`,
    });
  }

  return buildMetadata({
    title: tutorial.title,
    description: tutorial.summary,
    pathname: `/tutorials/${tutorial.slug}`,
  });
}

export default async function TutorialDetailPage({ params }: TutorialDetailPageProps) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) {
    notFound();
  }

  const content = await renderMdx(tutorial.body);
  const relatedConcepts = getRelatedConcepts(tutorial.relatedConceptSlugs);
  const relatedScenarios = getRelatedScenarios(tutorial.relatedScenarioSlugs);

  return (
    <PageContainer className="detail-page">
      <TutorialHeader tutorial={tutorial} />
      <div className="detail-layout">
        <TutorialBody tutorial={tutorial} content={content} />
        <TutorialSteps tutorial={tutorial} concepts={relatedConcepts} />
      </div>
      <TutorialLinks concepts={relatedConcepts} scenarios={relatedScenarios} />
    </PageContainer>
  );
}
