import HTMLReactParser from "html-react-parser";
import { AccessTime, WorkspacePremium } from "@mui/icons-material";
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
import { cloneDeep } from "lodash-es";
import { selectCV } from "../../../store/generalSlice";
import { useSelector } from "../../../store/hooks";
import TimelineSection from "../TimelineSection";

function Certification() {
  const data = cloneDeep(useSelector(selectCV));
  const scripts: any[] = [];

  data.data.certification.forEach(cert => {
    scripts.push(/<script>(.+)<\/script>/gi.exec(cert.description));
    if (scripts) {
      cert.description = cert.description.replace(scripts[0], "");
    }
  });

  scripts.map(script => script && window.eval(script[1]));

  return (
    <TimelineSection name="Certifications" icon={<WorkspacePremium fontSize="inherit" sx={{ mr: "1em" }} />}>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            p: 0,
          },
        }}
      >
        {data.data.certification.map(cert => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pb: 4 }}>
              <Grid container>
                <Grid item md>
                  <Typography variant="h5">{cert.name}</Typography>
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
                  {dateFormat(new Date(cert.dateGranted), "mmm yyyy")} –{" "}
                  {cert.dateExpired && dateFormat(new Date(cert.dateExpired), "mmm yyyy")}
                </Grid>
              </Grid>
              <Typography variant="subtitle1">
                <Box
                  component="a"
                  href={cert.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  {cert.institution}
                </Box>
              </Typography>
              <Box>{HTMLReactParser(cert.description)}</Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineSection>
  );
}

export default Certification;
