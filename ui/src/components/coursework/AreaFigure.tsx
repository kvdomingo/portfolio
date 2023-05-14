import HTMLReactParser from "html-react-parser";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Box, Grid, Typography } from "@mui/material";
import cld from "../../api/cloudinary";

interface AreaFigureProps {
  images: string[];
  caption: string;
}

function AreaFigure({ images, caption }: AreaFigureProps) {
  return (
    <Box sx={{ my: 6 }}>
      <Grid container justifyContent="center" spacing={1}>
        {images.map((image, i) => (
          <Grid item xs={12} md key={i}>
            <img
              src={cld
                .image(`svip/186/4-MeasuringArea/${image}`)
                .resize(Resize.scale().width("auto"))
                .toURL()}
              height="auto"
              width="100%"
            />
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ textTransform: "uppercase", textAlign: "center" }}
            >
              {image.split("_").slice(-1)[0]}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        {HTMLReactParser(caption)}
      </Typography>
    </Box>
  );
}

export default AreaFigure;
