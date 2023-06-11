import { Card, CardMedia, Container, Grid } from "@mui/material";

import BasePage from "@/components/shared/BasePage.tsx";
import { selectCourses } from "@/store/courseworkSlice.ts";
import { useSelector } from "@/store/hooks.ts";
import { CourseMetadata } from "@/types/coursework.ts";

import ButtonCard from "../shared/ButtonCard";
import Loading from "../shared/Loading";
import Title from "../shared/Title";

function Coursework() {
  const courses = useSelector(selectCourses);

  return (
    <BasePage>
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
              <Grid
                key={course.id}
                item
                xs={12}
                lg={6}
                xl={4}
                data-aos="fade-up"
              >
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
    </BasePage>
  );
}

export default Coursework;
