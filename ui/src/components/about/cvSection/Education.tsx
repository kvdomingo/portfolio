import { AccessTime, School } from "@mui/icons-material";
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

const Education = block(() => {
  const { data } = useSelector(selectCV);

  return (
    <TimelineSection
      name="Education"
      icon={<School fontSize="inherit" sx={{ mr: "1em" }} />}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            p: 0,
          },
        }}
      >
        {data.education.map(ed => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                color="primary"
                variant="outlined"
                className="text-indigo-400"
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className="grid grid-cols-2">
                <div>
                  <h5 className="text-2xl">{ed.university}</h5>
                </div>
                <div className="flex justify-start text-gray-300 small-caps md:justify-end">
                  <AccessTime className="mr-2" />
                  {dateFormat(new Date(ed.startDate), "mmm yyyy")} –{" "}
                  {dateFormat(new Date(ed.endDate), "mmm yyyy")}
                </div>
              </div>
              <a
                href={ed.departmentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ed.department}
              </a>
              <p className="my-4">{ed.degree}</p>
              <p className="text-sm">
                Thesis: <i>{ed.thesis}</i>
              </p>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineSection>
  );
});

export default Education;
