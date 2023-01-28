import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Box } from "@mui/material";
import cld from "../../api/cloudinary";

function Cover() {
  const backgroundImage = cld
    .image("kdphotography/portfolio/static/portfolio/media-private/latest/20180713_1")
    .resize(Resize.scale().width("auto"))
    .toURL();

  return (
    <Box
      sx={{
        backgroundAttachment: "fixed",
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <Box
          component={AdvancedImage}
          data-aos="fade-up"
          cldImg={cld.image("logo/logo-white")}
          plugins={[responsive(), placeholder()]}
          sx={{
            maxWidth: {
              xs: "66.67vw",
              md: "25vw",
            },
            border: "3px solid white",
            p: {
              xs: 3,
              md: 6,
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default Cover;
