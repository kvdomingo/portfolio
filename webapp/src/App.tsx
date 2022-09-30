import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AOS from "aos";
import "./App.css";
import Home from "./components/home";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
