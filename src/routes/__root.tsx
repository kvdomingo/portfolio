import figtree from "@fontsource-variable/figtree?url";
import geistMono from "@fontsource-variable/geist-mono?url";
import rubik from "@fontsource-variable/rubik?url";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Navbar } from "@/components/common/navbar";
import { env } from "@/env";
import info from "@/info.json";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import appCss from "@/styles/base.css?url";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        httpEquiv: "delegate-ch",
        content:
          "sec-ch-width https://res.cloudinary.com; sec-ch-dpr https://res.cloudinary.com; sec-ch-viewport-width https://res.cloudinary.com;",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "p:domain_verify",
        content: "8e4753adcb7e777965ab4bcea65b7c85",
      },
      {
        property: "og:url",
        content: "https://kvd.studio",
      },
      {
        property: "og:site_name",
        content: info.title,
      },
      {
        property: "og:title",
        content: info.title,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:locale",
        content: "en_PH",
      },
      {
        property: "og:image",
        content:
          "https://res.cloudinary.com/kdphotography-assets/image/upload/v1/logo/logo-black.png",
      },
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "twitter:creator",
        content: "@rockentothemoon",
      },
      {
        name: "twitter:site",
        content: "@rockentothemoon",
      },
      {
        name: "twitter:image",
        content:
          "https://res.cloudinary.com/kdphotography-assets/image/upload/v1/logo/logo-black.png",
      },
      {
        name: "twitter:title",
        content: info.title,
      },
      {
        name: "twitter:image:alt",
        content: info.title,
      },
      {
        name: "google-site-verification",
        content: "O8dXlE8aWPqHSuA4FwbY6-L1AjW7ch4613PIr_5_fII",
      },
      {
        title: info.title,
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: figtree,
      },
      {
        rel: "stylesheet",
        href: rubik,
      },
      {
        rel: "stylesheet",
        href: geistMono,
      },
      {
        rel: "icon",
        href: "https://res.cloudinary.com/kdphotography-assets/image/upload/v1/logo/favicon.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo-black.png",
      },
    ],
    scripts: [
      env.PROD
        ? {
            src: "https://umami.kvd.studio/script.js",
            "data-website-id": "e8f2b1ca-e250-4210-ae13-8d69c10da232",
            defer: true,
          }
        : undefined,
    ],
  }),
  shellComponent: Layout,
});

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="dark min-h-screen bg-linear-to-b from-ctp-base to-ctp-crust">
        <Navbar />

        <main className="container mx-auto">{children}</main>

        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />

        <Scripts />
      </body>
    </html>
  );
}
