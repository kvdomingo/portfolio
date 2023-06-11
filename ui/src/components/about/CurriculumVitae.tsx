import { block } from "million/react";

import { selectCV } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";

import Loading from "../shared/Loading";
import Certification from "./cvSection/Certification";
import CodingStats from "./cvSection/CodingStats.tsx";
import Education from "./cvSection/Education";
import Project from "./cvSection/Project";
import Publication from "./cvSection/Publication";
import Reference from "./cvSection/Reference";
import Work from "./cvSection/Work";

const CurriculumVitae = block(() => {
  const cv = useSelector(selectCV);

  return !cv.loaded ? (
    <Loading />
  ) : (
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
});

export default CurriculumVitae;
