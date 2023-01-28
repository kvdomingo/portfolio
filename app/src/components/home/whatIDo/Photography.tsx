import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { selectHomeContent } from "../../../store/generalSlice";
import { useSelector } from "../../../store/hooks";
import { HomeContent } from "../../../types/home";
import Loading from "../../shared/Loading";
import Carousel from "./Carousel";

interface PhotographyProps {
  content: HomeContent;
}

function Photography({ content }: PhotographyProps) {
  const { loaded } = useSelector(selectHomeContent);

  return !loaded ? (
    <Loading color="white" />
  ) : (
    <Grid container data-aos="fade-up" spacing={2} my={4}>
      <Grid item md={7} container alignItems="center" alignContent="center" textAlign="left">
        <Typography variant="h4" component="h3" color="white" mb={4} className="section-header">
          {content.sectionHeader}
        </Typography>
        <Typography variant="body1" color="white">
          {content.sectionBody}
        </Typography>
        <Link to={content.linkToPortfolio}>
          <Button variant="outlined" color="inherit" sx={{ color: "white", mt: 4 }}>
            See in portfolio
          </Button>
        </Link>
      </Grid>
      <Grid item md textAlign="center">
        <Carousel />
      </Grid>
    </Grid>
  );
}

export default Photography;
