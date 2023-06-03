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
import { Grid, Typography } from "@mui/material";
import dateFormat from "dateformat";

import { selectCV } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";

import TimelineSection from "../TimelineSection";

function Education() {
  const data = useSelector(selectCV);

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
        {data.data.education.map(ed => (
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
              <Grid className="grid grid-cols-2">
                <div>
                  <h5 className="text-2xl">{ed.university}</h5>
                </div>
                <div className="flex justify-start text-gray-300 small-caps md:justify-end">
                  <AccessTime className="mr-2" />
                  {dateFormat(new Date(ed.startDate), "mmm yyyy")} –{" "}
                  {dateFormat(new Date(ed.endDate), "mmm yyyy")}
                </div>
              </Grid>
              <a
                href={ed.departmentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ed.department}
              </a>
              <Typography variant="body1" sx={{ my: 2 }}>
                {ed.degree}
              </Typography>
              <Typography variant="body2">
                Thesis: <i>{ed.thesis}</i>
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineSection>
  );
}

export default Education;
