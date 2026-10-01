import { useState } from "react";
import api from "../../services/api";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";

export default function AddEmployeeDialog({ onSuccess }) {
  const [open, setOpen] = useState(false);

  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    position: "",
    salary: "",
    email: "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/hr/", {
        ...employee,
        salary: parseFloat(employee.salary),
      });

      setOpen(false);

      setEmployee({
        name: "",
        department: "",
        position: "",
        salary: "",
        email: "",
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to add employee");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Add Employee
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Employee</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, width: 400 }}>
            <TextField
              label="Name"
              name="name"
              value={employee.name}
              onChange={handleChange}
            />

            <TextField
              label="Department"
              name="department"
              value={employee.department}
              onChange={handleChange}
            />

            <TextField
              label="Position"
              name="position"
              value={employee.position}
              onChange={handleChange}
            />

            <TextField
              label="Salary"
              name="salary"
              type="number"
              value={employee.salary}
              onChange={handleChange}
            />

            <TextField
              label="Email"
              name="email"
              value={employee.email}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}