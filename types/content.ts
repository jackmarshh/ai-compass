export type TutorialLevel = "beginner" | "intermediate";

export type ConceptMeta = {
  title: string;
  slug: string;
  summary: string;
  plainExplanation: string;
  whatItDoes: string;
  example: string;
  relatedConceptSlugs: string[];
  relatedTutorialSlugs: string[];
  tags: string[];
  featured: boolean;
};

export type ScenarioMeta = {
  title: string;
  slug: string;
  summary: string;
  whoIsItFor: string;
  whatAiCanDo: string;
  commonTasks: string[];
  recommendedTools: string[];
  relatedConceptSlugs: string[];
  relatedTutorialSlugs: string[];
  tags: string[];
  featured: boolean;
};

export type TutorialMeta = {
  title: string;
  slug: string;
  summary: string;
  level: TutorialLevel;
  audience: string;
  goal: string;
  estimatedMinutes: number;
  steps: string[];
  tips: string[];
  sourceName?: string;
  sourceUrl?: string;
  relatedConceptSlugs: string[];
  relatedScenarioSlugs: string[];
  featured: boolean;
};

export type Concept = ConceptMeta & {
  kind: "concept";
  body: string;
};

export type Scenario = ScenarioMeta & {
  kind: "scenario";
  body: string;
};

export type Tutorial = TutorialMeta & {
  kind: "tutorial";
  body: string;
};
