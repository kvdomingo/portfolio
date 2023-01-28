import { useEffect } from "react";
import { Card, CardMedia, Container, Grid } from "@mui/material";
import api from "../../api";
import { selectCourses, updateCourses } from "../../store/courseworkSlice";
import { useDispatch, useSelector } from "../../store/hooks";
import { CourseMetadata } from "../../types/coursework";
import ButtonCard from "../shared/ButtonCard";
import Loading from "../shared/Loading";
import Title from "../shared/Title";

function Coursework() {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);

  useEffect(() => {
    if (!courses.loaded) {
      api.svip
        .courses()
        .then(res =>
          dispatch(
            updateCourses({
              data: res.data,
              loaded: true,
            }),
          ),
        )
        .catch(err => console.error(err.message));
    }
  }, [dispatch, courses.loaded]);

  return (
    <>
      <Title
        title="Coursework"
        description="Portfolio of Kenneth V. Domingo with relevant coursework such as signal, video, and image processing"
        keywords={[
          "signal processing",
          "image processing",
          "video processing",
          "computational physics",
          "applied physics",
          "app physics",
          "coursework",
          "kvdomingo",
          "Kenneth V. Domingo",
        ]}
      />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {!courses.loaded ? (
            <Loading />
          ) : (
            courses.data.map((course: CourseMetadata) => (
              <Grid key={course.id} item xs={12} lg={6} xl={4} data-aos="fade-up">
                <Card>
                  <CardMedia
                    component={ButtonCard}
                    alt={course.name}
                    image={course.cover}
                    slug={course.slug}
                    summary={course.description}
                  />
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Coursework;
