import { useEffect } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import api from "../../api";
import { selectHomeContent, updateHomeContent } from "../../store/generalSlice";
import { useDispatch, useSelector } from "../../store/hooks";
import Dev from "./Dev";
import Photography from "./Photography";
import Vip from "./Vip";

function WhatIDo() {
  const dispatch = useDispatch();
  const homeContent = useSelector(selectHomeContent);

  useEffect(() => {
    if (!homeContent.loaded) {
      api.home
        .content()
        .then(res =>
          dispatch(
            updateHomeContent({
              data: res.data,
              loaded: true,
            }),
          ),
        )
        .catch(err => console.error(err.message));
    }
  }, [dispatch, homeContent.loaded]);

  return (
    <Box sx={{ backgroundColor: "#212121" }}>
      <Container sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h2" color="white" className="section-header">
          What I Do
        </Typography>
        <Divider variant="middle" sx={{ backgroundColor: "#757575", my: 4 }} />
        <Photography content={homeContent.data?.[0] ?? []} />
        <Vip content={homeContent.data?.[1] ?? []} />
        <Dev content={homeContent.data?.[2] ?? []} />
      </Container>
    </Box>
  );
}

export default WhatIDo;
