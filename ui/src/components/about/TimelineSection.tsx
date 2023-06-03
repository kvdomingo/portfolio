import { ReactElement } from "react";

interface TimelineSectionProps {
  name: string;
  icon: ReactElement;
  children: ReactElement;
}

function TimelineSection({ name, icon, children }: TimelineSectionProps) {
  return (
    <div data-aos="fade-up" className="mb-12">
      <h3 className="flex place-items-center text-4xl">
        {icon}
        {name}
      </h3>
      <div className="container">{children}</div>
    </div>
  );
}

export default TimelineSection;
