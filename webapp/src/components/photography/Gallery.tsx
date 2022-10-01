import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Masonry } from "@mui/lab";
import { Box } from "@mui/material";
import api from "../../api";
import cld from "../../api/cloudinary";
import { useDispatch, useSelector } from "../../store/hooks";
import { selectLatest, updateLatest } from "../../store/photographySlice";
import Loading from "../shared/Loading";
import Lightbox from "./Lightbox";

function Gallery() {
  const dispatch = useDispatch();
  const slug = useParams()?.gallerySlug ?? "latest";
  const data = useSelector(selectLatest);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    api.photography
      .gallery(slug)
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
  }, [dispatch, slug]);

  return loading ? (
    <Loading />
  ) : (
    <>
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
          <Box
            key={image.publicId}
            component="img"
            src={cld.image(image.publicId).resize(Resize.scale().width("auto")).toURL()}
            alt={image.publicId}
            loading="lazy"
            width="100%"
            height="auto"
            sx={{
              borderRadius: "5px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              cursor: "pointer",
            }}
            onClick={() => setSelected(data.data.findIndex(d => d.publicId === image.publicId))}
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
