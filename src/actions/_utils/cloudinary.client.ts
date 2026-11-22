import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
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

const scaled = (publicId: string, width: number, extra = "f_auto,q_auto") =>
  cld.image(publicId).addTransformation(`c_limit,w_${width},${extra}`).toURL();

const srcset = (publicId: string, widths: number[]) =>
  widths.map(w => `${scaled(publicId, w)} ${w}w`).join(", ");

export const GRID_SIZES =
  "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

export const gridSrc = (publicId: string) => scaled(publicId, 800);
export const gridSrcset = (publicId: string) =>
  srcset(publicId, [400, 800, 1200, 1600]);
export const lightboxSrcset = (publicId: string) =>
  srcset(publicId, [1280, 1920, 2560, 3840]);
export const placeholderUrl = (publicId: string) =>
  scaled(publicId, 32, "e_blur:1000,q_1,f_auto");
export const ogImageUrl = (publicId: string) =>
  scaled(publicId, 1200, "f_jpg,q_auto");
