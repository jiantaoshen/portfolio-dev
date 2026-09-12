import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md",
  }),

  schema: z.object({
    lang: z.enum(["en", "sv", "zh"]),

    title: z.string(),
    description: z.string(),

    status: z.string(),

    order: z.number().int().default(999),

    technologies: z
      .array(z.string())
      .default([]),

    links: z
      .object({
        github: z.httpUrl().optional(),
        live: z.httpUrl().optional(),
      })
      .optional(),

    draft: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
};