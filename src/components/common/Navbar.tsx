import { Resize } from "@cloudinary/url-gen/actions";
import { Link } from "@tanstack/react-router";
import cld from "@/utils/cloudinary.client";

const LIGHT_LOGO = cld
  .image("logo/logo-white")
  .resize(Resize.scale().width("auto"))
  .toURL();

const NAV_LINKS = [
  { path: "/cv", label: "CV" },
  { path: "/photography", label: "Photography" },
  { path: "/dev", label: "Software" },
  { path: "/svip", label: "Signal Processing" },
  { path: "/blog", label: "Blog" },
];

export default function Navbar() {
  return (
    <header className="z-10 w-full">
      <nav className="navbar px-12">
        <div className="flex flex-auto items-center">
          <Link to="/">
            <img
              src={LIGHT_LOGO}
              alt="logo"
              className="my-2 h-14 w-auto opacity-1 transition-all duration-300 ease-in-out"
            />
          </Link>
        </div>

        <ul className="section-header md:menu md:menu-horizontal hidden flex-auto items-center justify-end gap-6 md:visible md:flex">
          {NAV_LINKS.map((nav) => (
            <li key={nav.path}>
              <Link to={nav.path}>
                <span className="text-white">{nav.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
