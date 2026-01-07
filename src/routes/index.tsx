import { createFileRoute } from "@tanstack/react-router";
import Dev from "@/components/home/whatIDo/Dev";
import Photography from "@/components/home/whatIDo/Photography";
import Vip from "@/components/home/whatIDo/Vip";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="container flex flex-col gap-36 py-12 text-center">
      <Photography />
      <Dev />
      <Vip />
    </div>
  );
}
