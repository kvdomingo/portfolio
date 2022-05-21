import { Fragment, useEffect, useState } from "react";
import { MDBTypography as Typography, MDBIcon as Icon } from "mdbreact";
import { Link } from "react-router-dom";
import HtmlParser from "react-html-parser";
import PropTypes from "prop-types";

function TimelineElement(props) {
  const [extractScript, setExtractScript] = useState([]);

  useEffect(() => {
    extractScript.map(script => (script ? window.eval(script[1]) : null));
  }, []);

  return (
    <li>
      <Typography tag="h4" variant="h4-responsive" className="mb-0 d-md-inline">
        {props.title}
      </Typography>
      <div className="timeline-date text-muted float-md-right my-md-0 my-2">
        <Icon far icon="clock" className="mr-1" />
        {props.startDate === "" ? `${props.endDate}` : `${props.startDate} – ${props.endDate}`}
      </div>
      <p className="lead py-0">
        {props.connection.map((conn, i) => {
          if (i === 0) {
            return (
              <Fragment key={i}>
                <a href={conn.href} target="_blank" rel="noopener noreferrer" style={{ color: "mediumvioletred" }}>
                  {conn.name}{" "}
                </a>
              </Fragment>
            );
          } else {
            return (
              <Fragment key={i}>
                |{" "}
                <a href={conn.href} target="_blank" rel="noopener noreferrer" style={{ color: "mediumvioletred" }}>
                  {conn.name}
                </a>
              </Fragment>
            );
          }
        })}
      </p>
      <div className="mt-2 mb-5">
        {props.description.map((desc, i) => {
          extractScript.push(/<script>(.+)<\/script>/gi.exec(desc));
          if (extractScript[i]) desc = desc.replace(extractScript[i][0], "");
          return (
            <p className="my-0" key={i}>
              {HtmlParser(desc)}
            </p>
          );
        })}
        {props.related ? (
          <Link to={`/${props.related}`} className="btn btn-outline-black btn-sm ml-0 mt-3">
            See in portfolio
          </Link>
        ) : null}
      </div>
    </li>
  );
}

TimelineElement.propTypes = {
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string.isRequired,
  connection: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }),
  ).isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  related: PropTypes.string,
};

export default TimelineElement;
