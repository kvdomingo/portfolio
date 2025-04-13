import { PUBLIC_CLOUDINARY_CLOUD_NAME } from "astro:env/client";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "astro:env/server";

import { v2 as cloudinary } from "cloudinary";
import type { AdminAndResourceOptions } from "cloudinary";

export const DEFAULT_OPTIONS = {
  max_results: 500,
  direction: "desc",
  secure: true,
  type: "upload",
} satisfies AdminAndResourceOptions;

cloudinary.config({
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  cloud_name: PUBLIC_CLOUDINARY_CLOUD_NAME,
  secure: true,
});

export const cld2 = cloudinary;
