import { Box, Paper, Typography } from "@mui/material";

export default function ChatMessage({ sender, text }) {
  const isUser = sender === "You";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Paper
        sx={{
          p: 2,
          maxWidth: "70%",
          bgcolor: isUser ? "#1976d2" : "#eeeeee",
          color: isUser ? "white" : "black",
        }}
      >
        <Typography variant="subtitle2">
          {sender}
        </Typography>

        <Typography>
          {text}
        </Typography>
      </Paper>
    </Box>
  );
}