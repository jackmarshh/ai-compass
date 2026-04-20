import { permanentRedirect } from "next/navigation";

type ConceptDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ConceptDetailPage({ params }: ConceptDetailPageProps) {
  const { slug } = await params;
  permanentRedirect(`/terms/${slug}`);
}
