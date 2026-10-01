import { useState } from "react";
import api from "../../services/api";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
 TextField,
  MenuItem,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";

export default function AddExpenseDialog({ onSuccess }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.category ||
      !form.amount ||
      !form.date
    ) {
      setError("Please fill all fields.");
      return;
    }

    const data = {
      title: form.title,
      category: form.category,
      type: "Expense",
      amount: Number(form.amount),
      date: form.date,
    };

    console.log("========== SENDING EXPENSE ==========");
    console.log(data);
    console.log("=====================================");

    try {
      const response = await api.post("/finance/transactions", data);

      console.log("========== EXPENSE SAVED ==========");
      console.log(response.status);
      console.log(response.data);
      console.log("===================================");

      setSuccess(true);
      setOpen(false);

      setForm({
        title: "",
        category: "",
        amount: "",
        date: "",
      });

      if (onSuccess) {
        await onSuccess();
      }
    } catch (err) {
      console.log("========== API ERROR ==========");

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);
      } else if (err.request) {
        console.log("Request:", err.request);
      } else {
        console.log("Message:", err.message);
      }

      console.log("===============================");

      setError("Unable to save expense.");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpen(true)}
      >
        + Add Expense
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <DialogTitle>Add Expense</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              select
              fullWidth
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Travel">Travel</MenuItem>
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="Electricity">Electricity</MenuItem>
              <MenuItem value="Rent">Rent</MenuItem>
              <MenuItem value="Internet">Internet</MenuItem>
              <MenuItem value="Shopping">Shopping</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Expense Added Successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}