import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Breadcrumbs, Card, CardMedia, Container, Grid, Typography } from "@mui/material";
import api from "../../api";
import { selectCourses, selectPosts, updateCourses, updatePosts } from "../../store/courseworkSlice";
import { useDispatch, useSelector } from "../../store/hooks";
import { CourseworkPostMetadata } from "../../types/coursework";
import ButtonCard from "../shared/ButtonCard";
import Loading from "../shared/Loading";
import Title from "../shared/Title";

function Course() {
  const dispatch = useDispatch();
  const { courseSlug } = useParams();
  const courses = useSelector(selectCourses);
  const posts = useSelector(selectPosts);
  const currentCourse = courses.data.find(c => c.slug === courseSlug);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setLoading(true);
    api.svip
      .blogPost("subject__slug", courseSlug!)
      .then(res =>
        dispatch(
          updatePosts({
            data: res.data,
            loaded: true,
          }),
        ),
      )
      .catch(err => console.error(err.message))
      .finally(() => setLoading(false));
  }, [dispatch, courseSlug]);

  return currentCourse == null ? (
    <Loading />
  ) : (
    <>
      <Title
        title={currentCourse.name}
        description={`Portfolio & coursework on ${currentCourse.name} (${currentCourse.title}): ${currentCourse.description}`}
        keywords={[
          `${currentCourse.description}`,
          "applied physics",
          "app physics",
          `${currentCourse.name}`,
          "computational physics",
          "kvdomingo",
          "Kenneth V. Domingo",
        ]}
      />
      <Container>
        <Breadcrumbs sx={{ mb: 4 }}>
          <Box component={Link} to="/svip" sx={{ color: "primary.main", textDecoration: "none" }}>
            Courses
          </Box>
          <Typography sx={{ color: "text.secondary" }}>{currentCourse.name}</Typography>
        </Breadcrumbs>
        <Typography variant="h3">{currentCourse.name}</Typography>
        <Typography variant="overline">{currentCourse.title}</Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          {currentCourse.description}
        </Typography>
        <Grid container spacing={2}>
          {loading ? (
            <Loading />
          ) : (
            posts.data.map((post: CourseworkPostMetadata) => (
              <Grid key={post.id} item xs={12} lg={6} xl={4} data-aos="fade-up">
                <Card>
                  <CardMedia component={ButtonCard} image={post.cover} alt={post.title} slug={post.slug} />
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Course;
