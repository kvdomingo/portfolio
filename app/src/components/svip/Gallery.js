import { Component } from "react";
import {
  MDBCard as Card,
  MDBCol as Col,
  MDBCardBody,
  MDBCardText,
  MDBRow as Row,
  MDBTypography as Typography,
} from "mdbreact";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./Svip.css";

class Gallery extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    subject: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
  };

  render() {
    const { url } = this.props.match;
    const { posts, subject } = this.props;

    return (
      <div>
        <div className="mb-4 px-3 px-md-0">
          <Typography tag="h1">{subject.name}</Typography>
          <Typography tag="h4">{subject.title}</Typography>
          <p>{subject.description}</p>
        </div>

        <Row className="row-cols-1 row-cols-lg-2 row-cols-xl-3">
          {posts.map((post, i) => (
            <Col className="mb-4" data-aos="fade-up" key={i}>
              <Card
                className="card-image card-cover h-100"
                style={{ aspectRatio: "1", backgroundImage: `url("${post.cover}")` }}
              >
                <MDBCardBody className="text-white text-center align-items-center d-flex justify-content-center flex-column h-100 rgba-black-strong px-4">
                  <MDBCardText>
                    <div className="py-5 h-100">
                      <Link to={`${url}/${post.slug}`} className="card-title btn btn-outline-white my-5">
                        {post.title}
                      </Link>
                    </div>
                  </MDBCardText>
                </MDBCardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default withRouter(Gallery);
