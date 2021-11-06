import { Component } from "react";
import {
  MDBContainer as Container,
  MDBIcon as Icon,
  MDBBreadcrumb as Breadcrumb,
  MDBBreadcrumbItem as BreadcrumbItem,
} from "mdbreact";
import { Link, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../../shared/Loading";
import TitleComponent from "../../shared/TitleComponent";
import "./Svip.css";
import api from "../../utils/Endpoints";
import Gallery from "./Gallery";
import Post from "./Post";

class Subject extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  state = {
    activePage: "",
    courses: [],
    coursesIsLoaded: false,
    posts: [],
    postName: "",
    subject: "",
  };

  componentDidMount() {
    this.handleActivePill();
    let { courseSlug } = this.props.match.params;

    api.svip
      .blogPost("subject__slug", courseSlug)
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.error(err.message));

    api.svip
      .courses()
      .then(res => {
        let courses = res.data;
        let subject = courses.find(course => course.slug === courseSlug);
        this.setState({
          courses: courses,
          subject: subject,
        });
      })
      .catch(err => console.error(err.message))
      .finally(() => this.setState({ coursesIsLoaded: true }));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.activePage !== this.state.activePage) {
      this.handleActivePill();
    }
  }

  handleActivePill = () => {
    const { history } = this.props;
    let url = history.location.pathname;
    let activePage = url.split("/").slice(-1)[0];
    this.setState({ activePage });
  };

  togglePills = (e, activePage) => {
    this.setState({ activePage });
  };

  render() {
    const { togglePills } = this;
    const { activePage, subject, courses, coursesIsLoaded, posts, postName } = this.state;
    const { courseSlug } = this.props.match.params;
    const { path } = this.props.match;
    return (
      <>
        <TitleComponent
          title={`${subject.name} | Coursework`}
          description={`Portfolio & coursework on ${subject.name} (${subject.title}): ${subject.description}`}
          keywords={`${subject.description}, applied physics, app physics, ${subject.name}, computational physics, kvdomingo, Kenneth V. Domingo`}
        />
        {!coursesIsLoaded ? (
          <Loading />
        ) : (
          <Container className="my-5">
            <Route path={`${path}/:postSlug`}>
              <Container fluid className="mx-0 px-0">
                <Breadcrumb dark color="white" className="mx-0 px-0">
                  <BreadcrumbItem>
                    <Link to="/svip">Courses</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <Link to={`/svip/${courseSlug}`}>{subject.name}</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>{postName}</BreadcrumbItem>
                </Breadcrumb>
              </Container>
              <div className="mb-3">
                <Link to={`/svip/${courseSlug}`}>
                  <Icon fas icon="angle-left" className="mr-1" /> Back to {subject.name}
                </Link>
              </div>
              <Post subject={subject} setPostName={postName => this.setState({ postName })} />
            </Route>

            <Route exact path={path}>
              <Container fluid className="mx-0 px-0">
                <Breadcrumb dark color="white" className="mx-0 px-0">
                  <BreadcrumbItem>
                    <Link to="/svip">Courses</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>{subject.name}</BreadcrumbItem>
                </Breadcrumb>
              </Container>
              <div className="mb-3">
                <Link to="/svip">
                  <Icon fas icon="angle-left" className="mr-1" /> Back to courses
                </Link>
              </div>
              <Gallery
                key={activePage}
                activePage={activePage}
                courses={courses}
                coursesIsLoaded={coursesIsLoaded}
                posts={posts}
                subject={subject}
                togglePills={togglePills}
              />
            </Route>
          </Container>
        )}
      </>
    );
  }
}

export default withRouter(Subject);
