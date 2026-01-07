import rehypeShiki, { type RehypeShikiOptions } from "@shikijs/rehype";
import rehypeMathJax, { type Options as MathJaxOptions } from "rehype-mathjax";
import remarkMath from "remark-math";
import { defineCollection, defineConfig, s } from "velite";

const dev = defineCollection({
  name: "Dev",
  pattern: "dev/**/[^_]*.{md,mdx}",
  schema: s.object({
    title: s.string(),
    url: s.string().url().nullable(),
    organization: s.string().nullable(),
    organizationUrl: s.string().url().nullable(),
    startDate: s.coerce.date(),
    endDate: s.coerce.date().nullable(),
    technologies: s.array(s.string()),
    cover: s.string().nullable(),
    status: s.enum(["live", "in progress", "archived"]),
    confidential: s.boolean().default(false),
    content: s.mdx(),
    slug: s.path().transform((p) => p.replace(/^dev\//, "")),
  }),
});

const svip = defineCollection({
  name: "Svip",
  pattern: "svip/**/[^_]*.{md,mdx}",
  schema: s.object({
    title: s.string(),
    keywords: s.array(s.string()),
    cover: s.string(),
    courseSlug: s.string(),
    created: s.coerce.date(),
    content: s.mdx(),
    slug: s.path().transform((p) => p.split("/").pop()!),
  }),
});

const workExperience = defineCollection({
  name: "WorkExperience",
  pattern: "workExperience/**/[^_]*.{md,mdx}",
  schema: s.object({
    title: s.string(),
    subtitle: s.string(),
    subtitleLink: s.string().nullable(),
    bodyLink: s.string().nullable(),
    caption: s.string().nullable(),
    captionLink: s.string().url().nullable(),
    startDate: s.coerce.date(),
    endDate: s.coerce.date().nullable(),
    content: s.mdx(),
    slug: s.path().transform((p) => p.replace(/^workExperience\//, "")),
  }),
});

const blog = defineCollection({
  name: "Blog",
  pattern: "blog/**/[^_]*.{md,mdx}",
  schema: s.object({
    title: s.string(),
    summary: s.string(),
    keywords: s.array(s.string()),
    created: s.coerce.date().default(() => new Date()),
    is_draft: s.boolean().default(true),
    content: s.mdx(),
    slug: s.path().transform((p) => p.replace(/^blog\//, "")),
  }),
});

export default defineConfig({
  root: "./content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash].[ext]",
    clean: true,
  },
  collections: { dev, svip, workExperience, blog },
  mdx: {
    rehypePlugins: [
      [
        rehypeMathJax,
        {
          tex: {
            tags: "ams",
          },
        } satisfies MathJaxOptions,
      ],
      [
        rehypeShiki,
        {
          theme: "catppuccin-mocha",
        } satisfies RehypeShikiOptions,
      ],
    ],
    remarkPlugins: [remarkMath],
  },
});
