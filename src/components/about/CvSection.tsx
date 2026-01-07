import type { ReactNode } from "react";
import CvSectionElement from "./CvSectionElement";

interface CvSectionProps<T extends Record<string, any>> {
  title: string;
  data?: T[];
  children?: ReactNode;
}

export function CvSection<T extends Record<string, any>>({
  title,
  data,
  children,
}: CvSectionProps<T>) {
  return (
    <div className="mb-12">
      <h3 className="mb-4 text-xl uppercase tracking-widest">{title}</h3>
      {children || (
        <ul className="relative border-gray-500 border-l">
          {data?.map((d, i) => (
            <CvSectionElement key={i} data={d} />
          ))}
        </ul>
      )}
    </div>
  );
}
