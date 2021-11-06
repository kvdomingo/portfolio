import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Image } from "cloudinary-react";
import TitleComponent from "../../shared/TitleComponent";
import Masonry from "masonry-layout/masonry";
import imagesLoaded from "imagesloaded/imagesloaded";
import { SRLWrapper } from "simple-react-lightbox";
import "./Gallery.css";
import api from "../../utils/Endpoints";

function Gallery() {
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const match = useRouteMatch();
  const { photogPage } = match.params;

  useEffect(() => {
    let slug = photogPage ? photogPage : "latest";
    api.photography
      .gallery(slug)
      .then(res => {
        let { data } = res;
        setImages(data.images || []);
        const grid = document.querySelector(".grid");
        const msnry = new Masonry(grid, {
          itemSelector: ".grid-item",
          columnWidth: ".grid-sizer",
          percentPosition: true,
        });
        const imgLoad = new imagesLoaded(grid);
        imgLoad.on("progress", () => {
          msnry.layout();
          setIsLoaded(true);
        });
        imgLoad.on("done", () => {
          msnry.layout();
        });
        imgLoad.on("always", () => {
          msnry.layout();
        });
      })
      .catch(err => console.error(err.message));
  }, []);

  return (
    <>
      <TitleComponent
        title={photogPage ? `${photogPage[0].toUpperCase()}${photogPage.slice(1)} | Photography` : "Photography"}
        description={`${
          photogPage ? `${photogPage[0].toUpperCase()}${photogPage.slice(1)} | Photography` : "Photography"
        } section of the photography portfolio of Kenneth V. Domingo`}
        keywords="photography, latest, live, clients, portraits, portfolio, kvdomingo, KVD Studio, Kenneth V. Domingo"
      />
      <div className="grid text-center">
        <div
          className="text-center mt-5 my-5 spinner-grow spinner-grow-lg"
          style={{ display: isLoaded ? "none" : "block-inline" }}
        />
        <div className="grid-sizer" />
        <SRLWrapper style={{ display: isLoaded ? "block-inline" : "none" }}>
          {images.map((im, i) => (
            <div className={"grid-item p-2"}>
              <Image
                publicId={im.publicId}
                cloudName="kdphotography-assets"
                responsive
                responsiveUseBreakpoints
                crop="scale"
                dpr="auto"
                width="auto"
                className="cld-shadow img-fluid"
              />
            </div>
          ))}
        </SRLWrapper>
      </div>
    </>
  );
}

export default Gallery;
