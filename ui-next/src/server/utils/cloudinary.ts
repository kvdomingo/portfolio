const { CLOUDINARY_API_KEY: API_KEY, CLOUDINARY_API_SECRET: API_SECRET } =
  import.meta.env;

const CLOUD_NAME = "kdphotography-assets";

export const DEFAULT_OPTIONS = {
  max_results: 500,
  direction: "desc",
  secure: true,
};

export const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload`;

export const AUTHORIZATION = btoa(`${API_KEY}:${API_SECRET}`);
