import { Link, useLocation } from '@tanstack/react-router'

const TABS = [
  { path: "/latest", label: "latest" },
  { path: "/live", label: "live" },
  { path: "/portraits", label: "portraits" },
  { path: "/clients", label: "clients" },
  { path: "/samoetikerffa", label: "#samoetikerffa" },
  { path: "/gear", label: "gear" },
]

export default function Sidenav() {
  const { pathname } = useLocation()

  return (
    <ul className="menu menu-lg items-end">
      {TABS.map(tab => {
        const fullPath = `/photography${tab.path}`
        const isActive = tab.path === "/clients" 
          ? pathname.startsWith("/photography/clients")
          : pathname === fullPath

        return (
          <li key={tab.path}>
            <Link
              to={fullPath as any}
              className={isActive ? 'active' : ''}
            >
              {tab.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
