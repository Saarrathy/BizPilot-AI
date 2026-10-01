import { useState } from "react";
import {
  Box,
  TextField,
  Button,
} from "@mui/material";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        mt: 2,
      }}
    >
      <TextField
        fullWidth
        label="Ask BizPilot AI..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ ml: 2 }}
        onClick={handleSend}
      >
        Send
      </Button>
    </Box>
  );
}