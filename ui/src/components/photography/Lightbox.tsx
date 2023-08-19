import { KeyboardEvent, useEffect, useState } from "react";

import { Resize } from "@cloudinary/url-gen/actions/resize";
import { ChevronLeft, ChevronRight, Close } from "@mui/icons-material";
import { Fade, Grid, IconButton, Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import cld from "@/api/cloudinary";
import { ImageMetadata } from "@/types/photography.ts";

interface LightboxProps {
  open: boolean;
  handleClose: () => void;
  initialIndex: number | null;
  imageList: ImageMetadata[];
}

function Lightbox({
  open,
  handleClose,
  initialIndex,
  imageList,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case "ArrowLeft": {
        if (currentIndex !== 0) setCurrentIndex(i => i! - 1);
        return;
      }
      case "ArrowRight": {
        if (currentIndex !== imageList.length - 1) setCurrentIndex(i => i! + 1);
        return;
      }
      case "Home": {
        setCurrentIndex(0);
        return;
      }
      case "End": {
        setCurrentIndex(imageList.length - 1);
        return;
      }
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="h-screen w-full"
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        },
      }}
      closeAfterTransition
      onKeyDown={handleKeyDown}
    >
      <Fade in={open}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className="h-full"
        >
          <AnimatePresence custom={currentIndex} initial={false}>
            {currentIndex != null && (
              <motion.img
                key={imageList[currentIndex].publicId}
                src={cld
                  .image(imageList[currentIndex].publicId)
                  .resize(Resize.scale().width("auto"))
                  .toURL()}
                alt={imageList[currentIndex].publicId}
                custom={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.2 },
                }}
                className="absolute h-[95vh] w-auto"
              />
            )}
          </AnimatePresence>
          {currentIndex !== 0 && (
            <IconButton
              className="absolute left-[0.5em] top-1/2"
              onClick={() =>
                currentIndex === 0 ? null : setCurrentIndex(i => i! - 1)
              }
            >
              <ChevronLeft sx={{ fontSize: "2em", color: "white" }} />
            </IconButton>
          )}
          {currentIndex !== imageList.length - 1 && (
            <IconButton
              className="absolute right-[0.5em] top-1/2"
              onClick={() =>
                currentIndex === imageList.length - 1
                  ? null
                  : setCurrentIndex(i => i! + 1)
              }
            >
              <ChevronRight sx={{ fontSize: "2em", color: "white" }} />
            </IconButton>
          )}
          <IconButton
            className="absolute right-[0.5em] top-[1em]"
            onClick={handleClose}
          >
            <Close sx={{ fontSize: "1.5em", color: "white" }} />
          </IconButton>
        </Grid>
      </Fade>
    </Modal>
  );
}

export default Lightbox;
