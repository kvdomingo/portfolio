import * as SimpleIcons from "@icons-pack/react-simple-icons";
import info from "@/info.json";
import { Badge } from "../ui/badge";

interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  const { technologies } = info.dev as {
    technologies: Record<string, { label: string; icon: string; color: string }>;
  };
  const si = SimpleIcons as unknown as Record<string, SimpleIcons.IconType>;

  let Icon: SimpleIcons.IconType | null = null;
  let obj: { label: string; icon: string; color: string } | null = null;
  let iconExists = false;

  if (Object.keys(technologies).includes(name)) {
    obj = technologies[name];

    if (obj?.icon && Object.keys(si).includes(`Si${obj.icon}`)) {
      Icon = si[`Si${obj.icon}`];
      iconExists = true;
    }
  }

  return (
    <Badge
      className={`mr-2 mb-2 px-2 py-1 text-sm ${iconExists ? "flex gap-1" : ""}`}
      variant="secondary"
    >
      {iconExists && Icon ? (
        <>
          <Icon color={obj?.color} size={16} />
          {obj?.label.toLowerCase() ?? name}
        </>
      ) : (
        name
      )}
    </Badge>
  );
}
