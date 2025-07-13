import { AdvancedImage } from "@cloudinary/react";
import { Resize } from "@cloudinary/url-gen/actions";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Github, Instagram } from "lucide-react";
import BeforeAfterSlider from "react-before-after-slider-component";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import info from "@/info.json";
import { cld } from "@/lib/utils";
import "react-before-after-slider-component/dist/build.css";

export const Route = createFileRoute("/")({
  component: Home,
});

const { carousel } = info.home.photography;
const images = carousel.map((c) => ({
  ...c,
  cldImg: cld()
    .image(c.publicId)
    .resize(
      Resize.fill()
        .aspectRatio(4 / 5)
        .width("auto")
        .gravity("auto:subject"),
    ),
}));

const imgBefore = cld()
  .image("svip/186/7-ImageSegment/cancer")
  .resize(Resize.scale().width("auto"));
const imgAfter = cld()
  .image("svip/186/7-ImageSegment/cancer_otsu")
  .resize(Resize.scale().width("auto"));

function Home() {
  return (
    <div className="flex flex-col gap-36">
      <section className="flex flex-col items-center gap-12">
        <h1 className="text-4xl uppercase tracking-[0.5rem]">Photography</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <AdvancedImage cldImg={image.cldImg} key={image.publicId} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Link to="/photography">
            <Button variant="ghost">See in portfolio</Button>
          </Link>
          <a
            href="https://instagram.com/arockentothemoon"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button variant="outline">
              <Instagram />
              Instagram
            </Button>
          </a>
        </div>
      </section>

      <section className="flex flex-col items-center gap-12">
        <h1 className="text-4xl uppercase tracking-[0.5rem]">
          Software Development
        </h1>
        <div>
          <TooltipProvider>
            {Object.entries(info.home.technologies).map(
              ([header, technologies]) => (
                <div key={header}>
                  <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div className="flex place-content-center place-items-center border-white border-b border-solid pr-0 pb-6 text-center md:place-content-end md:border-r md:border-b-0 md:pr-6 md:pb-0 md:text-right">
                      <h5 className="text-lg uppercase tracking-[0.25em]">
                        {header}
                      </h5>
                    </div>
                    <div className="col-span-3 my-auto grid grid-cols-4 gap-4 md:grid-cols-6 md:gap-12">
                      {technologies.map(({ name, logo }) => (
                        <Tooltip key={name}>
                          <TooltipTrigger asChild>
                            <img
                              alt={name}
                              className="my-auto p-4"
                              key={name}
                              src={logo}
                            />
                          </TooltipTrigger>
                          <TooltipContent>{name}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            )}
          </TooltipProvider>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Link to="/dev">
            <Button variant="ghost">See in portfolio</Button>
          </Link>
          <a
            href="https://instagram.com/arockentothemoon"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button variant="outline">
              <Github />
              GitHub
            </Button>
          </a>
        </div>
      </section>

      <section className="flex flex-col items-center gap-12">
        <div>
          <h2 className="text-xl uppercase tracking-[0.5rem]">
            Video & Image Processing
          </h2>
          <div className="container">
            <p>{info.home.vip.text}</p>
          </div>
        </div>
        <div className="col-span-3 my-auto">
          <BeforeAfterSlider
            className="rounded-2xl"
            currentPercentPosition={33}
            delimiterIconStyles={{
              border: "3px solid #818cf8",
            }}
            firstImage={{ imageUrl: imgAfter.toURL(), alt: "cancer otsu" }}
            secondImage={{ imageUrl: imgBefore.toURL(), alt: "cancer" }}
          />
        </div>
        <Link to="/svip">
          <Button variant="ghost">See in portfolio</Button>
        </Link>
      </section>
    </div>
  );
}
