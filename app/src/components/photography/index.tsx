import { Outlet, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import Clients from "./Clients";
import SideNav from "./SideNav";

function Photography() {
  const location = useLocation();

  return (
    <Grid container>
      <Grid item xs={12} lg={2}>
        <SideNav />
      </Grid>
      <Grid item xs={12} lg px={4}>
        {location.pathname.endsWith("clients") ? <Clients /> : <Outlet />}
      </Grid>
    </Grid>
  );
}

export default Photography;
