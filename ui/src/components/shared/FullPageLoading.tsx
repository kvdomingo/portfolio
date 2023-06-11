import { CircularProgress } from "@mui/material";
import { block } from "million/react";

const FullPageLoading = block(() => {
  return (
    <div className="flex h-screen place-content-center place-items-center">
      <CircularProgress disableShrink color="primary" size="10em" />
    </div>
  );
});

export default FullPageLoading;
