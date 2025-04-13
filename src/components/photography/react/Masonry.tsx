import { useMemo, useRef, useState } from "react";

import Config from "@cloudinary/url-gen/config/BaseConfig";
import { useWindowSize } from "@react-hook/window-size";
import type { ResourceApiResponse } from "cloudinary";
import {
  MasonryScroller,
  useContainerPosition,
  usePositioner,
  useResizeObserver,
} from "masonic";

interface MasonryItemProps {
  index: number;
  data: ResourceApiResponse["resources"][number];
  width: number;
}

function MasonryItem({ data, width }: MasonryItemProps) {
  return (
    <img
      src={data.secure_url}
      alt={data.public_id}
      width={width}
      className="rounded-lg drop-shadow-lg"
    />
  );
}

interface MasonryProps {
  images: Array<ResourceApiResponse["resources"][number]>;
  clientSlug?: string;
}

const widthBreakpoints: Record<"sm" | "md" | "lg", number> = {
  sm: 768,
  md: 1024,
  lg: 1280,
};

const columnBreakpoints: Record<"sm" | "md" | "lg", number> = {
  sm: 1,
  md: 2,
  lg: 3,
};

export default function Masonry({ images }: MasonryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);

  function getColumnBreakpoint(width: number) {
    for (const [key, value] of Object.entries(widthBreakpoints)) {
      if (windowWidth < value) {
        return columnBreakpoints[key as keyof typeof columnBreakpoints];
      }
    }

    return 4;
  }

  const gutter = 12;
  const columnCount = useMemo(
    () => getColumnBreakpoint(windowWidth),
    [windowWidth],
  );

  const positioner = usePositioner({
    width,
    columnCount,
    rowGutter: gutter,
    columnGutter: gutter,
  });
  const resizeObserver = useResizeObserver(positioner);

  return (
    <MasonryScroller
      containerRef={containerRef}
      items={images}
      offset={offset}
      render={MasonryItem}
      positioner={positioner}
      resizeObserver={resizeObserver}
      height={windowHeight}
    />
  );
}
