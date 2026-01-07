import { Link } from "@tanstack/react-router";
import { differenceInMonths, differenceInYears, formatDuration } from "date-fns";
import dateFormat from "dateformat";
import Mdx from "@/components/common/Mdx";

interface CvSectionElementMdxProps<T extends Record<string, any>> {
  data: T;
}

export function CvSectionElementMdx<T extends Record<string, any>>({
  data,
}: CvSectionElementMdxProps<T>) {
  const startDate = new Date(data.startDate);
  const endDate = data.endDate ? new Date(data.endDate) : null;

  const formattedStartDate = dateFormat(startDate, "mmm yyyy");
  const formattedEndDate =
    endDate == null ? "present" : dateFormat(endDate, "mmm yyyy");

  const end = endDate ?? new Date();
  const diffYears = differenceInYears(end, startDate);
  const diffMonths = differenceInMonths(end, startDate);

  const duration = formatDuration(
    {
      years: diffYears,
      months: Math.max(1, diffMonths % 12),
    },
    { format: ["years", "months"] },
  );

  return (
    <li className="relative mt-6 ml-6">
      <div className="absolute top-1 -ml-8 h-4 w-4 rounded-[50%] border-2 border-primary border-solid bg-ctp-mauve"></div>
      <div className="flex flex-col gap-4">
        <div className="-mt-2">
          <h5 className="font-bold text-lg">{data.title}</h5>
          {data.subtitleLink ? (
            <a href={data.subtitleLink} className="text-ctp-mauve hover:underline">
              {data.subtitle}
            </a>
          ) : (
            <p className="text-ctp-subtext1">{data.subtitle}</p>
          )}
          <div className="small-caps text-gray-400 text-sm">
            {formattedStartDate} – {formattedEndDate} • {duration}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="prose prose-invert col-span-1 max-w-none list-styled md:col-span-3">
            <Mdx code={data.content} />
          </div>
        </div>

        {data.bodyLink && (
          <div>
            <Link to={data.bodyLink} className="btn btn-outline btn-accent btn-sm">
              See in portfolio
            </Link>
          </div>
        )}

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
