import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import AddEmployeeDialog from "../components/HR/AddEmployeeDialog";
import EmployeeTable from "../components/HR/EmployeeTable";

export default function HR() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/hr/");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/hr/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        HR Management
      </Typography>

      <Box sx={{ mb: 2 }}>
        <AddEmployeeDialog onSuccess={fetchEmployees} />
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <EmployeeTable
          employees={employees}
          onDelete={handleDelete}
        />
      )}
    </MainLayout>
  );
}