import { block } from "million/react";

import ButtonLink from "@/components/shared/ButtonLink.tsx";
import Loading from "@/components/shared/Loading";
import { selectHomeContent } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";
import { MillionProps } from "@/types";
import { HomeContent } from "@/types/home.ts";

interface DevProps extends MillionProps {
  content: HomeContent;
}

const Dev = block<DevProps>(({ content }) => {
  const { loaded } = useSelector(selectHomeContent);

  return !loaded ? (
    <Loading color="white" />
  ) : (
    <div data-aos="fade-up" className="my-24 grid grid-cols-5 gap-36">
      <div className="col-span-3 my-auto text-left">
        <h3 className="mb-8 text-3xl uppercase tracking-[0.5rem]">
          {content.sectionHeader}
        </h3>
        <p>{content.sectionBody}</p>
        <ButtonLink to={content.linkToPortfolio}>See in portfolio</ButtonLink>
      </div>
      <div className="col-span-2 mx-auto my-auto">
        <a
          href="https://www.credential.net/0300e26a-fcdc-40db-a4a0-689fad65ac9b"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src="https://storage.googleapis.com/kvdomingo-xyz-306716-assets/gcp-pca_badge.png"
            alt="Google Cloud Certified Professional Cloud Architect"
            width="66.67%"
            className="mx-auto"
          />
        </a>
      </div>
    </div>
  );
});

export default Dev;
