import * as SimpleIcons from "@icons-pack/react-simple-icons";
import info from "@/info.json";

interface TechBadgeProps {
  name: string;
}

export default function TechBadge({ name }: TechBadgeProps) {
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
    <div
      className={`badge badge-neutral badge-xs md:badge-md mr-2 mb-2 p-4 ${
        iconExists ? "flex gap-1" : ""
      }`}
    >
      {iconExists && Icon ? (
        <>
          <Icon color={obj?.color} size={16} />
          {obj?.label.toLowerCase() ?? name}
        </>
      ) : (
        name
      )}
    </div>
  );
}
