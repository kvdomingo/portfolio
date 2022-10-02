import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { ChevronLeft } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import dateFormat from "dateformat";
import { motion } from "framer-motion";
import api from "../../api";
import cld from "../../api/cloudinary";
import { useDispatch, useSelector } from "../../store/hooks";
import { selectClients, selectLatest, updateLatest } from "../../store/photographySlice";
import Loading from "../shared/Loading";
import Lightbox from "./Lightbox";

function Gallery() {
  const dispatch = useDispatch();
  const params = useParams();
  const gallerySlug = params?.gallerySlug ?? "latest";
  const clientSlug = params.clientSlug;
  const data = useSelector(selectLatest);
  const clients = useSelector(selectClients);
  const clientData = clients.data.find(c => c.slug === clientSlug);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

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
          <motion.div layout key={image.publicId}>
            <Box
              component={motion.img}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              viewport={{ once: true }}
              src={cld.image(image.publicId).resize(Resize.scale().width("auto")).toURL()}
              alt={image.publicId}
              loading="lazy"
              width="100%"
              height="auto"
              layout
              sx={{
                borderRadius: "5px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                cursor: "pointer",
              }}
              onClick={() => setSelected(data.data.findIndex(d => d.publicId === image.publicId))}
            />
          </motion.div>
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
