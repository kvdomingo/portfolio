import { TooltipProvider } from "@/components/ui/tooltip";
import info from "@/info.json";

import TechStackItem from "./TechStackItem";

export default function TechStack() {
  return (
    <TooltipProvider>
      {Object.entries(info.home.technologies).map(([header, technologies]) => (
        <div key={header}>
          <div className="grid gap-12 md:grid-cols-4">
            <div className="flex place-content-center place-items-center border-white border-b border-solid pr-0 pb-6 text-center md:place-content-end md:border-r md:border-b-0 md:pr-6 md:pb-0 md:text-right">
              <h5 className="section-header text-lg">{header}</h5>
            </div>
            <div className="col-span-3 my-auto grid grid-cols-4 gap-4 md:grid-cols-6 md:gap-12">
              {technologies.map((tech) => (
                <TechStackItem key={tech.name} name={tech.name} logo={tech.logo} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </TooltipProvider>
  );
}
