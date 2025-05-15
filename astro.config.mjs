import { defineConfig, envField, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
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
    plugins: [tailwindcss()],
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
      CLOUDINARY_API_KEY: envField.string({
        access: "secret",
        context: "server",
      }),
      CLOUDINARY_API_SECRET: envField.string({
        access: "secret",
        context: "server",
      }),
      PUBLIC_CLOUDINARY_CLOUD_NAME: envField.string({
        access: "public",
        context: "client",
      }),
      PUBLIC_POSTHOG_TOKEN: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
});
