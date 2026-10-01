import { useState } from "react";
import {
  Typography,
  Paper,
  Box,
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import ChatBox from "../components/Assistant/ChatBox";
import ChatInput from "../components/Assistant/ChatInput";
import api from "../services/api";

export default function Assistant() {
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "Hello 👋 I am BizPilot AI. Ask me anything about your business.",
    },
  ]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text: message,
      },
    ]);

    try {
      const response = await api.post("/assistant/", {
        message,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "Unable to connect to server.",
        },
      ]);
    }
  };

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        BizPilot AI Assistant
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: "70vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <ChatBox messages={messages} />
        </Box>

        <ChatInput onSend={sendMessage} />
      </Paper>
    </MainLayout>
  );
}