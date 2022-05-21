import { useState, useEffect } from "react";
import { MDBCol as Col, MDBRow as Row, MDBContainer as Container } from "mdbreact";
import { Image } from "cloudinary-react";
import TitleComponent from "../../shared/TitleComponent";
import Loading from "../../shared/Loading";
import CurrVitae from "./CurrVitae";
import api from "../../utils/Endpoints";
import JsxParser from "react-jsx-parser";
import { useGeneralContext } from "../../contexts/GeneralContext";
import "./About.css";

export default function About() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { generalState, generalDispatch } = useGeneralContext();

  useEffect(() => {
    if (generalState.about.loaded) {
      setData(generalState.about.data);
      setLoading(false);
    } else {
      api.home
        .about()
        .then(res => {
          generalDispatch({
            type: "updateAbout",
            payload: { data: res.data[0], loaded: true },
          });
        })
        .catch(err => console.error(err.message))
        .finally(() => setLoading(false));
    }
  }, [generalState.about]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <TitleComponent
        title="About"
        description="About Kenneth V. Domingo and KVD Studio, with curriculum vitae (CV) including educational attainment, work experience, and projects"
        keywords="curriculum vitae, cv, signal processing, image processing, video processing, computational physics, applied physics, app physics, coursework, kvdomingo, Kenneth V. Domingo"
      />

      <Container fluid className="mb-5 px-5">
        <Row>
          <Col md="3" className="mb-4 mb-md-0">
            <Image
              cloudName={"kdphotography-assets"}
              className="img-fluid image-shadow mb-5"
              publicId={data.picture}
              secure
              responsive
              responsiveUseBreakpoints
              width={"auto"}
              dpr={"auto"}
              crop={"scale"}
            />
            <JsxParser jsx={data.bio} />
            <a href="mailto:hello@kvdomingo.xyz" className="ml-0 btn btn-outline-black">
              Contact
            </a>
          </Col>
          <Col md="9">
            <CurrVitae />
          </Col>
        </Row>
      </Container>
    </>
  );
}
