import { useEffect, useState } from "react";
import { MDBTypography as Type, MDBIcon as Icon } from "mdbreact";
import HtmlParser from "react-html-parser";
import dateFormat from "dateformat";
import TimelineSection from "./TimelineSection";
import Loading from "../../shared/Loading";
import api from "../../utils/Endpoints";
import { useGeneralContext } from "../../contexts/GeneralContext";

function Certification() {
  const [data, setData] = useState([]);
  const [script, setScript] = useState([]);
  const [loading, setLoading] = useState(true);
  const { generalState, generalDispatch } = useGeneralContext();

  useEffect(() => {
    if (generalState.cv.certifications.loaded) {
      setData(generalState.cv.certifications.data);
      setScript(generalState.cv.certifications.scripts);
      loadScripts(generalState.cv.certifications.scripts);
      setLoading(false);
    } else {
      api.cv
        .certifications()
        .then(res => {
          let { data } = res;
          let script = [];
          data.forEach(dat => {
            dat.dateGranted = dateFormat(new Date(dat.dateGranted), "dd mmm yyyy");
            if (dat.dateExpired) dat.dateExpired = dateFormat(new Date(dat.dateExpired), "dd mmm yyyy");
            script.push(/<script>(.+)<\/script>/gi.exec(dat.description));
            if (script) {
              dat.description = dat.description.replace(script[0], "");
            }
          });
          generalDispatch({
            type: "updateCVCertifications",
            payload: {
              data: data,
              scripts: script,
              loaded: true,
            },
          });
        })
        .catch(err => console.error(err.message))
        .finally(() => setLoading(false));
    }
  }, [generalState.cv.certifications]);

  function loadScripts(scripts) {
    // eslint-disable-next-line
    scripts.map(script => script && window.eval(script[1]));
  }

  return loading ? (
    <Loading />
  ) : (
    <TimelineSection sectionName="Certifications" icon="certificate">
      <ul className="timeline">
        {data.map((dat, i) => (
          <li key={i}>
            <Type tag="h4" variant="h4-responsive" className="mb-0 d-md-inline">
              {dat.name}
            </Type>
            <div className="timeline-date text-muted float-md-right my-md-0 my-2">
              <Icon far icon="clock" className="mr-1" />
              {dat.dateGranted}
              {dat.dateExpired && ` - ${dat.dateExpired}`}
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

export default Certification;
