import { useState } from "react";
import {
  Button,
  Box,
  Typography,
  LinearProgress,
  Alert,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { uploadPDF } from "../services/api";

const PDFUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDarkMode = theme.palette.mode === "dark";

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      await uploadPDF(selectedFile);
      setUploadSuccess(true);
      setSelectedFile(null);
      // Reset success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      setError("Failed to upload PDF. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 2,
        textAlign: "center",
        mb: 3,
        backgroundColor: "background.uploadArea",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: { xs: "1rem", sm: "1.1rem" },
          fontWeight: 500,
          color: "text.primary",
        }}
      >
        Upload a PDF Document
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2, maxWidth: "90%", mx: "auto" }}
      >
        Upload a PDF file to chat with its contents. The document will be
        processed for question answering.
      </Typography>

      <input
        accept="application/pdf"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <label htmlFor="raised-button-file">
          <Button
            variant="outlined"
            component="span"
            startIcon={
              <AttachFileOutlinedIcon
                fontSize={isMobile ? "small" : "medium"}
              />
            }
            disabled={uploading}
            sx={{
              mb: 1,
              borderColor: isDarkMode ? "rgba(255, 255, 255, 0.23)" : "#E0E0E0",
              color: "text.secondary",
              "&:hover": {
                borderColor: isDarkMode ? "primary.main" : "#000000",
                backgroundColor: isDarkMode
                  ? "rgba(144, 202, 249, 0.08)"
                  : "#F5F5F5",
              },
            }}
            size={isMobile ? "small" : "medium"}
          >
            Select PDF
          </Button>
        </label>

        {selectedFile && (
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              fontSize: "0.85rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
              color: "text.secondary",
            }}
          >
            Selected: {selectedFile.name}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          size={isMobile ? "small" : "medium"}
          sx={{
            px: { xs: 2, sm: 3 },
          }}
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </Button>
      </Box>

      {uploading && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress sx={{ height: 4, borderRadius: 2 }} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: 1 }}>
          {error}
        </Alert>
      )}

      {uploadSuccess && (
        <Alert severity="success" sx={{ mt: 2, borderRadius: 1 }}>
          PDF uploaded successfully!
        </Alert>
      )}
    </Paper>
  );
};

export default PDFUploader;
