import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { env } from "@/env";

const cld = new Cloudinary({
  cloud: {
    cloudName: env.VITE_CLOUDINARY_CLOUD_NAME,
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

export function buildCld(publicId: string) {
  return cld.image(publicId).resize(Resize.scale().width("auto"));
}

export function buildCldUrl(publicId: string) {
  return cld.image(publicId).resize(Resize.scale().width("auto")).toURL();
}
