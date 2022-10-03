import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#1976d2",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
    },
  },
  typography: {
    fontFamily: ['"Rubik"', "sans-serif"].join(", "),
  },
  components: {
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
