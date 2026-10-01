import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import AddSaleDialog from "../components/Sales/AddSaleDialog";
import SalesTable from "../components/Sales/SalesTable";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    try {
      setLoading(true);

      console.log("Fetching sales...");

      const response = await api.get("/sales/");

      console.log("Status:", response.status);
      console.log("Sales:", response.data);

      setSales(response.data);
    } catch (err) {
      console.error("Sales Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold">
            💰 Sales Management
          </Typography>

          <Typography color="text.secondary">
            Manage all your sales
          </Typography>
        </Box>

        <AddSaleDialog onSuccess={fetchSales} />
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <SalesTable
          sales={sales}
          onDelete={fetchSales}
        />
      )}
    </MainLayout>
  );
}