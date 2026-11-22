import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import rehypeMathJax from "rehype-mathjax";
import remarkMath from "remark-math";

const mathjaxConfig = () =>
  rehypeMathJax({
    tex: {
      tags: "ams",
    },
  });

// Icon paths from lucide: info, lightbulb, message-square-warning, triangle-alert, octagon-alert
const INFO_ICON = [
  "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20",
  "M12 16v-4",
  "M12 8h.01",
];
const ALERTS = {
  NOTE: { color: "info", icon: INFO_ICON },
  INFO: { color: "info", icon: INFO_ICON },
  TIP: {
    color: "success",
    icon: [
      "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      "M9 18h6",
      "M10 22h4",
    ],
  },
  IMPORTANT: {
    color: "primary",
    icon: [
      "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
      "M12 7v2",
      "M12 13h.01",
    ],
  },
  WARNING: {
    color: "warning",
    icon: [
      "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      "M12 9v4",
      "M12 17h.01",
    ],
  },
  CAUTION: {
    color: "error",
    icon: [
      "M12 16h.01",
      "M12 8v4",
      "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
    ],
  },
};

const alertIcon = paths => ({
  type: "element",
  tagName: "svg",
  properties: {
    viewBox: "0 0 24 24",
    width: 20,
    height: 20,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ariaHidden: "true",
  },
  children: paths.map(d => ({
    type: "element",
    tagName: "path",
    properties: { d },
    children: [],
  })),
});

const remarkAlerts = () => {
  const walk = node => {
    if (node.type === "blockquote") {
      const first = node.children[0];
      const text = first?.type === "paragraph" ? first.children[0] : null;
      const match =
        text?.type === "text" ? /^\[!(\w+)\]\s*/.exec(text.value) : null;
      const alert = match && ALERTS[match[1].toUpperCase()];
      if (alert) {
        text.value = text.value.slice(match[0].length);
        if (!text.value && first.children.length === 1) node.children.shift();
        const type = match[1].toUpperCase();
        node.children.unshift({
          type: "paragraph",
          data: {
            hProperties: { className: ["alert-title"] },
            hChildren: [alertIcon(alert.icon), { type: "text", value: type }],
          },
          children: [],
        });
        node.data = {
          hProperties: {
            className: ["alert-block"],
            style: `--alert-color: var(--color-${alert.color})`,
          },
        };
      }
    }
    node.children?.forEach(walk);
  };
  return walk;
};

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
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkAlerts],
      rehypePlugins: [mathjaxConfig],
    }),
  },
  compressHTML: true,
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
    plugins: [tailwindcss()],
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
