import { For, block } from "million/react";

import ProjectItem from "@/components/dev/ProjectItem.tsx";
import { MillionProps } from "@/types";
import {
  DevProjectMetadata,
  DevProjectStatusEnum,
  devProjectStatus,
} from "@/types/dev.ts";

interface ProjectGroupProps extends MillionProps {
  projects: DevProjectMetadata[];
  status: devProjectStatus;
}

const ProjectGroup = block<ProjectGroupProps>(({ projects, status }) => {
  return projects.length === 0 ? null : (
    <div className="my-8">
      <h3 className="mr-8 inline text-4xl before:h-[1em] before:w-[1em] before:border-[50%]">
        {DevProjectStatusEnum[status]}
      </h3>
      <div className="grid">
        <For each={projects}>
          {project => <ProjectItem key={project.id} project={project} />}
        </For>
      </div>
    </div>
  );
});

export default ProjectGroup;
