import {
  Container,
  Box,
  CssBaseline,
  useTheme,
  Typography,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Layout = ({ children, toggleColorMode }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "background.default",
      }}
    >
      <CssBaseline />

      {/* Header with theme toggle */}
      <Box
        component="header"
        sx={{
          py: 1,
          px: 2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <IconButton
          onClick={toggleColorMode}
          color="inherit"
          aria-label="toggle dark/light mode"
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          mt: { xs: 1, md: 2 },
          mb: { xs: 1, md: 2 },
          flex: 1,
          px: { xs: 1, sm: 2 },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 1.5,
          px: 2,
          backgroundColor: isDarkMode ? "background.paper" : "#F0F0F0",
          color: "text.secondary",
          borderTop: "1px solid",
          borderColor: "divider",
          position: { xs: "static", md: "sticky" },
          bottom: 0,
          width: "100%",
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            align="center"
            sx={{ fontSize: "0.75rem" }}
          >
            © {new Date().getFullYear()} PDF Chat Bot - Powered by LangChain &
            Google Gemini - Created by{" "}
            <a 
              href="https://github.com/puri-adityakumar/pdfbot" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'inherit', 
                textDecoration: 'underline'
              }}
            >
              Aditya Kumar Puri
            </a>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
