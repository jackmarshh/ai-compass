import { createContentRepository } from "@/lib/content/mdx";

export function getAllTutorials() {
  return createContentRepository().getAllTutorials();
}

export function getTutorialBySlug(slug: string) {
  return createContentRepository().getTutorialBySlug(slug);
}

export function getFeaturedTutorials() {
  return createContentRepository().getFeaturedTutorials();
}
