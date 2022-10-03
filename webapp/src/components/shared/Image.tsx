import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Box } from "@mui/material";
import cld from "../../api/cloudinary";

interface ImageProps {
  id?: string;
  publicId: string;
  height?: number | string;
  width?: number | string;
}

function Image({ id, height, width, publicId }: ImageProps) {
  return (
    <Box
      id={id}
      component="img"
      src={cld.image(publicId).resize(Resize.scale().width("auto")).toURL()}
      height={height ?? "auto"}
      width={width ?? "auto"}
      sx={{ mx: "auto" }}
    />
  );
}

export default Image;
