import { useEffect, useState } from "react";
import { MDBContainer as Container, MDBTypography as Typography } from "mdbreact";
import Photography from "./Photography";
import Vip from "./Vip";
import Dev from "./Development";
import Loading from "../../shared/Loading";
import api from "../../utils/Endpoints";
import { useGeneralContext } from "../../contexts/GeneralContext";

function WhatIDo() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const { generalState, generalDispatch } = useGeneralContext();

  useEffect(() => {
    if (generalState.home.content.loaded) {
      setContent(generalState.home.content.data);
      setLoading(false);
    } else {
      api.home
        .content()
        .then(res => {
          generalDispatch({
            type: "updateHomeContent",
            payload: { data: res.data, loaded: true },
          });
        })
        .catch(err => console.error(err.message));
    }
  }, [generalState.home.content]);

  return loading ? (
    <Loading />
  ) : (
    <Container fluid className="py-5 bg-dark text-white">
      <Container fluid className="py-5">
        <div data-aos="fade-up">
          <Typography tag="h1" variant="h1-responsive" className="text-center section-header white-text">
            What I Do
          </Typography>
          <hr className="grey darken-1 mt-4 mb-5" />
        </div>
        <Photography content={content[0]} />
        <Vip content={content[1]} />
        <Dev content={content[2]} />
      </Container>
    </Container>
  );
}

export default WhatIDo;
