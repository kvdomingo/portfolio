import Masonry from "./react/Masonry";
import type { ResourceApiResponse } from "cloudinary";

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
