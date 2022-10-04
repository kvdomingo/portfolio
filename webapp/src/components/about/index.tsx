import { useEffect, useState } from "react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import api from "../../api";
import cld from "../../api/cloudinary";
import { selectAboutContent, updateAboutContent } from "../../store/generalSlice";
import { useDispatch, useSelector } from "../../store/hooks";
import JsxRenderer from "../shared/JsxRenderer";
import Loading from "../shared/Loading";
import Title from "../shared/Title";
import CurrVitae from "./CurrVitae";

function About() {
  const dispatch = useDispatch();
  const aboutContent = useSelector(selectAboutContent);
  const [image, setImage] = useState<CloudinaryImage>(null!);

  useEffect(() => {
    if (aboutContent.loaded) {
      if (!image) {
        setImage(cld.image(aboutContent.data[0].picture).resize(Resize.scale().width("auto")));
      }
    } else {
      api.home
        .about()
        .then(res =>
          dispatch(
            updateAboutContent({
              data: res.data,
              loaded: true,
            }),
          ),
        )
        .catch(err => console.error(err.message));
    }
  }, [dispatch, aboutContent, image]);

  return (
    <>
      <Title
        title="About"
        description="About Kenneth V. Domingo and KVD Studio, with curriculum vitae (CV) including educational attainment, work experience, and projects"
        keywords={[
          "curriculum vitae",
          "cv",
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
        <Grid container spacing={10}>
          <Grid item md={4} data-aos="fade-up">
            {!aboutContent.loaded || !image ? (
              <Loading />
            ) : (
              <>
                <Box
                  component="img"
                  src={image.toURL()}
                  width="100%"
                  height="auto"
                  sx={{
                    boxShadow: "5px 5px 69px -27px rgba(0, 0, 0, 0.75)",
                    mb: 4,
                  }}
                />
                <JsxRenderer jsx={aboutContent.data[0].bio} components={{ Typography }} />
              </>
            )}
            <a href="mailto:hello@kvdomingo.xyz">
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ color: "text.primary", borderColor: "text.primary" }}
              >
                Contact
              </Button>
            </a>
          </Grid>
          <Grid item md>
            <CurrVitae />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default About;
