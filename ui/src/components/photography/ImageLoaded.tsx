import { memo } from "react";

import Image from "@/components/shared/Image.tsx";
import { ImageMetadata } from "@/types/photography";
import { cn } from "@/utils";

interface ImageLoadedProps {
  image: ImageMetadata;
}

function ImageLoaded({ image }: ImageLoadedProps) {
  const aspectRatio = Number((image.width / image.height).toFixed(2));

  return (
    <Image
      publicId={image.publicId}
      alt={image.publicId}
      className={cn(
        "w-full cursor-pointer rounded drop-shadow-lg",
        `aspect-[${aspectRatio}]`,
      )}
    />
  );
}

const MemoizedImageLoaded = memo(ImageLoaded);

MemoizedImageLoaded.displayName = "ImageLoaded";

export default ImageLoaded;
