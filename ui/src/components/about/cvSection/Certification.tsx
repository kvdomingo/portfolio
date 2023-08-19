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
import dateFormat from "dateformat";
import HTMLReactParser from "html-react-parser";
import { cloneDeep } from "lodash-es";

import { selectCV } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";

import TimelineSection from "../TimelineSection";

function Certification() {
  const { data } = cloneDeep(useSelector(selectCV));
  const scripts: any[] = [];

  data.certification.forEach(cert => {
    scripts.push(/<script>(.+)<\/script>/gi.exec(cert.description));
    if (scripts) {
      cert.description = cert.description.replace(scripts[0], "");
    }
  });

  scripts.forEach(script => script && window.eval(script[1]));

  return (
    <TimelineSection
      name="Certifications"
      icon={<WorkspacePremium fontSize="inherit" className="mr-[1em]" />}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            p: 0,
          },
        }}
      >
        {data.certification.map(cert => (
          <TimelineItem key={cert.id}>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className="pb-8">
              <div className="grid grid-cols-2">
                <div>
                  <h5 className="text-2xl">{cert.name}</h5>
                </div>
                <div className="flex justify-start text-gray-300 small-caps md:justify-end">
                  <AccessTime className="mr-2" />
                  {dateFormat(new Date(cert.dateGranted), "mmm yyyy")} –{" "}
                  {cert.dateExpired &&
                    dateFormat(new Date(cert.dateExpired), "mmm yyyy")}
                </div>
              </div>
              <a
                href={cert.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cert.institution}
              </a>
              <div>{HTMLReactParser(cert.description)}</div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineSection>
  );
}

export default Certification;
