import { Component } from "react";
import { MDBCard as Card, MDBCol as Col, MDBContainer as Container, MDBCardText, MDBRow as Row } from "mdbreact";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../api";
import { CourseworkConsumer } from "../../contexts/CourseworkContext";
import Loading from "../../shared/Loading";
import TitleComponent from "../../shared/TitleComponent";
import "./Svip.css";

class Svip extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    courseworkState: PropTypes.object,
    courseworkDispatch: PropTypes.func,
  };

  state = {
    courses: [],
    isLoaded: false,
  };

  componentDidMount() {
    const { courseworkState, courseworkDispatch } = this.props;
    if (courseworkState.courses.loaded) {
      this.setState({
        courses: courseworkState.courses.data,
        isLoaded: true,
      });
    } else {
      api.svip
        .courses()
        .then(res => {
          let { data } = res;
          courseworkDispatch({
            type: "updateCourses",
            payload: { data, loaded: true },
          });
        })
        .catch(err => console.error(err.message));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { courseworkState } = this.props;
    let { courses } = this.state;
    if (courseworkState.courses.loaded && courseworkState.courses.data !== courses) {
      this.setState({
        courses: courseworkState.courses.data,
        isLoaded: true,
      });
    }
  }

  render() {
    const { isLoaded, courses } = this.state;
    const { location } = this.props;
    return (
      <>
        <TitleComponent
          title="Coursework"
          description="Portfolio of Kenneth V. Domingo with relevant coursework such as signal, video, and image processing"
          keywords="signal processing, image processing, video processing, computational physics, applied physics, app physics, coursework, kvdomingo, Kenneth V. Domingo"
        />
        {!isLoaded ? (
          <Loading />
        ) : (
          <Container fluid className="px-5 my-5">
            <Row className="row-cols-1 row-cols-lg-2 row-cols-xl-3">
              {courses.map((course, i) => (
                <Col className="mb-4" key={i}>
                  <Card
                    className="card-image card-cover h-100"
                    style={{ backgroundImage: `url("${course.cover}")`, aspectRatio: "1" }}
                  >
                    <MDBCardText className="text-white text-center align-items-center d-flex flex-column justify-content-center h-100 rgba-black-strong px-4">
                      <Link
                        to={`${location.pathname}/${course.slug}`}
                        className="card-title btn btn-outline-white my-3"
                      >
                        {course.name}: {course.title}
                      </Link>
                      <p className="card-text">{course.description}</p>
                    </MDBCardText>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </>
    );
  }
}

export default withRouter(({ history, location, match }) => (
  <CourseworkConsumer>
    {({ courseworkState, courseworkDispatch }) => (
      <Svip
        history={history}
        location={location}
        match={match}
        courseworkState={courseworkState}
        courseworkDispatch={courseworkDispatch}
      />
    )}
  </CourseworkConsumer>
));
