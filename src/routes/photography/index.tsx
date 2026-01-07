import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/photography/")({
  beforeLoad: () => {
    throw redirect({ to: "/photography/latest" });
  },
});
