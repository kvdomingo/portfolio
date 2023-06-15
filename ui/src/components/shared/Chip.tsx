import { ReactNode } from "react";

import { block } from "million/react";

import { MillionProps } from "@/types";
import { cn } from "@/utils";

interface ChipProps extends MillionProps {
  children?: ReactNode;
  className?: string;
}

const Chip = block<ChipProps>(({ className, children }) => {
  return (
    <div
      className={cn(
        "my-1 mr-2 inline-block rounded-3xl bg-indigo-900 px-4 py-1",
        className,
      )}
    >
      {children}
    </div>
  );
});

export default Chip;
