import { dev } from "@content";
import { SiGithub, SiPython } from "@icons-pack/react-simple-icons";
import { createFileRoute } from "@tanstack/react-router";
import { compareDesc } from "date-fns";
import ProjectGroup from "@/components/dev/ProjectGroup";

export const Route = createFileRoute("/dev")({
  component: Dev,
});

function Dev() {
  const statuses = ["live", "in progress", "archived"] as const;

  return (
    <div className="container pb-8">
      <div className="mb-8 flex justify-start gap-4 md:justify-end">
        <a
          href="https://github.com/kvdomingo"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-circle btn-ghost h-16 w-16"
        >
          <SiGithub size={48} />
        </a>
        <a
          href="https://pypi.org/user/kvdomingo/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-circle btn-ghost h-16 w-16"
        >
          <SiPython size={48} />
        </a>
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
