import { GitHub, ViewQuilt } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import BasePage from "@/components/shared/BasePage.tsx";
import { selectProjects } from "@/store/devSlice.ts";
import { useSelector } from "@/store/hooks.ts";
import { DevProjectStatus } from "@/types/dev.ts";

import Loading from "../shared/Loading";
import Title from "../shared/Title";
import ProjectGroup from "./ProjectGroup";

function SoftwareDevelopment() {
  const projects = useSelector(selectProjects);

  return (
    <BasePage>
      <Title
        title="Software"
        description="Portfolio of Kenneth V. Domingo with relevant work on software development"
        keywords={[
          "software engineering",
          "web development",
          "app development",
          "software development",
          "full stack development",
          "blog",
          "dev diaries",
          "kvdomingo",
          "Kenneth V. Domingo",
        ]}
      />
      <div className="container pb-8">
        <div className="mb-8 text-right">
          <a
            href="https://github.com/kvdomingo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <GitHub fontSize="large" />
            </IconButton>
          </a>
          <a
            href="https://pypi.org/user/kvdomingo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <ViewQuilt fontSize="large" />
            </IconButton>
          </a>
        </div>
        {projects.loaded ? (
          (["LIV", "WIP", "OFF"] as DevProjectStatus[]).map(status => (
            <ProjectGroup
              key={status}
              status={status}
              projects={projects.data.filter(proj => proj.status === status)}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </BasePage>
  );
}

export default SoftwareDevelopment;
