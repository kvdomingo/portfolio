import { MDBCol as Col, MDBRow as Row, MDBTypography as Typography, MDBContainer as Container } from "mdbreact";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Development({ content }) {
  return (
    <Container className="py-5" data-aos="fade-up">
      <Row className="row-cols-1 row-cols-md-2">
        <Col className="my-auto">
          <Typography tag="h3" variant="h2-responsive" className="mb-3 section-header white-text">
            {content.sectionHeader}
          </Typography>
          <p className="mb-3">{content.sectionBody}</p>
          <Link to={content.linkToPortfolio} className="ml-0 btn btn-outline-white mb-3 mb-md-0">
            See portfolio
          </Link>
        </Col>
        <Col className="my-auto text-center">
          <a
            href="https://www.credential.net/0300e26a-fcdc-40db-a4a0-689fad65ac9b"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src="https://storage.googleapis.com/kvdomingo-xyz-306716-assets/gcp-pca_badge.png"
              alt="Google Cloud Certified Professional Cloud Architect"
              className="img-fluid"
              width="50%"
            />
          </a>
        </Col>
      </Row>
    </Container>
  );
}

Development.propTypes = {
  content: PropTypes.shape({
    sectionHeader: PropTypes.string.isRequired,
    sectionBody: PropTypes.string.isRequired,
    linkToPortfolio: PropTypes.string.isRequired,
  }).isRequired,
};

export default Development;
