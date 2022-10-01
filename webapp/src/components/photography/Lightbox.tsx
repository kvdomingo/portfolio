import { useEffect, useState } from "react";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { ChevronLeft, ChevronRight, Close } from "@mui/icons-material";
import { Box, Fade, Grid, IconButton, Modal } from "@mui/material";
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

  return currentIndex != null ? (
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
    >
      <Fade in={open}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={1} container alignItems="center">
            <IconButton onClick={() => setCurrentIndex(i => (i === 0 ? i : i! - 1))}>
              <ChevronLeft sx={{ fontSize: "2em", color: "white" }} />
            </IconButton>
          </Grid>
          <Grid item xs container alignItems="center" justifyContent="center">
            <Box
              component="img"
              src={cld.image(imageList[currentIndex].publicId).resize(Resize.scale().width("auto")).toURL()}
              alt={imageList[currentIndex].publicId}
              sx={{ height: "95vh", width: "auto" }}
            />
          </Grid>
          <Grid item xs={1} container alignItems="center" justifyContent="flex-end">
            <IconButton onClick={() => setCurrentIndex(i => (i === imageList.length - 1 ? i : i! + 1))}>
              <ChevronRight sx={{ fontSize: "2em", color: "white" }} />
            </IconButton>
          </Grid>
          <IconButton sx={{ position: "absolute", top: "1em", right: "0.5em" }} onClick={handleClose}>
            <Close sx={{ fontSize: "1.5em", color: "white" }} />
          </IconButton>
        </Grid>
      </Fade>
    </Modal>
  ) : null;
}

export default Lightbox;
