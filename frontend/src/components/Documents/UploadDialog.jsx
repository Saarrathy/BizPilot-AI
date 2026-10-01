import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import api from "../../services/api";

export default function UploadDialog({ onSuccess }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    file_name: "",
    file_path: "",
    file_type: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await api.post("/documents/", form);

      setOpen(false);

      setForm({
        file_name: "",
        file_path: "",
        file_type: "",
      });

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Upload Document
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <DialogTitle>Upload Document</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="File Name"
            name="file_name"
            fullWidth
            value={form.file_name}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="File Path"
            name="file_path"
            fullWidth
            value={form.file_path}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="File Type"
            name="file_type"
            fullWidth
            value={form.file_type}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}