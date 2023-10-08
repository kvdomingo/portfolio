import { memo } from "react";

import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
} from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";

import cld from "@/api/cloudinary";
import { cn } from "@/utils";

interface ImageProps {
  id?: string;
  publicId: string;
  height?: number | string;
  width?: number | string;
  alt?: string;
  className: string;
}

function Image({
  alt = "",
  id,
  height,
  width,
  publicId,
  className,
  ...rest
}: ImageProps) {
  const cldImg = cld.image(publicId).resize(scale());

  return (
    <AdvancedImage
      {...rest}
      id={id}
      cldImg={cldImg}
      alt={alt}
      className={cn("h-auto w-full", className)}
      plugins={[
        lazyload(),
        responsive(),
        placeholder({ mode: "predominant-color" }),
      ]}
    />
  );
}

const MemoizedImage = memo(Image);

MemoizedImage.displayName = "Image";

export default MemoizedImage;
