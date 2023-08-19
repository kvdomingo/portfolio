import { useState } from "react";

import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";

import cld from "@/api/cloudinary";
import { ImageMetadata } from "@/types/photography";
import { cn } from "@/utils";

interface ImageLoadedProps {
  image: ImageMetadata;
  setSelected: () => void;
}

const variants = {
  initial: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
};

function ImageLoaded({ image, setSelected }: ImageLoadedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div layout>
      {!loaded && (
        <motion.div
          animate="center"
          exit="initial"
          variants={variants}
          className={cn(
            "h-auto w-full",
            `aspect-[${image.width / image.height}]`,
          )}
        >
          <Skeleton height="100%" variant="rounded" />
        </motion.div>
      )}
      <motion.img
        initial="initial"
        animate="center"
        exit="initial"
        variants={variants}
        viewport={{ once: true }}
        onLoad={() => setLoaded(true)}
        src={cld
          .image(image.publicId)
          .resize(Resize.scale().width("auto"))
          .toURL()}
        alt={image.publicId}
        loading="lazy"
        width="100%"
        height="auto"
        layout
        className={cn(
          "cursor-pointer rounded drop-shadow-lg",
          `aspect-[${image.width / image.height}]`,
          {
            hidden: !loaded,
          },
        )}
        onClick={setSelected}
      />
    </motion.div>
  );
}

export default ImageLoaded;
