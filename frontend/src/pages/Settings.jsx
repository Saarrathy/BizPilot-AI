import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";

import {
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Box,
} from "@mui/material";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <MainLayout>
      <Typography variant="h3" gutterBottom>
        ⚙️ Settings
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 700 }}>
        <Typography variant="h6" gutterBottom>
          General Settings
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <FormControlLabel
          control={
            <Switch
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          }
          label="Enable Notifications"
        />

        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Language</InputLabel>

            <Select
              value={language}
              label="Language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Tamil">Tamil</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Paper>
    </MainLayout>
  );
}