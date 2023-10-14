import { Outlet, useLocation } from "react-router-dom";

import BasePage from "@/components/shared/BasePage.tsx";

import Clients from "./Clients";
import SideNav from "./SideNav";

function Photography() {
  const location = useLocation();

  return (
    <BasePage>
      <div className="lg:flex lg:gap-8">
        <div className="mb-8 lg:flex-none lg:pl-16">
          <SideNav />
        </div>
        <div className="lg:flex-auto">
          {location.pathname.endsWith("clients") ? <Clients /> : <Outlet />}
        </div>
      </div>
    </BasePage>
  );
}

export default Photography;
