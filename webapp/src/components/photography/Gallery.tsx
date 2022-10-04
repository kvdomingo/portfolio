import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import dateFormat from "dateformat";
import { motion } from "framer-motion";
import api from "../../api";
import { useDispatch, useSelector } from "../../store/hooks";
import { selectClients, selectLatest, updateLatest } from "../../store/photographySlice";
import Loading from "../shared/Loading";
import ImageLoaded from "./ImageLoaded";
import Lightbox from "./Lightbox";

function Gallery() {
  const dispatch = useDispatch();
  const params = useParams();
  const gallerySlug = params?.gallerySlug ?? "latest";
  const clientSlug = params.clientSlug;
  const data = useSelector(selectLatest);
  const clients = useSelector(selectClients);
  const clientData = clients.data.find(c => c.slug === clientSlug);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let request: Promise<AxiosResponse>;
    if (!clientSlug) request = api.photography.gallery(gallerySlug);
    else request = api.photography.clients(clientSlug);
    request
      .then(res =>
        dispatch(
          updateLatest({
            data: res.data.images,
            loaded: true,
          }),
        ),
      )
      .catch(err => console.error(err.message))
      .finally(() => setLoading(false));
  }, [dispatch, gallerySlug, clientSlug]);

  return loading ? (
    <Loading />
  ) : (
    <>
      {!!clientSlug && clientData && (
        <Breadcrumbs sx={{ mb: 2 }}>
          <Box
            component={Link}
            to="/photography/clients"
            sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "primary.main" }}
          >
            <ChevronLeft /> Clients
          </Box>
          <Typography color="text.secondary">
            {clientData.name}{" "}
            {!!clientData.shootDate && <>({dateFormat(new Date(clientData.shootDate), "dd mmm yyyy")})</>}
          </Typography>
        </Breadcrumbs>
      )}
      <motion.div layout>
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
              setSelected={() => setSelected(data.data.findIndex(d => d.publicId === image.publicId))}
            />
          ))}
        </Masonry>
      </motion.div>
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
