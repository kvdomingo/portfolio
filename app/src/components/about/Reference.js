import { MDBTypography as Type } from "mdbreact";
import { useGeneralContext } from "../../contexts/GeneralContext";
import TimelineSection from "./TimelineSection";

function Reference() {
  const { generalState } = useGeneralContext();
  const data = generalState.cv.reference ?? [];

  return (
    <TimelineSection sectionName="References" icon="user-friends">
      <ul className="timeline">
        {data.map((dat, i) => (
          <li key={i}>
            <Type tag="h4" variant="h4-responsive" className="mb-0 d-md-inline">
              {dat.name}
            </Type>
            <p className="lead py-0">
              <a
                href={`mailto:${dat.email}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "mediumvioletred" }}
              >
                {dat.email}
              </a>
            </p>
            <div className="mt-2 mb-5">
              {dat.position}, {dat.institution}
            </div>
          </li>
        ))}
      </ul>
    </TimelineSection>
  );
}

export default Reference;
