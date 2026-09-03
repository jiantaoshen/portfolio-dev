import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.md",
  }),

  schema: z.object({
    lang: z.enum(["en", "sv", "zh"]),

    title: z.string(),
    description: z.string(),

    date: z.coerce.date(),
    readingTime: z.string(),

    tags: z.array(z.string()),

    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md",
  }),

  schema: z.object({
    lang: z.enum(["en", "sv", "zh"]),

    title: z.string(),
    description: z.string(),

    category: z.string(),
    status: z.string(),

    order: z.number().int().default(999),

    featured: z.boolean().default(false),
    featuredOrder: z.number().int().optional(),

    technologies: z
      .array(z.string())
      .default([]),

    highlights: z
      .array(z.string())
      .default([]),

    architecture: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
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
  blog,
  projects,
};