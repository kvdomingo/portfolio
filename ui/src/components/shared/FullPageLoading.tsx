import { CircularProgress } from "@mui/material";

function FullPageLoading() {
  return (
    <div className="flex h-screen place-content-center place-items-center">
      <CircularProgress disableShrink color="primary" size="10em" />
    </div>
  );
}

export default FullPageLoading;
