import { ReactNode } from "react";

import { block } from "million/react";

import GAUtil from "@/components/shared/GAUtil.tsx";
import Navbar from "@/components/shared/Navbar.tsx";
import { MillionProps } from "@/types";

interface BasePageProps extends MillionProps {
  children?: ReactNode;
}

const BasePage = block<BasePageProps>(({ children }) => {
  return (
    <>
      <GAUtil />
      <Navbar />
      {children}
    </>
  );
});

export default BasePage;
