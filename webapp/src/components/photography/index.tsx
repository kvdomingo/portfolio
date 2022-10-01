import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import SideNav from "./SideNav";

function Photography() {
  return (
    <Grid container>
      <Grid item xs={12} lg={2}>
        <SideNav />
      </Grid>
      <Grid item xs={12} lg px={4}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default Photography;
