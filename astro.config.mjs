import { defineConfig, envField } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import rehypeMathJax from "rehype-mathjax";
import remarkMath from "remark-math";

const mathjaxConfig = () =>
  rehypeMathJax({
    tex: {
      tags: "ams",
    },
  });

// https://astro.build/config
export default defineConfig({
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    svelte({
      include: ["**/svelte/*"],
    }),
    react({
      include: ["**/react/*"],
    }),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "material-theme-ocean",
      },
      gfm: true,
      remarkPlugins: [remarkMath],
      rehypePlugins: [mathjaxConfig],
    }),
  ],
  redirects: {
    "/about": {
      destination: "/cv",
      status: 307,
    },
  },
  output: "server",
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
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
  env: {
    schema: {
      NODE_ENV: envField.enum({
        values: ["development", "production"],
        access: "public",
        context: "server",
        default: "production",
      }),
      PUBLIC_POSTHOG_TOKEN: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
});
