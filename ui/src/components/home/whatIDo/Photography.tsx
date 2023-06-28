import ButtonLink from "@/components/shared/ButtonLink.tsx";
import Loading from "@/components/shared/Loading";
import { selectHomeContent } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";
import { HomeContent } from "@/types/home.ts";

import Carousel from "./Carousel";

interface PhotographyProps {
  content: HomeContent;
}

function Photography({ content }: PhotographyProps) {
  const { loaded } = useSelector(selectHomeContent);

  return !loaded ? (
    <Loading color="white" />
  ) : (
    <div data-aos="fade-up" className="my-8 grid grid-cols-5 gap-36">
      <div className="col-span-3 my-auto text-left">
        <h3 className="mb-8 text-3xl uppercase tracking-[0.5rem]">
          {content.sectionHeader}
        </h3>
        <p>{content.sectionBody}</p>
        <ButtonLink to={content.linkToPortfolio}>See in portfolio</ButtonLink>
      </div>
      <div className="col-span-2 text-center">
        <Carousel />
      </div>
    </div>
  );
}

export default Photography;
