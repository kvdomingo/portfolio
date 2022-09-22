import { Component } from "react";
import { Image } from "cloudinary-react";
import { withRouter } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import imagesLoaded from "imagesloaded/imagesloaded";
import Masonry from "masonry-layout/masonry";
import PropTypes from "prop-types";
import api from "../../api";
import TitleComponent from "../../shared/TitleComponent";
import "./Gallery.css";

class ClientGallery extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  state = {
    images: [],
    isLoaded: false,
  };

  componentDidMount() {
    let { clientPage } = this.props.match.params;
    api.photography.clients(clientPage).then(res => {
      let { data } = res;
      this.setState({ images: data.images || [] });
      const grid = document.querySelector(".grid");
      const msnry = new Masonry(grid, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
      });
      const imgLoad = new imagesLoaded(grid);
      imgLoad.on("progress", () => {
        msnry.layout();
        this.setState({ isLoaded: true });
      });
      imgLoad.on("done", () => {
        msnry.layout();
      });
      imgLoad.on("always", () => {
        msnry.layout();
      });
    });
  }

  render() {
    const { isLoaded, images } = this.state;
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
}

export default withRouter(ClientGallery);
