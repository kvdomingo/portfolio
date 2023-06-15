import { ReactNode } from "react";

import { block } from "million/react";

import { MillionProps } from "@/types";

interface TimelineSectionProps extends MillionProps {
  name: string;
  icon: ReactNode;
  children: ReactNode;
}

const TimelineSection = block<TimelineSectionProps>(function ({
  name,
  icon,
  children,
}) {
  return (
    <div data-aos="fade-up" className="mb-12">
      <h3 className="flex place-items-center text-4xl">
        {icon}
        {name}
      </h3>
      <div className="container">{children}</div>
    </div>
  );
});

export default TimelineSection;
