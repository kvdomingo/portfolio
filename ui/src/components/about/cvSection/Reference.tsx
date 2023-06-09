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

import { selectCV } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";

import TimelineSection from "../TimelineSection";

function Reference() {
  const { data } = useSelector(selectCV);

  return (
    <TimelineSection
      name="References"
      icon={<Group fontSize="inherit" className="mr-[1em]" />}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            p: 0,
          },
        }}
      >
        {data.reference.map(reference => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className="pb-4">
              <h5 className="text-2xl">{reference.name}</h5>
              <a
                href={`mailto:${reference.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {reference.email}
              </a>
              <p>
                {reference.position}, {reference.institution}
              </p>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineSection>
  );
}

export default Reference;
