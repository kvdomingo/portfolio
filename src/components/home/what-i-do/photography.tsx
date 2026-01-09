import { Resize } from "@cloudinary/url-gen/actions/resize";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import info from "@/info.json";
import cld from "@/utils/cloudinary.client";

const { carousel } = info.home.photography;
const images = carousel.map((c) => ({
  ...c,
  url: cld
    .image(c.publicId)
    .resize(Resize.fill().aspectRatio(1).width("auto").gravity("auto:subject"))
    .toURL(),
}));

export function Photography() {
  return (
    <section className="flex flex-col gap-12">
      <div>
        <h2 className="text-xl uppercase tracking-[0.5rem]">Photography</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((im) => (
          <div key={im.publicId} className="flex h-full flex-col items-center">
            <img src={im.url} alt={im.caption} loading="lazy" />
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center gap-4 md:flex-row">
        <Button asChild size="wide-lg">
          <Link to="/photography">See in portfolio</Link>
        </Button>
        <Button asChild variant="outline" size="wide-lg">
          <a
            href="https://instagram.com/arockentothemoon"
            rel="noopener noreferrer"
            target="_blank"
          >
            <SiInstagram size={24} />
            Instagram
          </a>
        </Button>
      </div>
    </section>
  );
}
