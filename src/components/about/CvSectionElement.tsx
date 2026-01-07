import { Link } from "@tanstack/react-router";
import dateFormat from "dateformat";
import type { ReactNode } from "react";

interface CvSectionElementProps {
  data: any;
  children?: ReactNode;
}

export default function CvSectionElement({ data, children }: CvSectionElementProps) {
  const startDate = data.startDate
    ? dateFormat(new Date(data.startDate), "mmm yyyy")
    : "";
  const endDate =
    data.endDate === ""
      ? " – present"
      : data.endDate
        ? ` – ${dateFormat(new Date(data.endDate), "mmm yyyy")}`
        : "";

  return (
    <li className="relative mt-[1.5rem] ml-[1.5rem]">
      <div className="absolute top-1 -ml-[2rem] h-[1rem] w-[1rem] rounded-[50%] border-2 border-primary border-solid bg-ctp-mauve"></div>
      <div className="flex flex-col gap-4">
        <div className="-mt-[0.5rem]">
          <div className="grid md:grid-cols-2">
            <h5 className="font-bold text-lg">{data.title}</h5>
            <div className="small-caps flex justify-start text-gray-300 text-sm md:justify-end">
              🕑{startDate}
              {endDate}
            </div>
          </div>
          {data.subtitleLink ? (
            <a href={data.subtitleLink} className="text-ctp-mauve hover:underline">
              {data.subtitle}
            </a>
          ) : (
            <p className="text-ctp-subtext1">{data.subtitle}</p>
          )}
        </div>

        <div>
          {children || (
            <>
              {typeof data.body === "string" ? (
                <p>{data.body}</p>
              ) : Array.isArray(data.body) ? (
                <ul className="list-disc px-4">
                  {data.body.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {data.bodyLink && (
                <div className="mt-2">
                  <Link
                    to={data.bodyLink as any}
                    className="btn btn-outline btn-accent btn-sm"
                  >
                    See in portfolio
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {data.caption &&
          (data.captionLink ? (
            <a
              href={data.captionLink}
              className="text-ctp-subtext0 text-sm hover:underline"
            >
              {data.caption}
            </a>
          ) : (
            <p className="text-ctp-subtext0 text-sm">{data.caption}</p>
          ))}
      </div>
    </li>
  );
}
