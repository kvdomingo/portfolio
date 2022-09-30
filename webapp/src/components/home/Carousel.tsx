import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Box, MobileStepper } from "@mui/material";
import cld from "../../api/cloudinary";
import carouselData from "./carouselData.json";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Carousel() {
  const [activeStep, setActiveStep] = useState(0);
  const images = carouselData.map(c => ({
    publicId: c,
    url: cld.image(c).resize(Resize.scale().width("auto")).toURL(),
  }));

  return (
    <Box>
      <Box
        component={AutoPlaySwipeableViews}
        axis="x"
        index={activeStep}
        onChangeIndex={step => setActiveStep(step)}
        enableMouseEvents
        sx={{ m: 0, p: 0 }}
      >
        {images.map((c, i) => (
          <div key={c.publicId}>
            {Math.abs(activeStep - i) <= 2 ? (
              <Box
                component="img"
                sx={{ width: "100%", height: "auto", display: "block", overflow: "hidden" }}
                src={c.url}
                alt={c.publicId}
              />
            ) : null}
          </div>
        ))}
      </Box>
      <MobileStepper
        variant="dots"
        backButton={null}
        nextButton={null}
        steps={images.length}
        position="static"
        activeStep={activeStep}
        sx={{
          "backgroundColor": "transparent",
          "display": "flex",
          "justifyContent": "center",
          "& .MuiMobileStepper-dot": {
            "backgroundColor": "rgba(255, 255, 255, 0.5)",
            "zIndex": 999,
            "mt": -6,
            "&.MuiMobileStepper-dotActive": {
              backgroundColor: "primary.main",
            },
          },
        }}
      />
    </Box>
  );
}

export default Carousel;
