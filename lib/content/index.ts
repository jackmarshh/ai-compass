import { createContentRepository } from "@/lib/content/mdx";

function getRepository() {
  return createContentRepository();
}

export function getAllConcepts() {
  return getRepository().getAllConcepts();
}

export function getConceptBySlug(slug: string) {
  return getRepository().getConceptBySlug(slug);
}

export function getFeaturedConcepts() {
  return getRepository().getFeaturedConcepts();
}

export function getAllScenarios() {
  return getRepository().getAllScenarios();
}

export function getScenarioBySlug(slug: string) {
  return getRepository().getScenarioBySlug(slug);
}

export function getFeaturedScenarios() {
  return getRepository().getFeaturedScenarios();
}

export function getAllTutorials() {
  return getRepository().getAllTutorials();
}

export function getTutorialBySlug(slug: string) {
  return getRepository().getTutorialBySlug(slug);
}

export function getFeaturedTutorials() {
  return getRepository().getFeaturedTutorials();
}

export function getRelatedConcepts(slugs: string[]) {
  return getRepository().getRelatedConcepts(slugs);
}

export function getRelatedScenarios(slugs: string[]) {
  return getRepository().getRelatedScenarios(slugs);
}

export function getRelatedTutorials(slugs: string[]) {
  return getRepository().getRelatedTutorials(slugs);
}

export function getScenariosForConceptSlug(slug: string) {
  return getRepository().getScenariosForConceptSlug(slug);
}
