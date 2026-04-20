import { notFound } from "next/navigation";

import { ScenarioBody } from "@/components/scenario/scenario-body";
import { ScenarioHeader } from "@/components/scenario/scenario-header";
import { ScenarioLinks } from "@/components/scenario/scenario-links";
import { ScenarioTools } from "@/components/scenario/scenario-tools";
import { PageContainer } from "@/components/shared/page-container";
import {
  getAllScenarios,
  getRelatedConcepts,
  getRelatedTutorials,
  getScenarioBySlug,
} from "@/lib/content";
import { renderMdx } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/metadata";

type ScenarioDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllScenarios().map((scenario) => ({ slug: scenario.slug }));
}

export async function generateMetadata({ params }: ScenarioDetailPageProps) {
  const { slug } = await params;
  const scenario = getScenarioBySlug(slug);

  if (!scenario) {
    return buildMetadata({
      title: "场景不存在",
      description: "你访问的场景页面不存在。",
      pathname: `/scenarios/${slug}`,
    });
  }

  return buildMetadata({
    title: scenario.title,
    description: scenario.summary,
    pathname: `/scenarios/${scenario.slug}`,
  });
}

export default async function ScenarioDetailPage({ params }: ScenarioDetailPageProps) {
  const { slug } = await params;
  const scenario = getScenarioBySlug(slug);

  if (!scenario) {
    notFound();
  }

  const content = await renderMdx(scenario.body);
  const relatedConcepts = getRelatedConcepts(scenario.relatedConceptSlugs);
  const relatedTutorials = getRelatedTutorials(scenario.relatedTutorialSlugs);

  return (
    <PageContainer className="detail-page">
      <ScenarioHeader scenario={scenario} />
      <div className="detail-layout">
        <ScenarioBody scenario={scenario} content={content} />
        <ScenarioTools tools={scenario.recommendedTools} />
      </div>
      <ScenarioLinks concepts={relatedConcepts} tutorials={relatedTutorials} />
    </PageContainer>
  );
}
