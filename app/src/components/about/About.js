import { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { MDBCol as Col, MDBContainer as Container, MDBRow as Row } from "mdbreact";
import JsxParser from "react-jsx-parser";
import api from "../../api";
import { useGeneralContext } from "../../contexts/GeneralContext";
import Loading from "../../shared/Loading";
import TitleComponent from "../../shared/TitleComponent";
import "./About.css";
import CurrVitae from "./CurrVitae";

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
