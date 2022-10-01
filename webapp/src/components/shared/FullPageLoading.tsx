import { CircularProgress, Grid } from "@mui/material";

function FullPageLoading() {
  return (
    <Grid container sx={{ height: "100vh" }} alignItems="center" justifyContent="center">
      <CircularProgress disableShrink color="primary" size="10em" />
    </Grid>
  );
}

export default FullPageLoading;
