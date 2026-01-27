import { Resize } from "@cloudinary/url-gen/actions";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";
import cld from "@/utils/cloudinary.client";

export function BeforeAfter() {
  const imgBefore = cld
    .image("svip/186/7-ImageSegment/cancer")
    .resize(Resize.scale().width("auto").height(600));
  const imgAfter = cld
    .image("svip/186/7-ImageSegment/cancer_otsu")
    .resize(Resize.scale().width("auto").height(600));

  return (
    <ImageComparison
      className="aspect-video h-[600px] rounded-2xl"
      enableHover
      springOptions={{
        bounce: 0.3,
      }}
    >
      <ImageComparisonImage src={imgBefore.toURL()} position="left" alt="cancer" />
      <ImageComparisonImage src={imgAfter.toURL()} position="right" alt="cancer otsu" />
      <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-xs" />
    </ImageComparison>
  );
}
