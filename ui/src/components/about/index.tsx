import { useEffect, useState } from "react";

import { CloudinaryImage } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Typography } from "@mui/material";
import { block } from "million/react";

import cld from "@/api/cloudinary";
import BasePage from "@/components/shared/BasePage.tsx";
import ButtonLink from "@/components/shared/ButtonLink.tsx";
import { selectAboutContent } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";

import JsxRenderer from "../shared/JsxRenderer";
import Loading from "../shared/Loading";
import Title from "../shared/Title";
import CurriculumVitae from "./CurriculumVitae.tsx";

const About = block(() => {
  const aboutContent = useSelector(selectAboutContent);
  const [image, setImage] = useState<CloudinaryImage>(null!);

  useEffect(() => {
    if (aboutContent.loaded) {
      if (!image) {
        setImage(
          cld
            .image(aboutContent.data[0].picture)
            .resize(Resize.scale().width("auto")),
        );
      }
    }
  }, [aboutContent.loaded, image]);

  return (
    <BasePage>
      <Title
        title="About"
        description="About Kenneth V. Domingo and KVD Studio, with curriculum vitae (CV) including educational attainment, work experience, and projects"
        keywords={[
          "curriculum vitae",
          "software engineering",
          "cloud engineering",
          "signal processing",
          "image processing",
          "video processing",
          "computational physics",
          "applied physics",
          "coursework",
          "Kenneth V. Domingo",
        ]}
      />
      <div className="container">
        <div className="grid grid-cols-3 gap-16">
          <div data-aos="fade-up">
            {!aboutContent.loaded || !image ? (
              <Loading />
            ) : (
              <>
                <img
                  src={image.toURL()}
                  alt=""
                  width="100%"
                  height="auto"
                  className="mb-8 h-auto w-full"
                />
                <JsxRenderer
                  jsx={aboutContent.data[0].bio}
                  components={{ Typography }}
                />
              </>
            )}
            <ButtonLink email="mailto:hello@kvd.studio">Contact</ButtonLink>
          </div>
          <div className="col-span-2">
            <CurriculumVitae />
          </div>
        </div>
      </div>
    </BasePage>
  );
});

export default About;
