import type { AdminAndResourceOptions } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { env } from "@/env";

export const DEFAULT_OPTIONS = {
  max_results: 500,
  direction: "desc",
  secure: true,
  type: "upload",
} satisfies AdminAndResourceOptions;

cloudinary.config({
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  cloud_name: env.VITE_CLOUDINARY_CLOUD_NAME,
  secure: true,
});

export const cld2 = cloudinary;
