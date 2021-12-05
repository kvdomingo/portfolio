import React from "react";
import { MDBCol as Col, MDBRow as Row, MDBTypography as Typography, MDBContainer as Container } from "mdbreact";
import { Link } from "react-router-dom";
import Juxtapose from "./Juxtapose";
import PropTypes from "prop-types";

function Vip({ content }) {
  return (
    <Container className="py-5" data-aos="fade-up">
      <Row className="row-cols-1 row-cols-md-2">
        <Col className="text-center mb-4 mb-md-0">
          <Juxtapose />
        </Col>
        <Col className="text-md-right my-auto">
          <Typography tag="h3" variant="h2-responsive" className="mb-3 section-header">
            {content.sectionHeader}
          </Typography>
          <p className="mb-3">{content.sectionBody}</p>
          <Link to={content.linkToPortfolio} className="mx-0 btn btn-outline-white mb-3 mb-md-0">
            See portfolio
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

Vip.propTypes = {
  content: PropTypes.shape({
    sectionHeader: PropTypes.string.isRequired,
    sectionBody: PropTypes.string.isRequired,
    linkToPortfolio: PropTypes.string.isRequired,
  }).isRequired,
};

export default Vip;
