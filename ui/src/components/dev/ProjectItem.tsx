import { AccessTime, Public } from "@mui/icons-material";
import dateFormat from "dateformat";

import Chip from "@/components/shared/Chip.tsx";
import { DevProjectMetadata, DevProjectStatus } from "@/types/dev.ts";

interface ProjectItemProps {
  project: DevProjectMetadata;
}

function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div
      key={project.id}
      className="mb-8 grid grid-cols-4 place-content-start gap-8 border-t border-solid border-slate-600 pt-8"
      data-aos="fade-up"
    >
      <div>
        <a
          href={
            project.status === DevProjectStatus.ARCHIVED
              ? undefined
              : project.projectUrl
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={project.coverPhoto}
            alt={project.title}
            className="aspect-square h-[300px] w-auto object-cover"
          />
        </a>
      </div>
      <div className="col-span-3">
        <div className="grid grid-cols-2">
          <div>
            <h4 className="text-3xl">{project.title}</h4>
          </div>
          <div className="flex place-content-end place-items-center text-gray-400">
            <AccessTime className="mr-2" />
            <p className="small-caps">
              {dateFormat(new Date(project.startDate), "mmm yyyy")} -{" "}
              {project.endDate
                ? dateFormat(new Date(project.endDate), "mmm yyyy")
                : "present"}
            </p>
          </div>
        </div>

        {!!project.organization && (
          <div className="my-4 flex place-items-center">
            <Public className="mr-2" />
            <p>
              <a
                href={project.organizationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.organization}
              </a>
            </p>
          </div>
        )}
        <p className="my-8">{project.summary}</p>
        <div>
          {project.technologies.split(", ").map(tech => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
