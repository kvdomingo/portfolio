import BasePage from "@/components/shared/BasePage.tsx";

import Title from "../shared/Title";
import Cover from "./Cover";
import HowIDoIt from "./HowIDoIt";
import WhatIDo from "./whatIDo";

function Home() {
  return (
    <BasePage>
      <Title
        title="Home"
        description="CV and Portfolio of Kenneth V. Domingo and KVD Studio including photography, relevant coursework, and web and app development"
        keywords={[
          "KVD Studio",
          "Kenneth V. Domingo",
          "Kenneth Domingo Photography",
          "Python",
          "photography",
          "physics",
          "applied physics",
          "kvdomingo",
        ]}
      />
      <Cover />
      <WhatIDo />
      <HowIDoIt />
    </BasePage>
  );
}

export default Home;
