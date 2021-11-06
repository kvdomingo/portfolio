import { Component } from "react";
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col } from "mdbreact";
import { Route, Switch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Lightbox from "simple-react-lightbox";
import PhotoSidenav from "./PhotoSidenav";
import Gallery from "./Gallery";
import ClientGallery from "./ClientGallery";
import Clients from "./Clients";

class Photography extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  state = {
    activePage: "",
  };

  togglePills = (e, page) => {
    this.setState({
      activePage: page,
    });
  };

  render() {
    const { togglePills } = this;
    const { path } = this.props.match;
    const { activePage } = this.state;
    return (
      <>
        <Container fluid className="my-5">
          <Row>
            <Col lg="2" className="pt-2 pb-4 px-lg-4">
              <PhotoSidenav activePage={activePage} togglePills={togglePills} />
            </Col>
            <Col lg="10" className="pr-lg-5">
              <Switch>
                <Route path={`${path}/clients/:clientPage`}>
                  <Lightbox>
                    <ClientGallery key={activePage} />
                  </Lightbox>
                </Route>
                <Route exact path={`${path}/clients`}>
                  <Clients />
                </Route>
                <Route path={`${path}/:photogPage`}>
                  <Lightbox>
                    <Gallery key={activePage} />
                  </Lightbox>
                </Route>
                <Route exact path={path}>
                  <Lightbox>
                    <Gallery key={activePage} />
                  </Lightbox>
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Photography);
