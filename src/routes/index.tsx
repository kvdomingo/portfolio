import { createFileRoute } from "@tanstack/react-router";
import { Dev } from "@/components/home/what-i-do/dev";
import { Photography } from "@/components/home/what-i-do/photography";
import { Vip } from "@/components/home/what-i-do/vip";
import info from "@/info.json";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    links: [
      {
        rel: "canonical",
        href: info.canonicalBaseUrl,
      },
    ],
  }),
});

function Home() {
  return (
    <main className="container flex flex-col gap-36 py-12 text-center">
      <Photography />
      <Dev />
      <Vip />
    </main>
  );
}
