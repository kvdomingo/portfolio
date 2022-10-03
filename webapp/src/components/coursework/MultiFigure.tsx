import HTMLReactParser from "html-react-parser";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Container, Grid, Typography } from "@mui/material";
import cld from "../../api/cloudinary";

interface MultiFigureProps {
  id: string;
  columns: number;
  data: any[];
  subject: string;
  folder: string;
  caption: string;
}

function MultiFigure({ id, columns, data, subject, folder, caption }: MultiFigureProps) {
  return (
    <Container maxWidth={false} sx={{ my: 6 }} id={id}>
      <Grid container my={6} alignItems="center" spacing={1}>
        {data.map((image, i) => (
          <Grid key={i} item xs={12} md={Math.floor(12 / columns)}>
            <img
              src={cld.image(`svip/${subject}/${folder}/${image.url}`).resize(Resize.scale().width("auto")).toURL()}
              width="100%"
              height="auto"
            />
            {!!image.caption && (
              <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                {image.caption}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
      <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: "center" }}>
        {HTMLReactParser(caption)}
      </Typography>
    </Container>
  );
}

export default MultiFigure;
