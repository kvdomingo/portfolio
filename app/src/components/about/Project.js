import { MDBIcon as Icon, MDBTypography as Type } from "mdbreact";
import dateFormat from "dateformat";
import { useGeneralContext } from "../../contexts/GeneralContext";
import TimelineSection from "./TimelineSection";

function Project() {
  const { generalState } = useGeneralContext();
  const data = generalState.cv.project ?? [];

  return (
    <TimelineSection sectionName="Projects" icon="project-diagram">
      <ul className="timeline">
        {data.map((dat, i) => (
          <li key={i}>
            <Type tag="h4" variant="h4-responsive" className="mb-0 d-md-inline">
              {dat.name}
            </Type>
            <div className="timeline-date text-muted float-md-right my-md-0 my-2">
              <Icon far icon="clock" className="mr-1" />
              {dateFormat(new Date(dat.startDate), "mmm yyyy")} –{" "}
              {dat.endDate ? dateFormat(new Date(dat.endDate), "mmm yyyy") : "present"}
            </div>
            <p className="lead py-0">
              <a href={dat.linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: "mediumvioletred" }}>
                {dat.linkHeader}
              </a>
            </p>
            <div className="mt-2 mb-5">
              <p>{dat.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </TimelineSection>
  );
}

export default Project;
