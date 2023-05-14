import { useState } from "react";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Box, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import cld from "../../api/cloudinary";
import { ImageMetadata } from "../../types/photography";

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
    <motion.div>
      {!loaded && (
        <Box
          component={motion.div}
          animate="center"
          exit="initial"
          variants={variants}
          sx={{
            width: "100%",
            height: "auto",
            aspectRatio: `${image.width / image.height}`,
          }}
        >
          <Skeleton height="100%" variant="rounded" />
        </Box>
      )}
      <Box
        component={motion.img}
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
        sx={{
          aspectRatio: `${image.width / image.height}`,
          borderRadius: "5px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          cursor: "pointer",
          visibility: loaded ? "visible" : "hidden",
        }}
        onClick={setSelected}
      />
    </motion.div>
  );
}

export default ImageLoaded;
