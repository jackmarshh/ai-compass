import { createContentRepository } from "@/lib/content/mdx";

export function getAllConcepts() {
  return createContentRepository().getAllConcepts();
}

export function getConceptBySlug(slug: string) {
  return createContentRepository().getConceptBySlug(slug);
}

export function getFeaturedConcepts() {
  return createContentRepository().getFeaturedConcepts();
}
