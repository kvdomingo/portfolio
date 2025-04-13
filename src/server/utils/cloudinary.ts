import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "astro:env/server";

import type { AdminAndResourceOptions } from "cloudinary";

const CLOUD_NAME = "kdphotography-assets";

export const DEFAULT_OPTIONS = {
  max_results: 500,
  direction: "desc",
  secure: true,
  type: "upload",
} satisfies AdminAndResourceOptions;

export const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload`;

export const AUTHORIZATION = btoa(
  `${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`,
);
