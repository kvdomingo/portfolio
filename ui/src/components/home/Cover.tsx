import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { block } from "million/react";

import cld from "../../api/cloudinary";

const Cover = block(() => {
  const backgroundImage = cld
    .image(
      "kdphotography/portfolio/static/portfolio/media-private/latest/20180713_1",
    )
    .resize(Resize.scale().width("auto"))
    .toURL();

  return (
    <div
      className="h-screen bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex h-full w-full place-content-center place-items-center bg-black/70">
        <span data-aos="fade-up">
          <AdvancedImage
            cldImg={cld.image("logo/logo-white")}
            plugins={[responsive(), placeholder()]}
            className="w-full max-w-[25vw] border-[3px] border-solid border-white p-6"
          />
        </span>
      </div>
    </div>
  );
});

export default Cover;
