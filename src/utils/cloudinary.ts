import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "astro:env/server";

import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { v2 as cloudinary } from "cloudinary";

const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUDINARY_CLOUD_NAME,
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

cloudinary.config({
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  cloud_name: CLOUDINARY_CLOUD_NAME,
  secure: true,
});

export const cld2 = cloudinary;

export function buildCldUrl(publicId: string) {
  return cld.image(publicId).resize(Resize.scale().width("auto")).toURL();
}
