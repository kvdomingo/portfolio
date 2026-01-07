import { differenceInMonths, differenceInYears, formatDuration } from 'date-fns'
import dateFormat from 'dateformat'
import { Link } from '@tanstack/react-router'
import Mdx from '@/components/common/Mdx'

interface CvSectionElementMdxProps {
  data: any
}

export default function CvSectionElementMdx({ data }: CvSectionElementMdxProps) {
  const startDate = new Date(data.startDate)
  const endDate = data.endDate ? new Date(data.endDate) : null

  const formattedStartDate = dateFormat(startDate, 'mmm yyyy')
  const formattedEndDate = endDate == null ? 'present' : dateFormat(endDate, 'mmm yyyy')

  const end = endDate ?? new Date()
  const diffYears = differenceInYears(end, startDate)
  const diffMonths = differenceInMonths(end, startDate)

  const duration = formatDuration(
    {
      years: diffYears,
      months: Math.max(1, diffMonths % 12),
    },
    { format: ['years', 'months'] }
  )

  return (
    <li className="ml-[1.5rem] mt-[1.5rem] relative">
      <div className="absolute -ml-[2rem] h-[1rem] w-[1rem] rounded-[50%] border-2 border-solid border-primary bg-ctp-mauve top-1"></div>
      <div className="flex flex-col gap-4">
        <div className="-mt-[0.5rem]">
          <h5 className="text-lg font-bold">{data.title}</h5>
          {data.subtitleLink ? (
            <a href={data.subtitleLink} className="text-ctp-mauve hover:underline">
              {data.subtitle}
            </a>
          ) : (
            <p className="text-ctp-subtext1">{data.subtitle}</p>
          )}
          <div className="text-gray-400 small-caps text-sm">
            {formattedStartDate} – {formattedEndDate} • {duration}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="list-styled col-span-1 md:col-span-3 prose prose-invert max-w-none">
            <Mdx code={data.content} />
          </div>
        </div>

        {data.bodyLink && (
          <div>
            <Link to={data.bodyLink as any} className="btn btn-outline btn-accent btn-sm">
              See in portfolio
            </Link>
          </div>
        )}

        {data.caption && (
          data.captionLink ? (
            <a href={data.captionLink} className="text-sm text-ctp-subtext0 hover:underline">
              {data.caption}
            </a>
          ) : (
            <p className="text-sm text-ctp-subtext0">{data.caption}</p>
          )
        )}
      </div>
    </li>
  )
}
