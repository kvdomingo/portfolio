import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Image } from "cloudinary-react";
import Masonry from "masonry-layout/masonry";
import imagesLoaded from "imagesloaded/imagesloaded";
import { SRLWrapper } from "simple-react-lightbox";
import TitleComponent from "../../shared/TitleComponent";
import "./Gallery.css";
import api from "../../utils/Endpoints";

function ClientGallery() {
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const match = useRouteMatch();

  useEffect(() => {
    let { clientPage } = match.params;
    api.photography.clients(clientPage).then(res => {
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
    });
  }, []);

  return (
    <>
      <TitleComponent
        title="Clients | Photography"
        description="Clients section of the photography portfolio of Kenneth V. Domingo"
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
            <div key={i} className={`grid-item p-2`}>
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

export default ClientGallery;
