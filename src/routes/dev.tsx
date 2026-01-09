import { dev } from "@content";
import { SiGithub, SiPython } from "@icons-pack/react-simple-icons";
import { createFileRoute } from "@tanstack/react-router";
import { compareDesc } from "date-fns";
import { ProjectGroup } from "@/components/dev/project-group";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dev")({
  component: Dev,
});

function Dev() {
  const statuses = ["live", "in progress", "archived"] as const;

  return (
    <div className="container pb-8">
      <div className="mb-8 flex justify-start gap-4 md:justify-end">
        <Button variant="ghost" size="icon-lg" asChild>
          <a
            href="https://github.com/kvdomingo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGithub size={48} className="size-8" />
          </a>
        </Button>
        <Button variant="ghost" size="icon-lg" asChild>
          <a
            href="https://pypi.org/user/kvdomingo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiPython className="size-8" />
          </a>
        </Button>
      </div>

      {statuses.map((status) => {
        const filteredProjects = dev
          .filter((proj) => status === proj.status)
          .sort(
            (a, b) =>
              compareDesc(
                new Date(a.endDate ?? new Date()),
                new Date(b.endDate ?? new Date()),
              ) || compareDesc(new Date(a.startDate), new Date(b.startDate)),
          );

        if (filteredProjects.length === 0) return null;
        return (
          <ProjectGroup key={status} status={status} projects={filteredProjects} />
        );
      })}
    </div>
  );
}
