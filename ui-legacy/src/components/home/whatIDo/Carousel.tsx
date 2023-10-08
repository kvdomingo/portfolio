import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { Resize } from "@cloudinary/url-gen/actions/resize";
import { MobileStepper } from "@mui/material";

import cld from "../../../api/cloudinary";
import carouselData from "./carouselData.json";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Carousel() {
  const [activeStep, setActiveStep] = useState(0);
  const images = carouselData.map(c => ({
    publicId: c,
    url: cld.image(c).resize(Resize.scale().width("auto")).toURL(),
  }));

  return (
    <div>
      <AutoPlaySwipeableViews
        axis="x"
        className="m-0 rounded-2xl p-0"
        index={activeStep}
        onChangeIndex={step => setActiveStep(step)}
        enableMouseEvents
      >
        {images.map((c, i) => (
          <div key={c.publicId}>
            {Math.abs(activeStep - i) <= 2 ? (
              <img
                src={c.url}
                alt={c.publicId}
                className="block h-auto w-full overflow-hidden"
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        variant="dots"
        backButton={null}
        nextButton={null}
        steps={images.length}
        position="static"
        activeStep={activeStep}
        className="flex place-content-center bg-transparent"
        sx={{
          "& .MuiMobileStepper-dot": {
            "backgroundColor": "rgba(255, 255, 255, 0.5)",
            "zIndex": 10,
            "mt": -6,
            "&.MuiMobileStepper-dotActive": {
              backgroundColor: "primary.main",
            },
          },
        }}
      />
    </div>
  );
}

export default Carousel;
