import { MDBContainer as Container } from "mdbreact";
import "./CurrVitae.css";
import Education from "./Education";
import Work from "./Work";
import Project from "./Project";
import Certification from "./Certification";
import Publication from "./Publication";
import Reference from "./Reference";
import Languages from "./Languages";

function CurriculumVitae() {
  return (
    <Container className="pb-4">
      <Education />
      <Work />
      <Certification />
      <Project />
      <Publication />
      <Reference />
      <Languages />
    </Container>
  );
}

export default CurriculumVitae;
