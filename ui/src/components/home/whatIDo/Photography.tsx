import { Link } from "react-router-dom";

import { selectHomeContent } from "../../../store/generalSlice";
import { useSelector } from "../../../store/hooks";
import { HomeContent } from "../../../types/home";
import Loading from "../../shared/Loading";
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
        <Link to={content.linkToPortfolio}>
          <button className="mt-8 rounded-2xl border border-solid border-white px-10 py-3 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:backdrop-brightness-150">
            See in portfolio
          </button>
        </Link>
      </div>
      <div className="col-span-2 text-center">
        <Carousel />
      </div>
    </div>
  );
}

export default Photography;
