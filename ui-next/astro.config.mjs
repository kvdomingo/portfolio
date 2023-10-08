import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeMathJax from "rehype-mathjax";

const mathjaxConfig = () =>
  rehypeMathJax({
    tex: {
      tags: "ams",
    },
  });

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap(),
    svelte({
      include: ["**/svelte/*"],
    }),
    react({
      include: ["**/react/*"],
    }),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: { theme: "material-theme-ocean" },
      gfm: true,
      remarkPlugins: [remarkMath],
      rehypePlugins: [mathjaxConfig],
    }),
  ],
  output: "hybrid",
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  vite: {
    resolve: {
      alias: {
        "@": "src",
      },
    },
  },
  site: "https://kvd.studio",
  adapter: node({
    mode: "standalone",
  }),
});
