import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({
  cloud: {
    cloudName: "kdphotography-assets",
  },
  url: {
    secure: true,
  },
  tag: {
    clientHints: true,
    responsive: {
      isResponsive: true,
    },
    contentDelimiter: "/",
  },
});

export default cld;

export function buildCldUrl(publicId: string) {
  return cld.image(publicId).resize(Resize.scale().width("auto")).toURL();
}
