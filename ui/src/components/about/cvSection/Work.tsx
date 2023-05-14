import { Link } from "react-router-dom";
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
import { Box, Button, Grid, Typography } from "@mui/material";
import dateFormat from "dateformat";
import { selectCV } from "../../../store/generalSlice";
import { useSelector } from "../../../store/hooks";
import TimelineSection from "../TimelineSection";

function Work() {
  const data = useSelector(selectCV);

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
        {data.data.work.map(w => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pb: 4 }}>
              <Grid container>
                <Grid item md>
                  <Typography variant="h5">{w.position}</Typography>
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
                  {dateFormat(new Date(w.startDate), "mmm yyyy")} –{" "}
                  {w.endDate
                    ? dateFormat(new Date(w.endDate), "mmm yyyy")
                    : "present"}
                </Grid>
              </Grid>
              <Typography variant="subtitle1">
                <Box
                  component="a"
                  href={w.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  {w.institution}
                </Box>
              </Typography>
              <Typography variant="body1">{w.description}</Typography>
              {w.relatedProject && (
                <Link to={w.relatedProject}>
                  <Button
                    color="inherit"
                    variant="outlined"
                    sx={{
                      color: "text.primary",
                      borderColor: "text.primary",
                      my: 2,
                    }}
                  >
                    See in portfolio
                  </Button>
                </Link>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineSection>
  );
}

export default Work;
