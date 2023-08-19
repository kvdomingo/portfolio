import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ChevronLeft } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import dateFormat from "dateformat";

import { useSelector } from "@/store/hooks.ts";
import { selectClients, selectLatest } from "@/store/photographySlice.ts";

import Loading from "../shared/Loading";
import ImageLoaded from "./ImageLoaded";
import Lightbox from "./Lightbox";

function Gallery() {
  const params = useParams();
  const clientSlug = params.clientSlug;
  const data = useSelector(selectLatest);
  const clients = useSelector(selectClients);
  const clientData = clients.data.find(c => c.slug === clientSlug);
  const [selected, setSelected] = useState<number | null>(null);

  return !(data.loaded || clients.loaded) ? (
    <Loading />
  ) : (
    <>
      {!!clientSlug && clientData && (
        <Breadcrumbs sx={{ mb: 2 }}>
          <Box
            component={Link}
            to="/photography/clients"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            <ChevronLeft /> Clients
          </Box>
          <Typography color="text.secondary">
            {clientData.name}{" "}
            {!!clientData.shootDate && (
              <>({dateFormat(new Date(clientData.shootDate), "dd mmm yyyy")})</>
            )}
          </Typography>
        </Breadcrumbs>
      )}
      <Masonry
        columns={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}
        spacing={2}
      >
        {data.data.map(image => (
          <ImageLoaded
            key={image.publicId}
            image={image}
            setSelected={() =>
              setSelected(
                data.data.findIndex(d => d.publicId === image.publicId),
              )
            }
          />
        ))}
      </Masonry>
      <Lightbox
        open={selected != null}
        handleClose={() => setSelected(null)}
        imageList={data.data}
        initialIndex={selected}
      />
    </>
  );
}

export default Gallery;
