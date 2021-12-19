import { useEffect } from "react";
import "juxtaposejs/build/js/juxtapose.js";
import "juxtaposejs/build/css/juxtapose.css";

function Juxtapose() {
  useEffect(() => {
    // eslint-disable-next-line
    const slider = new juxtapose.JXSlider(
      "#juxtapose",
      [
        {
          src: "https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_600,ar_1.33/v1/svip/186/7-ImageSegment/cancer.jpg",
        },
        {
          src: "https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_600,ar_1.33/v1/svip/186/7-ImageSegment/cancer_otsu.png",
        },
      ],
      {
        animate: true,
        startPosition: "50%",
        makeResponsive: true,
      },
    );
  }, []);

  return <div id="juxtapose" />;
}

export default Juxtapose;
