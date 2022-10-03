import { CircularProgress, Container } from "@mui/material";

interface LoadingProps {
  color: string;
}

function Loading({ color }: LoadingProps) {
  return (
    <Container sx={{ textAlign: "center" }}>
      <CircularProgress sx={{ my: 8, color }} />
    </Container>
  );
}

Loading.defaultProps = {
  color: "inherit",
};

export default Loading;
