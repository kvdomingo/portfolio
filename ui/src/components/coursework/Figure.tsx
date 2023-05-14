import HTMLReactParser from "html-react-parser";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Box, Grid, Typography } from "@mui/material";
import cld from "../../api/cloudinary";

interface FigureProps {
  id: string;
  publicId: string;
  caption?: string;
}

function Figure({ id, publicId, caption }: FigureProps) {
  return (
    <Grid id={id} container sx={{ my: 8 }}>
      <Grid item xs={12}>
        <Box
          component="img"
          width="100%"
          height="auto"
          src={cld.image(publicId).resize(Resize.scale().width("auto")).toURL()}
        />
      </Grid>
      {!!caption && (
        <Grid item xs={12} textAlign="center">
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {HTMLReactParser(caption)}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default Figure;
