import { useEffect } from "react";

import api from "@/api";
import { selectHomeContent, updateHomeContent } from "@/store/generalSlice.ts";
import { useDispatch, useSelector } from "@/store/hooks.ts";

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
    <div className="bg-slate-900">
      <div className="container py-12 text-center">
        <h2 className="section-header text-6xl text-white">What I Do</h2>
        <hr className="my-8" />
        <Photography content={homeContent.data?.[0] ?? []} />
        <Vip content={homeContent.data?.[1] ?? []} />
        <Dev content={homeContent.data?.[2] ?? []} />
      </div>
    </div>
  );
}

export default WhatIDo;
