import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ChevronLeft } from "@mui/icons-material";
import { Box, Breadcrumbs, Typography, useMediaQuery } from "@mui/material";
import dateFormat from "dateformat";

import { useSelector } from "@/store/hooks.ts";
import { selectClients, selectLatest } from "@/store/photographySlice.ts";

import Loading from "../shared/Loading";
import ImageLoaded from "./ImageLoaded";
import Lightbox from "./Lightbox";

function Gallery() {
  const params = useParams();
  const clientSlug = params.clientSlug;
  const { data, loaded } = useSelector(selectLatest);
  const clients = useSelector(selectClients);
  const clientData = clients.data.find(c => c.slug === clientSlug);
  const [selected, setSelected] = useState<number | null>(null);

  const sm = useMediaQuery("(min-width: 768px)");
  const md = useMediaQuery("(min-width: 1024px)");
  const lg = useMediaQuery("(min-width: 1280px)");

  const gridArray = useMemo(
    () => Array(lg ? 4 : md ? 3 : sm ? 2 : 1).fill(null),
    [sm, md, lg],
  );

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
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {gridArray.map((_, columnIndex) => {
          const division = Math.ceil(data.length / 4);
          const divisionLength = columnIndex * division;

          return (
            <div
              // layout
              className="flex flex-col gap-4"
              key={columnIndex}
            >
              {data
                .slice(divisionLength, divisionLength + division)
                .map(image => (
                  <div
                    key={image.publicId}
                    data-aos="fade-up"
                    onClick={() =>
                      setSelected(
                        data.findIndex(d => d.publicId === image.publicId),
                      )
                    }
                  >
                    <ImageLoaded key={image.publicId} image={image} />
                  </div>
                ))}
            </div>
          );
        })}
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
