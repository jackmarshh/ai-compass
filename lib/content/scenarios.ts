import { createContentRepository } from "@/lib/content/mdx";

export function getAllScenarios() {
  return createContentRepository().getAllScenarios();
}

export function getScenarioBySlug(slug: string) {
  return createContentRepository().getScenarioBySlug(slug);
}

export function getFeaturedScenarios() {
  return createContentRepository().getFeaturedScenarios();
}
