import ProjectItem from "@/components/dev/ProjectItem.tsx";
import { DevProjectMetadata } from "@/types/dev.ts";

interface ProjectGroupProps {
  projects: DevProjectMetadata[];
}

function ProjectGroup({ projects }: ProjectGroupProps) {
  return projects.length === 0 ? null : (
    <div className="grid">
      {projects.map(project => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectGroup;
