import {
  MDBCarousel as Carousel,
  MDBCarouselInner as CarouselInner,
  MDBCarouselItem as CarouselItem,
  MDBView as View,
} from "mdbreact";
import { Image } from "cloudinary-react";
import carouselData from "./CarouselData.json";

function MainCarousel() {
  return (
    <Carousel length={carouselData.data.length} activeItem={1} showControls={false} showIndicators interval={3000}>
      <CarouselInner>
        {carouselData.data.map((publicId, i) => (
          <CarouselItem key={i} itemId={i + 1}>
            <View className="carousel-cell">
              <Image
                className="d-block img-fluid mx-auto"
                publicId={publicId}
                cloudName="kdphotography-assets"
                secure
                responsive
                responsiveUseBreakpoints
                width="auto"
                dpr="auto"
                crop="scale"
                ar={0.67}
              />
            </View>
          </CarouselItem>
        ))}
      </CarouselInner>
    </Carousel>
  );
}

export default MainCarousel;
