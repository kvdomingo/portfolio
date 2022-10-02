import { useEffect } from "react";
import { AccessTime, Public } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
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
                            maxHeight: 200,
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
