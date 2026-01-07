import * as SimpleIcons from "@icons-pack/react-simple-icons";
import info from "@/info.json";

interface TechBadgeProps {
  name: string;
}

export default function TechBadge({ name }: TechBadgeProps) {
  const { technologies } = info.dev as any;
  const si = SimpleIcons as any;

  let Icon: any = null;
  let obj: { label: string; icon: string; color: string } | null = null;
  let iconExists = false;

  if (Object.keys(technologies).includes(name)) {
    obj = technologies[name];
    if (Object.keys(si).includes(obj?.icon)) {
      Icon = si[obj?.icon];
      iconExists = true;
    }
  }

  return (
    <div
      className={`badge badge-neutral badge-xs md:badge-md mr-2 mb-2 p-4 ${
        iconExists ? "flex gap-1" : ""
      }`}
    >
      {iconExists ? (
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
