import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "@/components/common/Navbar";

export const Route = createRootRoute({
  component: Layout,
  head: () => ({
    meta: [
      {
        title: "KVD Studio",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "https://res.cloudinary.com/kdphotography-assets/image/upload/v1/logo/favicon.png",
      },
    ],
  }),
});

function Layout() {
  return (
    <>
      <HeadContent />
      <Scripts />

      <Navbar />
      <main className="min-h-screen py-12">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  );
}
