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
            dat.startDate = dateFormat(new Date(dat.startDate), "mmm yyyy");
            dat.endDate = dat.endDate ? dateFormat(new Date(dat.endDate), "mmm yyyy") : "present";
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
              {dat.startDate} – {dat.endDate}
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
