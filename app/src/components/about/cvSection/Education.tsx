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
import { Box, Grid, Typography } from "@mui/material";
import dateFormat from "dateformat";
import { selectCV } from "../../../store/generalSlice";
import { useSelector } from "../../../store/hooks";
import TimelineSection from "../TimelineSection";

function Education() {
  const data = useSelector(selectCV);

  return (
    <TimelineSection name="Education" icon={<School fontSize="inherit" sx={{ mr: "1em" }} />}>
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
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Grid container>
                <Grid item md>
                  <Typography variant="h5">{ed.university}</Typography>
                </Grid>
                <Grid
                  item
                  md
                  container
                  justifyContent={{
                    xs: "flex-start",
                    md: "flex-end",
                  }}
                  sx={{ color: "text.secondary", fontVariant: "small-caps" }}
                >
                  <AccessTime sx={{ mr: 1 }} />
                  {dateFormat(new Date(ed.startDate), "mmm yyyy")} – {dateFormat(new Date(ed.endDate), "mmm yyyy")}
                </Grid>
              </Grid>
              <Typography variant="subtitle1">
                <Box
                  component="a"
                  href={ed.departmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  {ed.department}
                </Box>
              </Typography>
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
