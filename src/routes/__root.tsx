import spaceMono400 from "@fontsource/space-mono/400?url";
import spaceMono700 from "@fontsource/space-mono/700?url";
import figtree from "@fontsource-variable/figtree?url";
import rubik from "@fontsource-variable/rubik?url";
import spaceGrotesk from "@fontsource-variable/space-grotesk?url";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Navbar from "@/components/common/Navbar";
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
        property: "twitter:card",
        content: "summary",
      },
      {
        property: "twitter:creator",
        content: "@rockentothemoon",
      },
      {
        property: "twitter:site",
        content: "@rockentothemoon",
      },
      {
        property: "twitter:image",
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
        href: spaceGrotesk,
      },
      {
        rel: "stylesheet",
        href: spaceMono400,
      },
      {
        rel: "stylesheet",
        href: spaceMono700,
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
  }),
  component: Layout,
});

function Layout() {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-linear-to-b from-ctp-base to-ctp-crust">
        <Navbar />
        <main>
          <Outlet />
        </main>
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
