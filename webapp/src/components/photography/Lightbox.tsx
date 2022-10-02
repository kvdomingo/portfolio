import { KeyboardEvent, useEffect, useState } from "react";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { ChevronLeft, ChevronRight, Close } from "@mui/icons-material";
import { Box, Fade, Grid, IconButton, Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import cld from "../../api/cloudinary";
import { ImageMetadata } from "../../types/photography";

interface LightboxProps {
  open: boolean;
  handleClose: () => void;
  initialIndex: number | null;
  imageList: ImageMetadata[];
}

function Lightbox({ open, handleClose, initialIndex, imageList }: LightboxProps) {
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
      sx={{ width: "100%", height: "100vh" }}
      BackdropProps={{
        timeout: 500,
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
      closeAfterTransition
      onKeyDown={handleKeyDown}
    >
      <Fade in={open}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
          <AnimatePresence initial={false} custom={currentIndex}>
            {currentIndex != null && (
              <Box
                key={imageList[currentIndex].publicId}
                component={motion.img}
                src={cld.image(imageList[currentIndex].publicId).resize(Resize.scale().width("auto")).toURL()}
                alt={imageList[currentIndex].publicId}
                custom={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.1 },
                }}
                sx={{
                  height: "95vh",
                  width: "auto",
                  position: "absolute",
                }}
              />
            )}
          </AnimatePresence>
          {currentIndex !== 0 && (
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                left: "0.5em",
              }}
              onClick={() => (currentIndex === 0 ? null : setCurrentIndex(i => i! - 1))}
            >
              <ChevronLeft sx={{ fontSize: "2em", color: "white" }} />
            </IconButton>
          )}
          {currentIndex !== imageList.length - 1 && (
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                right: "0.5em",
              }}
              onClick={() => (currentIndex === imageList.length - 1 ? null : setCurrentIndex(i => i! + 1))}
            >
              <ChevronRight sx={{ fontSize: "2em", color: "white" }} />
            </IconButton>
          )}
          <IconButton sx={{ position: "absolute", top: "1em", right: "0.5em" }} onClick={handleClose}>
            <Close sx={{ fontSize: "1.5em", color: "white" }} />
          </IconButton>
        </Grid>
      </Fade>
    </Modal>
  );
}

export default Lightbox;
