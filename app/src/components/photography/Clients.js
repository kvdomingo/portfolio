import { Component } from "react";
import { MDBRow as Row, MDBCol as Col, MDBCard as Card } from "mdbreact";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TitleComponent from "../../shared/TitleComponent";
import Loading from "../../shared/Loading";
import api from "../../utils/Endpoints";

class Clients extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  state = {
    clients: [],
    isLoaded: false,
  };

  componentDidMount() {
    let { path } = this.props.match;
    if (path.split("/").slice(-1)[0] === "clients") {
      api.photography
        .client()
        .then(res => this.setState({ clients: res.data }))
        .catch(err => console.error(err.message))
        .finally(() => this.setState({ isLoaded: true }));
    }
  }

  render() {
    const { clients, isLoaded } = this.state;
    const { match } = this.props;
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
                    backgroundImage: `url("${cli.coverImage}")`,
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
}

export default withRouter(Clients);
