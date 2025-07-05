import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

interface TechStackItemProps {
  name: string;
  logo: string;
}

export default function TechStackItem({ name, logo }: TechStackItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <img alt={name} className="my-auto" key={name} src={logo} />
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  );
}
