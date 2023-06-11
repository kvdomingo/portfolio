import BeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

import { Resize } from "@cloudinary/url-gen/actions/resize";
import { block } from "million/react";

import cld from "@/api/cloudinary";
import ButtonLink from "@/components/shared/ButtonLink.tsx";
import Loading from "@/components/shared/Loading";
import { selectHomeContent } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";
import theme from "@/theme.ts";
import { MillionProps } from "@/types";
import { HomeContent } from "@/types/home.ts";

interface VipProps extends MillionProps {
  content: HomeContent;
}

const Vip = block<VipProps>(({ content }) => {
  const { loaded } = useSelector(selectHomeContent);
  const imgBefore = cld
    .image("svip/186/7-ImageSegment/cancer")
    .resize(Resize.scale().width("auto"));
  const imgAfter = cld
    .image("svip/186/7-ImageSegment/cancer_otsu")
    .resize(Resize.scale().width("auto"));

  return !loaded ? (
    <Loading color="white" />
  ) : (
    <div data-aos="fade-up" className="my-8 grid grid-cols-5 gap-36">
      <div className="col-span-3 my-auto">
        <BeforeAfterSlider
          className="rounded-2xl"
          firstImage={{ imageUrl: imgAfter.toURL(), alt: "cancer otsu" }}
          secondImage={{ imageUrl: imgBefore.toURL(), alt: "cancer" }}
          delimiterIconStyles={{
            border: `3px solid ${theme.palette.primary.main}`,
          }}
        />
      </div>
      <div className="col-span-2 my-auto text-right">
        <h3 className="mb-8 text-3xl uppercase tracking-[0.5rem]">
          {content.sectionHeader}
        </h3>
        <p>{content.sectionBody}</p>
        <ButtonLink to={content.linkToPortfolio}>See in portfolio</ButtonLink>
      </div>
    </div>
  );
});

export default Vip;
