import { z, defineCollection } from "astro:content";

const svipCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    keywords: z.array(z.string()),
    cover: z.string(),
    courseSlug: z.string(),
    created: z.string().datetime(),
  }),
});

export const collections = {
  svip: svipCollection,
};
