import HTMLReactParser from "html-react-parser";
import { AccessTime, Newspaper } from "@mui/icons-material";
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
    <TimelineSection
      name="Publications"
      icon={<Newspaper fontSize="inherit" sx={{ mr: "1em" }} />}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            p: 0,
          },
        }}
      >
        {data.data.publication.map(pub => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pb: 4 }}>
              <Grid container>
                <Grid item md>
                  <Typography variant="h5">{pub.title}</Typography>
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
                  {dateFormat(new Date(pub.publicationDate), "mmm yyyy")}
                </Grid>
              </Grid>
              <Typography variant="subtitle1">
                <Box
                  component="a"
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  {pub.journal} {pub.volume} {pub.journalCode}
                </Box>
              </Typography>
              <Typography variant="body1">
                {HTMLReactParser(pub.description)}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineSection>
  );
}

export default Project;
