import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: "kdphotography-assets",
  },
  url: {
    secure: true,
  },
});

export default cld;
