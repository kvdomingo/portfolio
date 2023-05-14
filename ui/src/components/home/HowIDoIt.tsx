import { useEffect } from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import api from "../../api";
import {
  selectHomeTechnologies,
  updateHomeTechnologies,
} from "../../store/generalSlice";
import { useDispatch, useSelector } from "../../store/hooks";
import Loading from "../shared/Loading";

const headers = [
  { label: "Backend", key: "BE" },
  { label: "Frontend", key: "FE" },
  { label: "Database", key: "DB" },
  { label: "CI/CD & Cloud", key: "CI" },
  { label: "Data & Vis", key: "DV" },
];

function HowIDoIt() {
  const dispatch = useDispatch();
  const technologies = useSelector(selectHomeTechnologies);

  useEffect(() => {
    if (!technologies.loaded) {
      api.home
        .technologies()
        .then(res =>
          dispatch(
            updateHomeTechnologies({
              data: res.data,
              loaded: true,
            }),
          ),
        )
        .catch(err => console.error(err.message));
    }
  }, [dispatch, technologies.loaded]);

  return (
    <Container sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h2" className="section-header">
        How I do it
      </Typography>
      <Divider variant="middle" sx={{ backgroundColor: "#757575", my: 4 }} />
      {!technologies.loaded ? (
        <Loading />
      ) : (
        headers.map(head => (
          <Box key={head.key} data-aos="fade-up" my={4}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item md={3} textAlign="right" pr={1}>
                <Typography variant="h5" className="section-header">
                  {head.label}
                </Typography>
              </Grid>
              <Grid
                item
                md
                sx={{ borderLeft: "1px solid #CCC" }}
                container
                alignItems="center"
              >
                {technologies.data
                  .filter(tech => tech.category === head.label)
                  .map(tech => (
                    <Grid key={tech.id} item md={2} px={2}>
                      <img
                        src={tech.url}
                        alt={tech.alt}
                        width="100%"
                        height="auto"
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Box>
        ))
      )}
    </Container>
  );
}

export default HowIDoIt;
