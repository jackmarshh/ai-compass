import fs from "node:fs";
import path from "node:path";
import { createElement, type ReactNode } from "react";

import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { z } from "zod";

import { mdxComponents } from "@/mdx-components";
import type {
  Concept,
  ConceptMeta,
  Scenario,
  ScenarioMeta,
  Tutorial,
  TutorialMeta,
} from "@/types/content";

const booleanWithDefault = z.boolean().optional().default(false);
const stringArray = z.array(z.string()).optional().default([]);

const conceptSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  plainExplanation: z.string().min(1),
  whatItDoes: z.string().min(1),
  example: z.string().min(1),
  relatedConceptSlugs: stringArray,
  relatedTutorialSlugs: stringArray,
  tags: stringArray,
  featured: booleanWithDefault,
});

const scenarioSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  whoIsItFor: z.string().min(1),
  whatAiCanDo: z.string().min(1),
  commonTasks: stringArray,
  recommendedTools: stringArray,
  relatedConceptSlugs: stringArray,
  relatedTutorialSlugs: stringArray,
  tags: stringArray,
  featured: booleanWithDefault,
});

const tutorialSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  level: z.enum(["beginner", "intermediate"]),
  audience: z.string().min(1),
  goal: z.string().min(1),
  estimatedMinutes: z.number().int().positive(),
  steps: z.array(z.string()).min(1),
  tips: z.array(z.string()).min(1),
  sourceName: z.string().min(1).optional(),
  sourceUrl: z.string().url().optional(),
  relatedConceptSlugs: stringArray,
  relatedScenarioSlugs: stringArray,
  featured: booleanWithDefault,
});

type ContentGraph = {
  concepts: Concept[];
  scenarios: Scenario[];
  tutorials: Tutorial[];
};

const defaultContentRoot = path.join(process.cwd(), "content");

function sortByFeaturedAndTitle<T extends { featured: boolean; title: string }>(items: T[]) {
  return [...items].sort((left, right) => {
    if (left.featured !== right.featured) {
      return Number(right.featured) - Number(left.featured);
    }

    return left.title.localeCompare(right.title, "zh-CN");
  });
}

function readCollection<
  TMeta extends {
    slug: string;
    title: string;
    featured: boolean;
  },
  TKind extends string,
>(
  directoryPath: string,
  schema: z.ZodType<TMeta, z.ZodTypeDef, unknown>,
  kind: TKind,
) {
  if (!fs.existsSync(directoryPath)) {
    return [] as Array<TMeta & { kind: TKind; body: string }>;
  }

  const filenames = fs
    .readdirSync(directoryPath)
    .filter((filename) => filename.endsWith(".mdx"))
    .sort();

  const entries = filenames.map((filename) => {
    const filePath = path.join(directoryPath, filename);
    const source = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(source);
    const metadata = schema.parse(data);

    return {
      ...metadata,
      kind,
      body: content.trim(),
    } as TMeta & { kind: TKind; body: string };
  });

  const duplicates = entries.reduce<string[]>((accumulator, entry) => {
    const currentCount = entries.filter((candidate) => candidate.slug === entry.slug).length;

    if (currentCount > 1 && !accumulator.includes(entry.slug)) {
      accumulator.push(entry.slug);
    }

    return accumulator;
  }, []);

  if (duplicates.length > 0) {
    throw new Error(`Duplicate slug detected in ${directoryPath}: ${duplicates.join(", ")}`);
  }

  return sortByFeaturedAndTitle(entries);
}

function assertRelatedSlugsExist(
  sourceLabel: string,
  sourceSlug: string,
  relatedSlugs: string[],
  validSlugs: string[],
) {
  const missing = relatedSlugs.filter((slug) => !validSlugs.includes(slug));

  if (missing.length > 0) {
    throw new Error(
      `${sourceLabel} "${sourceSlug}" references missing related slugs: ${missing.join(", ")}`,
    );
  }
}

function pickRelatedItems<T extends { slug: string }>(items: T[], slugs: string[]) {
  return slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is T => Boolean(item));
}

export function createContentRepository(contentRoot = defaultContentRoot) {
  const graph = (() => {
    const concepts = readCollection<ConceptMeta, "concept">(
      path.join(contentRoot, "concepts"),
      conceptSchema,
      "concept",
    ) as Concept[];
    const scenarios = readCollection<ScenarioMeta, "scenario">(
      path.join(contentRoot, "scenarios"),
      scenarioSchema,
      "scenario",
    ) as Scenario[];
    const tutorials = readCollection<TutorialMeta, "tutorial">(
      path.join(contentRoot, "tutorials"),
      tutorialSchema,
      "tutorial",
    ) as Tutorial[];

    const conceptSlugs = concepts.map((item) => item.slug);
    const scenarioSlugs = scenarios.map((item) => item.slug);
    const tutorialSlugs = tutorials.map((item) => item.slug);

    for (const concept of concepts) {
      assertRelatedSlugsExist("Concept", concept.slug, concept.relatedConceptSlugs, conceptSlugs);
      assertRelatedSlugsExist("Concept", concept.slug, concept.relatedTutorialSlugs, tutorialSlugs);
    }

    for (const scenario of scenarios) {
      assertRelatedSlugsExist(
        "Scenario",
        scenario.slug,
        scenario.relatedConceptSlugs,
        conceptSlugs,
      );
      assertRelatedSlugsExist(
        "Scenario",
        scenario.slug,
        scenario.relatedTutorialSlugs,
        tutorialSlugs,
      );
    }

    for (const tutorial of tutorials) {
      assertRelatedSlugsExist(
        "Tutorial",
        tutorial.slug,
        tutorial.relatedConceptSlugs,
        conceptSlugs,
      );
      assertRelatedSlugsExist(
        "Tutorial",
        tutorial.slug,
        tutorial.relatedScenarioSlugs,
        scenarioSlugs,
      );
    }

    return {
      concepts,
      scenarios,
      tutorials,
    } satisfies ContentGraph;
  })();

  return {
    getAllConcepts() {
      return graph.concepts;
    },
    getConceptBySlug(slug: string) {
      return graph.concepts.find((item) => item.slug === slug);
    },
    getFeaturedConcepts() {
      return graph.concepts.filter((item) => item.featured);
    },
    getAllScenarios() {
      return graph.scenarios;
    },
    getScenarioBySlug(slug: string) {
      return graph.scenarios.find((item) => item.slug === slug);
    },
    getFeaturedScenarios() {
      return graph.scenarios.filter((item) => item.featured);
    },
    getAllTutorials() {
      return graph.tutorials;
    },
    getTutorialBySlug(slug: string) {
      return graph.tutorials.find((item) => item.slug === slug);
    },
    getFeaturedTutorials() {
      return graph.tutorials.filter((item) => item.featured);
    },
    getRelatedConcepts(slugs: string[]) {
      return pickRelatedItems(graph.concepts, slugs);
    },
    getRelatedScenarios(slugs: string[]) {
      return pickRelatedItems(graph.scenarios, slugs);
    },
    getRelatedTutorials(slugs: string[]) {
      return pickRelatedItems(graph.tutorials, slugs);
    },
    getScenariosForConceptSlug(slug: string) {
      return graph.scenarios.filter((scenario) => scenario.relatedConceptSlugs.includes(slug));
    },
  };
}

export function renderMdx(source: string): ReactNode {
  return createElement(
    ReactMarkdown,
    { components: mdxComponents, remarkPlugins: [remarkGfm] },
    source,
  );
}
