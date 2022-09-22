import { useEffect, useState } from "react";
import {
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCol as Col,
  MDBContainer as Container,
  MDBIcon as Icon,
  MDBRow as Row,
} from "mdbreact";
import dateFormat from "dateformat";
import api from "../../api";
import Loading from "../../shared/Loading";
import TitleComponent from "../../shared/TitleComponent";
import "./Dev.css";

function Dev() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.dev
      .projects()
      .then(res => {
        setProjects(res.data);
        setIsLoaded(true);
      })
      .catch(err => console.error(err.message));
  }, []);

  return (
    <>
      <TitleComponent
        title="Web Development"
        description="Portfolio of Kenneth V. Domingo with relevant work on web development and software development"
        keywords="web development, app development, software development, full stack development, blog, dev diaries, kvdomingo, Kenneth V. Domingo"
      />
      {!isLoaded ? (
        <Loading />
      ) : (
        <Container fluid className="my-5 px-5">
          <Row className="row-cols-1 row-cols-md-3">
            {projects.map(project => (
              <Col key={project.id} className="mb-4">
                <Card
                  className="card-image card-cover h-100"
                  style={{
                    backgroundImage: `url("${project.coverPhoto}")`,
                    aspectRatio: "1",
                  }}
                >
                  <CardBody className="d-flex flex-column text-white text-center justify-content-center align-items-center h-100 rgba-black-strong">
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-white"
                      style={{ textTransform: "none" }}
                    >
                      <Icon fas icon="external-link-alt" className="mr-2" />
                      {project.title}
                    </a>
                    {project.organization && (
                      <div>
                        <Icon fas icon="globe-asia" className="mr-2" />
                        <a
                          href={project.organizationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "mediumvioletred" }}
                        >
                          {project.organization}
                        </a>
                      </div>
                    )}
                    <div>
                      <Icon far icon="clock" className="mr-2" />
                      <p className="d-inline">
                        {dateFormat(project.startDate, "mmm yyyy")} &ndash;{" "}
                        {project.endDate ? dateFormat(project.endDate, "mmm yyyy") : "present"}{" "}
                      </p>
                    </div>
                    <br />
                    <p className="mt-3">{project.summary}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default Dev;
