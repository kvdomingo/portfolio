import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBCol as Col, MDBRow as Row, MDBContainer as Container } from "mdbreact";
import { Image } from "cloudinary-react";
import TitleComponent from "../../shared/TitleComponent";
import Loading from "../../shared/Loading";
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
        description="About Kenneth V. Domingo and KVD Studio"
        keywords="signal processing, image processing, video processing, computational physics, applied physics, app physics, coursework, kvdomingo, Kenneth V. Domingo"
      />

      <Container className={"mb-5"}>
        <Row>
          <Col md="4" className="mb-4 mb-md-0">
            <Image
              cloudName={"kdphotography-assets"}
              className="img-fluid image-shadow"
              publicId={data.picture}
              secure
              responsive
              responsiveUseBreakpoints
              width={"auto"}
              dpr={"auto"}
              crop={"scale"}
            />
          </Col>
          <Col md="8" className="pl-3 pl-md-5">
            <JsxParser jsx={data.bio} />
            <div>
              <Link to="/cv" className="ml-0 btn btn-outline-black">
                CV
              </Link>
              <a href="mailto:hello@kvdomingo.xyz" className="ml-0 btn btn-outline-black">
                Contact
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
