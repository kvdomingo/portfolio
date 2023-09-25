import { v2 as cloudinary } from "cloudinary";

export const options = cloudinary.config({
  cloud_name: "kdphotography-assets",
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  secure: true,
  type: "upload",
  max_results: 500,
});
