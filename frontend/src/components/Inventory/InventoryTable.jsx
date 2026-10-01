import api from "../../services/api";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";

export default function InventoryTable({
  products = [],
  onDelete,
}) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/inventory/${id}`);

      if (onDelete) {
        onDelete();
      }
    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log(err.response.data);
      }

      alert("Failed to delete product");
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 3 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Product Name</b></TableCell>
            <TableCell><b>Category</b></TableCell>
            <TableCell align="center"><b>Quantity</b></TableCell>
            <TableCell align="right"><b>Price</b></TableCell>
            <TableCell align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell align="center">
                  {product.quantity}
                </TableCell>
                <TableCell align="right">
                  ₹{Number(product.price).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography color="text.secondary">
                  No products found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}