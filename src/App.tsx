import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import "./App.css";

import Toolbar from "./components/Toolbar/Toolbar";

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Inria Sans'",
  },
  palette: {
    common: {
      black: "rgba(26, 26, 26, 1)",
      white: "rgba(254, 254, 254, 1)",
    },
    background: {
      paper: "rgba(254, 254, 254, 1)",
      default: "#fafafa",
    },
    primary: {
      light: "rgba(213, 213, 213, 1)",
      main: "rgba(26, 26, 26, 1)",
      dark: "rgba(8, 8, 8, 1)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    secondary: {
      light: "rgba(242, 242, 243, 1)",
      main: "rgba(188, 188, 189, 1)",
      dark: "rgba(52, 52, 52, 1)",
      contrastText: "rgba(0, 0, 0, 1)",
    },
    error: {
      light: "#e57373",
      main: "rgba(244, 67, 54, 1)",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toolbar />
    </ThemeProvider>
  );
}
