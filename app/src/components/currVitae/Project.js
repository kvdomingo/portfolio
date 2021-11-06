import { useEffect, useState } from "react";
import { MDBTypography as Type, MDBIcon as Icon } from "mdbreact";
import dateFormat from "dateformat";
import TimelineSection from "./TimelineSection";
import Loading from "../../shared/Loading";
import api from "../../utils/Endpoints";
import { useGeneralContext } from "../../contexts/GeneralContext";

function Project() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { generalState, generalDispatch } = useGeneralContext();

  useEffect(() => {
    if (generalState.cv.projects.loaded) {
      setData(generalState.cv.projects.data);
      setLoading(false);
    } else {
      api.cv
        .projects()
        .then(res => {
          let { data } = res;
          data.forEach(dat => {
            dat.start_date = dateFormat(new Date(dat.start_date), "mmm yyyy");
            dat.end_date = dat.end_date ? dateFormat(new Date(dat.end_date), "mmm yyyy") : "present";
          });
          generalDispatch({
            type: "updateCVProjects",
            payload: {
              data,
              loaded: true,
            },
          });
        })
        .catch(err => console.error(err.message))
        .finally(() => setLoading(false));
    }
  }, [generalState.cv.projects]);

  return loading ? (
    <Loading />
  ) : (
    <TimelineSection sectionName="Projects" icon="project-diagram">
      <ul className="timeline">
        {data.map((dat, i) => (
          <li key={i}>
            <Type tag="h4" variant="h4-responsive" className="mb-0 d-md-inline">
              {dat.name}
            </Type>
            <div className="timeline-date text-muted float-md-right my-md-0 my-2">
              <Icon far icon="clock" className="mr-1" />
              {dat.start_date} – {dat.end_date}
            </div>
            <p className="lead py-0">
              <a href={dat.link_url} target="_blank" rel="noopener noreferrer" style={{ color: "mediumvioletred" }}>
                {dat.link_header}
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
