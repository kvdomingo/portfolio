import { MDBContainer as Container } from "mdbreact";
import "./CurrVitae.css";
import TitleComponent from "../../shared/TitleComponent";
import Education from "./Education";
import Work from "./Work";
import Project from "./Project";
import Certification from "./Certification";
import Publication from "./Publication";
import Reference from "./Reference";
import Languages from "./Languages";

function CurriculumVitae() {
  return (
    <>
      <TitleComponent
        title="CV"
        description="Curriculum Vitae (CV) of Kenneth V. Domingo including educational attainment, work experience, and projects"
        keywords="Kenneth V. Domingo, Kenneth Domingo Photography, curriculum vitae, Python, photography, physics, applied physics, kvdomingo"
      />

      <Container className="px-md-5 pb-4">
        <Education />
        <Work />
        <Certification />
        <Project />
        <Publication />
        <Reference />
        <Languages />
      </Container>
    </>
  );
}

export default CurriculumVitae;
