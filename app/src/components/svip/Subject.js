import { useEffect, useState } from "react";
import {
  MDBContainer as Container,
  MDBIcon as Icon,
  MDBBreadcrumb as Breadcrumb,
  MDBBreadcrumbItem as BreadcrumbItem,
} from "mdbreact";
import { Link, Route, useRouteMatch, useHistory } from "react-router-dom";
import Loading from "../../shared/Loading";
import TitleComponent from "../../shared/TitleComponent";
import "./Svip.css";
import api from "../../utils/Endpoints";
import Gallery from "./Gallery";
import Post from "./Post";

function Subject() {
  const [activePage, setActivePage] = useState("");
  const [courses, setCourses] = useState([]);
  const [coursesIsLoaded, setCoursesIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postName, setPostName] = useState("");
  const [subject, setSubject] = useState("");
  const match = useRouteMatch();
  const history = useHistory();
  const { path } = match;
  const { courseSlug } = match.params;

  useEffect(() => {
    handleActivePill();

    api.svip
      .blogPost("subject__slug", courseSlug)
      .then(res => setPosts(res.data))
      .catch(err => console.error(err.message));

    api.svip
      .courses()
      .then(res => {
        let courses = res.data;
        let subject = courses.find(course => course.slug === courseSlug);
        setCourses(courses);
        setSubject(subject);
      })
      .catch(err => console.error(err.message))
      .finally(() => setCoursesIsLoaded(true));
  }, []);

  useEffect(() => {
    handleActivePill();
  }, [activePage]);

  function handleActivePill() {
    let url = history.location.pathname;
    let activePage = url.split("/").slice(-1)[0];
    setActivePage(activePage);
  }

  function togglePills(e, activePage) {
    setActivePage(activePage);
  }

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
            <Post subject={subject} setPostName={setPostName} />
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

export default Subject;
