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
import dateFormat from "dateformat";
import HTMLReactParser from "html-react-parser";
import { block } from "million/react";

import { selectCV } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";

import TimelineSection from "../TimelineSection";

const Project = block(() => {
  const { data } = useSelector(selectCV);

  return (
    <TimelineSection
      name="Publications"
      icon={<Newspaper fontSize="inherit" className="mr-[1em]" />}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            p: 0,
          },
        }}
      >
        {data.publication.map(publication => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className="pb-8">
              <div className="grid grid-cols-2">
                <div>
                  <h5 className="text-2xl">{publication.title}</h5>
                </div>
                <div className="flex justify-start text-gray-300 small-caps md:justify-end">
                  <AccessTime className="mr-2" />
                  {dateFormat(
                    new Date(publication.publicationDate),
                    "mmm yyyy",
                  )}
                </div>
              </div>
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {publication.journal} {publication.volume}{" "}
                {publication.journalCode}
              </a>
              <p>{HTMLReactParser(publication.description)}</p>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineSection>
  );
});

export default Project;
