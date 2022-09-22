import { MDBIcon as Icon, MDBTypography as Type } from "mdbreact";
import dateFormat from "dateformat";
import { useGeneralContext } from "../../contexts/GeneralContext";
import TimelineSection from "./TimelineSection";

function Education() {
  const { generalState } = useGeneralContext();
  const data = generalState.cv.education ?? [];

  return (
    <TimelineSection sectionName="Education" icon="graduation-cap">
      <ul className="timeline">
        {data.map((dat, i) => (
          <li key={i}>
            <Type tag="h4" variant="h4-responsive" className="mb-0 d-md-inline">
              {dat.university}
            </Type>
            <div className="timeline-date text-muted float-md-right my-md-0 my-2">
              <Icon far icon="clock" className="mr-1" />
              {dateFormat(new Date(dat.startDate), "mmm yyyy")} – {dateFormat(new Date(dat.endDate), "mmm yyyy")}
            </div>
            <p className="lead py-0">
              <a
                href={dat.departmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "mediumvioletred" }}
              >
                {dat.department}
              </a>
            </p>
            <p className="mt-2">{dat.degree}</p>
            <p>
              Thesis: <i>{dat.thesis}</i>
            </p>
          </li>
        ))}
      </ul>
    </TimelineSection>
  );
}

export default Education;
