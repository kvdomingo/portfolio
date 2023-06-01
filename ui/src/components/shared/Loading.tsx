import { CircularProgress } from "@mui/material";

interface LoadingProps {
  color: string;
}

function Loading({ color }: LoadingProps) {
  return (
    <div className="container text-center">
      <CircularProgress sx={{ my: 8, color }} />
    </div>
  );
}

Loading.defaultProps = {
  color: "inherit",
};

export default Loading;
