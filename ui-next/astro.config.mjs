import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind(), sitemap()],
  output: "server",
  adapter: vercel(),
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
