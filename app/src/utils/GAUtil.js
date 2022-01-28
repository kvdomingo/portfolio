import ReactGA from "react-ga";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PROD = process.env.NODE_ENV === "production";

function GAUtil() {
  const location = useLocation();

  useEffect(() => {
    if (PROD) {
      ReactGA.initialize("G-TDY6KJHNDB");
    }
  }, []);

  useEffect(() => {
    if (PROD) {
      ReactGA.pageview(`${location.pathname}${location.search}`);
    }
  }, [location.pathname, location.search]);

  return null;
}

export default GAUtil;
