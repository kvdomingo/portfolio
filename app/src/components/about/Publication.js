import { useEffect, useState } from "react";
import { MDBTypography as Type, MDBIcon as Icon } from "mdbreact";
import HtmlParser from "react-html-parser";
import dateFormat from "dateformat";
import TimelineSection from "./TimelineSection";
import Loading from "../../shared/Loading";
import api from "../../utils/Endpoints";
import { useGeneralContext } from "../../contexts/GeneralContext";

function Publication() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { generalState, generalDispatch } = useGeneralContext();

  useEffect(() => {
    if (generalState.cv.publications.loaded) {
      setData(generalState.cv.publications.data);
      setLoading(false);
    } else {
      api.cv
        .publications()
        .then(res => {
          let { data } = res;
          data.forEach(dat => {
            dat.publicationDate = dateFormat(new Date(dat.publicationDate), "mmm yyyy");
          });
          generalDispatch({
            type: "updateCVPublications",
            payload: { data, loaded: true },
          });
        })
        .catch(err => console.error(err.message))
        .finally(() => setLoading(false));
    }
  }, [generalState.cv.publications]);

  return loading ? (
    <Loading />
  ) : (
    <TimelineSection sectionName="Publications" icon="newspaper">
      <ul className="timeline">
        {data.map((dat, i) => (
          <li key={i}>
            <Type tag="h4" variant="h4-responsive" className="mb-0 d-md-inline">
              {dat.title}
            </Type>
            <div className="timeline-date text-muted float-md-right my-md-0 my-2">
              <Icon far icon="clock" className="mr-1" />
              {dat.publicationDate}
            </div>
            <p className="lead py-0">
              <a href={dat.url} target="_blank" rel="noopener noreferrer" style={{ color: "mediumvioletred" }}>
                {dat.journal}, {dat.volume} {dat.journalCode}
              </a>
            </p>
            <div className="mt-2 mb-5">
              {(() => {
                return <p className="my-0">{HtmlParser(dat.description)}</p>;
              })()}
            </div>
          </li>
        ))}
      </ul>
    </TimelineSection>
  );
}

export default Publication;
