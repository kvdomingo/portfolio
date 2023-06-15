import { memo } from "react";

import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
} from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { block } from "million/react";

import cld from "@/api/cloudinary";
import { MillionProps } from "@/types";
import { cn } from "@/utils";

interface ImageProps extends MillionProps {
  id?: string;
  publicId: string;
  height?: number | string;
  width?: number | string;
  alt?: string;
  className: string;
}

const Image = block<ImageProps>(
  ({ alt = "", id, height, width, publicId, className, ...rest }) => {
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
  },
);

export default memo(Image);
