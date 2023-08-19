import { Link, useParams } from "react-router-dom";

import {
  Box,
  Breadcrumbs,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import BasePage from "@/components/shared/BasePage.tsx";
import { selectCourses, selectPosts } from "@/store/courseworkSlice.ts";
import { useSelector } from "@/store/hooks.ts";
import { CourseworkPostMetadata } from "@/types/coursework.ts";

import ButtonCard from "../shared/ButtonCard";
import Loading from "../shared/Loading";
import Title from "../shared/Title";

function Course() {
  const { courseSlug } = useParams();
  const courses = useSelector(selectCourses);
  const posts = useSelector(selectPosts);
  const currentCourse = courses.data.find(c => c.slug === courseSlug);

  return currentCourse == null ? (
    <Loading />
  ) : (
    <BasePage>
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
          <Box
            component={Link}
            to="/svip"
            sx={{ color: "primary.main", textDecoration: "none" }}
          >
            Courses
          </Box>
          <Typography sx={{ color: "text.secondary" }}>
            {currentCourse.name}
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3">{currentCourse.name}</Typography>
        <Typography variant="overline">{currentCourse.title}</Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          {currentCourse.description}
        </Typography>
        <Grid container spacing={2}>
          {!(courses.loaded || posts.loaded) ? (
            <Loading />
          ) : (
            posts.data.map((post: CourseworkPostMetadata) => (
              <Grid key={post.id} item xs={12} lg={6} xl={4} data-aos="fade-up">
                <Card>
                  <CardMedia
                    component={ButtonCard}
                    image={post.cover}
                    alt={post.title}
                    slug={post.slug}
                  />
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </BasePage>
  );
}

export default Course;
