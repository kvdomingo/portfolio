import { MDBIcon as Icon, MDBTypography as Type } from "mdbreact";
import HtmlParser from "react-html-parser";
import dateFormat from "dateformat";
import { useGeneralContext } from "../../contexts/GeneralContext";
import TimelineSection from "./TimelineSection";

function Certification() {
  const { generalState } = useGeneralContext();
  const data = generalState.cv.certification ?? [];
  const scripts = [];
  data.forEach(dat => {
    dat.dateGranted = dateFormat(new Date(dat.dateGranted), "dd mmm yyyy");
    if (dat.dateExpired) dat.dateExpired = dateFormat(new Date(dat.dateExpired), "dd mmm yyyy");
    scripts.push(/<script>(.+)<\/script>/gi.exec(dat.description));
    if (scripts) {
      dat.description = dat.description.replace(scripts[0], "");
    }
  });
  loadScripts(scripts);

  function loadScripts(scripts) {
    // eslint-disable-next-line
    scripts.map(script => script && window.eval(script[1]));
  }

  return (
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
