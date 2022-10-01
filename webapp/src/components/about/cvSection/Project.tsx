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
import { Box, Grid, Typography } from "@mui/material";
import dateFormat from "dateformat";
import { selectCV } from "../../../store/generalSlice";
import { useSelector } from "../../../store/hooks";
import TimelineSection from "../TimelineSection";

function Project() {
  const data = useSelector(selectCV);

  return (
    <TimelineSection name="Projects" icon={<AccountTree fontSize="inherit" sx={{ mr: "1em" }} />}>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            p: 0,
          },
        }}
      >
        {data.data.project.map(proj => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Grid container>
                <Grid item md>
                  <Typography variant="h5">{proj.name}</Typography>
                </Grid>
                <Grid
                  item
                  md={4}
                  container
                  justifyContent={{
                    xs: "flex-start",
                    md: "flex-end",
                  }}
                  sx={{ color: "text.secondary", fontVariant: "small-caps" }}
                >
                  <AccessTime sx={{ mr: 1 }} />
                  {dateFormat(new Date(proj.startDate), "mmm yyyy")} –{" "}
                  {proj.endDate ? dateFormat(new Date(proj.endDate), "mmm yyyy") : "present"}
                </Grid>
              </Grid>
              <Typography variant="subtitle1">
                <Box
                  component="a"
                  href={proj.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  {proj.linkHeader}
                </Box>
              </Typography>
              <Typography variant="body1">{proj.description}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineSection>
  );
}

export default Project;
