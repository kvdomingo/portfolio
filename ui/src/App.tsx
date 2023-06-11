import { Suspense, lazy, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AOS from "aos";
import { block } from "million/react";

import "./App.css";
import FullPageLoading from "./components/shared/FullPageLoading";
import GAUtil from "./components/shared/GAUtil";
import Navbar from "./components/shared/Navbar";

const About = lazy(() => import("./components/about"));
const Course = lazy(() => import("./components/coursework/Course"));
const Coursework = lazy(() => import("./components/coursework"));
const Dev = lazy(() => import("./components/dev"));
const Gallery = lazy(() => import("./components/photography/Gallery"));
const Home = lazy(() => import("./components/home"));
const Photography = lazy(() => import("./components/photography"));
const Post = lazy(() => import("./components/coursework/Post"));

const App = block(() => {
  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  return (
    <Router>
      <GAUtil />
      <Navbar />
      <Suspense fallback={<FullPageLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/photography" element={<Photography />}>
            <Route path=":gallerySlug" element={<Gallery />}>
              <Route path=":clientSlug" element={<Gallery />} />
            </Route>
            <Route path="" element={<Gallery />} />
          </Route>
          <Route path="/dev" element={<Dev />} />
          <Route path="/svip">
            <Route path=":courseSlug">
              <Route path=":postSlug" element={<Post />} />
              <Route path="" element={<Course />} />
            </Route>
            <Route path="" element={<Coursework />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
});

export default App;
