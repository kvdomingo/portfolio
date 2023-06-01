import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: ['"Rubik"', '"Inter"', "sans-serif"].join(", "),
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
