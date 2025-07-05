import { MobileStepper } from "@mui/material";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { buildCldUrl } from "@/actions/_utils/cloudinary.client.client";
import info from "@/info.json";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const { carousel } = info.home.photography;

export default function Carousel() {
  const [activeStep, setActiveStep] = useState(0);
  const images = carousel.map((c) => ({
    publicId: c.publicId,
    url: buildCldUrl(c.publicId),
  }));

  return (
    <div>
      <AutoPlaySwipeableViews
        axis="x"
        className="m-0 rounded-2xl p-0"
        enableMouseEvents
        index={activeStep}
        onChangeIndex={(step) => setActiveStep(step)}
      >
        {images.map((c, i) => (
          <div key={c.publicId}>
            {Math.abs(activeStep - i) <= 2 ? (
              <img
                alt={c.publicId}
                className="block h-auto w-full overflow-hidden"
                src={c.url}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        activeStep={activeStep}
        backButton={<div />}
        className="bg-transparent"
        nextButton={<div />}
        position="static"
        steps={images.length}
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
        variant="dots"
      />
    </div>
  );
}
