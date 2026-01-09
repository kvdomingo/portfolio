import { Resize } from "@cloudinary/url-gen/actions";
import { Link } from "@tanstack/react-router";
import { cn } from "@/utils";
import cld from "@/utils/cloudinary.client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

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
  return (
    <NavigationMenu>
      <NavigationMenuList className="px-12 py-2">
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              "hover:bg-transparent focus:bg-transparent",
            )}
          >
            <Link to="/">
              <img src={LIGHT_LOGO} alt="logo" className="h-14 w-auto" />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {NAV_LINKS.map((nav) => (
          <NavigationMenuItem key={nav.path}>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "uppercase tracking-[0.2rem]",
              )}
            >
              <Link
                to={nav.path}
                activeProps={{
                  className: "bg-primary text-primary-foreground focus:bg-primary",
                }}
              >
                {nav.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
