import { defineCollection, z } from "astro:content";

const svip = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    keywords: z.array(z.string()),
    cover: z.string(),
    courseSlug: z.string(),
    created: z.string().datetime(),
  }),
});

const dev = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    organization: z.string().nullable(),
    organizationUrl: z.string().url().nullable(),
    startDate: z.date(),
    endDate: z.date().nullable(),
    summary: z.string(),
    technologies: z.array(z.string()),
    cover: z.string(),
    status: z.enum(["live", "in progress", "archived"]),
  }),
});

export const collections = { dev, svip };
