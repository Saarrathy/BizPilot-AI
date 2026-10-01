import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import AddProductDialog from "../components/Inventory/AddProductDialog";
import InventoryTable from "../components/Inventory/InventoryTable";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/inventory/");

      setProducts(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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
            📦 Inventory Management
          </Typography>

          <Typography color="text.secondary">
            Manage all your products
          </Typography>
        </Box>

        <AddProductDialog onSuccess={fetchProducts} />
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
        <InventoryTable
          products={products}
          onDelete={fetchProducts}
        />
      )}
    </MainLayout>
  );
}