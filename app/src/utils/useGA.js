import ReactGA from "react-ga4";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PROD = process.env.NODE_ENV === "production";

function useGA() {
  const location = useLocation();

  useEffect(() => {
    if (PROD) ReactGA.initialize("G-TDY6KJHNDB");
  }, []);

  useEffect(() => {
    if (PROD) ReactGA.send("pageview");
  }, [location.pathname]);

  return null;
}

export default useGA;
