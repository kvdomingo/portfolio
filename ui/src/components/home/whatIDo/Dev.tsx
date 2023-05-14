import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { selectHomeContent } from "../../../store/generalSlice";
import { useSelector } from "../../../store/hooks";
import { HomeContent } from "../../../types/home";
import Loading from "../../shared/Loading";

interface DevProps {
  content: HomeContent;
}

function Dev({ content }: DevProps) {
  const { loaded } = useSelector(selectHomeContent);

  return !loaded ? (
    <Loading color="white" />
  ) : (
    <Grid container data-aos="fade-up" spacing={2} my={4}>
      <Grid item md textAlign="left">
        <Typography
          variant="h4"
          component="h3"
          color="white"
          className="section-header"
        >
          {content.sectionHeader}
        </Typography>
        <Typography variant="body1" color="white">
          {content.sectionBody}
        </Typography>
        <Link to={content.linkToPortfolio}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ mt: 4, color: "white" }}
          >
            See in portfolio
          </Button>
        </Link>
      </Grid>
      <Grid item md>
        <a
          href="https://www.credential.net/0300e26a-fcdc-40db-a4a0-689fad65ac9b"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src="https://storage.googleapis.com/kvdomingo-xyz-306716-assets/gcp-pca_badge.png"
            alt="Google Cloud Certified Professional Cloud Architect"
            width="50%"
          />
        </a>
      </Grid>
    </Grid>
  );
}

export default Dev;
