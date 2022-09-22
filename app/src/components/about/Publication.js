import { MDBIcon as Icon, MDBTypography as Type } from "mdbreact";
import HtmlParser from "react-html-parser";
import dateFormat from "dateformat";
import { useGeneralContext } from "../../contexts/GeneralContext";
import TimelineSection from "./TimelineSection";

function Publication() {
  const { generalState } = useGeneralContext();
  const data = generalState.cv.publication ?? [];

  return (
    <TimelineSection sectionName="Publications" icon="newspaper">
      <ul className="timeline">
        {data.map((dat, i) => (
          <li key={i}>
            <Type tag="h4" variant="h4-responsive" className="mb-0 d-md-inline">
              {dat.title}
            </Type>
            <div className="timeline-date text-muted float-md-right my-md-0 my-2">
              <Icon far icon="clock" className="mr-1" />
              {dateFormat(new Date(dat.publicationDate), "mmm yyyy")}
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
