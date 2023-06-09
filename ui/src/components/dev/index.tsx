import { useEffect } from "react";

import {
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import { selectProjects, updateProjects } from "@/store/devSlice.ts";
import { useDispatch, useSelector } from "@/store/hooks.ts";
import { devProjectStatus } from "@/types/dev.ts";

import api from "../../api";
import Loading from "../shared/Loading";
import Title from "../shared/Title";
import ProjectGroup from "./ProjectGroup";

function Dev() {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  useEffect(() => {
    if (!projects.loaded) {
      api.dev
        .projects()
        .then(res =>
          dispatch(
            updateProjects({
              data: res.data,
              loaded: true,
            }),
          ),
        )
        .catch(err => console.error(err.message));
    }
  }, [dispatch, projects.loaded]);

  return (
    <>
      <Title
        title="Software"
        description="Portfolio of Kenneth V. Domingo with relevant work on software development"
        keywords={[
          "software engineering",
          "web development",
          "app development",
          "software development",
          "full stack development",
          "blog",
          "dev diaries",
          "kvdomingo",
          "Kenneth V. Domingo",
        ]}
      />
      <Container>
        <Grid container>
          <Grid item xs={12} md={6}>
            <ListItem alignItems="center" data-aos="fade-up">
              <ListItemAvatar sx={{ px: 4 }}>
                <Card elevation={0}>
                  <CardActionArea>
                    <a
                      href="https://github.com/kvdomingo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CardMedia
                        component="img"
                        image="https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto/v1685807890/dev/logos/github-mark-white.png"
                        alt="GitHub | kvdomingo"
                        className="aspect-square h-[100px] bg-cover bg-center"
                      />
                    </a>
                  </CardActionArea>
                </Card>
              </ListItemAvatar>
              <ListItemText>
                <Typography variant="h6">My GitHub repositories</Typography>
              </ListItemText>
            </ListItem>
          </Grid>
          <Grid item xs={12} md={6}>
            <ListItem alignItems="center" data-aos="fade-up">
              <ListItemAvatar sx={{ px: 4 }}>
                <Card elevation={0}>
                  <CardActionArea>
                    <a
                      href="https://pypi.org/user/kvdomingo/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CardMedia
                        component="img"
                        image="https://seeklogo.com/images/P/pypi-logo-5B953CE804-seeklogo.com.png"
                        alt="PyPI | kvdomingo"
                        className="aspect-square h-[100px] bg-cover bg-center"
                      />
                    </a>
                  </CardActionArea>
                </Card>
              </ListItemAvatar>
              <ListItemText>
                <Typography variant="h6">My PyPI packages</Typography>
              </ListItemText>
            </ListItem>
          </Grid>
        </Grid>
        {projects.loaded ? (
          (["LIV", "WIP", "OFF"] as devProjectStatus[]).map(status => (
            <ProjectGroup
              status={status}
              projects={projects.data.filter(proj => proj.status === status)}
            />
          ))
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
}

export default Dev;
