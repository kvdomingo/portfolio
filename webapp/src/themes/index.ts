import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
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
