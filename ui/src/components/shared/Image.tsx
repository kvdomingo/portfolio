import { Resize } from "@cloudinary/url-gen/actions/resize";
import { block } from "million/react";

import cld from "@/api/cloudinary";
import { MillionProps } from "@/types";

interface ImageProps extends MillionProps {
  id?: string;
  publicId: string;
  height?: number | string;
  width?: number | string;
  alt?: string;
}

const Image = block<ImageProps>(({ alt = "", id, height, width, publicId }) => {
  return (
    <img
      id={id}
      src={cld.image(publicId).resize(Resize.scale().width("auto")).toURL()}
      alt={alt}
      height={height ?? "auto"}
      width={width ?? "auto"}
      className="mx-auto"
    />
  );
});

export default Image;
