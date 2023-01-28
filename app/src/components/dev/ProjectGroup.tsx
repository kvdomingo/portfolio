import { AccessTime, Public } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import dateFormat from "dateformat";
import { DevProjectMetadata, DevProjectStatusEnum, devProjectStatus } from "../../types/dev";

interface ProjectGroupProps {
  projects: DevProjectMetadata[];
  status: devProjectStatus;
}

function ProjectGroup({ projects, status }: ProjectGroupProps) {
  return projects.length === 0 ? null : (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h3"
        display="inline"
        sx={{
          "&::before": {
            height: "1em",
            width: "1em",
            borderRadius: "50%",
            color: "primary.main",
            backgroundColor: "primary.main",
            mr: 4,
          },
        }}
      >
        {DevProjectStatusEnum[status]}
      </Typography>
      <List>
        {projects.map((proj: DevProjectMetadata) => (
          <ListItem key={proj.id} alignItems="flex-start" data-aos="fade-up">
            <ListItemAvatar sx={{ px: 4 }}>
              <Card>
                <CardActionArea disabled={status === "OFF"}>
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
        ))}
      </List>
    </Box>
  );
}

export default ProjectGroup;
