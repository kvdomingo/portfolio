import { Resize } from "@cloudinary/url-gen/actions";
import { workExperience } from "@content";
import { createFileRoute } from "@tanstack/react-router";
import { compareDesc } from "date-fns";
import { FileDown, Mail } from "lucide-react";
import CvSection from "@/components/about/CvSection";
import CvSectionMdx from "@/components/about/CvSectionMdx";
import info from "@/info.json";
import cld from "@/utils/cloudinary.client";

export const Route = createFileRoute("/cv")({
  component: Cv,
});

function Cv() {
  const backgroundImage = cld
    .image("kdphotography/portfolio/static/portfolio/media-private/latest/20180713_1")
    .resize(Resize.scale().width("auto"))
    .toURL();

  const logo = cld
    .image("logo/logo-white")
    .resize(Resize.scale().width("auto"))
    .toURL();

  const image = cld
    .image(info.about.photo)
    .resize(Resize.scale().width("auto"))
    .toURL();

  const sortedWorkExperience = [...workExperience].sort(
    (a, b) =>
      compareDesc(
        new Date(a.endDate ?? new Date()),
        new Date(b.endDate ?? new Date()),
      ) || compareDesc(new Date(a.startDate), new Date(b.startDate)),
  );

  return (
    <div className="flex flex-col">
      <div
        className="mb-14 h-[75vh] bg-cover bg-fixed bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
        id="cover"
      >
        <div className="flex h-full w-full place-content-center place-items-center bg-black/70">
          <img
            src={logo}
            alt="KVD Studio"
            className="w-[75vw] border-[3px] border-solid border-white p-6 md:w-[25vw]"
          />
        </div>
      </div>

      <div className="grid gap-8 p-4 md:grid-cols-4 md:p-0">
        <img
          src={image}
          className="w-auto rounded-3xl md:sticky md:-top-8 md:-ml-8"
          alt="Mind Museum, 2019. Shot by Qeren Bartido."
        />
        <div className="flex flex-col gap-16 md:col-span-3 md:pr-24">
          <div>
            <p className="whitespace-pre-line text-lg leading-relaxed">
              {info.about.text}
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href={`mailto:${info.email}`}
                className="btn btn-outline btn-accent btn-wide"
              >
                <Mail size={20} className="mr-2" />
                Contact
              </a>
              <a
                href="https://raw.githubusercontent.com/kvdomingo/cv/refs/heads/main/rendercv_output/Kenneth_V._Domingo_CV.pdf"
                className="btn btn-outline btn-accent btn-wide"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileDown size={20} className="mr-2" />
                Download CV
              </a>
            </div>
          </div>

          <div>
            <CvSectionMdx title="Work Experience" data={sortedWorkExperience} />
            <CvSection title="Certifications" data={info.cv.certification.data} />
            <CvSection title="Education" data={info.cv.education.data} />
            <CvSection title="Publications" data={info.cv.publication.data} />
            <CvSection title="Coding Stats">
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <figure>
                    <embed src="https://wakatime.com/share/@kvdomingo/c19861c3-3b97-49c3-8152-56dbc3b074b2.svg" />
                  </figure>
                </div>
                <figure className="md:w-3/4">
                  <embed src="https://wakatime.com/share/@kvdomingo/1e4dbd96-9c14-40e8-b252-0191c6306845.svg" />
                </figure>
              </div>
            </CvSection>
          </div>
        </div>
      </div>
    </div>
  );
}
