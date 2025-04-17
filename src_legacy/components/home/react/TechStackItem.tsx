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
        <img key={name} src={logo} alt={name} className="my-auto" />
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  );
}
