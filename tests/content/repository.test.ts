import path from "node:path";

import { createContentRepository } from "@/lib/content/mdx";

const validFixturesPath = path.join(process.cwd(), "tests/fixtures/content/valid");
const missingFieldFixturesPath = path.join(
  process.cwd(),
  "tests/fixtures/content/missing-required-field",
);
const brokenRelationFixturesPath = path.join(
  process.cwd(),
  "tests/fixtures/content/broken-related-slug",
);

describe("content repository", () => {
  it("loads frontmatter, featured data, and related links", () => {
    const repository = createContentRepository(validFixturesPath);

    const concepts = repository.getAllConcepts();
    const tutorials = repository.getAllTutorials();
    const scenarios = repository.getAllScenarios();

    expect(concepts).toHaveLength(2);
    expect(repository.getFeaturedConcepts().map((item) => item.slug)).toEqual(["prompt"]);
    expect(repository.getFeaturedTutorials().map((item) => item.slug)).toEqual([
      "write-your-first-good-prompt",
    ]);
    expect(repository.getRelatedConcepts(["context"]).map((item) => item.slug)).toEqual([
      "context",
    ]);
    expect(tutorials[0]?.estimatedMinutes).toBe(12);
    expect(scenarios[0]?.recommendedTools).toEqual(["ChatGPT", "豆包"]);
  });

  it("fails when a required field is missing", () => {
    expect(() => createContentRepository(missingFieldFixturesPath)).toThrow(/title/i);
  });

  it("fails when related content slugs do not exist", () => {
    expect(() => createContentRepository(brokenRelationFixturesPath)).toThrow(
      /missing related slugs/i,
    );
  });
});
