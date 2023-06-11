import { useEffect } from "react";

import { block } from "million/react";

import api from "@/api";
import { selectCV, updateCV } from "@/store/generalSlice.ts";
import { useDispatch, useSelector } from "@/store/hooks.ts";

import Loading from "../shared/Loading";
import Certification from "./cvSection/Certification";
import CodingStats from "./cvSection/CodingStats.tsx";
import Education from "./cvSection/Education";
import Project from "./cvSection/Project";
import Publication from "./cvSection/Publication";
import Reference from "./cvSection/Reference";
import Work from "./cvSection/Work";

const CurriculumVitae = block(() => {
  const dispatch = useDispatch();
  const cv = useSelector(selectCV);

  useEffect(() => {
    if (!cv.loaded) {
      api.cv
        .all()
        .then(res =>
          dispatch(
            updateCV({
              data: res.data,
              loaded: true,
            }),
          ),
        )
        .catch(err => console.error(err.message));
    }
  }, [dispatch, cv.loaded]);

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
