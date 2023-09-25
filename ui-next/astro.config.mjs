import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

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
