import { Link } from "react-router-dom";
import { Box, Button, CardMediaProps } from "@mui/material";

interface ButtonCardProps extends CardMediaProps<"img"> {
  slug: string;
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
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <Link to={`clients/${props.slug}`}>
          <Button variant="outlined" color="inherit" sx={{ color: "white", mx: 8 }}>
            {props.alt}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default ButtonCard;
