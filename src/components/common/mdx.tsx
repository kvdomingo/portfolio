import { AdvancedImage } from "@cloudinary/react";
import type * as React from "react";
import * as runtime from "react/jsx-runtime";
import { cn } from "@/utils";
import { buildCld, buildCldUrl } from "@/utils/cloudinary.client";

interface ImageProps {
  publicId: string;
}

function Image({ publicId }: ImageProps) {
  return <AdvancedImage cldImg={buildCld(publicId)} />;
}

const sharedComponents = {
  buildCldUrl,
  Image,
};

function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

interface MdxProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export function Mdx({ code, components }: MdxProps) {
  const Content = useMDXComponent(code);
  return (
    <div
      className={cn(
        "space-y-4",
        "[&_a]:text-primary",
        "[&_p]:prose",
        "[&_blockquote]:rounded-lg [&_blockquote]:border-ring [&_blockquote]:border-l-4 [&_blockquote]:bg-muted [&_blockquote]:p-4 [&_blockquote]:text-muted-foreground",
        "[&_pre]:rounded-lg [&_pre]:p-4",
        "[&_ul]:list-outside [&_ul]:list-disc [&_ul]:pl-8",
        "[&_ol]:list-outside [&_ol]:list-decimal [&_ol]:pl-8",
      )}
    >
      <Content components={{ ...sharedComponents, ...components }} />
    </div>
  );
}
