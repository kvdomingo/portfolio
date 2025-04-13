import BeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

import cld from "@/actions/_utils/cloudinary.client";
import { Resize } from "@cloudinary/url-gen/actions/resize";

export default function BeforeAfter() {
  const imgBefore = cld
    .image("svip/186/7-ImageSegment/cancer")
    .resize(Resize.scale().width("auto"));
  const imgAfter = cld
    .image("svip/186/7-ImageSegment/cancer_otsu")
    .resize(Resize.scale().width("auto"));

  return (
    <BeforeAfterSlider
      className="rounded-2xl"
      firstImage={{ imageUrl: imgAfter.toURL(), alt: "cancer otsu" }}
      secondImage={{ imageUrl: imgBefore.toURL(), alt: "cancer" }}
      delimiterIconStyles={{
        border: "3px solid #818cf8",
      }}
      currentPercentPosition={33}
    />
  );
}
