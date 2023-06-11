import { CircularProgress } from "@mui/material";
import { block } from "million/react";

import { MillionProps } from "@/types";

interface LoadingProps extends MillionProps {
  color?: string;
}

const Loading = block<LoadingProps>(({ color = "inherit" }) => {
  return (
    <div className="container text-center">
      <CircularProgress sx={{ my: 8, color }} />
    </div>
  );
});

export default Loading;
