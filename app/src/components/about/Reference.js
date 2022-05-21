import { useEffect, useState } from "react";
import { MDBTypography as Type } from "mdbreact";
import TimelineSection from "./TimelineSection";
import Loading from "../../shared/Loading";
import api from "../../utils/Endpoints";
import { useGeneralContext } from "../../contexts/GeneralContext";

function Reference() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { generalState, generalDispatch } = useGeneralContext();

  useEffect(() => {
    if (generalState.cv.references.loaded) {
      setData(generalState.cv.references.data);
      setLoading(false);
    } else {
      api.cv
        .references()
        .then(res => {
          let { data } = res;
          generalDispatch({
            type: "updateCVReferences",
            payload: { data, loaded: true },
          });
        })
        .catch(err => console.error(err.message))
        .finally(() => setLoading(false));
    }
  }, [generalState.cv.references]);

  return loading ? (
    <Loading />
  ) : (
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
