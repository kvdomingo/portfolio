import Certification from "./cvSection/Certification";
import CodingStats from "./cvSection/CodingStats.tsx";
import Education from "./cvSection/Education";
import Project from "./cvSection/Project";
import Publication from "./cvSection/Publication";
import Reference from "./cvSection/Reference";
import Work from "./cvSection/Work";

function CurriculumVitae() {
  return (
    <>
      <Education />
      <Work />
      <Certification />
      <Project />
      <Publication />
      <Reference />
      <CodingStats />
    </>
  );
}

export default CurriculumVitae;
