import type { ResourceApiResponse } from "cloudinary";
import { Masonry } from "./masonry";

interface GalleryProps {
  images: Array<ResourceApiResponse["resources"][number]>;
}

export function Gallery({ images }: GalleryProps) {
  return (
    <div className="w-full px-4">
      <Masonry images={images} />
    </div>
  );
}
