import { Suspense, useEffect } from "react";
import AOS from "aos";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import Routes from "./shared/Routes";
import Loading from "./shared/FullPageLoading";
import { GeneralProvider } from "./contexts/GeneralContext";
import { CourseworkProvider } from "./contexts/CourseworkContext";
import "./App.css";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <GeneralProvider>
        <CourseworkProvider>
          <Navbar />
          <Suspense fallback={<Loading />}>{Routes}</Suspense>
        </CourseworkProvider>
      </GeneralProvider>
      <Footer />
    </Router>
  );
}

export default App;
