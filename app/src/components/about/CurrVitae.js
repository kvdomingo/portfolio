import { useEffect, useState } from "react";
import { MDBContainer as Container } from "mdbreact";
import api from "../../api";
import { useGeneralContext } from "../../contexts/GeneralContext";
import Loading from "../../shared/Loading";
import Certification from "./Certification";
import "./CurrVitae.css";
import Education from "./Education";
import Languages from "./Languages";
import Project from "./Project";
import Publication from "./Publication";
import Reference from "./Reference";
import Work from "./Work";

function CurriculumVitae() {
  const [loading, setLoading] = useState(false);
  const { generalDispatch } = useGeneralContext();

  useEffect(() => {
    api.cv
      .all()
      .then(res =>
        generalDispatch({
          type: "updateCV",
          payload: res.data,
        }),
      )
      .catch(err => console.error(err.message))
      .finally(() => setLoading(false));
  }, [generalDispatch]);

  return loading ? (
    <Loading />
  ) : (
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
