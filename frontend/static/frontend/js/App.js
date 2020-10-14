import React, { Suspense } from "react";
import AOS from "aos";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routes from "./components/Routes";
import Loading from "./components/FullPageLoading";

export default class App extends React.Component {
  componentDidMount() {
    AOS.init();
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Suspense fallback={<Loading />}>{Routes}</Suspense>
        <Footer />
      </Router>
    );
  }
}
