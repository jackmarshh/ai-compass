import type { MetadataRoute } from "next";

import { getAllConcepts, getAllScenarios, getAllTutorials } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-compass.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/concepts", "/scenarios", "/tutorials"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const conceptRoutes = getAllConcepts().map((concept) => ({
    url: `${siteUrl}/terms/${concept.slug}`,
    lastModified: new Date(),
  }));

  const scenarioRoutes = getAllScenarios().map((scenario) => ({
    url: `${siteUrl}/scenarios/${scenario.slug}`,
    lastModified: new Date(),
  }));

  const tutorialRoutes = getAllTutorials().map((tutorial) => ({
    url: `${siteUrl}/tutorials/${tutorial.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...conceptRoutes, ...scenarioRoutes, ...tutorialRoutes];
}
