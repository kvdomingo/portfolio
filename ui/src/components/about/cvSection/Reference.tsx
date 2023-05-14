import { Group } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { selectCV } from "../../../store/generalSlice";
import { useSelector } from "../../../store/hooks";
import TimelineSection from "../TimelineSection";

function Reference() {
  const data = useSelector(selectCV);

  return (
    <TimelineSection
      name="References"
      icon={<Group fontSize="inherit" sx={{ mr: "1em" }} />}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            p: 0,
          },
        }}
      >
        {data.data.reference.map(ref => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pb: 2 }}>
              <Typography variant="h5">{ref.name}</Typography>
              <Typography variant="subtitle1">
                <Box
                  component="a"
                  href={`mailto:${ref.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  {ref.email}
                </Box>
              </Typography>
              <Typography variant="subtitle1">
                {ref.position}, {ref.institution}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineSection>
  );
}

export default Reference;
