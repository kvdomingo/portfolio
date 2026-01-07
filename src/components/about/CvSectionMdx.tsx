import type { ReactNode } from 'react'
import CvSectionElementMdx from './CvSectionElementMdx'

interface CvSectionMdxProps {
  title: string
  data?: any[]
  children?: ReactNode
}

export default function CvSectionMdx({ title, data, children }: CvSectionMdxProps) {
  return (
    <div className="mb-12">
      <h3 className="text-xl uppercase tracking-widest mb-4">{title}</h3>
      {children || (
        <ul className="border-l border-gray-500 relative">
          {data?.map((d, i) => <CvSectionElementMdx key={i} data={d} />)}
        </ul>
      )}
    </div>
  )
}
