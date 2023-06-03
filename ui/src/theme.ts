import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#818cf8",
    },
    secondary: {
      main: "#38bdf8",
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
