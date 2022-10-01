import { Suspense, lazy, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AOS from "aos";
import "./App.css";
import FullPageLoading from "./components/shared/FullPageLoading";
import Navbar from "./components/shared/Navbar";

const Home = lazy(() => import("./components/home"));
const About = lazy(() => import("./components/about"));

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<FullPageLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
