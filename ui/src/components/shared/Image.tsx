import { Resize } from "@cloudinary/url-gen/actions/resize";

import cld from "../../api/cloudinary";

interface ImageProps {
  id?: string;
  publicId: string;
  height?: number | string;
  width?: number | string;
  alt?: string;
}

function Image({ alt = "", id, height, width, publicId }: ImageProps) {
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
}

export default Image;
