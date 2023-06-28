import { ReactNode } from "react";

import { cn } from "@/utils";

interface ChipProps {
  children?: ReactNode;
  className?: string;
}

function Chip({ className, children }: ChipProps) {
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
}

export default Chip;
