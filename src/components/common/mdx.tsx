import type * as React from "react";
import * as runtime from "react/jsx-runtime";

interface MdxProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

const sharedComponents = {};

function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function Mdx({ code, components }: MdxProps) {
  const Content = useMDXComponent(code);
  return <Content components={{ ...sharedComponents, ...components }} />;
}
