import { For, block } from "million/react";

import ProjectItem from "@/components/dev/ProjectItem.tsx";
import { MillionProps } from "@/types";
import { DevProjectMetadata } from "@/types/dev.ts";

interface ProjectGroupProps extends MillionProps {
  projects: DevProjectMetadata[];
}

const ProjectGroup = block<ProjectGroupProps>(({ projects }) => {
  return projects.length === 0 ? null : (
    <div className="grid">
      <For each={projects}>
        {project => <ProjectItem key={project.id} project={project} />}
      </For>
    </div>
  );
});

export default ProjectGroup;
