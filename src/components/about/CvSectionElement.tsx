import dateFormat from 'dateformat'
import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

interface CvSectionElementProps {
  data: any
  children?: ReactNode
}

export default function CvSectionElement({ data, children }: CvSectionElementProps) {
  const startDate = data.startDate ? dateFormat(new Date(data.startDate), 'mmm yyyy') : ''
  const endDate = data.endDate === '' ? ' – present' : data.endDate ? ` – ${dateFormat(new Date(data.endDate), 'mmm yyyy')}` : ''

  return (
    <li className="ml-[1.5rem] mt-[1.5rem] relative">
      <div className="absolute -ml-[2rem] h-[1rem] w-[1rem] rounded-[50%] border-2 border-solid border-primary bg-ctp-mauve top-1"></div>
      <div className="flex flex-col gap-4">
        <div className="-mt-[0.5rem]">
          <div className="grid md:grid-cols-2">
            <h5 className="text-lg font-bold">{data.title}</h5>
            <div className="flex justify-start text-gray-300 small-caps md:justify-end text-sm">
              🕑{startDate}{endDate}
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
              {typeof data.body === 'string' ? (
                <p>{data.body}</p>
              ) : Array.isArray(data.body) ? (
                <ul className="px-4 list-disc">
                  {data.body.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {data.bodyLink && (
                <div className="mt-2">
                  <Link to={data.bodyLink as any} className="btn btn-outline btn-accent btn-sm">
                    See in portfolio
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

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
