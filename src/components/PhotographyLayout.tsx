import type { ReactNode } from 'react'
import Sidenav from './common/Sidenav'

export default function PhotographyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="lg:flex lg:gap-8">
      <div className="mb-8 lg:flex-none lg:pl-16">
        <Sidenav />
      </div>
      <div className="lg:flex-auto">
        {children}
      </div>
    </div>
  )
}
