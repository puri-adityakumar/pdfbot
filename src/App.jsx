import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { useState, useMemo } from "react";

function App() {
  // Set default mode to dark
  const [mode, setMode] = useState("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? "#90caf9" : "#000000",
          },
          secondary: {
            main: mode === "dark" ? "#f48fb1" : "#000000",
          },
          background: {
            default: mode === "dark" ? "#121212" : "#ffffff",
            paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
            uploadArea: mode === "dark" ? "#262626" : "#FAFAFA",
            documentList: mode === "dark" ? "#2d2d2d" : "#FAFAFA",
            chatMessage: {
              user: mode === "dark" ? "#2c3e50" : "#F9FAFB",
              bot: mode === "dark" ? "#323945" : "#F0F0F0",
            },
          },
          text: {
            primary: mode === "dark" ? "#ffffff" : "#000000",
            secondary: mode === "dark" ? "#aaaaaa" : "#555555",
          },
          divider: mode === "dark" ? "#424242" : "#E0E0E0",
        },
        typography: {
          fontFamily: '"Roboto Mono", monospace',
          h4: {
            fontWeight: 400,
            letterSpacing: "-0.5px",
          },
          h6: {
            fontWeight: 400,
            letterSpacing: "-0.3px",
          },
          body1: {
            fontFamily: '"Roboto", sans-serif',
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 400,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout
          toggleColorMode={() =>
            setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
