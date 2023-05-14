import { Link } from "react-router-dom";
import { Box, Button, CardMediaProps, Typography } from "@mui/material";

interface ButtonCardProps extends CardMediaProps<"img"> {
  slug: string;
  summary?: string;
}

function ButtonCard(props: ButtonCardProps) {
  return (
    <Box
      component="div"
      role={props.role}
      sx={{
        ...props.style,
        aspectRatio: "1",
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.67)",
          color: "white",
        }}
      >
        <Link to={props.slug}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ color: "white", mx: 8 }}
          >
            {props.alt}
          </Button>
        </Link>
        {!!props.summary && (
          <Typography variant="body1" sx={{ m: 4 }}>
            {props.summary}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ButtonCard;
