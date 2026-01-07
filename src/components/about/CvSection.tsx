import type { ReactNode } from 'react'
import CvSectionElement from './CvSectionElement'

interface CvSectionProps {
  title: string
  data?: any[]
  children?: ReactNode
}

export default function CvSection({ title, data, children }: CvSectionProps) {
  return (
    <div className="mb-12">
      <h3 className="text-xl uppercase tracking-widest mb-4">{title}</h3>
      {children || (
        <ul className="border-l border-gray-500 relative">
          {data?.map((d, i) => <CvSectionElement key={i} data={d} />)}
        </ul>
      )}
    </div>
  )
}
