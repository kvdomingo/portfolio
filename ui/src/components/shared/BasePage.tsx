import { ReactNode } from "react";
import { useNavigation } from "react-router-dom";

import { LinearProgress } from "@mui/material";

import GAUtil from "@/components/shared/GAUtil.tsx";
import Navbar from "@/components/shared/Navbar.tsx";

interface BasePageProps {
  children?: ReactNode;
}

function BasePage({ children }: BasePageProps) {
  const navigation = useNavigation();

  return (
    <div className="bg-slate-900">
      <GAUtil />
      {navigation.state === "loading" && (
        <div className="fixed top-0 z-20 w-full">
          <LinearProgress />
        </div>
      )}
      <Navbar />
      {children}
    </div>
  );
}

export default BasePage;
