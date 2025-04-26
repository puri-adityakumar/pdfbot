import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  CircularProgress,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ReactMarkdown from "react-markdown";
import { createChatWebSocket } from "../services/api";

const ChatArea = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ws, setWs] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDarkMode = theme.palette.mode === "dark";

  const messagesEndRef = useRef(null);
  const timeoutRef = useRef(null);
  const checkIntervalRef = useRef(null);

  // Set up WebSocket connection
  useEffect(() => {
    const socket = createChatWebSocket();

    socket.onopen = () => {
      console.log("WebSocket connection established");
      setWs(socket);
      setError(null);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event_type === "answer") {
          setCurrentAnswer((prev) => prev + data.data);

          // Check if this is the end of a complete message
          if (data.data.includes("Source PDF")) {
            setIsComplete(true);
            setLoading(false);
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            if (checkIntervalRef.current) {
              clearInterval(checkIntervalRef.current);
            }
          }
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        setError("Error processing response from server");
      }
    };

    socket.onerror = (event) => {
      console.error("WebSocket error:", event);
      setError("WebSocket connection error");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setWs(null);
    };

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, []);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // When currentAnswer is updated and complete, add it to messages
  useEffect(() => {
    if (currentAnswer && isComplete) {
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        { type: "bot", content: currentAnswer },
      ]);
      setCurrentAnswer("");
      setIsComplete(false);
    } else if (currentAnswer && !loading) {
      // This handles the case when we got an incomplete message
      // but loading stopped (likely due to timeout)
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        {
          type: "bot",
          content: currentAnswer || "No response received from the server",
        },
      ]);
      setCurrentAnswer("");
    }
  }, [loading, currentAnswer, isComplete]);

  const handleSendMessage = () => {
    if (!input.trim() || !ws || ws.readyState !== WebSocket.OPEN) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: input }]);

    // Add placeholder for bot response
    setMessages((prev) => [...prev, { type: "bot", content: "" }]);

    // Send message via WebSocket
    setLoading(true);
    setCurrentAnswer("");
    setIsComplete(false);
    ws.send(input);
    setInput("");

    // Set a timeout to end loading state if no response
    timeoutRef.current = setTimeout(() => {
      if (loading) {
        console.log("Response timeout triggered");
        setLoading(false);
        if (currentAnswer === "") {
          setError("No response received from the server");
        }
      }
    }, 30000);

    // Check periodically if we've received a response
    checkIntervalRef.current = setInterval(() => {
      if (currentAnswer.length > 0) {
        console.log("Received some response data");
      }
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Paper
      elevation={isDarkMode ? 2 : 0}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: { xs: 2, sm: 3 },
          py: 2,
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List sx={{ p: 0 }}>
          {messages.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
                fontFamily: '"Roboto", sans-serif',
                gap: 2,
                opacity: 0.7,
              }}
            >
              <SmartToyOutlinedIcon
                sx={{ fontSize: 40, color: "text.secondary" }}
              />
              <Typography color="text.secondary" variant="h6">
                How can I help you today?
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                textAlign="center"
              >
                Ask a question about your PDFs or upload a document to get
                started
              </Typography>
            </Box>
          ) : (
            messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  mb: 3,
                  px: 0,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor:
                      message.type === "user"
                        ? isDarkMode
                          ? "primary.dark"
                          : "#000000"
                        : isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "#F0F0F0",
                    color:
                      message.type === "user"
                        ? "#FFFFFF"
                        : isDarkMode
                        ? "text.primary"
                        : "#000000",
                    width: 36,
                    height: 36,
                  }}
                >
                  {message.type === "user" ? (
                    <PersonOutlineOutlinedIcon />
                  ) : (
                    <SmartToyOutlinedIcon />
                  )}
                </Avatar>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "90%",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      mb: 0.5,
                      fontWeight: 500,
                      color: "text.primary",
                    }}
                  >
                    {message.type === "user" ? "You" : "PDF Helper"}
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      backgroundColor:
                        message.type === "user"
                          ? "background.chatMessage.user"
                          : "background.chatMessage.bot",
                      borderRadius: 2,
                      fontFamily: '"Roboto", sans-serif',
                      wordBreak: "break-word",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {message.type === "bot" ? (
                      <ReactMarkdown>{message.content || " "}</ReactMarkdown>
                    ) : (
                      <Typography color="text.primary">
                        {message.content}
                      </Typography>
                    )}
                  </Paper>
                </Box>
              </ListItem>
            ))
          )}
          <div ref={messagesEndRef} />

          {loading && (
            <ListItem
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                mb: 3,
                px: 0,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#F0F0F0",
                  color: isDarkMode ? "text.primary" : "#000000",
                  width: 36,
                  height: 36,
                }}
              >
                <SmartToyOutlinedIcon />
              </Avatar>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
              >
                <CircularProgress size={16} sx={{ color: "primary.main" }} />
                <Typography variant="body2" color="text.secondary">
                  Thinking...
                </Typography>
              </Box>
            </ListItem>
          )}
        </List>

        {error && (
          <Box sx={{ p: 2, color: "error.main", mt: 2 }}>
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ borderColor: "divider" }} />

      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          pt: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            p: 1,
            backgroundColor: isDarkMode
              ? "rgba(255, 255, 255, 0.05)"
              : "#FFFFFF",
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            placeholder={
              isMobile ? "Ask a question..." : "Message PDF Helper..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={5}
            disabled={loading || !ws}
            InputProps={{
              disableUnderline: true,
              style: { color: theme.palette.text.primary },
            }}
            sx={{
              px: 1,
              "& .MuiInputBase-root": {
                fontSize: "0.95rem",
                color: "text.primary",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "text.secondary",
                opacity: 0.7,
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            disabled={!input.trim() || loading || !ws}
            sx={{
              minWidth: "40px",
              height: 40,
              width: 40,
              borderRadius: "50%",
              p: 0,
            }}
          >
            <SendIcon fontSize="small" />
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatArea;
