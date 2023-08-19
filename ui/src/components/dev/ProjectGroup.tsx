import ProjectItem from "@/components/dev/ProjectItem.tsx";
import {
  DevProjectMetadata,
  DevProjectStatus,
  DevProjectStatusEnum,
} from "@/types/dev.ts";

interface ProjectGroupProps {
  projects: DevProjectMetadata[];
  status: DevProjectStatus;
}

function ProjectGroup({ projects, status }: ProjectGroupProps) {
  return projects.length === 0 ? null : (
    <div className="mb-12">
      <h2 className="mb-4 text-5xl">{DevProjectStatusEnum[status]}</h2>
      <div className="flex flex-col">
        {projects.map(project => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectGroup;
