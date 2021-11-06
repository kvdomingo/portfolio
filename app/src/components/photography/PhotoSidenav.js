import { useEffect } from "react";
import { MDBNav as Nav } from "mdbreact";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

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

function PhotoSidenav({ activePage, togglePills }) {
  const match = useRouteMatch();
  const history = useHistory();
  const { url } = match;

  useEffect(() => {
    let url = history.location.pathname;
    let page = url.split("/").slice(-1)[0] === "photography" ? "latest" : url.split("/").slice(-1)[0];
    if (url.split("/").slice(-2)[0] === "clients") page = "clients";
    togglePills(null, page);
  }, [match.url]);

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

export default PhotoSidenav;
