import { useEffect, useState } from "react";
import { MDBTypography as Type, MDBIcon as Icon } from "mdbreact";
import dateFormat from "dateformat";
import TimelineSection from "./TimelineSection";
import Loading from "../../shared/Loading";
import api from "../../utils/Endpoints";
import { useGeneralContext } from "../../contexts/GeneralContext";

function Education() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { generalState, generalDispatch } = useGeneralContext();

  useEffect(() => {
    if (generalState.cv.education.loaded) {
      setData(generalState.cv.education.data);
      setLoading(false);
    } else {
      api.cv
        .education()
        .then(res => {
          let { data } = res;
          data.forEach(dat => {
            dat.start_date = dateFormat(new Date(dat.start_date), "mmm yyyy");
            dat.end_date = dateFormat(new Date(dat.end_date), "mmm yyyy");
          });
          generalDispatch({
            type: "updateCVEducation",
            payload: { data, loaded: true },
          });
        })
        .catch(err => console.error(err.message))
        .finally(() => setLoading(false));
    }
  }, [generalState.cv.education]);

  return loading ? (
    <Loading />
  ) : (
    <TimelineSection sectionName="Education" icon="graduation-cap">
      <ul className="timeline">
        {data.map((dat, i) => (
          <li key={i}>
            <Type tag="h4" variant="h4-responsive" className="mb-0 d-md-inline">
              {dat.university}
            </Type>
            <div className="timeline-date text-muted float-md-right my-md-0 my-2">
              <Icon far icon="clock" className="mr-1" />
              {dat.start_date} – {dat.end_date}
            </div>
            <p className="lead py-0">
              <a
                href={dat.department_url}
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
