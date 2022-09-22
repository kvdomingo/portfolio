import { MDBIcon as Icon, MDBTypography as Type } from "mdbreact";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { useGeneralContext } from "../../contexts/GeneralContext";
import TimelineSection from "./TimelineSection";

function Work() {
  const { generalState } = useGeneralContext();
  const data = generalState.cv.work ?? [];

  return (
    <TimelineSection sectionName="Work Experience" icon="briefcase">
      <ul className="timeline">
        {data.map((dat, i) => (
          <li key={i}>
            <Type tag="h4" variant="h4-responsive" className="mb-0 d-md-inline">
              {dat.position}
            </Type>
            <div className="timeline-date text-muted float-md-right my-md-0 my-2">
              <Icon far icon="clock" className="mr-1" />
              {dateFormat(new Date(dat.startDate), "mmm yyyy")} –{" "}
              {dat.endDate ? dateFormat(new Date(dat.endDate), "mmm yyyy") : "present"}
            </div>
            <p className="lead py-0">
              <a
                href={dat.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "mediumvioletred" }}
              >
                {dat.institution}
              </a>
            </p>
            <div className="mt-2 mb-5">
              <p>{dat.description}</p>
              {dat.relatedProject && (
                <Link to={dat.relatedProject} className="btn btn-outline-black btn-sm ml-0 mt-3">
                  See in portfolio
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </TimelineSection>
  );
}

export default Work;
