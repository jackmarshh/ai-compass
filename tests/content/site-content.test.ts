import { createContentRepository } from "@/lib/content/mdx";

describe("site content graph", () => {
  it("loads the full MVP content inventory", () => {
    const repository = createContentRepository();

    expect(repository.getAllConcepts()).toHaveLength(10);
    expect(repository.getAllScenarios()).toHaveLength(5);
    expect(repository.getAllTutorials()).toHaveLength(8);
  });

  it("keeps key beginner routes connected", () => {
    const repository = createContentRepository();
    const concepts = repository.getAllConcepts();
    const scenarios = repository.getAllScenarios();
    const tutorials = repository.getAllTutorials();

    for (const concept of concepts) {
      expect(concept.relatedTutorialSlugs.length).toBeGreaterThan(0);
    }

    for (const scenario of scenarios) {
      expect(scenario.relatedConceptSlugs.length).toBeGreaterThan(0);
      expect(scenario.relatedTutorialSlugs.length).toBeGreaterThan(0);
    }

    for (const tutorial of tutorials) {
      expect(tutorial.relatedConceptSlugs.length).toBeGreaterThan(0);
      expect(tutorial.relatedScenarioSlugs.length).toBeGreaterThan(0);
    }
  });
});
