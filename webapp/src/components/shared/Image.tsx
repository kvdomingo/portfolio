import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Box } from "@mui/material";
import cld from "../../api/cloudinary";

interface ImageProps {
  publicId: string;
}

function Image({ publicId }: ImageProps) {
  return (
    <Box
      component="img"
      src={cld.image(publicId).resize(Resize.scale().width("auto")).toURL()}
      width="100%"
      height="auto"
      sx={{ mx: "auto" }}
    />
  );
}

export default Image;
