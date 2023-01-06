import { useEffect } from "react";
import { AccessTime, Public } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import dateFormat from "dateformat";
import api from "../../api";
import { selectProjects, updateProjects } from "../../store/devSlice";
import { useDispatch, useSelector } from "../../store/hooks";
import { DevProjectMetadata } from "../../types/dev";
import Loading from "../shared/Loading";
import Title from "../shared/Title";

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
        <List>
          <Grid container>
            <Grid item xs={12} md={6}>
              <ListItem alignItems="center" data-aos="fade-up">
                <ListItemAvatar sx={{ px: 4 }}>
                  <Card elevation={0}>
                    <CardActionArea>
                      <a href="https://github.com/kvdomingo" target="_blank" rel="noopener noreferrer">
                        <CardMedia
                          component="img"
                          image="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"
                          alt="GitHub | kvdomingo"
                          sx={{
                            aspectRatio: "1",
                            backgroundSize: "cover",
                            backgroundPosition: "50% 50%",
                            height: 100,
                          }}
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
                      <a href="https://pypi.org/user/kvdomingo/" target="_blank" rel="noopener noreferrer">
                        <CardMedia
                          component="img"
                          image="https://seeklogo.com/images/P/pypi-logo-5B953CE804-seeklogo.com.png"
                          alt="PyPI | kvdomingo"
                          sx={{
                            aspectRatio: "1",
                            backgroundSize: "cover",
                            backgroundPosition: "50% 50%",
                            height: 100,
                          }}
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
          {!projects.loaded ? (
            <Loading />
          ) : (
            projects.data.map((proj: DevProjectMetadata) => (
              <ListItem key={proj.id} alignItems="flex-start" data-aos="fade-up">
                <ListItemAvatar sx={{ px: 4 }}>
                  <Card>
                    <CardActionArea>
                      <a href={proj.projectUrl} target="_blank" rel="noopener noreferrer">
                        <CardMedia
                          component="img"
                          image={proj.coverPhoto}
                          alt={proj.title}
                          sx={{
                            aspectRatio: "1",
                            backgroundSize: "cover",
                            backgroundPosition: "50% 50%",
                            height: 300,
                          }}
                        />
                      </a>
                    </CardActionArea>
                  </Card>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Grid container>
                      <Grid item md>
                        <Typography variant="h4">{proj.title}</Typography>
                      </Grid>
                      <Grid
                        item
                        md={4}
                        container
                        alignItems="center"
                        justifyContent={{
                          xs: "flex-start",
                          md: "flex-end",
                        }}
                        sx={{ color: "text.secondary" }}
                      >
                        <AccessTime sx={{ mr: 1 }} />
                        <Typography>
                          {dateFormat(new Date(proj.startDate), "mmm yyyy")} -{" "}
                          {!!proj.endDate ? dateFormat(new Date(proj.endDate), "mmm yyyy") : "present"}
                        </Typography>
                      </Grid>
                    </Grid>
                  }
                  secondary={
                    <>
                      {!!proj.organization && (
                        <Grid container alignItems="center" my={2}>
                          <Public sx={{ mr: 1 }} />
                          <Typography variant="subtitle1">
                            <Box
                              component="a"
                              href={proj.organizationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              color="primary.main"
                            >
                              {proj.organization}
                            </Box>
                          </Typography>
                        </Grid>
                      )}
                      <Typography variant="body1" sx={{ my: 4 }}>
                        {proj.summary}
                      </Typography>
                      <Box>
                        <Typography variant="subtitle2">Technologies: </Typography>
                        {proj.technologies.split(", ").map(tech => (
                          <Chip size="small" key={tech} label={tech} sx={{ m: 0.5 }} />
                        ))}
                      </Box>
                    </>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      </Container>
    </>
  );
}

export default Dev;
