import { AdvancedImage } from "@cloudinary/react";
import { Resize } from "@cloudinary/url-gen/actions";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cld } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/cv", label: "CV" },
  { path: "/photography", label: "Photography" },
  { path: "/dev", label: "Software" },
  { path: "/svip", label: "Signal Processing" },
  { path: "/blog", label: "Blog" },
];

export default function Navbar() {
  const { theme } = useTheme();

  const logo = useMemo(
    () =>
      cld()
        .image(
          theme === "dark" || theme === "system"
            ? "logo/logo-white"
            : "logo/logo-black",
        )
        .resize(Resize.scale().width(64).height(64)),
    [theme],
  );

  return (
    <NavigationMenu className="py-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <AdvancedImage cldImg={logo} />
        </NavigationMenuItem>

        {NAV_LINKS.map((link) => (
          <NavigationMenuItem key={link.path}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to={link.path}>{link.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
