import BasePage from "@/components/shared/BasePage.tsx";
import ButtonLink from "@/components/shared/ButtonLink.tsx";
import Image from "@/components/shared/Image.tsx";
import { selectAboutContent } from "@/store/generalSlice.ts";
import { useSelector } from "@/store/hooks.ts";

import Title from "../shared/Title";
import CurriculumVitae from "./CurriculumVitae.tsx";

function About() {
  const aboutContent = useSelector(selectAboutContent);

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
      <div className="grid gap-8 p-4 md:grid-cols-4 md:p-0">
        <div data-aos="fade-up">
          {aboutContent.loaded && (
            <Image
              publicId={aboutContent.data[0].picture}
              className="rounded-3xl md:sticky md:-top-8 md:-z-10 md:-ml-8"
            />
          )}
        </div>
        <div className="md:col-span-3 md:pr-24">
          <p className="whitespace-pre-line text-lg">
            {aboutContent.data[0].bio}
          </p>
          <ButtonLink className="mb-16" email="mailto:hello@kvd.studio">
            Contact
          </ButtonLink>
          <CurriculumVitae />
        </div>
      </div>
    </BasePage>
  );
}

export default About;
