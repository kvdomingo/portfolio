import { Cloudinary } from "@cloudinary/url-gen";

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
