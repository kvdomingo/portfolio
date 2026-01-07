import type { ReactNode } from "react";
import { CvSectionElementMdx } from "./CvSectionElementMdx";

interface CvSectionMdxProps<T extends Record<string, any>> {
  title: string;
  data?: T[];
  children?: ReactNode;
}

export function CvSectionMdx<T extends Record<string, any>>({
  title,
  data,
  children,
}: CvSectionMdxProps<T>) {
  return (
    <div className="mb-12">
      <h3 className="mb-4 text-xl uppercase tracking-widest">{title}</h3>
      {children || (
        <ul className="relative border-gray-500 border-l">
          {data?.map((d, i) => (
            <CvSectionElementMdx key={i} data={d} />
          ))}
        </ul>
      )}
    </div>
  );
}
