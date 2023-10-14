import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { ChevronLeft } from "@mui/icons-material";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import dateFormat from "dateformat";
import ImagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";

import { useSelector } from "@/store/hooks.ts";
import { selectClients, selectLatest } from "@/store/photographySlice.ts";

import Loading from "../shared/Loading";
import ImageLoaded from "./ImageLoaded";
import Lightbox from "./Lightbox";

function Gallery() {
  const location = useLocation();
  const params = useParams();
  const clientSlug = params.clientSlug;
  const { data, loaded } = useSelector(selectLatest);
  const clients = useSelector(selectClients);
  const clientData = clients.data.find(c => c.slug === clientSlug);
  const [selected, setSelected] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const masonry = new Masonry(galleryRef.current, {
      itemSelector: ".gallery-item",
      percentPosition: true,
      columnWidth: ".gallery-sizer",
      horizontalOrder: true,
    });

    const imagesLoaded = ImagesLoaded(galleryRef.current);

    function onAlways() {
      masonry.layout && masonry.layout();
    }

    imagesLoaded.on("progress", onAlways);
    imagesLoaded.on("done", onAlways);
    imagesLoaded.on("always", onAlways);

    return () => {
      imagesLoaded.off("progress", onAlways);
      imagesLoaded.off("done", onAlways);
      imagesLoaded.off("always", onAlways);
    };
  }, [location.pathname]);

  return !(loaded || clients.loaded) ? (
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
      <div className="px-4">
        <div className="gallery" ref={galleryRef}>
          <div className="gallery-sizer" />
          {data.map(image => (
            <div
              key={image.publicId}
              className="gallery-item p-2"
              data-aos="fade-up"
              onClick={() =>
                setSelected(data.findIndex(d => d.publicId === image.publicId))
              }
            >
              <ImageLoaded key={image.publicId} image={image} />
            </div>
          ))}
        </div>
      </div>
      <Lightbox
        open={selected != null}
        handleClose={() => setSelected(null)}
        imageList={data}
        initialIndex={selected}
      />
    </>
  );
}

export default Gallery;
