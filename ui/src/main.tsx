import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "@fontsource/rubik/300.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "aos/dist/aos.css";

import App from "./App.tsx";
import "./index.css";
import { store } from "./store/store";
import theme from "./themes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
