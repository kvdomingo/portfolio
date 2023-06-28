import { CircularProgress } from "@mui/material";

interface LoadingProps {
  color?: string;
}

function Loading({ color = "inherit" }: LoadingProps) {
  return (
    <div className="container text-center">
      <CircularProgress sx={{ my: 8, color }} />
    </div>
  );
}

export default Loading;
