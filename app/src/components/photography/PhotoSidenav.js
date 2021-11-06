import { Component } from "react";
import { MDBNav as Nav } from "mdbreact";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const styles = {
  navPills: {
    position: "sticky",
    top: "100px",
  },
};

const pillsData = [
  { path: "", name: "latest", label: "latest" },
  { path: "/portraits", name: "portraits", label: "portraits" },
  { path: "/live", name: "live", label: "live" },
  { path: "/clients", name: "clients", label: "clients" },
  { path: "/samoetikerffa", name: "samoetikerffa", label: "#samoetikerffa" },
];

class PhotoSidenav extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    activePage: PropTypes.string.isRequired,
    togglePills: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.updateActivePill();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { match } = this.props;
    console.log(this.props.activePage);
    if (prevProps.match.url !== match.url) {
      this.updateActivePill();
    }
  }

  updateActivePill = () => {
    const url = this.props.location.pathname;
    let page = url.split("/").slice(-1)[0] === "photography" ? "latest" : url.split("/").slice(-1)[0];
    if (url.split("/").slice(-2)[0] === "clients") page = "clients";
    this.props.togglePills(null, page);
  };

  render() {
    const { activePage, match, togglePills } = this.props;
    const { url } = match;
    return (
      <Nav
        tag="div"
        className="nav-pills flex-column pl-md-2 pl-0 text-md-left text-center"
        style={styles.navPills}
        orientation="vertical"
      >
        {pillsData.map(data => (
          <Link
            to={`${url}${data.path}`}
            onClick={e => togglePills(e, data.name)}
            className={`nav-link my-1 ${activePage === data.name && "active"}`}
          >
            {data.label}
          </Link>
        ))}
      </Nav>
    );
  }
}

export default withRouter(PhotoSidenav);
