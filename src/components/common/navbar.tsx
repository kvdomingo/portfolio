import { Resize } from "@cloudinary/url-gen/actions";
import { Link, useLocation } from "@tanstack/react-router";
import { useMemo } from "react";
import cld from "@/utils/cloudinary.client";
import { AnimatedBackground } from "../ui/animated-background";

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

export function Navbar() {
  const { pathname } = useLocation();

  const pathPrefix = useMemo(
    () => pathname.split("/").slice(0, 2).join("/"),
    [pathname],
  );

  return (
    <nav>
      <header>
        <ul className="mb-6 flex items-center justify-between px-12 py-2">
          <div>
            <li>
              <Link to="/">
                <img src={LIGHT_LOGO} alt="logo" className="h-14 w-auto" />
              </Link>
            </li>
          </div>

          <div className="flex items-center gap-4">
            <AnimatedBackground
              value={pathPrefix}
              transition={{
                ease: "easeInOut",
                duration: 0.3,
              }}
              className="rounded bg-primary px-4 py-2"
            >
              {NAV_LINKS.map((nav) => (
                <Link
                  key={nav.path}
                  data-id={nav.path}
                  to={nav.path}
                  className="rounded px-4 py-2 uppercase tracking-[0.2rem] transition-colors hover:bg-secondary"
                  activeProps={{
                    className: "text-primary-foreground",
                  }}
                >
                  {nav.label}
                </Link>
              ))}
            </AnimatedBackground>
          </div>
        </ul>
      </header>
    </nav>
  );
}
