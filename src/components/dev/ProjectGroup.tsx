import type { Dev } from "@content";
import ProjectItem from "./ProjectItem";

interface ProjectGroupProps {
  projects: Dev[];
  status: "live" | "in progress" | "archived";
}

export default function ProjectGroup({ projects, status }: ProjectGroupProps) {
  return (
    <div className="mb-12">
      <h2 className="mb-4 border-gray-700 border-b pb-2 font-bold text-2xl capitalize">
        {status}
      </h2>
      <div className="flex flex-col">
        {projects.map((project) => (
          <ProjectItem key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
