import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { MobileStepper } from "@mui/material";

import info from "@/info.json";
import { buildCldUrl } from "@/utils/cloudinary";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const { carousel } = info.home.photography;

export default function Carousel() {
  const [activeStep, setActiveStep] = useState(0);
  const images = carousel.map(c => ({
    publicId: c,
    url: buildCldUrl(c),
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
        backButton={<div />}
        nextButton={<div />}
        steps={images.length}
        position="static"
        activeStep={activeStep}
        className="bg-transparent"
        sx={{
          "& .MuiMobileStepper-dot": {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            zIndex: 10,
            mt: -6,
            "&.MuiMobileStepper-dotActive": {
              backgroundColor: "#818cf8",
            },
          },
          "&.MuiPaper-root": {
            backgroundColor: "transparent",
          },
        }}
      />
    </div>
  );
}
