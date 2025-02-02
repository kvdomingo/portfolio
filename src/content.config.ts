import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const dev = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/dev",
  }),
  schema: z.object({
    title: z.string(),
    url: z.string().url().nullable(),
    organization: z.string().nullable(),
    organizationUrl: z.string().url().nullable(),
    startDate: z.date(),
    endDate: z.date().nullable(),
    technologies: z.array(z.string()),
    cover: z.string().nullable(),
    status: z.enum(["live", "in progress", "archived"]),
    confidential: z.boolean().default(false),
  }),
});

const svip = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/svip",
  }),
  schema: z.object({
    title: z.string(),
    keywords: z.array(z.string()),
    cover: z.string(),
    courseSlug: z.string(),
    created: z.string().datetime(),
  }),
});

const workExperience = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/workExperience",
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    subtitleLink: z.string().nullable(),
    bodyLink: z.string().nullable(),
    caption: z.string().nullable(),
    captionLink: z.string().url().nullable(),
    startDate: z.date(),
    endDate: z.date().nullable(),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    keywords: z.array(z.string()),
    slug: z.string(),
    created: z
      .string()
      .datetime()
      .default(() => new Date().toISOString()),
    is_draft: z.boolean().default(true),
  }),
});

export const collections = { blog, dev, svip, workExperience };
