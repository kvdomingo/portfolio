import Title from "../shared/Title";
import Cover from "./Cover";
import HowIDoIt from "./HowIDoIt";
import WhatIDo from "./WhatIDo";

function Home() {
  return (
    <>
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
    </>
  );
}

export default Home;
