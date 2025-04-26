import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Alert,
  useTheme,
  Divider,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { getDocuments } from "../services/api";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const docs = await getDocuments();
      setDocuments(docs);
      setError(null);
    } catch (err) {
      setError("Failed to fetch documents");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Available Documents
          </Typography>
        </Box>

        <Divider sx={{ mb: 2, borderColor: "divider" }} />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress size={24} sx={{ color: "primary.main" }} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ borderRadius: 1 }}>
            {error}
          </Alert>
        ) : documents.length === 0 ? (
          <Box
            sx={{
              p: 3,
              textAlign: "center",
              backgroundColor: "background.documentList",
              borderRadius: 2,
              border: "1px dashed",
              borderColor: "divider",
            }}
          >
            <ArticleOutlinedIcon
              sx={{
                fontSize: 36,
                color: "text.secondary",
                mb: 1,
                opacity: 0.5,
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.85rem" }}
            >
              No documents available. Upload a PDF to get started.
            </Typography>
          </Box>
        ) : (
          <Paper
            elevation={isDarkMode ? 1 : 0}
            sx={{
              maxHeight: {
                xs: "180px",
                sm: "250px",
                md: "calc(100vh - 420px)",
              },
              overflowY: "auto",
              backgroundColor: "background.documentList",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              flexShrink: 1,
            }}
          >
            <List dense>
              {documents.map((doc, index) => (
                <ListItem
                  key={index}
                  sx={{
                    py: 1.5,
                    borderBottom:
                      index < documents.length - 1 ? "1px solid" : "none",
                    borderColor: "divider",
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "#F5F5F5",
                    },
                  }}
                >
                  <PictureAsPdfIcon
                    sx={{ mr: 1.5, fontSize: "1.2rem", color: "primary.light" }}
                  />
                  <ListItemText
                    primary={doc}
                    primaryTypographyProps={{
                      noWrap: true,
                      sx: {
                        fontSize: "0.85rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "text.primary",
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography
            variant="caption"
            sx={{
              cursor: "pointer",
              fontSize: "0.75rem",
              color: "text.secondary",
              textDecoration: "underline",
              "&:hover": {
                color: "primary.main",
              },
            }}
            onClick={fetchDocuments}
          >
            Refresh list
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default DocumentList;
