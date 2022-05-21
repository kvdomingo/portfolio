import { lazy } from "react";
import { Route, Switch } from "react-router-dom";

const Home = lazy(() => import("../components/home/Home")),
  About = lazy(() => import("../components/about/About")),
  Photography = lazy(() => import("../components/photography/Photography")),
  Svip = lazy(() => import("../components/svip/Svip")),
  SvipSubject = lazy(() => import("../components/svip/Subject")),
  Dev = lazy(() => import("../components/dev/Dev")),
  Err404 = lazy(() => import("./404"));

const { NODE_ENV } = process.env;

const RedirectComponent = () => {
  const url = NODE_ENV === "development" ? "http://localhost:8000/admin/" : "https://api.kvdomingo.xyz/admin/";
  window.location.assign(url);
};

const routes = [
  { path: "/admin", name: "Admin", Component: RedirectComponent },
  { path: "/about", name: "About", Component: About },
  { path: "/photography", name: "Photography", Component: Photography },
  { path: "/dev", name: "Dev", Component: Dev },
  { path: "/svip/:courseSlug", name: "SVIP-Course", Component: SvipSubject },
  { path: "/svip", name: "SVIP", Component: Svip },
  { path: "/", name: "Home", Component: Home },
];

export default (
  <Switch>
    {routes.map(({ path, Component }, i) => (
      <Route key={i} path={path} exact={path === "/"} component={Component} />
    ))}
    <Route key="404" status={404}>
      <Err404 />
    </Route>
  </Switch>
);
