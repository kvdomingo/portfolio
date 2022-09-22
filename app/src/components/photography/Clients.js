import { useEffect, useState } from "react";
import { MDBCard as Card, MDBCardText as CardText, MDBCol as Col, MDBRow as Row } from "mdbreact";
import { Link, useRouteMatch } from "react-router-dom";
import api from "../../api";
import Loading from "../../shared/Loading";
import TitleComponent from "../../shared/TitleComponent";

function Clients() {
  const match = useRouteMatch();
  const { path } = match;
  const [clients, setClients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (path.split("/").slice(-1)[0] === "clients") {
      api.photography
        .client()
        .then(res => setClients(res.data))
        .catch(err => console.error(err.message))
        .finally(() => setIsLoaded(true));
    }
  }, []);

  return isLoaded ? (
    <>
      <TitleComponent
        title="Clients | Photography"
        description="Clients section of the photography portfolio of Kenneth V. Domingo"
        keywords="clients, photography, portfolio, kvdomingo, KVD Studio, Kenneth V. Domingo"
      />
      <div>
        <Row className="row-cols-1 row-cols-lg-2 row-cols-xl-3">
          {clients.map((client, i) => (
            <Col className="mb-4" key={i}>
              <Card
                className="card-image"
                style={{
                  aspectRatio: "1",
                  backgroundImage: `url("${client.coverImage}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                }}
              >
                <CardText className="h-100 rgba-black-light d-flex justify-content-center align-items-center">
                  <Link to={`${match.url}/${client.slug}`} className="btn btn-outline-white btn-lg card-title my-5">
                    {client.name}
                  </Link>
                </CardText>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Clients;
