import { useRef } from "react";
import { Link } from "react-router-dom";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Button, Grid, Typography } from "@mui/material";
import "juxtaposejs/build/css/juxtapose.css";
import "juxtaposejs/build/js/juxtapose.js";
import cld from "../../../api/cloudinary";
import { selectHomeContent } from "../../../store/generalSlice";
import { useSelector } from "../../../store/hooks";
import { HomeContent } from "../../../types/home";
import Loading from "../../shared/Loading";

interface VipProps {
  content: HomeContent;
}

function Vip({ content }: VipProps) {
  const slider = useRef(null!);
  const sliderElement = useRef(null!);
  const { loaded } = useSelector(selectHomeContent);
  const imgBefore = cld.image("svip/186/7-ImageSegment/cancer").resize(Resize.scale().width("auto"));
  const imgAfter = cld.image("svip/186/7-ImageSegment/cancer_otsu").resize(Resize.scale().width("auto"));

  if (!slider.current && !!sliderElement.current) {
    // @ts-ignore
    slider.current = new juxtapose.JXSlider("#juxtapose", [{ src: imgBefore.toURL() }, { src: imgAfter.toURL() }], {
      animate: true,
      startPosition: "50%",
      makeResponsive: true,
    });
  }

  return !loaded ? (
    <Loading color="white" />
  ) : (
    <Grid container data-aos="fade-up" spacing={2} my={4}>
      <Grid item md>
        <div id="juxtapose" ref={sliderElement} />
      </Grid>
      <Grid item md container alignItems="center" textAlign="right" justifyContent="flex-end">
        <Typography component="h3" variant="h4" mb={4} color="white" className="section-header">
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
    </Grid>
  );
}

export default Vip;
