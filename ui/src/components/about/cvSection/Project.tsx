import { AccessTime, AccountTree } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import dateFormat from "dateformat";
import { block } from "million/react";

import { selectCV } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";

import TimelineSection from "../TimelineSection";

const Project = block(() => {
  const { data } = useSelector(selectCV);

  return (
    <TimelineSection
      name="Projects"
      icon={<AccountTree fontSize="inherit" className="mr-[1em]" />}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            p: 0,
          },
        }}
      >
        {data.project.map(project => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className="pb-8">
              <div className="grid grid-cols-2">
                <div>
                  <h5 className="text-2xl">{project.name}</h5>
                </div>
                <div className="flex justify-start text-gray-300 small-caps md:justify-end">
                  <AccessTime className="mr-2" />
                  {dateFormat(new Date(project.startDate), "mmm yyyy")} –{" "}
                  {project.endDate
                    ? dateFormat(new Date(project.endDate), "mmm yyyy")
                    : "present"}
                </div>
              </div>
              <a
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.linkHeader}
              </a>
              <p>{project.description}</p>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineSection>
  );
});

export default Project;
