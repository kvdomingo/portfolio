import { useEffect, useState } from "react";
import { MDBRow as Row, MDBCol as Col, MDBCard as Card } from "mdbreact";
import { Link, useRouteMatch } from "react-router-dom";
import TitleComponent from "../../shared/TitleComponent";
import Loading from "../../shared/Loading";
import api from "../../utils/Endpoints";

function Clients() {
  const [clients, setClients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const match = useRouteMatch();

  useEffect(() => {
    let { path } = match;
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
          {clients.map((cli, i) => (
            <Col className="mb-4" key={i}>
              <Card
                className="card-image h-100"
                style={{
                  backgroundImage: `url("${cli.cover_image}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                }}
              >
                <div className="text-white text-center rgba-black-light p-5 h-100">
                  <div className="py-5">
                    <Link to={`${match.url}/${cli.slug}`} className="btn btn-outline-white btn-lg card-title my-5">
                      {cli.name}
                    </Link>
                  </div>
                </div>
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
