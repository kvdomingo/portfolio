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

const workExperience = defineCollection({
  type: "content",
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

export const collections = { dev, svip, workExperience };
