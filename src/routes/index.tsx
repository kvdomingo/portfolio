import { AdvancedImage } from "@cloudinary/react";
import { Resize } from "@cloudinary/url-gen/actions";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import info from "@/info.json";
import { cld } from "@/lib/utils";

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
            <Button
              className="btn btn-outline btn-accent btn-wide"
              variant="outline"
            >
              <Instagram />
              Instagram
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
