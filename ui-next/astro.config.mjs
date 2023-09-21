import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind(), sitemap()],
  output: "static",
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
});
