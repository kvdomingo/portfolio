import type { ResourceApiResponse } from "cloudinary";
import Masonry from "./Masonry";

interface GalleryProps {
  images: Array<ResourceApiResponse["resources"][number]>;
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <div className="w-full px-4">
      <Masonry images={images} />
    </div>
  );
}
