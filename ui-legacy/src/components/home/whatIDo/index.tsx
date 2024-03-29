import { selectHomeContent } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";

import Dev from "./Dev";
import Photography from "./Photography";
import Vip from "./Vip";

function WhatIDo() {
  const homeContent = useSelector(selectHomeContent);

  return (
    <div className="container py-12 text-center">
      <h2 className="section-header text-6xl text-white">What I Do</h2>
      <hr className="my-8" />
      <Photography content={homeContent.data?.[0] ?? []} />
      <Dev content={homeContent.data?.[2] ?? []} />
      <Vip content={homeContent.data?.[1] ?? []} />
    </div>
  );
}

export default WhatIDo;
