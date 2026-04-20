# AI Compass MVP Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Chinese-language, static `ai-compass` MVP in Next.js that helps AI beginners move from concepts to scenarios and tutorials.

**Architecture:** Use a static Next.js App Router site with local MDX content and typed frontmatter. Keep the content pipeline in `lib/content`, render reusable page sections from `components`, and generate SEO metadata from content records so every page can be statically built and internally linked.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, MDX, gray-matter, Vitest, React Testing Library

---

## Chunk 1: Scaffold And Shared Shell

### Task 1: Create the application scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `next-env.d.ts`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx`
- Create: `app/about/page.tsx`
- Create: `components/shared/*`
- Create: `lib/utils/*`

- [ ] **Step 1: Write the failing smoke test for the root app shell**
- [ ] **Step 2: Run the test to confirm the app shell does not exist yet**
- [ ] **Step 3: Add the minimum scaffold, shared layout, and placeholder routes**
- [ ] **Step 4: Run the smoke test again and confirm it passes**
- [ ] **Step 5: Commit the scaffold chunk**

### Task 2: Define the shared visual system

**Files:**
- Modify: `app/globals.css`
- Modify: `components/shared/page-container.tsx`
- Modify: `components/shared/site-header.tsx`
- Modify: `components/shared/site-footer.tsx`
- Create: `components/shared/section-title.tsx`
- Create: `components/shared/tag.tsx`
- Create: `components/shared/content-card.tsx`

- [ ] **Step 1: Add/extend tests that assert the header, footer, and primary navigation render**
- [ ] **Step 2: Run the tests and verify they fail for the new expectations**
- [ ] **Step 3: Implement the shared components and global design tokens**
- [ ] **Step 4: Run the updated tests and verify they pass**
- [ ] **Step 5: Commit the shared shell chunk**

## Chunk 2: Content Pipeline And Validation

### Task 3: Define content types and MDX parsing

**Files:**
- Create: `types/content.ts`
- Create: `lib/content/mdx.ts`
- Create: `lib/content/concepts.ts`
- Create: `lib/content/scenarios.ts`
- Create: `lib/content/tutorials.ts`
- Create: `lib/seo/metadata.ts`
- Create: `mdx-components.tsx`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `tests/content/*.test.ts`

- [ ] **Step 1: Write failing tests for frontmatter parsing, featured queries, and missing-slug validation**
- [ ] **Step 2: Run the tests to verify they fail for the expected reasons**
- [ ] **Step 3: Implement typed MDX loading, schema validation, related-content lookup, and metadata helpers**
- [ ] **Step 4: Run the content tests and verify they pass**
- [ ] **Step 5: Commit the content pipeline chunk**

### Task 4: Add seed content for concepts, scenarios, and tutorials

**Files:**
- Create: `content/concepts/*.mdx`
- Create: `content/scenarios/*.mdx`
- Create: `content/tutorials/*.mdx`

- [ ] **Step 1: Add tests that load the full content set and assert cross-links are valid**
- [ ] **Step 2: Run the tests to watch them fail before the seed content exists**
- [ ] **Step 3: Create the initial 10 concepts, 5 scenarios, and 8 tutorials with frontmatter + body content**
- [ ] **Step 4: Run the content tests and verify the whole content graph passes**
- [ ] **Step 5: Commit the seed content chunk**

## Chunk 3: Pages, SEO, And Verification

### Task 5: Build the content pages and homepage modules

**Files:**
- Create: `app/concepts/page.tsx`
- Create: `app/concepts/[slug]/page.tsx`
- Create: `app/scenarios/page.tsx`
- Create: `app/scenarios/[slug]/page.tsx`
- Create: `app/tutorials/page.tsx`
- Create: `app/tutorials/[slug]/page.tsx`
- Create: `components/home/*`
- Create: `components/concept/*`
- Create: `components/scenario/*`
- Create: `components/tutorial/*`
- Create: `tests/app/*.test.tsx`

- [ ] **Step 1: Write failing render tests for the homepage and one page per content type**
- [ ] **Step 2: Run the tests to verify the new routes/components fail correctly**
- [ ] **Step 3: Implement the homepage, list pages, and detail-page templates with related links**
- [ ] **Step 4: Run the route/component tests and verify they pass**
- [ ] **Step 5: Commit the page-template chunk**

### Task 6: Add SEO endpoints and run full verification

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify: `app/layout.tsx`
- Modify: content route files to export page metadata

- [ ] **Step 1: Write failing tests for sitemap URLs and key metadata helpers where practical**
- [ ] **Step 2: Run the tests to confirm the SEO behavior is not implemented yet**
- [ ] **Step 3: Implement metadata generation, sitemap, robots, and canonical helpers**
- [ ] **Step 4: Run `npm test` and `npm run build` to verify the full MVP**
- [ ] **Step 5: Commit the SEO and verification chunk**

## Notes

- Use Chinese copy for all user-facing text and keep all slugs in English kebab-case.
- Keep the UI light, readable, and guidance-oriented rather than documentation-heavy.
- Treat scaffold/config creation as setup, but use TDD for custom logic and render behavior from the first meaningful feature onward.
