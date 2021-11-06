import { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import PropTypes from "prop-types";

const { NODE_ENV } = process.env;

class GAUtil extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (NODE_ENV === "production") {
      ReactGA.initialize("UA-162676656-2");
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (NODE_ENV === "production") {
      let prevLocation = prevProps.location;
      let { location } = this.props;
      if (prevLocation.pathname !== location.pathname) {
        ReactGA.pageview(`${location.pathname}${location.search}`);
      }
    }
  }

  render = () => null;
}

export default withRouter(GAUtil);
