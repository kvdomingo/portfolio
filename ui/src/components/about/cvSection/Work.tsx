import { AccessTime, BusinessCenter } from "@mui/icons-material";
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

import ButtonLink from "@/components/shared/ButtonLink.tsx";
import { selectCV } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";

import TimelineSection from "../TimelineSection";

function Work() {
  const { data } = useSelector(selectCV);

  return (
    <TimelineSection
      name="Work"
      icon={<BusinessCenter fontSize="inherit" sx={{ mr: "1em" }} />}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            p: 0,
          },
        }}
      >
        {data.work.map(work => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className="pb-8">
              <div className="grid grid-cols-2">
                <div>
                  <h5 className="text-2xl">{work.position}</h5>
                </div>
                <div className="flex justify-start text-gray-300 small-caps md:justify-end">
                  <AccessTime className="mr-2" />
                  {dateFormat(new Date(work.startDate), "mmm yyyy")} –{" "}
                  {work.endDate
                    ? dateFormat(new Date(work.endDate), "mmm yyyy")
                    : "present"}
                </div>
              </div>
              <p>
                <a
                  href={work.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {work.institution}
                </a>
              </p>
              <p>{work.description}</p>
              {work.relatedProject && (
                <ButtonLink to={work.relatedProject}>
                  See in portfolio
                </ButtonLink>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineSection>
  );
}

export default Work;
