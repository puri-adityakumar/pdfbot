import { Box, Paper, useTheme } from "@mui/material";
import PDFUploader from "../components/PDFUploader";
import DocumentList from "../components/DocumentList";
import ChatArea from "../components/ChatArea";

const Home = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: { xs: "auto", md: "calc(100vh - 120px)" }, // Adjusted for header
        overflow: { xs: "visible", md: "hidden" },
        width: "100%",
        maxWidth: "1600px",
        mx: "auto",
        gap: { xs: 2, md: 3 },
      }}
    >
      {/* Left sidebar - 30% width */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          height: { xs: "auto", md: "100%" },
          mb: { xs: 2, md: 0 },
          overflowY: "auto",
          pr: { md: 1 },
        }}
      >
        <Paper
          elevation={isDarkMode ? 2 : 0}
          sx={{
            p: { xs: 2, sm: 3 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <PDFUploader />
          <DocumentList />
        </Paper>
      </Box>

      {/* Right main content - 70% width */}
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          height: { xs: "500px", md: "100%" },
          display: "flex",
        }}
      >
        <ChatArea />
      </Box>
    </Box>
  );
};

export default Home;
