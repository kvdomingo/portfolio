import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Button, Grid, Typography } from "@mui/material";
import "juxtaposejs/build/css/juxtapose.css";
import "juxtaposejs/build/js/juxtapose.js";
import cld from "../../api/cloudinary";
import { HomeContent } from "../../types/home";

interface VipProps {
  content: HomeContent;
}

function Vip({ content }: VipProps) {
  const navigate = useNavigate();
  const slider = useRef(null!);

  useEffect(() => {
    if (!slider.current) {
      const imgBefore = cld.image("svip/186/7-ImageSegment/cancer").resize(Resize.scale().width("auto"));
      const imgAfter = cld.image("svip/186/7-ImageSegment/cancer_otsu").resize(Resize.scale().width("auto"));

      // @ts-ignore
      slider.current = new juxtapose.JXSlider("#juxtapose", [{ src: imgBefore.toURL() }, { src: imgAfter.toURL() }], {
        animate: true,
        startPosition: "50%",
        makeResponsive: true,
      });
    }
  }, []);

  return (
    <Grid container data-aos="fade-up" spacing={2} my={4}>
      <Grid item md>
        <div id="juxtapose" />
      </Grid>
      <Grid item md container alignItems="center" textAlign="right" justifyContent="flex-end">
        <Typography component="h3" variant="h4" mb={4} color="white" className="section-header">
          {content.sectionHeader}
        </Typography>
        <Typography variant="body1" color="white">
          {content.sectionBody}
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ color: "white", mt: 4 }}
          onClick={() => navigate(content.linkToPortfolio)}
        >
          See in portfolio
        </Button>
      </Grid>
    </Grid>
  );
}

export default Vip;
